import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography, Button } from 'antd';
import { HeartFilled } from '@ant-design/icons';

const { Title } = Typography;

// Multilingual Greetings
const languages = [
    { text: "Happy Birthday Chaii 💕", lang: "English" },
    { text: "ಹುಟ್ಟು ಹಬ್ಬದ ಶುಭಾಶಯಗಳು Chaii 💕", lang: "Kannada" },
    { text: "जन्मदिन की शुभकामनाएँ Chaii 💕", lang: "Hindi" },
    { text: "பிறந்தநாள் வாழ்த்துக்கள் Chaii 💕", lang: "Tamil" },
    { text: "పుట్టినరోజు శుభాకాంక్షలు Chaii 💕", lang: "Telugu" },
    { text: "ജന്മദിനാശംസകൾ Chaii 💕", lang: "Malayalam" },
    { text: "শুভ জন্মদিন Chaii 💕", lang: "Bengali" },
    { text: "ਜਨਮਦਿਨ ਮੁਬਾਰਕ Chaii 💕", lang: "Punjabi" },
    { text: "જનમ દિવસ મુબારક Chaii 💕", lang: "Gujarati" },
    { text: "वाढदिवसाच्या हार्दिक शुभेच्छा Chaii 💕", lang: "Marathi" },
    { text: "سالگرہ مبارک Chaii 💕", lang: "Urdu" }
];

const Hero = ({ name = "Chaii 💕", onMakeWish }) => {
    const [langIndex, setLangIndex] = useState(0);

    // Cycle languages
    useEffect(() => {
        const interval = setInterval(() => {
            setLangIndex(prev => (prev + 1) % languages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Slashing effect variants
    const slashVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: [0, 1, 0],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1
            }
        }
    };

    return (
        <section style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            // Celestial Blue Background
            background: 'radial-gradient(circle at center, #2b32b2 0%, #1488cc 100%)',
        }}>

            {/* Celestial Sparkles */}
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={i}
                    style={{
                        position: 'absolute',
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: Math.random() * 4 + 1,
                        height: Math.random() * 4 + 1,
                        background: 'white',
                        borderRadius: '50%',
                        boxShadow: '0 0 10px #fff, 0 0 20px #E0FFFF', // Cyan/Silver glow
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 1, 0.2],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 2
                    }}
                />
            ))}

            {/* Rotating Halo / Light Effects */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '120vh',
                    height: '120vh',
                    borderRadius: '50%',
                    background: 'conic-gradient(from 0deg, rgba(255,255,255,0.1), rgba(0,255,255,0.1), rgba(255,255,255,0.1))', // Cyan/White tint
                    filter: 'blur(80px)',
                    zIndex: 0,
                    opacity: 0.3
                }}
            />

            {/* Main Content Card - Celestial Glass */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{
                    zIndex: 5,
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.05)', // Transparent for dark bg
                    backdropFilter: 'blur(20px)',
                    padding: '4rem 6rem',
                    borderRadius: '50% 50% 30px 30px',
                    boxShadow: '0 0 50px rgba(0, 255, 255, 0.2), 0 10px 30px rgba(0,0,0,0.3)', // Cyan Halo
                    border: '1px solid rgba(255,255,255,0.2)',
                    position: 'relative',
                    maxWidth: '800px'
                }}
            >
                {/* Decorative Crown/Halo Icon */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ position: 'absolute', top: -40, left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '50%', boxShadow: '0 0 30px #00FFFF', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                    <HeartFilled style={{ fontSize: '2.5rem', color: '#00FFFF' }} />
                </motion.div>

                <h2 style={{ fontFamily: 'Patrick Hand', color: 'rgba(255,255,255,0.8)', marginBottom: '1rem', fontSize: '1.5rem', letterSpacing: '2px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    IT'S YOUR SPECIAL DAY
                </h2>

                {/* Main Heading */}
                <h1 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: window.innerWidth < 768 ? '3rem' : '5rem', // Responsive Font Size
                    margin: 0,
                    marginBottom: '1rem',
                    color: '#fff',
                    textShadow: '0 0 20px rgba(0,255,255,0.5), 0 0 10px rgba(255,255,255,0.8)'
                }}>
                    Happy Birthday
                </h1>

                {/* Name */}
                <motion.h1
                    animate={{ textShadow: ["0 0 10px #fff", "0 0 20px #00FFFF", "0 0 10px #fff"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 700,
                        fontSize: window.innerWidth < 768 ? '3.5rem' : '6rem', // Responsive Font Size
                        margin: 0,
                        lineHeight: 0.8,
                        background: 'linear-gradient(45deg, #fff, #00FFFF)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                    {name.split(' ')[0]}
                </motion.h1>

                {/* Multilingual Message */}
                <div style={{ height: '60px', marginTop: '3rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={langIndex}
                            initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                            style={{
                                fontFamily: "'Noto Serif', serif",
                                fontSize: '1.8rem',
                                color: 'rgba(255,255,255,0.9)',
                                fontStyle: 'italic',
                                textShadow: '0 2px 5px rgba(0,0,0,0.5)'
                            }}
                        >
                            {languages[langIndex].text}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* CTA / Decoration */}
                <div style={{ marginTop: '3rem' }}>
                    <Button
                        type="primary"
                        shape="round"
                        size="large"
                        onClick={onMakeWish}
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid #00FFFF',
                            color: 'white',
                            height: '60px',
                            padding: '0 50px',
                            fontSize: '1.3rem',
                            fontFamily: 'Patrick Hand',
                            boxShadow: '0 0 20px rgba(0, 255, 255, 0.2)',
                            backdropFilter: 'blur(5px)'
                        }}
                        className="celestial-button"
                    >
                        Make a Wish ✨
                    </Button>
                    <style>{`
                        .celestial-button:hover {
                            background: rgba(0, 255, 255, 0.2) !important;
                            box-shadow: 0 0 40px #00FFFF !important;
                            border-color: #fff !important;
                            transform: translateY(-5px);
                        }
                    `}</style>
                </div>
            </motion.div>
        </section>
    );
}

export default Hero;
