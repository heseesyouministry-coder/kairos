import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSettingsStore } from "../../state/settingsStore";

export function CreationEnvironment({ stage = 0 }: { stage?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const reducedMotion = useSettingsStore((s) => s.reducedMotion);

  // Generate cosmic star dust particles
  const [positions, colors] = useMemo(() => {
    const count = 1800;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const c1 = new THREE.Color("#c99a5e"); // gold
    const c2 = new THREE.Color("#6ba4ff"); // primal oceanic blue
    const c3 = new THREE.Color("#ffffff"); // light

    for (let i = 0; i < count; i++) {
      const radius = 2 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const mixed = Math.random() < 0.4 ? c1 : Math.random() < 0.7 ? c2 : c3;
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.035;
      pointsRef.current.rotation.x += delta * 0.015;
    }
    if (coreRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2.5 + stage * 0.5} color="#ffe8cc" />

      {/* Primordial luminous core */}
      <mesh ref={coreRef} position={[0, 0, -4]}>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshBasicMaterial
          color="#ffd699"
          transparent
          opacity={0.35 + stage * 0.1}
          wireframe={false}
        />
      </mesh>

      {/* Cosmic dust particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          vertexColors
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
