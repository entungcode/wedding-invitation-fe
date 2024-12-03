import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
const CountdownTimer = ({ weddingDate }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +weddingDate - +new Date();
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [weddingDate]);
    return (_jsx("div", { className: "flex flex-col items-center space-y-4", children: _jsxs("div", { className: "flex space-x-4 md:space-x-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "flex flex-col items-center", children: [_jsx("span", { className: "text-3xl md:text-4xl font-serif text-white", children: timeLeft.days }), _jsx("span", { className: "text-sm text-gray-400", children: "Hari" })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "flex flex-col items-center", children: [_jsx("span", { className: "text-3xl md:text-4xl font-serif text-white", children: timeLeft.hours }), _jsx("span", { className: "text-sm text-gray-400", children: "Jam" })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, className: "flex flex-col items-center", children: [_jsx("span", { className: "text-3xl md:text-4xl font-serif text-white", children: timeLeft.minutes }), _jsx("span", { className: "text-sm text-gray-400", children: "Menit" })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4 }, className: "flex flex-col items-center", children: [_jsx("span", { className: "text-3xl md:text-4xl font-serif text-white", children: timeLeft.seconds }), _jsx("span", { className: "text-sm text-gray-400", children: "Detik" })] })] }) }));
};
export default CountdownTimer;
