import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ParallaxBackground = ({ children }) => {
    const ref = useRef(null);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth out mouse movements
    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Transform mapping - Move opposite to mouse for depth
    const moveX = useTransform(springX, [0, windowSize.width], [20, -20]);
    const moveY = useTransform(springY, [0, windowSize.height], [20, -20]);

    // Deeper layer moves less
    const deepMoveX = useTransform(springX, [0, windowSize.width], [10, -10]);
    const deepMoveY = useTransform(springY, [0, windowSize.height], [10, -10]);

    const handleMouseMove = (e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                zIndex: 0
            }}
        >
            {/* Deep Background Layer (Stars/Gradient) - Celestial Blue */}
            <motion.div style={{
                position: 'absolute', width: '110%', height: '110%', top: '-5%', left: '-5%',
                background: 'radial-gradient(circle at center, #2b32b2 0%, #1488cc 100%)',
                x: deepMoveX, y: deepMoveY,
                zIndex: 0
            }} />

            {/* Stars Layer - Content Static Now */}
            <div style={{ zIndex: 1, position: 'absolute', width: '100%', height: '100%' }}>
                {/* Magical Floating Particles */}
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 0.8, 0],
                            scale: [0, 1.5, 0]
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "linear"
                        }}
                        style={{
                            position: 'absolute',
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: Math.random() * 4 + 1,
                            height: Math.random() * 4 + 1,
                            background: '#FFF',
                            borderRadius: '50%',
                            boxShadow: '0 0 10px #FFF, 0 0 20px #FFD700',
                            filter: 'blur(1px)'
                        }}
                    />
                ))}
                {children}
            </div>
        </div>
    );
};

export default ParallaxBackground;
