import React, {
  Suspense, useRef, useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Loader, Stage } from '@react-three/drei';

function Box({ isPlaying }) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const set = useThree((state) => state.set);
  useEffect(() => {
    set({ frameloop: isPlaying ? 'always' : 'demand' });
  }, [isPlaying]);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    // eslint-disable-next-line no-multi-assign
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });
  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      scale={active ? 1.5 : 1}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <torusBufferGeometry args={[3, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

Box.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
};

function Experiment2(props) {
  const { isPlaying } = props;

  return (
    <>
      <Canvas
        frameloop={isPlaying ? 'always' : 'demand'}
      >
        <Suspense fallback={null}>
          <Stage preset="soft">
            <Box isPlaying={isPlaying} />
          </Stage>
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}

Experiment2.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
};

export default Experiment2;
