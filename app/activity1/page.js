"use client";
import Image from 'next/image';
import Link from 'next/link'; // Import the Link component
import styles from './page.module.css';
import "/public/styles/activity1.css"; // Your custom styles

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function WellnessLandingPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Recenter Your Mind, Energize Your Body</h1>
      <p className={styles.subtitle}>
        Choose From Calming Mental Activities Or Invigorating Physical Workouts To Uplift Your Mood
        And Improve Your Overall Well-Being.
      </p>

      <div className={styles.cards}>
        {/* Relax And Recharge Card */}
        <div className={styles.card}>
          <Link href="/activity2" className={styles.link}> {/* Add a custom class */}
            <div className={styles.cardImage}>
              <Image
                src="/images/relax.jpg"
                alt="Relax And Recharge"
                width={400}
                height={400}
              />
            </div>
            <h2>Relax And Recharge</h2>
          </Link>
        </div>

        {/* Move And Energize Card */}
        <div className={styles.card}>
          <Link href="/activity3" className={styles.link}> {/* Add a custom class */}
            <div className={styles.cardImage}>
              <Image
                src="/images/move.jpg"
                alt="Move And Energize"
                width={400}
                height={400}
              />
            </div>
            <h2>Move And Energize</h2>
          </Link>
        </div>
      </div>
    </main>
  );
}
