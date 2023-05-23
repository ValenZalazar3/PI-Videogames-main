import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/Landing.module.css';

export default function LandingPage() {
  return (
    <div className={styles.landingContainer}>
      <div className={styles.btnX}>
        <Link to="/home">
          <button className={styles.playButton}>START</button>
        </Link>
      </div>
      <div className={styles.btnPress}>
        <button className={styles.pressButton}>Press START to continue...</button>
      </div>
    </div>
  );
}
