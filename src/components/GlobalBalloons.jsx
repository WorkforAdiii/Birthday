import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Empowering "Chaii" Messages
const messages = [
    "Chaii Queen 👑",
    "Chaii Strong 💪",
    "Chaii Independent 🦋",
    "Chaii Beautiful ✨",
    "Chaii Intelligent 🧠",
    "Chaii Magical 🧚‍♀️",
    "Chaii Fearless 🦁",
    "Chaii Radiant ☀️",
    "Chaii Loved 💖",
    "Chaii Iconic 💅"
];

const getRandomMessage = () => messages[Math.floor(Math.random() * messages.length)];

// Sound Effect Utility
const playPopSound = () => {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
        console.error("Audio playback error:", e);
    }
};

const HeartBalloon = ({ color, initialDelay, x, size, onPop }) => {
    const [isPopped, setIsPopped] = useState(false);
    const [message, setMessage] = useState("");

    const handlePop = () => {
        if (!isPopped) {
            playPopSound();
            setIsPopped(true);
            setMessage(getRandomMessage());
            setTimeout(() => {
                onPop();
            }, 1000);
        }
    };

    return (
        <AnimatePresence>
            {!isPopped ? (
                <motion.div
                    key="balloon"
                    onClick={handlePop}
                    initial={{
                        y: '110vh',
                        x: x,
                        opacity: 0
                    }}
                    animate={{
                        y: [
                            '110vh', // Start bottom
                            '-20vh'  // End top (off screen)
                        ],
                        x: [
                            0,
                            Math.random() * 50 - 25, // Gentle sway
                            Math.random() * 50 - 25,
                            0
                        ],
                        opacity: [0, 1, 1, 1, 0]
                    }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    transition={{
                        y: {
                            duration: 15 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "linear"
                        },
                        x: {
                            duration: 5,
                            repeat: Infinity,
                            repeatType: "mirror",
                            ease: "easeInOut"
                        },
                        opacity: {
                            duration: 15 + Math.random() * 10,
                            repeat: Infinity,
                            times: [0, 0.1, 0.9, 1]
                        }
                    }}
                    style={{
                        position: 'fixed', // Fixed to viewport
                        bottom: -100,
                        left: x,
                        zIndex: 1,
                        cursor: 'pointer'
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {/* SVG Heart Balloon */}
                    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="rgba(255,255,255,0.5)" strokeWidth="1">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        {/* String */}
                        <path d="M12 22 L12 30" stroke="rgba(255,255,255,0.6)" strokeWidth="1" fill="none" />
                    </svg>
                </motion.div>
            ) : (
                <motion.div
                    key="message"
                    initial={{ scale: 0.5, opacity: 0, y: 0 }}
                    animate={{ scale: 1.2, opacity: 1, y: -50 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        position: 'fixed', // Fixed to viewport
                        left: x,
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: '#D4145A',
                        fontSize: '1.8rem',
                        fontWeight: 'bold',
                        fontFamily: "'Patrick Hand', cursive",
                        zIndex: 10,
                        pointerEvents: 'none',
                        whiteSpace: 'nowrap',
                        textShadow: '0 0 10px rgba(255,255,255,0.9)'
                    }}
                >
                    {message}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const BalloonWrapper = ({ id, ...props }) => {
    const [key, setKey] = useState(0);
    const handlePop = () => {
        setKey(prev => prev + 1);
    };
    return <HeartBalloon key={`${id}-${key}`} {...props} onPop={handlePop} />;
}

const GlobalBalloons = () => {
    const balloonConfig = [
        { color: "#FF6B6B", x: "10%", size: 90, delay: 0 },
        { color: "#FF9EAA", x: "25%", size: 110, delay: 1 },
        { color: "#D4A5A5", x: "40%", size: 80, delay: 2 },
        { color: "#FFD700", x: "60%", size: 100, delay: 0.5 },
        { color: "#9370DB", x: "80%", size: 95, delay: 1.5 },
        { color: "#FF69B4", x: "90%", size: 85, delay: 2.5 },
        { color: "#FFB7B2", x: "15%", size: 70, delay: 4 },
        { color: "#E0BBE4", x: "70%", size: 105, delay: 3.5 },
    ];

    return (
        <>
            {balloonConfig.map((b, i) => (
                <BalloonWrapper
                    key={i}
                    id={i}
                    color={b.color}
                    initialDelay={b.delay}
                    x={b.x}
                    size={b.size}
                />
            ))}
        </>
    );
};

export default GlobalBalloons;
