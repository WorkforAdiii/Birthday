import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Typography, Modal } from 'antd';

const { Title, Paragraph } = Typography;

const events = [
    {
        year: '2015',
        title: 'The First Hello',
        desc: 'Met at the coffee shop near campus. You spilled your latte on my shoe.',
        side: 'left'
    },
    {
        year: '2018',
        title: 'Graduation Day',
        desc: 'We made it! Hats in the air and dreams in our pockets.',
        side: 'right'
    },
    {
        year: '2021',
        title: 'The Great Road Trip',
        desc: '1000 miles, 50 songs on repeat, and one flat tire.',
        side: 'left'
    },
    {
        year: 'Today',
        title: 'Happy Birthday!',
        desc: 'Celebrating another amazing year of you.',
        side: 'right'
    }
];

const TimelineItem = ({ item, index }) => {
    const isLeft = index % 2 === 0;
    const [isHovered, setIsHovered] = useState(false);

    const handleDotClick = () => {
        Modal.info({
            title: item.title,
            content: (
                <div>
                    <p>{item.desc}</p>
                    <div style={{ width: '100%', height: 200, background: '#FFB7B2', borderRadius: 8, marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.2rem', fontFamily: 'Patrick Hand' }}>
                        [Photo of {item.year}]
                    </div>
                </div>
            ),
            icon: null,
            maskClosable: true,
            centered: true,
            okText: "Aww, cute!",
            okButtonProps: { style: { background: '#FFB7B2', borderColor: '#FFB7B2', color: 'white', borderRadius: '20px' } },
            modalRender: (modal) => (
                <div style={{ borderRadius: '24px', overflow: 'hidden' }}>
                    {modal}
                </div>
            )
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring" }}
            style={{
                display: 'flex',
                justifyContent: isLeft ? 'flex-start' : 'flex-end',
                padding: '1rem 0',
                position: 'relative',
                marginBottom: '4rem',
                width: '100%'
            }}
        >
            {/* Card */}
            <div className="glass-card" style={{
                padding: '2rem',
                width: '45%', // Narrower to fit with the curve
                position: 'relative',
                textAlign: isLeft ? 'right' : 'left',
                border: '1px solid rgba(255,215,0,0.5)',
                margin: isLeft ? '0 auto 0 5%' : '0 5% 0 auto' // Positioning relative to center
            }}>
                <Title level={3} style={{ color: '#9370DB', margin: 0, fontFamily: "'Playfair Display', serif", fontSize: '2.5rem' }}>{item.year}</Title>
                <Title level={4} style={{ color: '#2D2D2D', marginTop: '0.5rem', fontFamily: "'Playfair Display', serif" }}>{item.title}</Title>
                <Paragraph style={{ color: '#555', fontSize: '1.2rem', fontFamily: "'Patrick Hand', cursive" }}>
                    {item.desc}
                </Paragraph>

                {/* Interactive Dot - Absolute Positioned */}
                <motion.div
                    onClick={handleDotClick}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    animate={{
                        boxShadow: isHovered
                            ? ["0 0 10px #FFD700", "0 0 30px #FFD700", "0 0 10px #FFD700"]
                            : ["0 0 5px #9370DB", "0 0 10px #9370DB", "0 0 5px #9370DB"],
                        scale: isHovered ? 1.3 : 1
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: 'absolute',
                        // Place dot near the center line connection
                        top: '50%',
                        right: isLeft ? -35 : 'auto',
                        left: !isLeft ? -35 : 'auto',
                        transform: 'translateY(-50%)',
                        width: 24,
                        height: 24,
                        background: '#FFF',
                        border: '4px solid #9370DB',
                        borderRadius: '50%',
                        zIndex: 10,
                        cursor: 'pointer'
                    }} />
            </div>
        </motion.div>
    );
};

const Timeline = () => {
    return (
        <section style={{ padding: '4rem 0', position: 'relative', overflow: 'hidden' }}>

            <Title level={2} style={{ textAlign: 'center', color: '#2D2D2D', marginBottom: '6rem', fontFamily: "'Playfair Display', serif", fontSize: '4rem', fontWeight: 700 }}>
                Our Journey Planner
            </Title>

            {/* SVG Curved Path for Journey Planner */}
            <div style={{ position: 'absolute', top: 150, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}>
                <svg width="100%" height="100%" preserveAspectRatio="none">
                    {/* A simple S-curve winding down */}
                    <path
                        d="M 50% 0 Q 50% 100, 30% 200 T 50% 400 T 70% 600 T 50% 800 T 30% 1000"
                        stroke="rgba(147, 112, 219, 0.4)" // Light Violet
                        strokeWidth="4"
                        strokeDasharray="15, 10" // Dashed Line
                        fill="none"
                    />
                </svg>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                {events.map((item, index) => (
                    <TimelineItem key={index} item={item} index={index} />
                ))}
            </div>
        </section>
    );
};

export default Timeline;
