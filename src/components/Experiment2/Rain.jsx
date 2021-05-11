import React, {
  useRef, memo,
} from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
// eslint-disable-next-line import/no-unresolved
import { useBox } from '@react-three/cannon';

const rainSize = 0.1;

function Rain({ numParticles }) {
  const [ref, api] = useBox(() => ({
    mass: 0.1,
    args: [rainSize, rainSize, rainSize],
    position: [Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5],
  }));

  useFrame(() => {
    api.at(Math.floor(Math.random() * numParticles))
      .position.set((Math.random() * 2) - 1, Math.random() * 4, 0);
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
