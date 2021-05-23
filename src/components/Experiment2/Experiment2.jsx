import React, {
  Suspense, useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { Canvas, useThree } from '@react-three/fiber';
import { Loader, Stage } from '@react-three/drei';
// eslint-disable-next-line import/no-unresolved
import { Physics } from '@react-three/cannon';
import Rain from './Rain';
import Plane from './Plane';
import Umbrella from './Umbrella';

function Scene({ isPlaying, active, setActive }) {
  const set = useThree((state) => state.set);

  useEffect(() => {
    set({ frameloop: isPlaying ? 'always' : 'demand' });
  }, [isPlaying]);

  return (
    <Stage preset="soft">
      <Physics>
        <Rain numParticles={256} />
        <Umbrella />
        <Plane rotation={[-Math.PI / 2, 0, 0]} />
      </Physics>
    </Stage>
  );
}

Scene.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
};

// /////////////////////////////////////////////////////////////////////////////

function Experiment2(props) {
  const { isPlaying } = props;
  const [active, setActive] = useState(false);

  return (
    <>
      <Canvas
        frameloop={isPlaying ? 'always' : 'demand'}
      >
        <Suspense fallback={null}>
          <Scene
            isPlaying={isPlaying}
            active={active}
            setActive={setActive}
          />
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
