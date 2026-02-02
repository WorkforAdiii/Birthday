import React, { useState } from 'react';
import Hero from './components/Hero';
import Wishes from './components/Wishes';
import CelestialReasons from './components/CelestialReasons';
import MusicPlayer from './components/MusicPlayer';
import { Layout, Tooltip } from 'antd';
import './App.css';

import MagicCursor from './components/MagicCursor';
import FloatingHearts from './components/FloatingHearts';
import GlobalBalloons from './components/GlobalBalloons';
import EntranceSequence from './components/EntranceSequence';
import ParallaxBackground from './components/ParallaxBackground';
import MagicLetter from './components/MagicLetter';

import { HomeFilled, StarFilled, HeartFilled } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';

const { Footer } = Layout;

// New Top Right Navigation Component
const TopNav = ({ current, onChange }) => {
  const navItems = [
    { id: 'hero', icon: <HomeFilled />, label: 'Home' },
    { id: 'reasons', icon: <StarFilled />, label: 'Reasons' },
    { id: 'wishes', icon: <HeartFilled />, label: 'Wishes' },
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 30,
      right: 30,
      zIndex: 1000,
      display: 'flex',
      gap: '15px'
    }}>
      {navItems.map(item => {
        const isActive = current === item.id;
        return (
          <Tooltip title={item.label} placement="bottom" key={item.id}>
            <motion.div
              onClick={() => onChange(item.id)}
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                background: isActive ? '#D4145A' : 'rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: isActive ? '#fff' : '#fff',
                border: '1px solid rgba(255,255,255,0.4)',
                boxShadow: isActive ? '0 0 15px #D4145A' : '0 5px 15px rgba(0,0,0,0.1)',
                fontSize: '1.2rem',
                transition: 'background 0.3s ease'
              }}
            >
              {item.icon}
            </motion.div>
          </Tooltip>
        );
      })}
    </div>
  );
};

function App() {
  const [showEntrance, setShowEntrance] = useState(true);
  const [currentSection, setCurrentSection] = useState('hero');

  return (
    <div className="App" style={{ height: '100vh', overflow: 'hidden' }}>

      {/* Entrance Gate */}
      {showEntrance && (
        <div style={{ position: 'absolute', zIndex: 10000, width: '100%', height: '100%' }}>
          <EntranceSequence onComplete={() => setShowEntrance(false)} />
        </div>
      )}

      {/* Main App Content - Always Rendered Behind Entrance */}
      <ParallaxBackground>
        <MagicCursor />
        <FloatingHearts />
        <GlobalBalloons />
        <MagicLetter position="top-left" />

        {/* Navigation Bar - Now Top Right */}
        <TopNav current={currentSection} onChange={setCurrentSection} />

        {/* Main Content Area - Full Screen Sections */}
        <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
          <AnimatePresence mode="wait">
            {currentSection === 'hero' && (
              <motion.div key="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} style={{ height: '100%' }}>
                <Hero name="Chaii 💕" onMakeWish={() => setCurrentSection('wishes')} />
              </motion.div>
            )}
            {currentSection === 'reasons' && (
              <motion.div key="reasons" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.5 }} style={{ height: '100%', overflowY: 'auto', padding: '100px 20px 50px', position: 'relative', zIndex: 10 }}>
                <CelestialReasons />
              </motion.div>
            )}
            {currentSection === 'wishes' && (
              <motion.div key="wishes" initial={{ opacity: 0, rotate: -5 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 5 }} transition={{ duration: 0.5 }} style={{ height: '100%', overflowY: 'auto', padding: '100px 20px 50px', position: 'relative', zIndex: 10 }}>
                <Wishes />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <MusicPlayer position="top-left" />

        {/* Footer */}
        <div style={{ position: 'fixed', bottom: 10, right: 30, textAlign: 'right', fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none', fontFamily: 'monospace', zIndex: 200 }}>
          Made with ❤️ for Chaii
        </div>
      </ParallaxBackground>
    </div>
  );
}

export default App;
