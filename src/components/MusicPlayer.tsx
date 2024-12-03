import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MusicPlayerProps {
  audioUrl: string;
  autoplay?: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ audioUrl, autoplay = false }) => {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            await playPromise;
            setIsPlaying(true);
          }
        }
      } catch (err) {
        console.log('Autoplay prevented:', err);
        setIsPlaying(false);
      }
    };

    playAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  useEffect(() => {
    if (autoplay && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Handle jika autoplay diblokir browser
        setIsPlaying(false);
      });
    }
  }, [autoplay]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio ref={audioRef} src={audioUrl} loop />
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className={`rounded-full p-3 bg-white text-black shadow-lg ${
          isPlaying ? 'animate-pulse' : ''
        }`}
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 15.536L2.404 2.404C2.404 2.404 2.404 2.404 2.404 2.404M21.596 21.596L8.464 8.464" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        )}
      </motion.button>
    </div>
  );
};

export default MusicPlayer; 