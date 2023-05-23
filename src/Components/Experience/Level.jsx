import * as THREE from "three";
import React, { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { Float, Text } from "@react-three/drei";

// console.log((THREE.ColorManagement.enabled = false));

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floorMaterial1 = new THREE.MeshStandardMaterial({
  color: "#111111",
  // metalness: 0,
  // roughness: 0,
});
const floorMaterial2 = new THREE.MeshStandardMaterial({
  color: "#222222",
  metalness: 1,
  roughness: 0.5,
});
const obstacleMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(5, 0, 0),
  toneMapped: false,
  // metalness: 0.5,
  // roughness: 0,
});
const wallMaterial = new THREE.MeshStandardMaterial({
  color: "#887777",
  metalness: 0.8,
  roughness: 0,
});

/**
 * starting block of game
 */
function BlockStart({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Floor */}
      <mesh
        geometry={boxGeometry}
        material={floorMaterial1}
        scale={[4, 0.2, 4]}
        position={[0, -0.1, 0]}
        receiveShadow
      />
      {/* text */}
      <Float>
        <Text fontSize={0.3} color={"white"} position={[0, 1, 0]}>
          MAKE IT ROLL!
        </Text>
      </Float>
      {/* back wall */}
      {/* <RigidBody type={"fixed"} restitution={0.2} friction={0}>
        <mesh
          geometry={boxGeometry}
          material={wallMaterial}
          position={[0, 1.05, 2.1]}
          scale={[4.4, 2.5, 0.2]}
          castShadow
        />
      </RigidBody> */}
    </group>
  );
}

/**
 * end block of game
 */
function BlockEnd({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Floor */}
      <mesh
        geometry={boxGeometry}
        material={floorMaterial1}
        scale={[4, 0.2, 4]}
        position={[0, -0.1, 0]}
        receiveShadow
      />
      <Text position={[0, 1, -1]} color={"white"} castShadow>
        WIN
      </Text>
      {/* back wall */}
      <RigidBody type={"fixed"} restitution={0.2} friction={0}>
        <mesh
          geometry={boxGeometry}
          material={wallMaterial}
          position={[0, 0.95, -2.1]}
          scale={[4.4, 2.5, 0.2]}
          castShadow
        />
      </RigidBody>
    </group>
  );
}

/**
 * spinning trap block of game
 */
export function SpinningTrapBlock({ position = [0, 0, 0] }) {
  const obstacle = useRef(null);

  const [speed] = useState(() => {
    return (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1);
  });

  useFrame((state) => {
    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(
      new THREE.Euler(0, state.clock.elapsedTime * speed, 0)
    );
    obstacle.current.setNextKinematicRotation(rotation);
  });

  return (
    <group position={position}>
      {/* spinner */}
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.2, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          receiveShadow
          castShadow
        />
      </RigidBody>
      {/* Floor */}
      <mesh
        geometry={boxGeometry}
        material={floorMaterial2}
        scale={[4, 0.2, 4]}
        position={[0, -0.1, 0]}
        receiveShadow
      />
    </group>
  );
}

/**
 * vertical trap block of game
 */
export function VerticalTrapBlock({ position = [0, 0, 0] }) {
  const obstacle = useRef(null);

  const [timeOffset] = useState(() => {
    return Math.random() * Math.PI * 2;
  });

  useFrame((state) => {
    // const rotation = new THREE.Quaternion();
    // rotation.setFromEuler(
    //   new THREE.Euler(0, state.clock.elapsedTime * speed, 0)
    // );
    obstacle.current.setNextKinematicTranslation({
      x: position[1],
      y: position[1] + Math.sin(state.clock.elapsedTime + timeOffset) + 1.2,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      {/* vertical block */}
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.2, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          receiveShadow
          castShadow
        />
      </RigidBody>
      {/* Floor */}
      <mesh
        geometry={boxGeometry}
        material={floorMaterial2}
        scale={[4, 0.2, 4]}
        position={[0, -0.1, 0]}
        receiveShadow
      />
    </group>
  );
}

/**
 * horizontal trap block of game
 */
export function HorizontalTrapBlock({ position = [0, 0, 0] }) {
  const obstacle = useRef(null);

  const [timeOffset] = useState(() => {
    return Math.random() * Math.PI * 2;
  });

  useFrame((state) => {
    // const rotation = new THREE.Quaternion();
    // rotation.setFromEuler(
    //   new THREE.Euler(0, state.clock.elapsedTime * speed, 0)
    // );
    obstacle.current.setNextKinematicTranslation({
      x: Math.sin(state.clock.elapsedTime + timeOffset) * 1.4,
      y: 1.1,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      {/* horizontal block */}
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 1, 0]}
        restitution={0.2}
        friction={0}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[1, 2, 0.3]}
          castShadow
          receiveShadow
        />
      </RigidBody>
      {/* Floor */}
      <mesh
        geometry={boxGeometry}
        material={floorMaterial2}
        scale={[4, 0.2, 4]}
        position={[0, -0.1, 0]}
        receiveShadow
      />
    </group>
  );
}

function Walls({ length }) {
  return (
    <group position={[0, 0, 0]}>
      <RigidBody type={"fixed"} restitution={0.2} friction={0}>
        {/* left wall */}

        <mesh
          geometry={boxGeometry}
          material={wallMaterial}
          position={[-2.1, 1.05, -(length * 2) + 2]}
          scale={[0.2, 2.5, length * 4]}
          receiveShadow
        />

        {/* right wall */}
        <mesh
          geometry={boxGeometry}
          material={wallMaterial}
          position={[2.1, 1.05, -(length * 2) + 2]}
          scale={[0.2, 2.5, length * 4]}
          castShadow
        />

        {/* ground colider */}
        <CuboidCollider
          args={[2, 0.1, 2 * length]}
          position={[0, -0.1, -(length * 2) + 2]}
          restitution={0.2}
          friction={1}
        />
      </RigidBody>
    </group>
  );
}

function Level({
  count = 5,
  types = [SpinningTrapBlock, VerticalTrapBlock, HorizontalTrapBlock],
  seed = 0,
}) {
  const blocks = useMemo(() => {
    const blocks = [];

    for (let i = 0; i < count; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      blocks.push(type);
    }

    return blocks;
  }, [count, types, seed]);

  return (
    <>
      <BlockStart position={[0, 0, 0]} />

      {blocks.map((Block, i) => (
        <Block key={i} position={[0, 0, -(i + 1) * 4]} />
      ))}

      <BlockEnd position={[0, 0.1, -(count + 1) * 4]} />

      <Walls length={count + 2} />
    </>
  );
}

export default Level;
