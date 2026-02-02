import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography, Input, Button, message, Modal } from 'antd';
import { SendOutlined, PushpinFilled } from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;

// Initial Wishes
const initialWishes = [
    { id: 1, text: "Happy Birthday! Wishing you all the joy in the world!", color: "#FFD700", rotation: -2 },
    { id: 2, text: "Don't forget to eat all the cake!", color: "#FF69B4", rotation: 3 },
    { id: 3, text: "Here's to another year of adventures!", color: "#87CEEB", rotation: -1 },
    { id: 4, text: "Stay awesome, bestie!", color: "#98FB98", rotation: 4 },
    { id: 5, text: "May your day be as amazing as you are.", color: "#FFA07A", rotation: -3 },
];

const WishCard = ({ wish }) => {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, -10, 0] }}
            transition={{
                scale: { duration: 0.5 },
                y: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.1, zIndex: 100, rotate: 0, boxShadow: `0 0 25px ${wish.color}` }}
            style={{
                background: `${wish.color}E6`, // Slight transparency (90%)
                backdropFilter: 'blur(5px)',
                padding: '25px',
                borderRadius: '15px', // Softer corners
                boxShadow: `0 10px 30px rgba(0,0,0,0.1), 0 0 10px ${wish.color}80`, // Glow
                width: '100%',
                minHeight: '160px',
                position: 'relative',
                transform: `rotate(${wish.rotation}deg)`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                fontFamily: 'Patrick Hand',
                fontSize: '1.3rem',
                color: '#333',
                border: '1px solid rgba(255,255,255,0.4)'
            }}
        >
            <PushpinFilled style={{
                position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                fontSize: '1.8rem', color: '#D4145A',
                filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.3))'
            }} />
            <p style={{ marginTop: '10px' }}>{wish.text}</p>
        </motion.div>
    );
};

const Wishes = () => {
    const [wishes, setWishes] = useState(initialWishes);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newWish, setNewWish] = useState("");

    const handleAddWish = () => {
        if (!newWish.trim()) return;
        const wish = {
            id: Date.now(),
            text: newWish,
            color: ["#FFD700", "#FF69B4", "#87CEEB", "#98FB98", "#FFA07A", "#E6E6FA", "#FFB6C1"][Math.floor(Math.random() * 7)],
            rotation: Math.random() * 10 - 5
        };
        setWishes([wish, ...wishes]); // Add new wish to start
        setNewWish("");
        setIsModalVisible(false);
        message.success("Your wish has been pinned! ✨");
    };

    return (
        <section style={{ height: '100%', position: 'relative', overflowY: 'auto', padding: '20px 20px 100px' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem', zIndex: 20 }}>
                <Title level={2} style={{ color: '#fff', fontFamily: 'Playfair Display', textShadow: '0 0 10px #FFD700' }}>
                    Wish Board 📌
                </Title>
                <Button
                    type="primary"
                    shape="round"
                    icon={<SendOutlined />}
                    size="large"
                    onClick={() => setIsModalVisible(true)}
                    style={{
                        background: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        boxShadow: '0 0 15px rgba(255,255,255,0.2)'
                    }}
                >
                    Pin a Wish
                </Button>
            </div>

            {/* Masonry-like Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', // Responsive Grid for Mobile
                gap: '3rem 2rem',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '20px'
            }}>
                <AnimatePresence>
                    {wishes.map(wish => (
                        <WishCard key={wish.id} wish={wish} />
                    ))}
                </AnimatePresence>
            </div>

            {/* Add Wish Modal */}
            <Modal
                title="Write your wish..."
                open={isModalVisible}
                onOk={handleAddWish}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="back" onClick={() => setIsModalVisible(false)}>Cancel</Button>,
                    <Button key="submit" type="primary" onClick={handleAddWish}>Pin It! 📌</Button>
                ]}
                centered
            >
                <TextArea
                    rows={4}
                    placeholder="Type your beautiful wish here..."
                    value={newWish}
                    onChange={(e) => setNewWish(e.target.value)}
                    style={{ fontSize: '1.2rem', fontFamily: 'Patrick Hand' }}
                />
            </Modal>
        </section>
    );
};

export default Wishes;
