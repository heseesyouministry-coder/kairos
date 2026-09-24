import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { useSettingsStore } from "../../state/settingsStore";

interface EdenEnvironmentProps {
  shiftProgress?: number; // 0 (warm golden innocence) -> 1 (colder, bleached vulnerability)
}

export function EdenEnvironment({ shiftProgress = 0 }: EdenEnvironmentProps) {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const leavesRef = useRef<THREE.Points>(null);
  const reducedMotion = useSettingsStore((s) => s.reducedMotion);

  // Animate light color and intensity via GSAP when shiftProgress changes
  useEffect(() => {
    if (!lightRef.current || !ambientRef.current) return;

    // Target colors:
    // 0 = golden honey (#ffdf9e)
    // 1 = cold bleached slate (#a0b2c6)
    const targetDirColor = new THREE.Color().lerpColors(
      new THREE.Color("#ffdf9e"),
      new THREE.Color("#9eb2c7"),
      shiftProgress
    );

    const targetAmbColor = new THREE.Color().lerpColors(
      new THREE.Color("#4a5d3f"), // lush emerald ambient
      new THREE.Color("#2c343c"), // cold desolate ambient
      shiftProgress
    );

    gsap.to(lightRef.current.color, {
      r: targetDirColor.r,
      g: targetDirColor.g,
      b: targetDirColor.b,
      duration: 1.5,
      ease: "power2.out",
    });

    gsap.to(lightRef.current, {
      intensity: 1.6 - shiftProgress * 0.7,
      duration: 1.5,
      ease: "power2.out",
    });

    gsap.to(ambientRef.current.color, {
      r: targetAmbColor.r,
      g: targetAmbColor.g,
      b: targetAmbColor.b,
      duration: 1.5,
      ease: "power2.out",
    });
  }, [shiftProgress]);

  // Floating botanical spores/leaf particles
  const [positions, colors] = useMemo(() => {
    const count = 900;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const goldColor = new THREE.Color("#c99a5e");
    const leafColor = new THREE.Color("#7da367");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;

      const c = Math.random() < 0.6 ? leafColor : goldColor;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    if (leavesRef.current) {
      leavesRef.current.rotation.y += delta * 0.02;
      leavesRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
    }
  });

  return (
    <group>
      <ambientLight ref={ambientRef} intensity={0.6} color="#4a5d3f" />
      <directionalLight
        ref={lightRef}
        position={[5, 8, 4]}
        intensity={1.6}
        color="#ffdf9e"
      />

      {/* Floating botanical particles */}
      <points ref={leavesRef}>
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
          size={0.08}
          vertexColors
          transparent
          opacity={0.65}
        />
      </points>

      {/* Subtle canopy silhouette meshes */}
      <mesh position={[-4, 3, -6]} rotation={[0.2, 0.4, 0]}>
        <dodecahedronGeometry args={[2.5, 1]} />
        <meshStandardMaterial
          color="#1e2c1c"
          roughness={0.9}
          transparent
          opacity={0.4}
        />
      </mesh>
      <mesh position={[5, 2, -7]} rotation={[-0.1, -0.3, 0]}>
        <dodecahedronGeometry args={[3, 1]} />
        <meshStandardMaterial
          color="#192418"
          roughness={0.9}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}
