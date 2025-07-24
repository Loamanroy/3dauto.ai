import React, { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"

type EngineModelProps = {
  highlightPart?: string
}

function Model({ highlightPart }: EngineModelProps) {
  const gltf = useGLTF("/models/sparkplug.glb")

  return (
    <group>
      {Object.entries(gltf.nodes).map(([name, node]: any) => {
        if (!node.geometry) return null

        const isHighlighted = name.toLowerCase() === highlightPart?.toLowerCase()

        return (
          <mesh
            key={name}
            geometry={node.geometry}
            material={gltf.materials[node.material?.name] || undefined}
            material-color={isHighlighted ? "#ff6b6b" : "#888888"}
            castShadow
            receiveShadow
          />
        )
      })}
    </group>
  )
}

export default function EngineModel({ highlightPart }: EngineModelProps) {
  return (
    <div className="h-[400px] w-full rounded-xl border bg-muted">
      <Canvas shadows camera={{ position: [0, 2, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model highlightPart={highlightPart} />
        </Suspense>
        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>
    </div>
  )
}

// Не забудь: npm install three @react-three/fiber @react-three/drei
// И помести sparkplug.glb в public/models/