import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const API_URL = 'http://localhost:3001';
const Wishes = () => {
    const [wishes, setWishes] = useState([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
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
            }
            else {
                throw new Error(result.message);
            }
        }
        catch (error) {
            console.error('Error fetching wishes:', error);
            setError('Gagal memuat ucapan. Silakan coba lagi nanti.');
        }
        finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchWishes();
    }, []);
    const handleSubmit = async (e) => {
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
            }
            else {
                throw new Error(result.message);
            }
        }
        catch (error) {
            console.error('Error adding wish:', error);
            setError('Gagal mengirim ucapan. Silakan coba lagi.');
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (_jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs(motion.div, { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, className: "glass-effect rounded-2xl p-8 elegant-shadow mb-8", children: [_jsx("h2", { className: "text-3xl font-serif text-center text-white mb-8", children: "Ucapan & Doa" }), error && (_jsx("div", { className: "bg-red-500/10 border border-red-500/50 text-red-300 px-4 py-2 rounded-lg mb-6", children: error })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "block text-gray-300 mb-2 font-medium", children: "Nama" }), _jsx("input", { type: "text", id: "name", value: name, onChange: (e) => setName(e.target.value), className: "w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-white focus:border-transparent transition-colors", required: true, minLength: 3 })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "message", className: "block text-gray-300 mb-2 font-medium", children: "Ucapan & Doa" }), _jsx("textarea", { id: "message", value: message, onChange: (e) => setMessage(e.target.value), className: "w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-white focus:border-transparent transition-colors", rows: 4, required: true, minLength: 10, placeholder: "Tulis ucapan dan doa Anda di sini..." })] }), _jsx(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, type: "submit", disabled: isSubmitting, className: "w-full bg-white text-black py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50", children: isSubmitting ? 'Mengirim...' : 'Kirim Ucapan' })] })] }), _jsx("div", { className: "space-y-4", children: isLoading ? (_jsx("div", { className: "text-center text-gray-400", children: "Memuat ucapan..." })) : wishes.length === 0 ? (_jsx("div", { className: "text-center text-gray-400", children: "Belum ada ucapan" })) : (_jsxs(_Fragment, { children: [_jsx(AnimatePresence, { children: wishes.map((wish) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, className: "glass-effect rounded-xl p-6 elegant-shadow", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsx("h3", { className: "text-white font-medium", children: wish.name }), _jsx("span", { className: "text-sm text-gray-400", children: new Date(wish.created_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                }) })] }), _jsx("p", { className: "text-gray-300", children: wish.message })] }, wish.id))) }), pagination.totalPages > 1 && (_jsx("div", { className: "flex justify-center space-x-2 mt-8", children: Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (_jsx(motion.button, { whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, onClick: () => fetchWishes(page), className: `w-10 h-10 rounded-full ${pagination.page === page
                                    ? 'bg-white text-black'
                                    : 'bg-gray-900 text-white hover:bg-gray-800'}`, children: page }, page))) }))] })) }), _jsx(AnimatePresence, { children: showSuccess && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 20 }, className: "fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-white text-black py-2 px-6 rounded-full shadow-lg", children: "\u2728 Terima kasih atas ucapan dan doanya!" })) })] }));
};
export default Wishes;
