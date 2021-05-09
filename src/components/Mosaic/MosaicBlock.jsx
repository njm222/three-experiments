/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './MosaicBlock.module.css';

function CloseButton({ closeFullscreen }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={closeFullscreen}
      className={styles.close}
    >
      X
    </div>
  );
}

CloseButton.propTypes = {
  closeFullscreen: PropTypes.func.isRequired,
};

function MosaicBlock({ Experiment }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const previewExperiment = () => {
    setIsPlaying(true);
  };

  const endPreviewExperiment = () => {
    if (isFullscreen) { return; }

    setTimeout(() => {
      setIsPlaying(false);
    }, 100);
  };

  const openFullscreen = (e) => {
    e.stopPropagation();
    setIsPlaying(true);
    setIsFullscreen(true);
  };

  const closeFullscreen = (e) => {
    e.stopPropagation();
    setIsPlaying(false);
    setIsFullscreen(false);
  };

  return (
    <div
      onMouseOver={() => (!isFullscreen ? previewExperiment() : false)}
      onMouseLeave={() => (!isFullscreen ? endPreviewExperiment() : false)}
      onClick={(e) => (!isFullscreen ? openFullscreen(e) : false)}
      aria-hidden="true"
      className={isFullscreen ? styles.fullscreen : styles.block}
    >
      <Experiment isPlaying={isPlaying} />
      {isFullscreen ? <CloseButton closeFullscreen={closeFullscreen} /> : ''}
    </div>
  );
}

MosaicBlock.propTypes = {
  Experiment: PropTypes.func.isRequired,
};

export default MosaicBlock;
