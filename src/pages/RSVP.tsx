import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RSVP: React.FC = () => {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, attendance, message });
  };

  return (
    <div className="py-16 bg-pink-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif text-center text-gray-800 mb-8">
          RSVP
        </h2>
        <motion.form
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-md mx-auto space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Nama
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border"
              required
            />
          </div>
          <div>
            <label htmlFor="attendance" className="block text-gray-700 mb-2">
              Kehadiran
            </label>
            <select
              id="attendance"
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border"
              required
            >
              <option value="">Pilih</option>
              <option value="hadir">Akan Hadir</option>
              <option value="tidak_hadir">Tidak Dapat Hadir</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 mb-2">
              Ucapan
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Kirim
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default RSVP;