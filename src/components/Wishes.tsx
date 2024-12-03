import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Wish {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const API_URL = 'http://localhost:3001';

const Wishes: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  const fetchWishes = async (page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/wishes?page=${page}&limit=${pagination.limit}`);
      const result = await response.json();
      
      if (result.status === 'success') {
        setWishes(result.data);
        setPagination(result.pagination);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error fetching wishes:', error);
      setError('Gagal memuat ucapan. Silakan coba lagi nanti.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (name.trim().length < 3) {
      setError('Nama harus minimal 3 karakter');
      return;
    }

    if (message.trim().length < 10) {
      setError('Ucapan harus minimal 10 karakter');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/wishes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });

      const result = await response.json();
      if (result.status === 'success') {
        setName('');
        setMessage('');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        fetchWishes(1); // Refresh and go back to first page
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error adding wish:', error);
      setError('Gagal mengirim ucapan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Form Ucapan */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="glass-effect rounded-2xl p-8 elegant-shadow mb-8"
      >
        <h2 className="text-3xl font-serif text-center text-white mb-8">
          Ucapan & Doa
        </h2>
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-300 px-4 py-2 rounded-lg mb-6">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">
              Nama
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-white focus:border-transparent transition-colors"
              required
              minLength={3}
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-300 mb-2 font-medium">
              Ucapan & Doa
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-white focus:border-transparent transition-colors"
              rows={4}
              required
              minLength={10}
              placeholder="Tulis ucapan dan doa Anda di sini..."
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50"
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
          </motion.button>
        </form>
      </motion.div>

      {/* Daftar Ucapan */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center text-gray-400">
            Memuat ucapan...
          </div>
        ) : wishes.length === 0 ? (
          <div className="text-center text-gray-400">
            Belum ada ucapan
          </div>
        ) : (
          <>
            <AnimatePresence>
              {wishes.map((wish) => (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="glass-effect rounded-xl p-6 elegant-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-medium">{wish.name}</h3>
                    <span className="text-sm text-gray-400">
                      {new Date(wish.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <p className="text-gray-300">{wish.message}</p>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center space-x-2 mt-8">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => fetchWishes(page)}
                    className={`w-10 h-10 rounded-full ${
                      pagination.page === page
                        ? 'bg-white text-black'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {page}
                  </motion.button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-white text-black py-2 px-6 rounded-full shadow-lg"
          >
            ✨ Terima kasih atas ucapan dan doanya!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Wishes; 