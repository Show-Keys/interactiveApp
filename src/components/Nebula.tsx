export default function Nebula() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Purple nebula cloud */}
      <div
        className="absolute rounded-full blur-3xl opacity-20"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, #9333ea 0%, #7c3aed 30%, transparent 70%)',
          left: '10%',
          top: '20%',
        }}
      />
      
      {/* Blue nebula cloud */}
      <div
        className="absolute rounded-full blur-3xl opacity-20"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, #3b82f6 0%, #2563eb 30%, transparent 70%)',
          right: '15%',
          top: '40%',
        }}
      />
      
      {/* Pink nebula cloud */}
      <div
        className="absolute rounded-full blur-3xl opacity-15"
        style={{
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, #ec4899 0%, #db2777 30%, transparent 70%)',
          left: '60%',
          bottom: '10%',
        }}
      />
      
      {/* Cosmic dust particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
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
        />
      ))}
    </div>
  );
}
