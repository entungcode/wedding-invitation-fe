import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DigitalGiftProps {
  onCopy: (text: string) => void;
}

const DigitalGift: React.FC<DigitalGiftProps> = ({ onCopy }) => {
  const [showDetail, setShowDetail] = useState(false);

  const giftAccounts = [
    {
      bank: "BCA",
      logo: "/images/bca-logo.png",
      number: "1234567890",
      name: "Andi Saputra"
    },
    {
      bank: "Mandiri",
      logo: "/images/mandiri-logo.png",
      number: "0987654321",
      name: "Budi Santoso"
    },
    {
      bank: "DANA",
      logo: "/images/dana-logo.png",
      number: "081234567890",
      name: "Andi Saputra"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="max-w-md mx-auto glass-effect rounded-2xl p-8 elegant-shadow mb-16"
    >
      <h2 className="text-3xl font-serif text-center text-white mb-4">
        Kado Digital
      </h2>

      {!showDetail ? (
        // Tampilan Awal
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-center space-y-6">
            <img 
              src="/images/gift-icon.png" 
              alt="Gift" 
              className="w-24 h-24 mx-auto opacity-80"
            />
            <p className="text-gray-400 leading-relaxed">
              Doa restu Anda merupakan karunia yang sangat berarti bagi kami. 
              Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDetail(true)}
              className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-medium"
            >
              Kirim Kado Digital
            </motion.button>
          </div>
        </motion.div>
      ) : (
        // Tampilan Detail
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDetail(false)}
              className="text-gray-400 hover:text-white flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              <span>Kembali</span>
            </motion.button>
          </div>

          {giftAccounts.map((account, index) => (
            <motion.div
              key={account.bank}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2">
                    <img 
                      src={account.logo}
                      alt={account.bank}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-white font-medium">Bank {account.bank}</p>
                    <p className="text-gray-400 text-sm">a.n. {account.name}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3">
                <p className="text-gray-300 font-mono text-lg">{account.number}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onCopy(account.number)}
                  className="px-4 py-1.5 bg-white text-black text-sm rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Salin
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default DigitalGift; 