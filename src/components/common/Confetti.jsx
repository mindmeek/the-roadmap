import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ConfettiPiece = ({ x, y, rotation, color }) => {
    return (
        <motion.div
            style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: 10,
                height: 10,
                backgroundColor: color,
                borderRadius: '50%',
                originX: 0.5,
                originY: 0.5,
            }}
            initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            animate={{
                opacity: 0,
                x: x,
                y: y,
                rotate: rotation,
            }}
            transition={{
                duration: 1.5,
                ease: "easeOut"
            }}
        />
    );
};

const ConfettiExplosion = ({ onComplete }) => {
    const colors = ['#8B6F4E', '#FBBF24', '#10B981', '#3B82F6', '#EF4444'];
    const numPieces = 50;

    useEffect(() => {
        const timer = setTimeout(onComplete, 2000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            {Array.from({ length: numPieces }).map((_, index) => {
                const angle = (index / numPieces) * 360;
                const distance = 100 + Math.random() * 150;
                return (
                    <ConfettiPiece
                        key={index}
                        x={Math.cos(angle * Math.PI / 180) * distance}
                        y={Math.sin(angle * Math.PI / 180) * distance}
                        rotation={Math.random() * 360}
                        color={colors[Math.floor(Math.random() * colors.length)]}
                    />
                );
            })}
        </div>
    );
};

export default ConfettiExplosion;