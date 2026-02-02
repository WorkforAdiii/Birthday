import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseCircleFilled, HeartFilled } from '@ant-design/icons';
import { Button } from 'antd';

const Lightbox = ({ photo, onClose }) => {
    if (!photo) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.9)',
                    backdropFilter: 'blur(10px)',
                    zIndex: 2000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '2rem'
                }}
                onClick={onClose}
            >
                <motion.div
                    layoutId={`photo-${photo.id}`}
                    style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }}
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
                >
                    <img
                        src={photo.src}
                        alt={photo.caption}
                        style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '10px', boxShadow: '0 0 50px rgba(0,0,0,0.5)' }}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{ textAlign: 'center', marginTop: '1rem', color: 'white' }}
                    >
                        <h2 style={{ fontFamily: 'Patrick Hand', fontSize: '2rem', marginBottom: '0.5rem' }}>
                            {photo.caption}
                        </h2>
                        <Button
                            shape="circle"
                            size="large"
                            icon={<HeartFilled style={{ color: '#D4145A' }} />}
                            style={{
                                background: 'rgba(255,255,255,0.2)',
                                border: 'none',
                                color: 'white'
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                // Trigger heart explosion (can be added later)
                                alert('❤️ Sent love!');
                            }}
                        />
                    </motion.div>

                    <CloseCircleFilled
                        onClick={onClose}
                        style={{
                            position: 'absolute', top: -40, right: 0,
                            fontSize: '2rem', color: 'white', cursor: 'pointer'
                        }}
                    />
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Lightbox;
