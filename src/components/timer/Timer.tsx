"use client";

import { TimerProps } from '@/types';
import React, { useEffect, useState } from 'react';


// Компонент таймера
const Timer: React.FC<TimerProps> = ({ initialSeconds, onTimeUp }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      onTimeUp();
    }
  }, [seconds, onTimeUp]);

  return (
    <div>
      <p>Time left: {seconds}s</p>
    </div>
  );
};

export default Timer;
