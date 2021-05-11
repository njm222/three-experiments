import React, {
  Suspense, useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { Canvas, useThree } from '@react-three/fiber';
import { Loader, Stage } from '@react-three/drei';
import Effects from './Effects';
import Cube from './Cube';

function Scene({ isPlaying, active, setActive }) {
  const set = useThree((state) => state.set);

  useEffect(() => {
    set({ frameloop: isPlaying ? 'always' : 'demand' });
  }, [isPlaying]);

  return (
    <Stage contactShadow={false} preset="soft">
      <Cube active={active} setActive={setActive} />
    </Stage>
  );
}

Scene.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
};

// /////////////////////////////////////////////////////////////////////////////

function Experiment1(props) {
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
