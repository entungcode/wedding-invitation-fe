import React from 'react';
import { motion } from 'framer-motion';

interface CoverProps {
  onOpenInvitation: () => void;
}

const Cover: React.FC<CoverProps> = ({ onOpenInvitation }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      <div className="text-center p-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 mb-4"
        >
          The Wedding Of
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="text-5xl md:text-7xl font-serif text-white mb-12"
        >
          Triyono & Mine
        </motion.h1>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenInvitation}
          className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors"
        >
          Buka Undangan
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Cover; 