import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
const RSVP = () => {
    const [name, setName] = useState('');
    const [attendance, setAttendance] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ name, attendance, message });
    };
    return (_jsx("div", { className: "py-16 bg-pink-50", children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsx("h2", { className: "text-3xl font-serif text-center text-gray-800 mb-8", children: "RSVP" }), _jsxs(motion.form, { initial: { opacity: 0 }, whileInView: { opacity: 1 }, className: "max-w-md mx-auto space-y-4", onSubmit: handleSubmit, children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "name", className: "block text-gray-700 mb-2", children: "Nama" }), _jsx("input", { type: "text", id: "name", value: name, onChange: (e) => setName(e.target.value), className: "w-full px-4 py-2 rounded-lg border", required: true })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "attendance", className: "block text-gray-700 mb-2", children: "Kehadiran" }), _jsxs("select", { id: "attendance", value: attendance, onChange: (e) => setAttendance(e.target.value), className: "w-full px-4 py-2 rounded-lg border", required: true, children: [_jsx("option", { value: "", children: "Pilih" }), _jsx("option", { value: "hadir", children: "Akan Hadir" }), _jsx("option", { value: "tidak_hadir", children: "Tidak Dapat Hadir" })] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "message", className: "block text-gray-700 mb-2", children: "Ucapan" }), _jsx("textarea", { id: "message", value: message, onChange: (e) => setMessage(e.target.value), className: "w-full px-4 py-2 rounded-lg border", rows: 4 })] }), _jsx("button", { type: "submit", className: "w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors", children: "Kirim" })] })] }) }));
};
export default RSVP;
