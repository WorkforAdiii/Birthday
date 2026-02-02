import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const MagicLetter = ({ position = 'bottom-left' }) => {
    const [isOpen, setIsOpen] = useState(false);

    const positionStyle = position === 'top-left'
        ? { top: '100px', left: '50px', bottom: 'auto' }
        : { bottom: '100px', left: '50px', top: 'auto' };

    return (
        <>
            {/* Draggable/Clickable Envelope */}
            {!isOpen && (
                <motion.div
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    style={{
                        position: 'fixed',
                        ...positionStyle,
                        width: '120px',
                        height: '80px',
                        background: '#FFB7B2',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 100,
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                    }}
                >
                    <div style={{ position: 'absolute', top: 0, left: 0, width: 0, height: 0, borderLeft: '60px solid transparent', borderRight: '60px solid transparent', borderTop: '40px solid #FF9EAA' }} />
                    <div style={{ fontSize: '2rem' }}>💌</div>
                    <div style={{ position: 'absolute', bottom: -25, fontFamily: 'Patrick Hand', color: 'white', fontSize: '1rem', width: '150px', textAlign: 'center' }}>
                        Open Me!
                    </div>
                </motion.div>
            )}

            {/* Opened Letter Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                            background: 'rgba(0,0,0,0.8)',
                            zIndex: 2000,
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0, rotateY: 90 }}
                            animate={{ scale: 1, rotateY: 0 }}
                            exit={{ scale: 0, y: 100 }}
                            transition={{ type: "spring", damping: 15 }}
                            style={{
                                width: 'min(90%, 600px)',
                                minHeight: '60vh',
                                background: '#FFF',
                                borderRadius: '10px',
                                padding: '3rem',
                                position: 'relative',
                                backgroundImage: 'repeating-linear-gradient(#FFF 0px, #FFF 24px, #00BFFF 25px)',
                                boxShadow: '0 0 50px rgba(255,255,255,0.2)',
                                overflow: 'hidden'
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            <CloseOutlined onClick={() => setIsOpen(false)} style={{ position: 'absolute', top: 20, right: 20, fontSize: '1.5rem', cursor: 'pointer' }} />

                            <h2 style={{ fontFamily: 'Playfair Display', color: '#D4145A', textAlign: 'center' }}>To My Dearest Chaii,</h2>

                            <div style={{ fontFamily: 'Indie Flower, cursive', fontSize: '1.4rem', lineHeight: '2rem', color: '#333', marginTop: '2rem' }}>
                                <p>
                                    As you celebrate another year of being amazing, I just wanted to remind you how special you are.
                                    This app is just a small reflection of the magic you bring into the world every day.
                                </p>
                                <p>
                                    May this year bring you as much joy, laughter, and love as you give to everyone around you.
                                    Keep shining, keep smiling, and never forget that you are loved beyond measure.
                                </p>
                                <p style={{ textAlign: 'right', marginTop: '3rem' }}>
                                    With all my love,<br />
                                    Your Adiiiii 💕
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default MagicLetter;
