'use client';

import React, { useEffect, useState } from 'react';
import animationData from './json/hero.json';

const ClientLottie = () => {
  const [Lottie, setLottie] = useState<any>(null);

  useEffect(() => {
    // dynamically import lottie-react only on client
    import('lottie-react').then((mod) => {
      setLottie(() => mod.default);
    });
  }, []);

  if (!Lottie) {
    return null; // or a loader
  }

  return (
    <Lottie 
      animationData={animationData} 
      loop={true} 
      speed={0.5} // 👈 slows down the animation (default is 1)
    />
  );
};

export default ClientLottie;
