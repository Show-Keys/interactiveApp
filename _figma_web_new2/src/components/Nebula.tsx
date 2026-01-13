import { motion } from 'motion/react';

export default function Nebula() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Purple nebula cloud */}
      <motion.div
        className="absolute rounded-full blur-3xl opacity-20"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, #9333ea 0%, #7c3aed 30%, transparent 70%)',
          left: '10%',
          top: '20%',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Blue nebula cloud */}
      <motion.div
        className="absolute rounded-full blur-3xl opacity-20"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, #3b82f6 0%, #2563eb 30%, transparent 70%)',
          right: '15%',
          top: '40%',
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Pink nebula cloud */}
      <motion.div
        className="absolute rounded-full blur-3xl opacity-15"
        style={{
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, #ec4899 0%, #db2777 30%, transparent 70%)',
          left: '60%',
          bottom: '10%',
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 30, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Cosmic dust particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 4 + 1}px`,
            height: `${Math.random() * 4 + 1}px`,
            background: 'rgba(147, 197, 253, 0.6)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(1px)',
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}
