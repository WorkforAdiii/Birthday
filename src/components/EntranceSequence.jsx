import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { message } from 'antd';
import { StarFilled } from '@ant-design/icons';
import confetti from 'canvas-confetti';

// Memoized Background to prevent re-renders
const CosmicBackground = React.memo(() => {
    const stars = Array.from({ length: 50 }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() < 0.5 ? 2 : 4,
        duration: Math.random() * 3 + 2
    }));

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: -1 }}>
            {stars.map((s, i) => (
                <motion.div
                    key={`star-${i}`}
                    animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: s.duration, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: 'absolute', top: `${s.top}%`, left: `${s.left}%`,
                        width: s.size, height: s.size, background: 'white', borderRadius: '50%', boxShadow: '0 0 5px white'
                    }}
                />
            ))}
        </div>
    );
});

// Memoized Star Component for performance
const Star = React.memo(({ s, i, isKeyStar, isHovering, onHover, onLeave, onClick }) => {
    return (
        <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: Math.random() * 2 + 1, repeat: Infinity, delay: Math.random() }}
            onMouseEnter={() => onHover(i)}
            onMouseLeave={onLeave}
            onClick={onClick}
            style={{
                position: 'absolute',
                top: `${s.top}%`,
                left: `${s.left}%`,
                fontSize: s.size,
                color: (isKeyStar && isHovering) ? '#120afbff' : 'white',
                cursor: isKeyStar ? 'pointer' : 'default',
                zIndex: isKeyStar ? 20 : 1,
                padding: '10px' // Larger hit area
            }}
        >
            <StarFilled />
        </motion.div>
    );
});

const DreamyEnvelope = () => (
    <div style={{ position: 'relative', width: 160, height: 100 }}>
        <div style={{
            position: 'absolute', bottom: 0, width: '100%', height: '100%',
            background: '#FFB7B2', borderRadius: '10px',
            boxShadow: '0 10px 30px rgba(255, 183, 178, 0.6)',
            overflow: 'hidden', zIndex: 1
        }}>
            <div style={{ position: 'absolute', width: 0, height: 0, borderLeft: '80px solid transparent', borderRight: '80px solid transparent', borderBottom: '60px solid #FF9EAA', bottom: 0, left: 0 }} />
            <div style={{ position: 'absolute', width: 0, height: 0, borderLeft: '80px solid transparent', borderRight: '80px solid transparent', borderBottom: '60px solid #FFDAC1', top: 0, left: 0, transform: 'rotate(180deg)', transformOrigin: 'center top' }} />
        </div>
        <div style={{
            position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)',
            width: 30, height: 30, background: '#FFF', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem',
            zIndex: 2, boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}>
            ❤️
        </div>
    </div>
);

const EntranceSequence = ({ onComplete }) => {
    const [stage, setStage] = useState('PASSWORD'); // PASSWORD, STARS, POSTBOX, ENVELOPE_REVEAL, LETTER_OPENING
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [hoveredStarIndex, setHoveredStarIndex] = useState(null);

    const [attempts, setAttempts] = useState(0);

    // MOUSE TRACKING
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // STARS CONFIG
    const { backgroundStars, keyStarIndex } = useMemo(() => {
        const stars = Array.from({ length: 150 }).map(() => ({
            top: Math.random() * 100,
            left: Math.random() * 100,
            size: Math.random() * 15 + 5
        }));
        // Force key star (index 0) to be in safe zone
        stars[0].top = Math.random() * 50 + 20;
        stars[0].left = Math.random() * 60 + 20;
        return { backgroundStars: stars, keyStarIndex: 0 };
    }, []);

    const handlePasswordSubmit = (e) => {
        if (e.key === 'Enter') {
            if (password === 'Chick Hudugi') setStage('STARS');
            else {
                setError(true);
                setAttempts(prev => prev + 1);
                setShowHint(true); // Auto-show hint on error
                message.error("Not our secret word! 🤫");
            }
        }
    };

    const handlePostBoxClick = () => setStage('ENVELOPE_REVEAL');

    const handleOpenEnvelope = () => {
        setStage('LETTER_OPENING');

        // Trigger Confetti
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());

        // Wait for the expansion (1.2s) then trigger complete
        setTimeout(() => onComplete(), 1400);
    };

    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{
                opacity: 1,
                backgroundColor: stage === 'LETTER_OPENING' ? 'rgba(8, 8, 21, 0)' : '#080815'
            }}
            transition={{
                duration: 1,
                backgroundColor: { duration: stage === 'LETTER_OPENING' ? 0 : 1 } // Make background change immediate for LETTER_OPENING
            }}
            style={{
                position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                zIndex: 10000, color: 'white',
                cursor: stage === 'STARS' ? 'none' : 'default',
                pointerEvents: stage === 'LETTER_OPENING' ? 'none' : 'auto'
            }}
        >
            <AnimatePresence mode="wait">

                {/* STAGE 1: Password Gate */}
                {stage === 'PASSWORD' && (
                    <motion.div
                        key="password"
                        exit={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
                        style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
                    >
                        <CosmicBackground />
                        <div style={{ zIndex: 2, textAlign: 'center', maxWidth: '80%' }}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                style={{ fontFamily: 'Patrick Hand', fontSize: '1.8rem', marginBottom: '2rem', color: '#FFB7B2', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                            >
                                "The universe has waited billions of years..."<br />
                                <span style={{ fontSize: '1.6rem', color: 'white', fontWeight: 'bold' }}>To create a masterpiece like YOU. ✨</span>
                            </motion.div>

                            <h1 style={{ fontFamily: 'Playfair Display', fontSize: '3rem', marginBottom: '2rem', textShadow: '0 0 10px #D4145A' }}>
                                The Magic Gate 🗝️
                            </h1>

                            <motion.input
                                type="password" placeholder="Whisper the secret word..."
                                value={password} onChange={(e) => { setPassword(e.target.value); setError(false); }}
                                onKeyDown={handlePasswordSubmit}
                                autoFocus
                                style={{
                                    padding: '1rem 2rem', fontSize: '1.3rem', borderRadius: '50px',
                                    border: `2px solid ${error ? 'red' : '#D4145A'}`,
                                    background: 'rgba(0,0,0,0.6)', color: 'white',
                                    outline: 'none', textAlign: 'center', width: '100%', maxWidth: '400px',
                                    boxShadow: '0 0 20px rgba(212, 20, 90, 0.5)', backdropFilter: 'blur(5px)'
                                }}
                            />

                            <div style={{ marginTop: '1.5rem', cursor: 'pointer' }} onClick={() => setShowHint(!showHint)}>
                                <span style={{ opacity: 0.7, textDecoration: 'underline' }}>Hint bekaaaaaa? Mattee ottu yen nodta kutidiya 🤣 </span>
                                {showHint && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={attempts} style={{ marginTop: '0.5rem', color: '#FFD700', fontSize: '1.2rem' }}>
                                        {[
                                            "Naan ninige itiiro first hesru..? Starts With C. 🤫",
                                            "Aiyyoo! Hint na correct agi odu firstu ..... 🤦‍♂️ ",
                                            "Innu nenpaglilwa? very bad very baddd! 😭",
                                            <span>Aithu Aithu, Nin puuta brain na jaasti use madbeda! It's: <b>"Chick Hudugi"</b> 😂</span>
                                        ][Math.min(attempts, 3)]}
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* STAGE 2: Star Reveal */}
                {stage === 'STARS' && (
                    <motion.div
                        key="stars"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: 'absolute', width: '100%', height: '100%', background: '#000' }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 0.9, y: 0 }}
                            style={{ position: 'absolute', top: '5%', width: '100%', textAlign: 'center', zIndex: 50, pointerEvents: 'none', color: '#FFF', fontFamily: 'Playfair Display', textShadow: '0 0 10px #D4145A' }}
                        >
                            <p style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>"Somewhere in this galaxy, a star was born. My lucky star, forever shining...Thats Youu..Go Find yourself among the stars Chaiii💕💕✨"</p>
                        </motion.div>

                        {/* Optimised Cursor - Dot Style */}
                        <motion.div
                            style={{
                                x: mouseX, y: mouseY,
                                position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 99,
                                translateX: '-50%', translateY: '-50%',
                                width: 25, height: 25, borderRadius: '50%',
                                background: '#FFD700', boxShadow: '0 0 15px #FFD700, 0 0 30px #FFD700', mixBlendMode: 'screen'
                            }}
                        />

                        {/* Stars with Individual Hints */}
                        {backgroundStars.map((s, i) => {
                            const isKeyStar = i === keyStarIndex;
                            const isHovered = hoveredStarIndex === i;

                            let hintText = null;
                            if (isHovered) {
                                if (isKeyStar) {
                                    hintText = "Konegu ninna neene kanhidkonda Bvcccc !! Welcome to your world chaiiii💕💕✨";
                                } else {
                                    const keyStar = backgroundStars[keyStarIndex];
                                    const dx = keyStar.left - s.left;
                                    const dy = keyStar.top - s.top;
                                    if (Math.abs(dx) > Math.abs(dy)) hintText = dx > 0 ? "Go Right ➡️" : "Go Left ⬅️";
                                    else hintText = dy > 0 ? "Go Down ⬇️" : "Go Up ⬆️";
                                }
                            }

                            return (
                                <React.Fragment key={i}>
                                    <Star
                                        s={s} i={i}
                                        isKeyStar={isKeyStar}
                                        isHovering={isHovered}
                                        onHover={setHoveredStarIndex}
                                        onLeave={() => setHoveredStarIndex(null)}
                                        onClick={() => i === keyStarIndex && setStage('POSTBOX')}
                                    />
                                    <AnimatePresence>
                                        {isHovered && hintText && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                style={{
                                                    position: 'absolute',
                                                    top: `calc(${s.top}% + 30px)`, // Position below the star
                                                    left: `${s.left}%`,
                                                    transform: 'translateX(-50%)',
                                                    pointerEvents: 'none',
                                                    zIndex: 100,
                                                    background: 'rgba(0, 0, 0, 0.8)',
                                                    padding: '4px 8px',
                                                    borderRadius: '4px',
                                                    color: isKeyStar ? '#FFD700' : 'white',
                                                    fontSize: '1rem',
                                                    whiteSpace: 'nowrap',
                                                    fontFamily: 'Patrick Hand',
                                                    border: isKeyStar ? '1px solid gold' : 'none'
                                                }}
                                            >
                                                {hintText}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </React.Fragment>
                            );
                        })}
                    </motion.div>
                )}

                {/* STAGE 3: Post Box UI */}
                {stage === 'POSTBOX' && (
                    <motion.div
                        key="postbox"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ position: 'absolute', width: '100%', height: '100%', background: '#FFD1DC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <motion.div
                            initial={{ scale: 0, y: 100 }} animate={{ scale: 1, y: 0 }}
                            whileHover={{ rotate: [0, -2, 2, 0] }}
                            onClick={handlePostBoxClick}
                            style={{
                                width: 200, height: 300, background: '#D4145A', borderRadius: '20px 20px 0 0', border: '8px solid #FFF',
                                position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 20px 50px rgba(212, 20, 90, 0.4)', cursor: 'pointer'
                            }}
                        >
                            <div style={{ width: '80%', height: 20, background: '#8B0000', borderRadius: 10, marginBottom: 20 }} />
                            <div style={{ color: 'white', fontFamily: 'Patrick Hand', fontSize: '1.5rem', textAlign: 'center', padding: '0 10px' }}>Post for<br />The Queen 👑</div>
                            <div style={{ marginTop: 20, fontSize: '3rem' }}>📮</div>
                        </motion.div>
                        <div style={{ position: 'absolute', bottom: 50, color: '#D4145A', fontFamily: 'Patrick Hand', fontSize: '1.2rem' }}>Tap the post box to collect your mail!</div>
                    </motion.div>
                )}

                {/* STAGE 4: Envelope Reveal */}
                {stage === 'ENVELOPE_REVEAL' && (
                    <motion.div
                        key="envelope-reveal"
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10001, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}
                    >
                        <motion.div
                            initial={{ scale: 0, y: 200 }}
                            animate={{ scale: 1, y: 0 }}
                            whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
                            onClick={handleOpenEnvelope}
                            style={{ cursor: 'pointer' }}
                        >
                            <DreamyEnvelope />
                            <motion.div
                                animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
                                style={{ textAlign: 'center', marginTop: 20, color: 'white', fontFamily: 'Pacifico', fontSize: '2rem', textShadow: '0 0 10px pink' }}
                            >
                                Open Me! 💌
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}

                {/* STAGE 5: Letter Opening Animation */}
                {stage === 'LETTER_OPENING' && (
                    <motion.div
                        key="letter-opening-anim"
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10002, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}
                    >
                        <motion.div
                            initial={{ scale: 1, opacity: 1 }}
                            animate={{ scale: 20, opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            style={{ width: 300, height: 200, background: '#FFB7B2', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <div style={{ fontSize: '5rem' }}>✨</div>
                        </motion.div>
                    </motion.div>
                )}

            </AnimatePresence>
        </motion.div>
    );
};

export default EntranceSequence;
