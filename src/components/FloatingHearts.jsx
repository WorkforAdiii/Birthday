import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingHearts = () => {
    const [hearts, setHearts] = useState([]);
    const words = ["Chaii", "Bvcc", "Chick Hudugi"];

    useEffect(() => {
        const interval = setInterval(() => {
            const id = Math.random().toString(36).substr(2, 9);
            const type = Math.random() > 0.4 ? 'word' : 'heart'; // 60% words, 40% hearts
            const word = type === 'word' ? words[Math.floor(Math.random() * words.length)] : null;

            const newHeart = {
                id,
                type,
                text: word,
                left: Math.random() * 100,
                animationDuration: Math.random() * 15 + 10, // 10-25s floating
                size: type === 'heart' ? Math.random() * 30 + 10 : Math.random() * 20 + 20, // Words usually larger
                color: Math.random() > 0.5 ? '#FF69B4' : '#9370DB'
            };

            setHearts((prev) => [...prev, newHeart]);

            // Cleanup
            setTimeout(() => {
                setHearts((prev) => prev.filter((h) => h.id !== id));
            }, newHeart.animationDuration * 1000);

        }, 800); // Spawn rate

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 0,
            overflow: 'hidden'
        }}>
            <AnimatePresence>
                {hearts.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{
                            y: '110vh',
                            opacity: 0,
                            rotate: 0
                        }}
                        animate={{
                            y: '-20vh',
                            opacity: [0, 1, 1, 0],
                            rotate: item.type === 'heart' ? [0, 45, -45, 0] : 0 // Only hearts rotate
                        }}
                        transition={{
                            duration: item.animationDuration,
                            ease: 'linear'
                        }}
                        style={{
                            position: 'absolute',
                            left: `${item.left}%`,
                            fontSize: item.size, // Size is handled in px
                            color: item.color,
                            opacity: 0.8,
                            filter: 'blur(0.5px)',
                            fontFamily: item.type === 'word' ? "'Patrick Hand', cursive" : 'inherit',
                            fontWeight: item.type === 'word' ? 'bold' : 'normal',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {item.type === 'heart' ? '♥' : item.text}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default FloatingHearts;
