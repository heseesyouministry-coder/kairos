/**
 * KAIROS / The Living Word — SoundCloud Player Adapter
 * Direct SoundCloud Widget integration for authentic contemporary Christian worship tracks
 * and instrumental reflections (Hillsong, Elevation Worship, Bethel Music).
 */

declare global {
  interface Window {
    SC?: {
      Widget: {
        (iframe: HTMLIFrameElement | string): SoundCloudWidget;
        Events: {
          READY: string;
          PLAY: string;
          PAUSE: string;
          FINISH: string;
          SEEK: string;
          ERROR: string;
          OPEN_SHARE_PANEL: string;
          SHARE_PANEL_OPENED: string;
          BUY_CLICK: string;
          DOWNLOAD_CLICK: string;
        };
      };
    };
  }
}

export interface SoundCloudWidget {
  bind(event: string, callback: (...args: any[]) => void): void;
  unbind(event: string): void;
  load(url: string, options?: Record<string, any>): void;
  play(): void;
  pause(): void;
  toggle(): void;
  seekTo(milliseconds: number): void;
  setVolume(volume: number): void; // 0 to 100
  getVolume(callback: (volume: number) => void): void;
  getDuration(callback: (duration: number) => void): void;
  getPosition(callback: (position: number) => void): void;
  getSounds(callback: (sounds: any[]) => void): void;
  getCurrentSound(callback: (sound: any) => void): void;
  getCurrentSoundIndex(callback: (index: number) => void): void;
  isPaused(callback: (paused: boolean) => void): void;
}

class SoundCloudPlayerAdapterImpl {
  private iframe: HTMLIFrameElement | null = null;
  private widget: SoundCloudWidget | null = null;
  private isReady = false;
  private isMuted = false;
  private currentVolume = 0.5; // 0.0 - 1.0
  private rampInterval: any = null;
  private currentUrl = "";
  private pendingUrl: string | null = null;
  private scriptLoadingPromise: Promise<boolean> | null = null;

  private stateChangeListeners: ((state: "playing" | "paused" | "buffering" | "ended") => void)[] = [];

  constructor() {
    this.ensureScriptLoaded();
  }

  private ensureScriptLoaded(): Promise<boolean> {
    if (typeof window === "undefined") return Promise.resolve(false);
    if (window.SC?.Widget) return Promise.resolve(true);

    if (this.scriptLoadingPromise) return this.scriptLoadingPromise;

    this.scriptLoadingPromise = new Promise((resolve) => {
      const existing = document.querySelector('script[src*="soundcloud.com/player/api.js"]');
      if (existing) {
        existing.addEventListener("load", () => resolve(true));
        return;
      }
      const script = document.createElement("script");
      script.src = "https://w.soundcloud.com/player/api.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => {
        console.warn("[SoundCloudPlayerAdapter] Failed to load SC Widget API script");
        resolve(false);
      };
      document.head.appendChild(script);
    });

    return this.scriptLoadingPromise;
  }

  public bindIframe(iframeElement: HTMLIFrameElement | null) {
    if (!iframeElement) {
      this.iframe = null;
      this.widget = null;
      this.isReady = false;
      return;
    }

    this.iframe = iframeElement;

    this.ensureScriptLoaded().then((loaded) => {
      if (!loaded || !window.SC?.Widget || !this.iframe) return;

      try {
        this.widget = window.SC.Widget(this.iframe);

        this.widget.bind(window.SC.Widget.Events.READY, () => {
          this.isReady = true;
          this.setVolume(this.isMuted ? 0 : this.currentVolume);

          if (this.pendingUrl) {
            const urlToLoad = this.pendingUrl;
            this.pendingUrl = null;
            this.loadTrack(urlToLoad, this.currentVolume, true);
          }
        });

        this.widget.bind(window.SC.Widget.Events.PLAY, () => {
          this.notifyState("playing");
        });

        this.widget.bind(window.SC.Widget.Events.PAUSE, () => {
          this.notifyState("paused");
        });

        this.widget.bind(window.SC.Widget.Events.FINISH, () => {
          this.notifyState("ended");
        });

        this.widget.bind(window.SC.Widget.Events.ERROR, () => {
          console.warn("[SoundCloudPlayerAdapter] Player encountered an error");
          this.notifyState("paused");
        });
      } catch (err) {
        console.warn("[SoundCloudPlayerAdapter] Error binding widget:", err);
      }
    });
  }

  public loadTrack(url: string, targetVolume: number = 0.5, autoPlay = true) {
    this.currentUrl = url;
    this.currentVolume = targetVolume;

    if (!this.widget || !this.isReady) {
      this.pendingUrl = url;
      // Also update iframe src if widget isn't ready
      if (this.iframe) {
        const encoded = encodeURIComponent(url);
        this.iframe.src = `https://w.soundcloud.com/player/?url=${encoded}&color=%23c99a5e&auto_play=${autoPlay}&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false`;
      }
      return;
    }

    try {
      this.widget.load(url, {
        auto_play: autoPlay && !this.isMuted,
        show_artwork: true,
        color: "#c99a5e",
        callback: () => {
          this.setVolume(this.isMuted ? 0 : this.currentVolume);
          if (autoPlay && !this.isMuted) {
            this.play();
          }
        },
      });
    } catch (e) {
      console.warn("[SoundCloudPlayerAdapter] load failed, falling back to src:", e);
      if (this.iframe) {
        const encoded = encodeURIComponent(url);
        this.iframe.src = `https://w.soundcloud.com/player/?url=${encoded}&color=%23c99a5e&auto_play=${autoPlay}&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false`;
      }
    }
  }

  public play() {
    if (this.widget && this.isReady) {
      try {
        this.widget.play();
      } catch (e) {
        console.warn("[SoundCloudPlayerAdapter] play error:", e);
      }
    }
  }

  public pause() {
    if (this.widget && this.isReady) {
      try {
        this.widget.pause();
      } catch (e) {
        console.warn("[SoundCloudPlayerAdapter] pause error:", e);
      }
    }
  }

  public setVolume(volume: number) {
    this.currentVolume = Math.max(0, Math.min(1, volume));
    if (this.widget && this.isReady) {
      const scVolume = this.isMuted ? 0 : Math.round(this.currentVolume * 100);
      try {
        this.widget.setVolume(scVolume);
      } catch (e) {
        // Ignore iframe communication errors
      }
    }
  }

  public rampVolume(targetVolume: number, durationSeconds: number) {
    if (this.rampInterval) {
      clearInterval(this.rampInterval);
      this.rampInterval = null;
    }

    const startVolume = this.currentVolume;
    const endVolume = Math.max(0, Math.min(1, targetVolume));
    const steps = 20;
    const stepDurationMs = (durationSeconds * 1000) / steps;
    let currentStep = 0;

    this.rampInterval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const interpolated = startVolume + (endVolume - startVolume) * progress;
      this.setVolume(interpolated);

      if (currentStep >= steps) {
        clearInterval(this.rampInterval);
        this.rampInterval = null;
        this.setVolume(endVolume);
      }
    }, stepDurationMs);
  }

  public mute() {
    this.isMuted = true;
    this.setVolume(0);
  }

  public unmute() {
    this.isMuted = false;
    this.setVolume(this.currentVolume || 0.5);
  }

  public onStateChange(listener: (state: "playing" | "paused" | "buffering" | "ended") => void) {
    this.stateChangeListeners.push(listener);
    return () => {
      this.stateChangeListeners = this.stateChangeListeners.filter((l) => l !== listener);
    };
  }

  private notifyState(state: "playing" | "paused" | "buffering" | "ended") {
    this.stateChangeListeners.forEach((l) => l(state));
  }
}

export const SoundCloudPlayerAdapter = new SoundCloudPlayerAdapterImpl();
