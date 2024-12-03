import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  weddingDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ weddingDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +weddingDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [weddingDate]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-4 md:space-x-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <span className="text-3xl md:text-4xl font-serif text-white">{timeLeft.days}</span>
          <span className="text-sm text-gray-400">Hari</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <span className="text-3xl md:text-4xl font-serif text-white">{timeLeft.hours}</span>
          <span className="text-sm text-gray-400">Jam</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <span className="text-3xl md:text-4xl font-serif text-white">{timeLeft.minutes}</span>
          <span className="text-sm text-gray-400">Menit</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <span className="text-3xl md:text-4xl font-serif text-white">{timeLeft.seconds}</span>
          <span className="text-sm text-gray-400">Detik</span>
        </motion.div>
      </div>
    </div>
  );
};

export default CountdownTimer; 