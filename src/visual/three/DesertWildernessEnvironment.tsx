import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useSettingsStore } from "../../state/settingsStore";
import * as THREE from "three";

interface DesertWildernessProps {
  mood?: "golden-day" | "sinai-smoke" | "exhaustion-dusk";
}

export const DesertWildernessEnvironment: React.FC<DesertWildernessProps> = ({
  mood = "golden-day",
}) => {
  const reducedMotion = useSettingsStore((s) => s.reducedMotion);
  const dustRef = useRef<THREE.Points>(null);

  const particleCount = reducedMotion ? 80 : 400;
  const positions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = Math.random() * 6 - 1;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return pos;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (reducedMotion || !dustRef.current) return;
    const pos = dustRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < particleCount; i++) {
      const idxX = i * 3;
      const idxY = i * 3 + 1;
      pos[idxX] += delta * 0.4;
      pos[idxY] += Math.sin(state.clock.getElapsedTime() + i) * 0.003;
      if (pos[idxX] > 7) pos[idxX] = -7;
    }
    dustRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const isSinai = mood === "sinai-smoke";
  const isDusk = mood === "exhaustion-dusk";

  const ambientColor = isSinai ? "#301d1d" : isDusk ? "#26191b" : "#2a2218";
  const lightColor = isSinai ? "#d9532f" : isDusk ? "#c97e5e" : "#d8aa6d";
  const dustColor = isSinai ? "#8c4436" : "#c49e74";

  return (
    <group>
      <ambientLight intensity={0.4} color={ambientColor} />
      <directionalLight position={[4, 6, 3]} intensity={0.9} color={lightColor} />

      {/* Ground plane */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[24, 24]} />
        <meshStandardMaterial
          color={isSinai ? "#181416" : isDusk ? "#1f1816" : "#241e17"}
          roughness={0.95}
        />
      </mesh>

      {/* Drifting sand / dust / smoke particles */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color={dustColor}
          transparent
          opacity={0.65}
        />
      </points>

      <fog attach="fog" args={[isSinai ? "#120d0f" : "#0c0d10", 3, 16]} />
    </group>
  );
};
