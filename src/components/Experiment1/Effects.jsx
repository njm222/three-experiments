import React, {
  memo, useRef, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import { useFrame, useThree, extend } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';

extend({ EffectComposer, RenderPass, GlitchPass });

const Effects = ({ active }) => {
  const {
    gl, camera, size, scene,
  } = useThree();
  const composer = useRef();

  const [localActive, setLocalActive] = useState(false);

  useEffect(() => {
    composer.current.setSize(size.width, size.height);
  }, [size]);

  useEffect(() => {
    setLocalActive(true);

    setTimeout(() => {
      setLocalActive(false);
    }, 150);
  }, [active]);

  useFrame(() => {
    if (!localActive) { return; }

    gl.autoClear = false;
    composer.current.render();
    gl.clearDepth();
  });

  return (
    <>
      <effectComposer ref={composer} args={[gl]}>
        <renderPass attachArray="passes" args={[scene, camera]} />
        <glitchPass attachArray="passes" args={[size]} goWild={localActive} />
      </effectComposer>
    </>
  );
};

Effects.propTypes = {
  active: PropTypes.bool.isRequired,
};

export default memo(Effects);
