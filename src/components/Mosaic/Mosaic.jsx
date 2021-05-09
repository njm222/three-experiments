import React from 'react';
import styles from './Mosaic.module.css';
import MosaicBlock from './MosaicBlock';
import Experiment1 from '../Experiment1/Experiment1';
import Experiment2 from '../Experiment2/Experiment2';
// TODO: Dynamic import these components? not necessary because all components are needed.

const experiments = [
  { experiment: Experiment1, key: 'MosaicBlock-1' },
  { experiment: Experiment2, key: 'MosaicBlock-2' },
];

function Mosaic() {
  return (
    <div className={styles.container}>
      {experiments.map(({ experiment, key }) => (
        <MosaicBlock key={key} Experiment={experiment} />
      ))}
    </div>
  );
}

export default Mosaic;
