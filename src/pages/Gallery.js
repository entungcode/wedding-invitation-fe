import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
const Gallery = () => {
    const images = [
        '/public/image1.jpg',
        '/image2.jpg',
        '/image3.jpg',
    ];
    return (_jsxs("div", { className: "py-16 bg-white", children: [_jsx("h2", { className: "text-3xl font-serif text-center text-gray-800 mb-8", children: "Galeri Foto" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 px-4", children: images.map((image, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { delay: index * 0.2 }, className: "aspect-square overflow-hidden rounded-lg", children: _jsx("img", { src: image, alt: `Gallery ${index + 1}`, className: "w-full h-full object-cover" }) }, index))) })] }));
};
export default Gallery;
