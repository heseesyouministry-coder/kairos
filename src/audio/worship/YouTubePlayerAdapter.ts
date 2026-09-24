/**
 * KAIROS / The Living Word — YouTubePlayerAdapter
 * Controls official YouTube worship recordings via privacy-enhanced embedding (youtube-nocookie.com)
 * and the YouTube IFrame API.
 * Supports programmatic play, pause, volume ramping, and seamless fallback detection.
 */

export type YouTubePlayerState = "unstarted" | "ended" | "playing" | "paused" | "buffering" | "cued";

class YouTubePlayerAdapterClass {
  private iframe: HTMLIFrameElement | null = null;
  private currentVideoId: string | null = null;
  private isReady = false;
  private isPlaying = false;
  private targetVolume = 20; // 0 to 100
  private currentVolume = 20;
  private volumeRampInterval: number | null = null;
  private onStateChangeCallback: ((state: YouTubePlayerState) => void) | null = null;
  private onErrorCallback: ((error: string) => void) | null = null;

  /**
   * Bind existing or newly mounted iframe container
   */
  public bindIframe(iframe: HTMLIFrameElement) {
    this.iframe = iframe;
    this.isReady = true;

    // Listen to postMessage from YouTube Iframe
    window.addEventListener("message", this.handleWindowMessage);
  }

  public unbind() {
    this.iframe = null;
    this.isReady = false;
    window.removeEventListener("message", this.handleWindowMessage);
  }

  private handleWindowMessage = (event: MessageEvent) => {
    try {
      if (typeof event.data !== "string") return;
      const data = JSON.parse(event.data);
      if (data.event === "onReady") {
        this.isReady = true;
        this.sendCommand("setVolume", [this.currentVolume]);
      } else if (data.event === "onStateChange") {
        const stateMap: Record<number, YouTubePlayerState> = {
          [-1]: "unstarted",
          0: "ended",
          1: "playing",
          2: "paused",
          3: "buffering",
          5: "cued",
        };
        const state = stateMap[data.info] || "unstarted";
        this.isPlaying = state === "playing";
        this.onStateChangeCallback?.(state);
      } else if (data.event === "onError") {
        this.onErrorCallback?.(`YouTube Error code: ${data.info}`);
      }
    } catch {
      // Ignore messages not matching JSON format
    }
  };

  /**
   * Load and play a worship track
   */
  public loadTrack(youtubeId: string, startAt = 0, initialVolume = 20) {
    this.currentVideoId = youtubeId;
    this.targetVolume = initialVolume;
    this.currentVolume = initialVolume;

    if (!this.iframe) return;

    const originParam =
      typeof window !== "undefined" && window.location.origin && window.location.origin !== "null"
        ? `&origin=${encodeURIComponent(window.location.origin)}`
        : "";

    const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?enablejsapi=1${originParam}&autoplay=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&start=${startAt}`;

    if (this.iframe.src !== embedUrl) {
      this.iframe.src = embedUrl;
    } else {
      this.sendCommand("seekTo", [startAt, true]);
      this.sendCommand("playVideo");
    }

    this.sendCommand("setVolume", [initialVolume]);
  }

  public play() {
    this.sendCommand("playVideo");
    this.isPlaying = true;
  }

  public pause() {
    this.sendCommand("pauseVideo");
    this.isPlaying = false;
  }

  public stop() {
    this.sendCommand("stopVideo");
    this.isPlaying = false;
  }

  /**
   * Set volume immediately (0 to 100)
   */
  public setVolume(volume: number) {
    const clamped = Math.max(0, Math.min(100, Math.round(volume)));
    this.currentVolume = clamped;
    this.targetVolume = clamped;
    this.sendCommand("setVolume", [clamped]);
  }

  /**
   * Smoothly ramp volume across duration in seconds
   */
  public rampVolume(targetVol: number, durationSec = 1.0) {
    if (this.volumeRampInterval) {
      clearInterval(this.volumeRampInterval);
      this.volumeRampInterval = null;
    }

    const startVol = this.currentVolume;
    const endVol = Math.max(0, Math.min(100, Math.round(targetVol)));
    const steps = Math.max(10, Math.round(durationSec * 25));
    const stepTime = (durationSec * 1000) / steps;
    let currentStep = 0;

    this.volumeRampInterval = window.setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const nextVol = Math.round(startVol + (endVol - startVol) * progress);
      this.currentVolume = nextVol;
      this.sendCommand("setVolume", [nextVol]);

      if (currentStep >= steps) {
        if (this.volumeRampInterval) {
          clearInterval(this.volumeRampInterval);
          this.volumeRampInterval = null;
        }
      }
    }, stepTime);
  }

  public mute() {
    this.sendCommand("mute");
  }

  public unMute() {
    this.sendCommand("unMute");
    this.sendCommand("setVolume", [this.currentVolume]);
  }

  public onStateChange(callback: (state: YouTubePlayerState) => void) {
    this.onStateChangeCallback = callback;
  }

  public onError(callback: (error: string) => void) {
    this.onErrorCallback = callback;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentVideoId(): string | null {
    return this.currentVideoId;
  }

  /**
   * Post message command to the privacy-enhanced iframe
   */
  private sendCommand(func: string, args: any[] = []) {
    if (!this.iframe || !this.iframe.contentWindow) return;
    try {
      this.iframe.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func,
          args,
        }),
        "*"
      );
    } catch (err) {
      console.warn("[YouTubePlayerAdapter] PostMessage dispatch warning:", err);
    }
  }
}

export const YouTubePlayerAdapter = new YouTubePlayerAdapterClass();
