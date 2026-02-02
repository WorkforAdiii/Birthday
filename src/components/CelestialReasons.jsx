import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from 'antd';
import { StarFilled } from '@ant-design/icons';

const { Title } = Typography;

const MemoryReel = () => {
    // Photos from public folder
    const photos = [
        { id: 1, src: '/memory1.jpg', alt: "Traditional Beauty❤️" },
        { id: 3, src: '/memory3.jpg', alt: "Us💕" },
        { id: 2, src: '/memory2.jpg', alt: "Chick Hudugi Vibes😍" },
    ];

    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px', marginTop: '20px', flexWrap: 'wrap' }}>
            {photos.map((photo, index) => (
                <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                    whileHover={{ scale: 1.1, rotate: 0, zIndex: 10 }}
                    whileTap={{ scale: 1.1, rotate: 0, zIndex: 10 }}
                    style={{
                        width: '200px',
                        height: '250px',
                        borderRadius: '15px',
                        overflow: 'hidden',
                        border: '5px solid rgba(255, 255, 255, 0.8)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                        transform: `rotate(${index % 2 === 0 ? -3 : 3}deg)`,
                        background: '#fff',
                        position: 'relative',
                        cursor: 'pointer'
                    }}
                >
                    <img
                        src={photo.src}
                        alt={photo.alt}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />

                    {/* Caption Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        whileTap={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                            padding: '20px 10px 10px',
                            color: 'white',
                            fontFamily: 'Patrick Hand',
                            fontSize: '1.2rem',
                            textAlign: 'center',
                            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                        }}
                    >
                        {photo.alt}
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
};

const reasons = [
    { id: 1, title: "Your Smile", text: "Your smile lights up the darkest rooms." },
    { id: 2, title: "Kindness", text: "You have a heart of gold that touches everyone." },
    { id: 3, title: "Laughter", text: "Your laughter is the best melody in the world." },
    { id: 4, title: "Strength", text: "You face challenges with incredible grace." },
    { id: 5, title: "Creativity", text: "Your imagination knows no bounds." },
    { id: 6, title: "Friendship", text: "You are the most loyal friend anyone could ask for." },
    { id: 7, title: "Dreams", text: "Watching you chase your dreams is inspiring." },
    { id: 8, title: "You", text: "Just being you makes the world a better place." },
    { id: 9, title: "Cuteness", text: "Your cuteness melts hearts and brings smiles to everyone around you." },
    { id: 10, title: "Perfection", text: "You are perfect in every way, exactly as you are." },
];

const CelestialReasons = () => {
    const [selectedId, setSelectedId] = useState(null);

    return (
        <section style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ marginTop: '3rem', textAlign: 'center', zIndex: 10 }}>
                <Title level={2} style={{ color: '#fff', fontFamily: 'Playfair Display', textShadow: '0 0 10px #FFD700', marginBottom: '0.5rem' }}>
                    Why You Are Special ✨
                </Title>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'Patrick Hand', fontSize: '1.2rem' }}>
                    Tap a star to reveal a secret...
                </p>
            </div>

            <MemoryReel />

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', // Responsive Grid
                gridGap: '20px',
                padding: '2rem',
                paddingBottom: '150px', // Extra padding for scrolling
                width: '100%',
                maxWidth: '1000px',
                zIndex: 10,
                marginTop: '1rem'
            }}>
                {reasons.map((reason) => (
                    <motion.div
                        key={reason.id}
                        layoutId={`card-container-${reason.id}`}
                        onClick={() => setSelectedId(reason.id)}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '20px',
                            height: '150px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 0 15px rgba(255, 215, 0, 0.2)',
                        }}
                    >
                        <motion.div layoutId={`card-content-${reason.id}`} style={{ textAlign: 'center' }}>
                            <StarFilled style={{ fontSize: '3rem', color: '#FFD700', marginBottom: '0.5rem' }} />
                            <h3 style={{ fontFamily: 'Patrick Hand', color: 'white', margin: 0 }}>#{reason.id}</h3>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                            background: 'rgba(0,0,0,0.8)', zIndex: 1000,
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                        onClick={() => setSelectedId(null)}
                    >
                        <motion.div
                            layoutId={`card-container-${selectedId}`}
                            style={{
                                width: 'min(90%, 400px)',
                                background: 'linear-gradient(135deg, #2b32b2 0%, #1488cc 100%)',
                                borderRadius: '20px',
                                padding: '3rem',
                                position: 'relative',
                                border: '2px solid #FFD700',
                                boxShadow: '0 0 50px rgba(255, 215, 0, 0.4)'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {reasons.map(r => r.id === selectedId && (
                                <motion.div key={r.id} layoutId={`card-content-${r.id}`} style={{ textAlign: 'center', color: 'white' }}>
                                    <StarFilled style={{ fontSize: '4rem', color: '#FFD700', marginBottom: '1rem' }} />
                                    <h2 style={{ fontFamily: 'Playfair Display', marginBottom: '1rem' }}>{r.title}</h2>
                                    <p style={{ fontFamily: 'Patrick Hand', fontSize: '1.5rem', lineHeight: '1.6' }}>
                                        "{r.text}"
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default CelestialReasons;
