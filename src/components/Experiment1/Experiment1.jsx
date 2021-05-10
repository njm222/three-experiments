import React, {
  Suspense, useRef, useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Loader, MeshWobbleMaterial, Stage,
} from '@react-three/drei';
import { useSpring, animated, config } from '@react-spring/three';
import * as THREE from 'three';
import { hslToHex } from '../../helpers/hslToHex';
import Effects from './Effects';

function Box({ isPlaying, active, setActive }) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const set = useThree((state) => state.set);

  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: config.wobbly,
  });

  useEffect(() => {
    set({ frameloop: isPlaying ? 'always' : 'demand' });
  }, [isPlaying]);

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
      position={[0, 0, 0]}
      scale={scale}
      onClick={(e) => setActive(!active)}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <MeshWobbleMaterial attach="material" factor={1.5} speed={1} color="green" />
    </animated.mesh>
  );
}

Box.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
};

function Experiment1(props) {
  const { isPlaying } = props;
  const [active, setActive] = useState(false);

  return (
    <>
      <Canvas
        frameloop={isPlaying ? 'always' : 'demand'}
      >
        <Suspense fallback={null}>
          <Stage contactShadow={false} preset="soft">
            <Box isPlaying={isPlaying} active={active} setActive={setActive} />
          </Stage>
        </Suspense>
        <Effects active={active} />
      </Canvas>
      <Loader />
    </>
  );
}

Experiment1.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
};

export default Experiment1;
