"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { useMemo, useRef, Suspense } from "react";
import { Vector2, type Group } from "three";

function Kebab() {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.7;
  });

  // Doner cone profile (radius, height) from bottom to top
  const profile = useMemo(
    () =>
      [
        [0.04, -2.05],
        [0.55, -1.85],
        [0.82, -1.3],
        [0.96, -0.6],
        [1.0, 0.0],
        [0.92, 0.7],
        [0.72, 1.35],
        [0.42, 1.8],
        [0.06, 2.05],
      ].map(([r, y]) => new Vector2(r, y)),
    []
  );

  return (
    <group ref={group}>
      {/* Meat cone */}
      <mesh castShadow>
        <latheGeometry args={[profile, 64]} />
        <meshStandardMaterial color="#9a5a2a" roughness={0.72} metalness={0.05} />
      </mesh>

      {/* Subtle roasted layers */}
      {[-1.5, -0.9, -0.2, 0.5, 1.1, 1.6].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <torusGeometry args={[Math.max(0.2, 0.95 - Math.abs(y) * 0.32), 0.05, 8, 48]} />
          <meshStandardMaterial color="#6e3c17" roughness={0.85} />
        </mesh>
      ))}

      {/* Charred top */}
      <mesh position={[0, 1.9, 0]}>
        <coneGeometry args={[0.42, 0.5, 32]} />
        <meshStandardMaterial color="#5e3414" roughness={0.9} />
      </mesh>

      {/* Metal skewer */}
      <mesh>
        <cylinderGeometry args={[0.07, 0.07, 5.4, 24]} />
        <meshStandardMaterial color="#c9ccd1" metalness={1} roughness={0.25} />
      </mesh>

      {/* Skewer top knob */}
      <mesh position={[0, 2.7, 0]}>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshStandardMaterial color="#dfe2e6" metalness={1} roughness={0.2} />
      </mesh>

      {/* Base plate */}
      <mesh position={[0, -2.35, 0]}>
        <cylinderGeometry args={[0.75, 0.85, 0.18, 32]} />
        <meshStandardMaterial color="#b9bcc1" metalness={0.95} roughness={0.3} />
      </mesh>
    </group>
  );
}

export default function KebabSpit3D() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.3, 7.5], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 6, 5]} intensity={1.6} color="#fff1d6" />
        <directionalLight position={[-5, 2, -2]} intensity={0.7} color="#ab8442" />
        <pointLight position={[0, -1, 4]} intensity={0.6} color="#ffba6b" />
        <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.5}>
          <Kebab />
        </Float>
        <Environment preset="apartment" />
      </Suspense>
    </Canvas>
  );
}
