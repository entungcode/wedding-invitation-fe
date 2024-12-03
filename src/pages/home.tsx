import React, { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import MusicPlayer from '../components/MusicPlayer';
import CountdownTimer from '../components/CountdownTimer';
import Cover from '../components/Cover';
import Wishes from '../components/Wishes';
import DigitalGift from '../components/DigitalGift';

const Home: React.FC = () => {
  const [showCover, setShowCover] = useState(true);
  const controls = useAnimation();
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  const locations = {
    bride: {
      name: "Kediaman Mempelai Wanita",
      address: "Jl. Melati No. 123, Jakarta Selatan",
      mapsUrl: "https://maps.google.com/?q=-6.2088,106.8456"
    },
    groom: {
      name: "Kediaman Mempelai Pria",
      address: "Jl. Mawar No. 456, Jakarta Timur",
      mapsUrl: "https://maps.google.com/?q=-6.2008,106.8456"
    },
    venue: {
      name: "Gedung Pernikahan Bahagia",
      address: "Jl. Cinta Sejati No. 123, Jakarta",
      mapsUrl: "https://maps.google.com/?q=-6.1751,106.8272"
    }
  };

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  const openMaps = (url: string) => {
    window.open(url, '_blank');
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowCopyMessage(true);
      setTimeout(() => setShowCopyMessage(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Gallery images array
  const galleryImages = [
    '/images/gallery-1.jpg',
    '/images/gallery-2.jpg',
    '/images/gallery-3.jpg'
  ];

  const weddingDates = {
    akad: new Date('2025-01-01T08:00:00'),
    resepsi: new Date('2025-01-01T11:00:00')
  };

  const dateOptions: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };

  const handleOpenInvitation = () => {
    setShowCover(false);
    // Mulai mainkan musik saat undangan dibuka
    const audioElement = document.querySelector('audio');
    if (audioElement) {
      audioElement.play();
    }
  };

  return (
    <>
      <AnimatePresence>
        {showCover && (
          <Cover onOpenInvitation={handleOpenInvitation} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showCover ? 0 : 1 }}
        className="relative min-h-screen bg-black text-white"
      >
        {/* Background Ornaments */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-gray-800 rounded-full mix-blend-overlay filter blur-xl opacity-50 animate-blob"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gray-700 rounded-full mix-blend-overlay filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-900 rounded-full mix-blend-overlay filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative container mx-auto px-4 py-16"
        >
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            className="text-center mb-16"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-400 mb-4"
            >
              The Wedding Of
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="text-5xl md:text-7xl font-serif text-white mb-8"
            >
              Triyono & Mine
            </motion.h1>

            {/* Date Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="mb-8"
            >
              <div className="flex flex-col items-center space-y-8">
                {/* Akad Section */}
                <div className="text-center">
                  <h3 className="text-xl text-gray-400 mb-2">Akad Nikah</h3>
                  <div className="w-16 h-0.5 bg-white mx-auto mb-4" />
                  <p className="text-2xl font-serif text-white mb-2">
                    {weddingDates.akad.toLocaleDateString('id-ID', dateOptions)}
                  </p>
                  <p className="text-lg text-gray-400 mb-2">Pukul 08:00 WIB</p>
                  <div className="text-gray-400">
                    <p className="font-medium">Kediaman Mempelai Wanita</p>
                    <p>Jl. Melati No. 123, Jakarta Selatan</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-0.5 bg-white" />
                  <div className="w-3 h-3 bg-white rounded-full" />
                  <div className="w-16 h-0.5 bg-white" />
                </div>

                {/* Resepsi Section */}
                <div className="text-center">
                  <h3 className="text-xl text-gray-400 mb-2">Resepsi</h3>
                  <div className="w-16 h-0.5 bg-white mx-auto mb-4" />
                  <p className="text-2xl font-serif text-white mb-2">
                    {weddingDates.resepsi.toLocaleDateString('id-ID', dateOptions)}
                  </p>
                  <p className="text-lg text-gray-400 mb-2">Pukul 11:00 WIB</p>
                  <div className="text-gray-400">
                    <p className="font-medium">Kediaman Mempelai Pria</p>
                    <p>Jl. Mawar No. 456, Jakarta Timur</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Countdown Timer - update untuk menghitung ke acara akad */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-8"
            >
              <p className="text-gray-400 mb-4">Menghitung Hari Menuju Akad Nikah</p>
              <CountdownTimer weddingDate={weddingDates.akad} />
            </motion.div>
          </motion.div>

          {/* Locations Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ delay: 1.8 }}
            className="grid md:grid-cols-2 gap-6 mb-16"
          >
            {/* Bride's Location */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-effect rounded-2xl p-6 elegant-shadow cursor-pointer"
              onClick={() => openMaps(locations.bride.mapsUrl)}
            >
              <h3 className="text-2xl font-serif text-white mb-2">Mempelai Wanita</h3>
              <div className="space-y-2">
                <p className="font-medium text-gray-300">{locations.bride.name}</p>
                <p className="text-gray-400">{locations.bride.address}</p>
                <div className="flex items-center text-white hover:text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Buka di Google Maps</span>
                </div>
              </div>
            </motion.div>

            {/* Groom's Location - sama seperti Bride's tapi untuk mempelai pria */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-effect rounded-2xl p-6 elegant-shadow cursor-pointer"
              onClick={() => openMaps(locations.groom.mapsUrl)}
            >
              <h3 className="text-2xl font-serif text-white mb-2">Mempelai Pria</h3>
              <div className="space-y-2">
                <p className="font-medium text-gray-300">{locations.groom.name}</p>
                <p className="text-gray-400">{locations.groom.address}</p>
                <div className="flex items-center text-white hover:text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Buka di Google Maps</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Venue Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            transition={{ delay: 1.5 }}
            className="text-center mb-16 glass-effect rounded-2xl p-8 elegant-shadow"
          >
            <h2 className="text-3xl font-serif text-white mb-6">Save the Date</h2>
            <p className="text-2xl font-serif text-gray-300 mb-4">
              Sabtu, 1 Januari 2025
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-300">Akad Nikah: 08:00 WIB</p>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-300">Resepsi: 11:00 WIB</p>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => openMaps(locations.venue.mapsUrl)}
                className="flex flex-col items-center space-y-2 mt-4 cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-300">
                    {locations.venue.name}<br />
                    {locations.venue.address}
                  </p>
                </div>
                <span className="text-sm text-white hover:text-gray-300">
                  Buka di Google Maps
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Our Story Section - NEW */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-serif text-center text-white mb-12">
              Our Love Story
            </h2>
            <div className="space-y-12">
              {/* First Meeting */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <div className="w-full md:w-1/2">
                  <div className="aspect-square rounded-2xl overflow-hidden elegant-shadow">
                    <img
                      src="/images/gallery-1.jpg"
                      alt="First Meeting"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <h3 className="text-2xl font-serif text-white mb-4">Awal Pertemuan</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Pertemuan pertama kami terjadi di sebuah acara pernikahan teman. 
                    Siapa sangka, pertemuan singkat itu menjadi awal dari kisah cinta kami. 
                    Obrolan ringan tentang hobi dan passion yang sama membuat kami semakin dekat.
                  </p>
                </div>
              </motion.div>

              {/* Dating */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row-reverse items-center gap-8"
              >
                <div className="w-full md:w-1/2">
                  <div className="aspect-square rounded-2xl overflow-hidden elegant-shadow">
                    <img
                      src="/images/gallery-2.jpg"
                      alt="Dating"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 text-center md:text-right">
                  <h3 className="text-2xl font-serif text-white mb-4">Masa Pendekatan</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Setelah beberapa kali bertemu, kami mulai menjalin hubungan yang lebih dekat. 
                    Berbagi cerita, tawa, dan bahkan air mata. Setiap moment bersama terasa 
                    istimewa dan membuat kami semakin yakin bahwa kami ditakdirkan bersama.
                  </p>
                </div>
              </motion.div>

              {/* Engagement */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <div className="w-full md:w-1/2">
                  <div className="aspect-square rounded-2xl overflow-hidden elegant-shadow">
                    <img
                      src="/images/gallery-3.jpg"
                      alt="Engagement"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <h3 className="text-2xl font-serif text-white mb-4">Lamaran</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Di suatu sore yang indah, dengan persiapan yang matang dan restu dari 
                    kedua keluarga, kami memutuskan untuk melangkah ke jenjang yang lebih serius. 
                    Moment lamaran yang sederhana namun penuh makna menjadi awal dari 
                    komitmen kami untuk mengarungi hidup bersama.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Gallery Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-serif text-center text-white mb-8">
              Our Moments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="group relative aspect-square overflow-hidden rounded-2xl elegant-shadow"
                >
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 grayscale hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Ganti bagian Digital Gift Section dengan komponen baru */}
          <DigitalGift onCopy={handleCopy} />

          {/* Ganti RSVP Section dengan Wishes Section */}
          <Wishes />
        </motion.div>
      </motion.div>

      {/* Music Player hanya muncul setelah cover dibuka */}
      {!showCover && <MusicPlayer audioUrl="/wedding-song.mp3" />}
    </>
  );
};

export default Home;