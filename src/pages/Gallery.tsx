import React from 'react';
import { motion } from 'framer-motion';

const Gallery: React.FC = () => {
  const images = [
    '/public/image1.jpg',
    '/image2.jpg',
    '/image3.jpg',
  ];

  return (
    <div className="py-16 bg-white">
      <h2 className="text-3xl font-serif text-center text-gray-800 mb-8">
        Galeri Foto
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="aspect-square overflow-hidden rounded-lg"
          >
            <img
              src={image}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;