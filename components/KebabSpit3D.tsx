"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, ContactShadows } from "@react-three/drei";
import { useMemo, useRef, Suspense } from "react";
import {
  Vector2,
  Color,
  ACESFilmicToneMapping,
  type Group,
} from "three";

/* ---- Doner cone silhouette (radius along height) ---- */
const CONTROL: [number, number][] = [
  [-2.1, 0.04],
  [-1.95, 0.46],
  [-1.7, 0.73],
  [-1.3, 0.92],
  [-0.8, 1.02],
  [-0.2, 1.07],
  [0.4, 1.0],
  [1.0, 0.82],
  [1.5, 0.52],
  [1.85, 0.26],
  [2.1, 0.04],
];

function radiusAt(y: number) {
  for (let i = 0; i < CONTROL.length - 1; i++) {
    const [y0, r0] = CONTROL[i];
    const [y1, r1] = CONTROL[i + 1];
    if (y >= y0 && y <= y1) {
      const t = (y - y0) / (y1 - y0);
      // smootherstep for an organic transition
      const s = t * t * (3 - 2 * t);
      return r0 + (r1 - r0) * s;
    }
  }
  return 0.04;
}

function Kebab() {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.45;
  });

  // Smooth meat body
  const profile = useMemo(
    () => CONTROL.map(([y, r]) => new Vector2(r, y)),
    []
  );

  // Stacked shaved-meat layers that give the real doner texture
  const layers = useMemo(() => {
    const cChar = new Color("#311c0c");
    const cGrill = new Color("#7c3c15");
    const cMeat = new Color("#b56a31");
    const cFat = new Color("#caa26a");

    const N = 58;
    const out: {
      y: number;
      radius: number;
      tube: number;
      color: string;
      rot: number;
    }[] = [];

    for (let i = 0; i < N; i++) {
      const t = i / (N - 1);
      const y = -1.98 + t * 3.95;
      const base = radiusAt(y);
      if (base < 0.08) continue;

      // organic jitter so layers are not perfectly regular
      const jitter = 1 + (Math.sin(i * 12.9898) * 43758.5453) % 1 * 0.05;
      const radius = Math.max(0.05, base * jitter - 0.02);

      // colour: charred near the top, grilled body, occasional fat/meat streaks
      const charF = Math.pow(Math.max(0, (y - 0.6) / 1.5), 1.4);
      const rnd = (Math.sin(i * 78.233) * 43758.5453) % 1;
      const col = cGrill.clone();
      col.lerp(cMeat, Math.abs(rnd) * 0.45);
      if (Math.abs(rnd) > 0.82) col.lerp(cFat, 0.5); // shiny fat seam
      col.lerp(cChar, Math.min(0.85, charF));

      out.push({
        y,
        radius,
        tube: 0.028 + Math.abs(rnd) * 0.03,
        color: `#${col.getHexString()}`,
        rot: i * 1.37,
      });
    }
    return out;
  }, []);

  return (
    <group ref={group}>
      {/* Meat body — physical material with a greasy clearcoat sheen */}
      <mesh castShadow receiveShadow>
        <latheGeometry args={[profile, 256]} />
        <meshPhysicalMaterial
          color="#894a22"
          roughness={0.62}
          metalness={0}
          clearcoat={0.45}
          clearcoatRoughness={0.55}
          sheen={0.4}
          sheenColor="#c98a4a"
        />
      </mesh>

      {/* Shaved-meat layers hugging the surface */}
      {layers.map((l, i) => (
        <mesh key={i} position={[0, l.y, 0]} rotation={[0, l.rot, 0]} castShadow>
          <torusGeometry args={[l.radius, l.tube, 10, 96]} />
          <meshPhysicalMaterial
            color={l.color}
            roughness={0.66}
            metalness={0.02}
            clearcoat={0.35}
            clearcoatRoughness={0.6}
          />
        </mesh>
      ))}

      {/* Charred, crisp tip */}
      <mesh position={[0, 1.96, 0]} castShadow>
        <coneGeometry args={[0.36, 0.55, 48]} />
        <meshStandardMaterial color="#2c1809" roughness={0.95} metalness={0} />
      </mesh>

      {/* Polished steel skewer */}
      <mesh castShadow>
        <cylinderGeometry args={[0.062, 0.062, 5.5, 48]} />
        <meshStandardMaterial
          color="#dfe3e8"
          metalness={1}
          roughness={0.14}
          envMapIntensity={1.4}
        />
      </mesh>

      {/* Skewer crown */}
      <mesh position={[0, 2.78, 0]} castShadow>
        <sphereGeometry args={[0.13, 48, 48]} />
        <meshStandardMaterial
          color="#eef1f4"
          metalness={1}
          roughness={0.1}
          envMapIntensity={1.6}
        />
      </mesh>

      {/* Brushed-steel base plate */}
      <mesh position={[0, -2.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.78, 0.9, 0.2, 64]} />
        <meshStandardMaterial
          color="#b7bbc1"
          metalness={0.95}
          roughness={0.34}
          envMapIntensity={1.2}
        />
      </mesh>
      <mesh position={[0, -2.27, 0]}>
        <torusGeometry args={[0.78, 0.03, 16, 64]} />
        <meshStandardMaterial color="#cfd3d8" metalness={1} roughness={0.2} />
      </mesh>
    </group>
  );
}

export default function KebabSpit3D() {
  return (
    <Canvas
      shadows
      dpr={[1, 2.5]}
      camera={{ position: [0, 0.4, 7.6], fov: 36 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.toneMapping = ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.15;
      }}
    >
      <Suspense fallback={null}>
        {/* Cinematic three-point lighting */}
        <hemisphereLight args={["#fff3da", "#3a2c18", 0.5]} />
        <ambientLight intensity={0.25} />
        <directionalLight
          position={[5, 7, 5]}
          intensity={2.1}
          color="#fff0d2"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0002}
        />
        <directionalLight
          position={[-6, 3, -3]}
          intensity={0.9}
          color="#a87f3f"
        />
        {/* Warm rim / heat glow from the grill */}
        <pointLight position={[2.2, -0.5, 3.2]} intensity={1.1} color="#ff9d45" />
        <spotLight
          position={[-3, 5, 4]}
          angle={0.5}
          penumbra={0.8}
          intensity={1.2}
          color="#fff6e6"
        />

        <Float speed={1.0} rotationIntensity={0.12} floatIntensity={0.45}>
          <Kebab />
        </Float>

        <ContactShadows
          position={[0, -2.55, 0]}
          opacity={0.45}
          scale={9}
          blur={2.6}
          far={4}
          color="#2a1c0c"
        />

        <Environment preset="warehouse" environmentIntensity={0.9} />
      </Suspense>
    </Canvas>
  );
}
