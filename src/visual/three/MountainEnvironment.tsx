import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSettingsStore } from "../../state/settingsStore";

export function MountainEnvironment() {
  const mistRef = useRef<THREE.Points>(null);
  const reducedMotion = useSettingsStore((s) => s.reducedMotion);

  const [positions] = useMemo(() => {
    const count = 500;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 3;
    }
    return [pos];
  }, []);

  useFrame((_, delta) => {
    if (reducedMotion || !mistRef.current) return;
    const pos = mistRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < pos.length / 3; i++) {
      pos[i * 3] += delta * 0.45; // horizontal wind drift
      if (pos[i * 3] > 12) {
        pos[i * 3] = -12;
      }
    }
    mistRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      <ambientLight intensity={0.4} color="#607080" />
      <directionalLight position={[6, 10, 5]} intensity={0.8} color="#e0e8f0" />

      {/* High-altitude drifting mist particles */}
      <points ref={mistRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#cfdce6"
          transparent
          opacity={0.4}
        />
      </points>

      {/* Mountain limestone shelf */}
      <mesh position={[0, -5, -4]} rotation={[-Math.PI / 2.5, 0.1, -0.1]}>
        <planeGeometry args={[26, 16]} />
        <meshStandardMaterial color="#1e2229" roughness={0.85} />
      </mesh>
    </group>
  );
}
