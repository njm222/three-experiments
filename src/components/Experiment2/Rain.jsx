import React, {
  useRef, memo,
} from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';

const rainSize = 0.1;

function Rain({ numParticles }) {
  const [ref, api] = useBox(() => ({
    mass: 0.1,
    args: [rainSize, rainSize, rainSize],
    position: [
      (Math.random() * 12) - 12,
      (Math.random() * 4) + 30,
      (Math.random() * 4) - 2,
    ],
  }));

  useFrame(() => {
    api.at(Math.floor(Math.random() * numParticles))
      .position.set(
        (Math.random() * 12) - 12,
        (Math.random() * 4) + 30,
        (Math.random() * 4) - 2,
      );
  });

  return (
    <instancedMesh receiveShadow castShadow ref={ref} args={[null, null, numParticles]}>
      <boxBufferGeometry attach="geometry" args={[rainSize, rainSize, rainSize]}>
        <meshLambertMaterial color="red" />
      </boxBufferGeometry>
      <meshLambertMaterial attach="material" vertexColors={THREE.VertexColors} />
    </instancedMesh>
  );
}

Rain.propTypes = {
  numParticles: PropTypes.number.isRequired,
};

export default memo(Rain);
