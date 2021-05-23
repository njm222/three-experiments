import React, { memo } from 'react';
// eslint-disable-next-line import/no-unresolved
import { usePlane } from '@react-three/cannon';

function Plane(props) {
  const [ref] = usePlane(() => ({ mass: 0, ...props }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[5, 5]} />
      <shadowMaterial attach="material" color="#131313" opacity={0.5} />
    </mesh>
  );
}

export default memo(Plane);
