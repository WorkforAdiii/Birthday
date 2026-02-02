import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircleFilled, PauseCircleFilled, SoundOutlined } from '@ant-design/icons';

const MusicPlayer = ({ position = 'bottom-left' }) => {
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (playing) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setPlaying(!playing);
    };

    const positionStyle = position === 'top-left'
        ? { top: 30, left: 30, bottom: 'auto' }
        : { bottom: 30, left: 30, top: 'auto' };

    return (
        <div style={{ position: 'fixed', zIndex: 1000, display: 'flex', alignItems: 'center', gap: '15px', ...positionStyle }}>
            <audio ref={audioRef} loop>
                <source src="/music.mp3" type="audio/mp3" />
            </audio>

            {/* Vinyl Record */}
            <motion.div
                animate={{ rotate: playing ? 360 : 0 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                onClick={togglePlay}
                style={{
                    width: 60, height: 60,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #333 30%, #111 100%)',
                    border: '2px solid #333',
                    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                    position: 'relative',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
            >
                {/* Vinyl Label */}
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#D4145A', border: '2px solid #FFF' }} />

                {/* Play/Pause Icon Overlay */}
                <div style={{ position: 'absolute', color: 'rgba(255,255,255,0.8)', fontSize: '1.2rem' }}>
                    {playing ? <PauseCircleFilled /> : <PlayCircleFilled />}
                </div>
            </motion.div>

            {/* Music Notes Animation */}
            <AnimatePresence>
                {playing && (
                    <div style={{ position: 'absolute', top: -20, left: 20, pointerEvents: 'none' }}>
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 0, x: 0 }}
                                animate={{ opacity: [0, 1, 0], y: -50 - Math.random() * 30, x: Math.random() * 30 - 15 }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5, ease: 'easeOut' }}
                                style={{ position: 'absolute', fontSize: '1.5rem', color: '#E0B0FF' }}
                            >
                                🎵
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', fontFamily: 'Patrick Hand' }}>Birthday Beats</span>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)' }}>{playing ? 'Playing...' : 'Paused'}</span>
            </div>
        </div>
    );
};

export default MusicPlayer;
