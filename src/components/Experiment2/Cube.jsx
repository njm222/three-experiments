import React, {
  useRef, memo,
} from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial } from '@react-three/drei';
import { useSpring, animated, config } from '@react-spring/three';
import { hslToHex } from '../../helpers/hslToHex';

const smCubeSize = 0.5;
const lgCubeSize = 0.8;

function Cube({ active, setActive }) {
  const mesh = useRef();

  const { scale } = useSpring({
    scale: active ? lgCubeSize : smCubeSize,
    config: config.wobbly,
  });

  useFrame(() => {
    // eslint-disable-next-line no-multi-assign
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    mesh.current.position.y = Math.abs(Math.sin(mesh.current.rotation.x));
    mesh.current.material.color = new THREE.Color(hslToHex(
      mesh.current.position.y * Math.PI * 15,
      255,
      100,
    ));
  });

  return (
    <animated.mesh
      ref={mesh}
      position={[0, 0, -2]}
      scale={scale}
      onClick={() => setActive(!active)}
    >
      <boxBufferGeometry args={[smCubeSize, smCubeSize, smCubeSize]} />
      <MeshWobbleMaterial attach="material" factor={1.5} speed={1} color="green" />
    </animated.mesh>
  );
}

Cube.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
};

export default memo(Cube);
