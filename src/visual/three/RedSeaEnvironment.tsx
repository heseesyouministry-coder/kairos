import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useSettingsStore } from "../../state/settingsStore";
import * as THREE from "three";

interface RedSeaEnvironmentProps {
  intensity?: number; // 0 to 1
  isReleased?: boolean;
}

export const RedSeaEnvironment: React.FC<RedSeaEnvironmentProps> = ({
  intensity = 0.5,
  isReleased = false,
}) => {
  const reducedMotion = useSettingsStore((s) => s.reducedMotion);
  const leftWallRef = useRef<THREE.Mesh>(null);
  const rightWallRef = useRef<THREE.Mesh>(null);
  const sprayRef = useRef<THREE.Points>(null);

  // Generate water spray particles
  const particleCount = reducedMotion ? 100 : 800;
  const positions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12; // x
      pos[i * 3 + 1] = Math.random() * 8 - 2; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14; // z
    }
    return pos;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (reducedMotion) return;

    const time = state.clock.getElapsedTime();
    const speed = isReleased ? 0.05 : 0.8 + intensity * 2.2;

    if (leftWallRef.current && rightWallRef.current) {
      // Water walls undulate rhythmically
      leftWallRef.current.position.y = Math.sin(time * speed * 0.7) * (isReleased ? 0.05 : 0.4 * intensity);
      rightWallRef.current.position.y = Math.cos(time * speed * 0.7) * (isReleased ? 0.05 : 0.4 * intensity);

      // Sway walls inward when panic increases
      const inwardX = isReleased ? 4.5 : 4.5 - intensity * 0.8;
      leftWallRef.current.position.x = -inwardX;
      rightWallRef.current.position.x = inwardX;
    }

    if (sprayRef.current) {
      const pos = sprayRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3 + 1;
        if (isReleased) {
          // Gently settle down
          pos[idx] -= delta * 0.4;
          if (pos[idx] < -2) pos[idx] = 6;
        } else {
          // Turbulent rise
          pos[idx] += delta * (0.8 + intensity * 3.5);
          if (pos[idx] > 7) pos[idx] = -2;
        }
      }
      sprayRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const waterColor = isReleased ? "#1b4d6b" : "#0f2233";
  const lightIntensity = isReleased ? 0.8 : 0.2 + intensity * 0.4;

  return (
    <group>
      <ambientLight intensity={lightIntensity} />
      <directionalLight
        position={[0, 8, 2]}
        intensity={isReleased ? 1.4 : 0.5 + intensity * 0.8}
        color={isReleased ? "#b8d9ea" : "#7aa3be"}
      />

      {/* Left towering divided water wall */}
      <mesh ref={leftWallRef} position={[-4.5, 1, 0]} rotation={[0, 0.2, 0]}>
        <boxGeometry args={[1.5, 9, 16]} />
        <meshStandardMaterial
          color={waterColor}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={isReleased ? 0.75 : 0.9}
        />
      </mesh>

      {/* Right towering divided water wall */}
      <mesh ref={rightWallRef} position={[4.5, 1, 0]} rotation={[0, -0.2, 0]}>
        <boxGeometry args={[1.5, 9, 16]} />
        <meshStandardMaterial
          color={waterColor}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={isReleased ? 0.75 : 0.9}
        />
      </mesh>

      {/* Seabed floor */}
      <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16, 20]} />
        <meshStandardMaterial color="#1a1815" roughness={0.9} />
      </mesh>

      {/* Water spray and suspended droplets */}
      <points ref={sprayRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isReleased ? 0.04 : 0.08}
          color={isReleased ? "#aed8f2" : "#77aacc"}
          transparent
          opacity={isReleased ? 0.4 : 0.85}
        />
      </points>

      {/* Distant horizon fog */}
      <fog attach="fog" args={[isReleased ? "#0e1822" : "#080c10", 3, 16]} />
    </group>
  );
};
