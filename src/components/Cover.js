import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
const Cover = ({ onOpenInvitation }) => {
    return (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "fixed inset-0 z-50 bg-black flex items-center justify-center", children: _jsxs("div", { className: "text-center p-8", children: [_jsx(motion.p, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 }, className: "text-gray-400 mb-4", children: "The Wedding Of" }), _jsx(motion.h1, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.8 }, className: "text-5xl md:text-7xl font-serif text-white mb-12", children: "Triyono & Mine" }), _jsx(motion.button, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 1.2 }, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, onClick: onOpenInvitation, className: "px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors", children: "Buka Undangan" })] }) }));
};
export default Cover;
