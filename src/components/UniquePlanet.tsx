import { ReactNode } from 'react';
import { useIsMobile } from './ui/use-mobile';
import { useReducedMotionLike } from './ui/use-reduced-motion';
import { useFastTap } from '../utils/useFastTap';

interface UniquePlanetProps {
  nameAr: string;
  nameEn: string;
  angle: number;
  orbitRadius: number;
  primaryColor: string;
  secondaryColor?: string;
  size: number;
  planetType:
    | 'service'
    | 'media'
    | 'archive'
    | 'legal'
    | 'international'
    | 'audit'
    | 'security'
    | 'cyber'
    | 'vision'
    | 'transport'
    | 'value'
    | 'coordination'
    | 'committees'
    | 'tenders'
    | 'public-relations';
  onClick?: () => void;
  isSelected?: boolean;
  children?: ReactNode;
}

export default function UniquePlanet({
  nameAr,
  nameEn,
  angle,
  orbitRadius,
  primaryColor,
  secondaryColor,
  size,
  planetType,
  onClick,
  isSelected = false,
  children,
}: UniquePlanetProps) {
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotionLike();
  const liteMode = isMobile || reduceMotion;

  const tap = useFastTap(() => onClick?.());

  const x = Math.cos((angle * Math.PI) / 180) * orbitRadius;
  const y = Math.sin((angle * Math.PI) / 180) * orbitRadius;

  const getPlanetTexture = () => {
    switch (planetType) {
      case 'service':
        return (
          <>
            {/* Connection rings - representing service links */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full border-2"
              style={{ borderColor: `${primaryColor}60` }}
            />
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full border"
              style={{ borderColor: `${primaryColor}40` }}
            />
            {/* Service dots */}
            {[0, 90, 180, 270].map((deg) => (
              <div
                key={deg}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: primaryColor,
                  left: `${50 + 35 * Math.cos((deg * Math.PI) / 180)}%`,
                  top: `${50 + 35 * Math.sin((deg * Math.PI) / 180)}%`,
                  transform: 'translate(-50%, -50%)',
                  boxShadow: `0 0 8px ${primaryColor}`,
                }}
              />
            ))}
          </>
        );
      
      case 'media':
        return (
          <>
            {/* Broadcasting rings */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                style={{
                  width: `${100 + i * 20}%`,
                  height: `${100 + i * 20}%`,
                  borderColor: `${primaryColor}${(6 - i) * 10}`,
                }}
              />
            ))}
          </>
        );
      
      case 'archive':
        return (
          <>
            {/* Grid pattern for structured data */}
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `linear-gradient(${primaryColor}40 1px, transparent 1px), linear-gradient(90deg, ${primaryColor}40 1px, transparent 1px)`,
                  backgroundSize: '20% 20%',
                }}
              />
            </div>
          </>
        );
      
      case 'legal':
        return (
          <>
            {/* Sharp geometric patterns */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 rotate-45" style={{ borderColor: `${primaryColor}60` }} />
              <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border rotate-45" style={{ borderColor: `${primaryColor}40` }} />
            </div>
          </>
        );
      
      case 'international':
        return (
          <>
            {/* Orbiting satellites */}
            {[0, 120, 240].map((deg) => (
              <div
                key={deg}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: secondaryColor || primaryColor,
                  boxShadow: `0 0 10px ${secondaryColor || primaryColor}`,
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${Math.cos((deg * Math.PI) / 180) * (size * 0.6)}px), calc(-50% + ${Math.sin((deg * Math.PI) / 180) * (size * 0.6)}px))`,
                }}
              />
            ))}
          </>
        );
      
      case 'audit':
        return (
          <>
            {/* Layered audit circles */}
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                style={{
                  width: `${25 + i * 20}%`,
                  height: `${25 + i * 20}%`,
                  borderColor: `${primaryColor}${8 - i * 2}0`,
                }}
              />
            ))}
          </>
        );
      
      case 'security':
        return (
          <>
            {/* Shield pattern */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-14 border-2 rounded-t-full" style={{ borderColor: `${primaryColor}80`, borderBottomLeftRadius: '50%', borderBottomRightRadius: '50%' }} />
              </div>
            </div>
          </>
        );
      
      case 'cyber':
        return (
          <>
            {/* Digital circuit pattern */}
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-40">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="20" fill="none" stroke={primaryColor} strokeWidth="0.5" />
                <circle cx="50" cy="50" r="30" fill="none" stroke={primaryColor} strokeWidth="0.5" strokeDasharray="2,2" />
                <line x1="30" y1="50" x2="70" y2="50" stroke={primaryColor} strokeWidth="1" />
                <line x1="50" y1="30" x2="50" y2="70" stroke={primaryColor} strokeWidth="1" />
                <circle cx="50" cy="50" r="3" fill={primaryColor} />
              </svg>
            </div>
          </>
        );
      
      case 'vision':
        return (
          <>
            {/* Futuristic hexagon pattern */}
            <div
              className="absolute inset-0 rounded-full overflow-hidden opacity-50"
            >
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <div
                  key={deg}
                  className="absolute w-1 h-6"
                  style={{
                    background: `linear-gradient(to bottom, ${primaryColor}, transparent)`,
                    left: '50%',
                    top: '50%',
                    transformOrigin: 'center',
                    transform: `translate(-50%, -100%) rotate(${deg}deg)`,
                  }}
                />
              ))}
            </div>
          </>
        );
      
      case 'transport':
        return (
          <>
            {/* Aviation and maritime icons */}
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-40">
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-8 h-1" style={{ background: primaryColor }} />
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-6 h-1 rotate-45" style={{ background: primaryColor, transformOrigin: 'left center' }} />
              <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-6 h-1 -rotate-45" style={{ background: primaryColor, transformOrigin: 'left center' }} />
            </div>
          </>
        );
      
      case 'value':
        return (
          <>
            {/* Economic growth arrows */}
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-40">
              {[0, 120, 240].map((deg) => (
                <div
                  key={deg}
                  className="absolute left-1/2 top-1/2 w-4 h-8"
                  style={{
                    background: `linear-gradient(to top, transparent, ${primaryColor})`,
                    transformOrigin: 'bottom center',
                    transform: `translate(-50%, -50%) rotate(${deg}deg)`,
                  }}
                />
              ))}
            </div>
          </>
        );
      
      case 'coordination':
        return (
          <>
            {/* Network connection lines */}
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
              {[0, 45, 90, 135].map((deg) => (
                <div
                  key={deg}
                  className="absolute w-full h-0.5"
                  style={{
                    background: `linear-gradient(to right, transparent, ${primaryColor}, transparent)`,
                    left: '50%',
                    top: '50%',
                    transformOrigin: 'center',
                    transform: `translate(-50%, -50%) rotate(${deg}deg)`,
                  }}
                />
              ))}
            </div>
          </>
        );

      case 'tenders':
        return (
          <>
            {/* Document and contract layers */}
            <div
              className="absolute inset-0 rounded-full overflow-hidden opacity-40"
            >
              {/* Contract document sheets */}
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <div
                  key={deg}
                  className="absolute w-6 h-8 border rounded"
                  style={{
                    borderColor: i % 2 === 0 ? primaryColor : (secondaryColor || primaryColor),
                    left: `${50 + 30 * Math.cos((deg * Math.PI) / 180)}%`,
                    top: `${50 + 30 * Math.sin((deg * Math.PI) / 180)}%`,
                    transform: `translate(-50%, -50%) rotate(${deg}deg)`,
                    background: `linear-gradient(135deg, ${primaryColor}10, transparent)`,
                  }}
                >
                  <div className="w-full h-0.5 mt-2" style={{ background: `${primaryColor}60` }} />
                  <div className="w-3/4 h-0.5 mt-1 ml-1" style={{ background: `${primaryColor}40` }} />
                </div>
              ))}
            </div>
            {/* Bidding process rings */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                style={{
                  width: `${40 + i * 20}%`,
                  height: `${40 + i * 20}%`,
                  borderColor: `${secondaryColor || primaryColor}${6 - i * 2}0`,
                  borderStyle: 'dashed',
                }}
              />
            ))}
          </>
        );

      case 'public-relations':
        return (
          <>
            {/* Communication waves */}
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                style={{
                  width: `${60 + i * 15}%`,
                  height: `${60 + i * 15}%`,
                  borderColor: `${primaryColor}${7 - i}0`,
                }}
              />
            ))}
            {/* Connection nodes representing stakeholders */}
            {[0, 72, 144, 216, 288].map((deg) => (
              <div
                key={deg}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: primaryColor,
                  boxShadow: `0 0 10px ${primaryColor}`,
                  left: `${50 + 35 * Math.cos((deg * Math.PI) / 180)}%`,
                  top: `${50 + 35 * Math.sin((deg * Math.PI) / 180)}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}
          </>
        );
      
      case 'committees':
        return (
          <>
            {/* Meeting table pattern */}
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-40">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/3 rounded-lg border-2" style={{ borderColor: primaryColor }} />
              {[0, 90, 180, 270].map((deg) => (
                <div
                  key={deg}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: primaryColor,
                    left: `${50 + 25 * Math.cos((deg * Math.PI) / 180)}%`,
                    top: `${50 + 25 * Math.sin((deg * Math.PI) / 180)}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div
      className="absolute left-1/2 top-1/2 cursor-pointer group"
      style={{
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
      }}
      onTouchStart={tap.onTouchStart}
      onPointerDown={tap.onPointerDown}
      onClick={tap.onClick}
    >
      <div className="orbit-counter" style={{ transformOrigin: 'center' }}>
      {/* Atmospheric glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: `${size + 60}px`,
          height: `${size + 60}px`,
          background: `radial-gradient(circle, ${primaryColor}40 0%, ${primaryColor}15 40%, transparent 70%)`,
          opacity: isSelected ? 0.85 : 0.55,
        }}
      />

      {/* Main planet body */}
      <div
        className="relative rounded-full z-10"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          background: secondaryColor 
            ? `radial-gradient(circle at 30% 30%, ${primaryColor}ff, ${secondaryColor}dd, ${primaryColor}aa, ${secondaryColor}77)`
            : `radial-gradient(circle at 30% 30%, ${primaryColor}ff, ${primaryColor}cc, ${primaryColor}99, ${primaryColor}66)`,
          boxShadow: isSelected
            ? `0 0 50px ${primaryColor}cc, 0 0 90px ${primaryColor}55, inset -10px -10px 26px rgba(0,0,0,0.5), inset 5px 5px 18px rgba(255,255,255,0.1)`
            : liteMode
              ? `0 0 14px ${primaryColor}66, inset -6px -6px 14px rgba(0,0,0,0.45), inset 3px 3px 10px rgba(255,255,255,0.08)`
              : `0 0 30px ${primaryColor}80, 0 0 60px ${primaryColor}40, inset -10px -10px 30px rgba(0,0,0,0.5), inset 5px 5px 20px rgba(255,255,255,0.1)`,
          border: `1px solid ${primaryColor}80`,
          transform: isSelected ? 'scale(1.12)' : undefined,
        }}
      >
        {/* Highlight spot */}
        <div
          className="absolute top-[18%] left-[22%] w-[35%] h-[35%] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.4), rgba(255,255,255,0.1), transparent)',
          }}
        />
        
        {/* Planet-specific texture */}
        {getPlanetTexture()}
        
        {/* Atmospheric ring */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none"
          style={{
            width: `${size + 30}px`,
            height: `${size + 30}px`,
            borderColor: `${primaryColor}40`,
          }}
        />
      </div>

      {/* Orbit badges for sub-departments */}
      {children}

      {/* Planet labels */}
      <div
        className="absolute left-1/2 top-full mt-4 -translate-x-1/2 text-center pointer-events-none"
        style={{ width: `${size + 40}px` }}
      >
        <div
          style={{
            direction: 'rtl',
            fontFamily: 'var(--font-ar)',
          }}
        >
          <div
            className="text-white mb-1"
            style={{
              fontSize: '14px',
              textShadow: `0 0 15px ${primaryColor}, 0 2px 8px rgba(0,0,0,0.8)`,
              fontWeight: 300,
              lineHeight: '1.4',
              letterSpacing: '0.3px',
            }}
          >
            {nameAr}
          </div>
          <div
            className="text-white/60 text-xs tracking-wider uppercase text-stable"
            style={{
              fontWeight: 200,
              textShadow: '0 1px 2px rgba(0,0,0,0.55)',
              fontFamily: 'var(--font-en)',
            }}
          >
            {nameEn}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}