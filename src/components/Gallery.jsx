import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Typography } from 'antd';
import Lightbox from './Lightbox';

const { Title } = Typography;

const photos = [
    { id: 1, src: 'https://picsum.photos/300/400?random=1', caption: 'The "Llama accident" of 2019', rotate: 5 },
    { id: 2, src: 'https://picsum.photos/300/300?random=2', caption: 'Whatever this hairstyle was', rotate: -3 },
    { id: 3, src: 'https://picsum.photos/400/300?random=3', caption: '3 AM karaoke session', rotate: 2 },
    { id: 4, src: 'https://picsum.photos/300/500?random=4', caption: 'Top secret mission', rotate: -5 },
    { id: 5, src: 'https://picsum.photos/300/350?random=5', caption: 'Just vibes', rotate: 4 },
    { id: 6, src: 'https://picsum.photos/400/400?random=6', caption: 'Best day ever', rotate: -2 },
    { id: 7, src: 'https://picsum.photos/350/450?random=7', caption: 'Random adventures', rotate: 3 },
    { id: 8, src: 'https://picsum.photos/320/380?random=8', caption: 'Smiling faces', rotate: -4 },
];

const Gallery = () => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const containerRef = useRef(null);

    // Horizontal Scroll
    const { scrollXProgress } = useScroll({ container: containerRef });
    const scaleX = useSpring(scrollXProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    return (
        <section style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div style={{ textAlign: 'center', padding: '20px', zIndex: 10 }}>
                <Title level={2} style={{ color: '#fff', fontFamily: 'Playfair Display', textShadow: '0 0 10px #FFD700', margin: 0 }}>
                    Memories on a String 📸
                </Title>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Patrick Hand', fontSize: '1.2rem' }}>
                    Scroll sideways to travel back in time...
                </p>
            </div>

            {/* Scrollable Container */}
            <div
                ref={containerRef}
                style={{
                    flex: 1,
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    whiteSpace: 'nowrap',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: '50px 50px',
                    padding: '0 50px',
                    gap: '50px',
                    scrollbarWidth: 'none', // Hide scrollbar Firefox
                    msOverflowStyle: 'none', // Hide scrollbar IE/Edge
                }}
                className="hide-scrollbar"
            >
                {/* SVG String Line */}
                <svg style={{ position: 'absolute', top: '40%', left: 0, width: '200%', height: 100, pointerEvents: 'none', zIndex: 0 }}>
                    <path d="M0,10 Q500,80 1000,10 T2000,10" stroke="rgba(255,255,255,0.6)" strokeWidth="3" fill="none" />
                    <path d="M2000,10 Q2500,80 3000,10 T4000,10" stroke="rgba(255,255,255,0.6)" strokeWidth="3" fill="none" />
                </svg>

                {photos.map((photo, index) => (
                    <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, type: "spring", stiffness: 50 }}
                        style={{ display: 'inline-block', position: 'relative', zIndex: 1 }}
                    >
                        {/* Clip/Peg */}
                        <div style={{
                            width: 10, height: 30, background: '#D4145A', margin: '0 auto',
                            position: 'relative', top: 10, zIndex: 2, borderRadius: 2
                        }} />

                        {/* Photo Frame */}
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 0, zIndex: 100 }}
                            animate={{ rotate: photo.rotate }}
                            style={{
                                background: '#fff',
                                padding: '15px 15px 50px 15px', // Polaroid style padding
                                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                                borderRadius: '2px',
                                cursor: 'pointer',
                                transformOrigin: 'top center',
                                width: 300
                            }}
                            onClick={() => setSelectedPhoto(photo)}
                        >
                            <img
                                src={photo.src}
                                alt="memory"
                                style={{ width: '100%', height: 350, objectFit: 'cover', filter: 'sepia(0.2)' }}
                            />
                            <div style={{
                                fontFamily: 'Patrick Hand',
                                fontSize: '1.5rem',
                                color: '#333',
                                textAlign: 'center',
                                marginTop: '15px',
                                transform: `rotate(${Math.random() * 4 - 2}deg)`
                            }}>
                                {photo.caption}
                            </div>
                        </motion.div>
                    </motion.div>
                ))}

                {/* Padding at end */}
                <div style={{ minWidth: 100 }} />
            </div>

            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>

            <Lightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
        </section>
    );
};

export default Gallery;
