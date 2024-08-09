import * as THREE from 'three'
import { ReactNode, useRef, useState } from 'react'
import { WORLD_DURATION } from '../util/constants'
import { SpawnedElement } from '../util/types'
import { useFrame } from '@react-three/fiber'

interface SpawnerProps {
  duration?: number
  spawnInterval: number
  startPosition: THREE.Vector3
  endPosition: THREE.Vector3
  children: ReactNode
}

export const Spawner = ({
  duration = WORLD_DURATION,
  spawnInterval,
  startPosition,
  endPosition,
  children,
}: SpawnerProps) => {
  const [elements, setElements] = useState<Array<SpawnedElement>>([])
  const lastSpawnTime = useRef<number>(Date.now())

  useFrame((_, delta) => {
    if (Date.now() - lastSpawnTime.current >= spawnInterval * 1000) {
      const id = Date.now()

      lastSpawnTime.current = id

      setElements((prev) => [...prev, { id, progress: 0 }])
    }

    setElements((prev) =>
      prev
        .map((elem) => ({
          ...elem,
          progress: elem.progress + delta / duration,
        }))
        .filter((elem) => elem.progress < 1),
    )
  })

  return (
    <>
      {elements.map((elem) => {
        const position = new THREE.Vector3().lerpVectors(
          startPosition,
          endPosition,
          elem.progress,
        )

        return (
          <group key={elem.id} position={position}>
            {children}
          </group>
        )
      })}
    </>
  )
}
