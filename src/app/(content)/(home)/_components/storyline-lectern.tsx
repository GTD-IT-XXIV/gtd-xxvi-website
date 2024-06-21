"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, type GroupProps, useLoader } from "@react-three/fiber";
import { Euler, MathUtils } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

function LecternModel(props: GroupProps) {
  const gltf = useLoader(GLTFLoader, "/wizard-book-stands.glb");
  return (
    <group {...props}>
      <primitive object={gltf.scene} />
    </group>
  );
}

export default function StorylineLectern({
  className = "",
}: {
  className?: string;
}) {
  return (
    <Canvas className={className} camera={{ position: [0, 0, 1.5] }}>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={-Math.PI / 6}
        maxAzimuthAngle={Math.PI / 6}
      />
      <pointLight position={[0, 2.5, 1.5]} intensity={8} />
      <ambientLight intensity={2} />
      <LecternModel
        rotation={new Euler(MathUtils.degToRad(25), 0, 0)}
        position={[0, -0.2, 0]}
      />
    </Canvas>
  );
}
