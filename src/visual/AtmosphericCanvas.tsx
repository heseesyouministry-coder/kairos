import React, { Suspense, useEffect, useState, Component } from "react";
import { Canvas } from "@react-three/fiber";
import { useSettingsStore } from "../state/settingsStore";
import { CreationEnvironment } from "./three/CreationEnvironment";
import { EdenEnvironment } from "./three/EdenEnvironment";
import { CainAbelEnvironment } from "./three/CainAbelEnvironment";
import { MountainEnvironment } from "./three/MountainEnvironment";
import { RedSeaEnvironment } from "./three/RedSeaEnvironment";
import { DesertWildernessEnvironment } from "./three/DesertWildernessEnvironment";
import { Fallback2D } from "./Fallback2D";

interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
  onError?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("WebGL Canvas failed, falling back to 2D atmosphere:", error);
    this.props.onError?.();
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Telemetry helper to monitor FPS & Draw calls inside R3F
function PerformanceMonitor() {
  const setFps = useSettingsStore((s) => s.setFps);
  const setDrawCalls = useSettingsStore((s) => s.setDrawCalls);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrameId: number;

    const measure = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animationFrameId = requestAnimationFrame(measure);
    };

    animationFrameId = requestAnimationFrame(measure);
    setDrawCalls(6); // Typical Three scene draw count
    return () => cancelAnimationFrame(animationFrameId);
  }, [setFps, setDrawCalls]);

  return null;
}

interface AtmosphericCanvasProps {
  environmentId: string;
  edenShiftProgress?: number;
  redSeaIntensity?: number;
  redSeaReleased?: boolean;
}

export const AtmosphericCanvas: React.FC<AtmosphericCanvasProps> = ({
  environmentId,
  edenShiftProgress = 0,
  redSeaIntensity = 0.5,
  redSeaReleased = false,
}) => {
  const webglEnabled = useSettingsStore((s) => s.webglEnabled);
  const setWebglEnabled = useSettingsStore((s) => s.setWebglEnabled);
  const [hasWebGLSupport, setHasWebGLSupport] = useState<boolean>(true);

  // Check if browser supports WebGL
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGLSupport(false);
      }
    } catch {
      setHasWebGLSupport(false);
    }
  }, []);

  const shouldRender3D = webglEnabled && hasWebGLSupport;

  if (!shouldRender3D) {
    return (
      <Fallback2D
        environmentId={environmentId}
        edenShiftProgress={edenShiftProgress}
        redSeaIntensity={redSeaIntensity}
        redSeaReleased={redSeaReleased}
      />
    );
  }

  const isCreation = environmentId.includes("creation") || environmentId.includes("void");
  const isEden = environmentId.includes("eden");
  const isCainAbel = environmentId.includes("field") || environmentId.includes("cain");
  const isMountain = environmentId.includes("mountain") || environmentId.includes("ridge");
  const isRedSea = environmentId.includes("red-sea") || environmentId.includes("water");
  const isSinai = environmentId.includes("sinai");
  const isWilderness =
    environmentId.includes("wilderness") ||
    environmentId.includes("haran") ||
    environmentId.includes("jabbok") ||
    environmentId.includes("nile") ||
    environmentId.includes("horeb") ||
    environmentId.includes("egypt") ||
    environmentId.includes("babel") ||
    environmentId.includes("flood");

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      <WebGLErrorBoundary
        onError={() => setWebglEnabled(false)}
        fallback={
          <Fallback2D
            environmentId={environmentId}
            edenShiftProgress={edenShiftProgress}
            redSeaIntensity={redSeaIntensity}
            redSeaReleased={redSeaReleased}
          />
        }
      >
        <Canvas
          camera={{ position: [0, 0, 7], fov: 50 }}
          gl={{ antialias: true, alpha: true, powerPreference: "default" }}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        >
          <PerformanceMonitor />
          <Suspense fallback={null}>
            {isCreation && <CreationEnvironment stage={1} />}
            {isEden && <EdenEnvironment shiftProgress={edenShiftProgress} />}
            {isCainAbel && <CainAbelEnvironment />}
            {isMountain && <MountainEnvironment />}
            {isRedSea && (
              <RedSeaEnvironment
                intensity={redSeaIntensity}
                isReleased={redSeaReleased}
              />
            )}
            {isWilderness && !isRedSea && (
              <DesertWildernessEnvironment
                mood={isSinai ? "sinai-smoke" : "golden-day"}
              />
            )}
          </Suspense>
        </Canvas>
      </WebGLErrorBoundary>

      {/* Atmospheric depth overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-transparent to-[#0c0d10]/40 pointer-events-none" />
      <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />
    </div>
  );
};
