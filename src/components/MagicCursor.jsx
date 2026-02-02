import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MagicCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Spring physics for "Amoeba" lag
    // Lower stiffness = more lag/drag
    // Higher damping = less rubber-banding
    const springConfig = { damping: 20, stiffness: 150 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    return (
        <>
            {/* Fairy Dust Sensation */}
            <motion.div
                style={{
                    x: cursorX,
                    y: cursorY,
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    zIndex: 9998,
                    pointerEvents: 'none',
                    translateX: '-50%',
                    translateY: '-50%'
                }}
            >
                {/* Main Sparkle */}
                <div style={{
                    width: 10,
                    height: 10,
                    background: '#FFD700',
                    borderRadius: '50%',
                    boxShadow: '0 0 20px 5px rgba(255, 215, 0, 0.6), 0 0 40px 10px rgba(255, 182, 193, 0.4)'
                }} />
            </motion.div>

            {/* Small Dot Pointer */}
            <motion.div
                style={{
                    x: cursorX,
                    y: cursorY,
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    zIndex: 9999,
                    pointerEvents: 'none',
                    translateX: '-50%',
                    translateY: '-50%'
                }}
            >
                <div style={{
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    background: '#FFF',
                }} />
            </motion.div>
        </>
    );
};

export default MagicCursor;
