import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSettingsStore } from "../../state/settingsStore";

export function CainAbelEnvironment() {
  const embersRef = useRef<THREE.Points>(null);
  const reducedMotion = useSettingsStore((s) => s.reducedMotion);

  // Sparse rising embers
  const [positions, speeds] = useMemo(() => {
    const count = 350; // restrained particle budget per spec
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = Math.random() * 8 - 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2;
      spd[i] = 0.2 + Math.random() * 0.4;
    }
    return [pos, spd];
  }, []);

  useFrame((_, delta) => {
    if (reducedMotion || !embersRef.current) return;
    const pos = embersRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < pos.length / 3; i++) {
      pos[i * 3 + 1] += speeds[i] * delta;
      if (pos[i * 3 + 1] > 6) {
        pos[i * 3 + 1] = -4;
      }
    }
    embersRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      <ambientLight intensity={0.18} color="#2b1a18" />
      {/* Low dusk sun at horizon */}
      <directionalLight position={[0, -1, -8]} intensity={0.7} color="#a63d28" />

      {/* Sparse embers */}
      <points ref={embersRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#d97148"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Restrained desolate terrain silhouette */}
      <mesh position={[0, -4, -6]} rotation={[-Math.PI / 2.3, 0, 0]}>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial color="#1a1210" roughness={0.95} />
      </mesh>
    </group>
  );
}
