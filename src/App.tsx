import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import CinematicBackground from './components/CinematicBackground';
import MinisterSun from './components/MinisterSun';
import UniquePlanet from './components/UniquePlanet';
import OrbitingBadge from './components/OrbitingBadge';
import FloatingNavigation from './components/FloatingNavigation';
import InfoPanel from './components/InfoPanel';
import { usePrefersReducedMotion, useReducedMotionLike } from './components/ui/use-reduced-motion';
import { createSfxPlayer } from './utils/sfx';
import { createLoopingMusicPlayer } from './utils/music';
import { useFastTap } from './utils/useFastTap';
import ministryLogo from 'figma:asset/e9f3f4cb580b0827ed78bb6ecbe12efcb70b7930.png';
import introVideoSrc from './assets/pics and vids/Oman 2040_ The Epic 38s Power Intro.mp4';
import introPosterSrc from './assets/pics and vids/galaxcy command.png';

interface DepartmentData {
  nameAr: string;
  nameEn: string;
  color: string;
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
  purpose: string;
  subDepartments: string[];
  responsibilities: string[];
}

const departments: DepartmentData[] = [
  {
    nameAr: 'دائرة خدمات المراجعين',
    nameEn: 'Client Services Department',
    color: '#3b82f6',
    size: 130,
    planetType: 'service',
    purpose: 'تقديم خدمات عالية الجودة للمراجعين وتسهيل تعاملهم مع الوزارة من خلال قنوات متعددة وحلول مبتكرة.',
    subDepartments: [],
    responsibilities: [
      'متابعة الطلبات والمعاملات ومؤشرات الأداء',
      'استقبال وتسجيل الطلبات',
      'قاعة الخدمة الموحدة',
      'إدارة الشكاوى والبلاغات عبر منصة «تجاوب»',
    ],
  },
  {
    nameAr: 'دائرة التواصل والإعلام',
    nameEn: 'Media & Communications',
    color: '#f59e0b',
    secondaryColor: '#fb923c',
    size: 125,
    planetType: 'media',
    purpose: 'بناء صورة إيجابية للوزارة من خلال استراتيجيات تواصل متكاملة وإعلام رقمي حديث.',
    subDepartments: ['التواصل الاستراتيجي', 'التواصل الرقمي', 'الإعلام', 'المحتوى الإبداعي'],
    responsibilities: [
      'إعداد الخطط الإعلامية وإدارة الأزمات',
      'إدارة المحتوى الرقمي والمنصات ورصد الإعلام',
      'التغطية الإعلامية والتواصل مع وسائل الإعلام',
      'إدارة الهوية البصرية وصناعة المحتوى',
    ],
  },
  {
    nameAr: 'دائرة الوثائق',
    nameEn: 'Archives & Records',
    color: '#06b6d4',
    size: 110,
    planetType: 'archive',
    purpose: 'إدارة وحفظ وثائق الوزارة بطريقة منظمة وآمنة تضمن سهولة الوصول والاسترجاع.',
    subDepartments: ['قسم الحفظ', 'قسم البريد', 'قسم التنظيم'],
    responsibilities: [
      'تنظيم الوثائق والتحويل والترحيل',
      'تسجيل وحفظ وتوجيه البريد الصادر والوارد',
      'إعداد أنظمة تصنيف الوثائق وضمان الالتزام',
    ],
  },
  {
    nameAr: 'الدائرة القانونية',
    nameEn: 'Legal Affairs',
    color: '#8b5cf6',
    size: 120,
    planetType: 'legal',
    purpose: 'تقديم الدعم القانوني للوزارة وضمان الامتثال للقوانين واللوائح المعمول بها.',
    subDepartments: ['الدعاوى والتقاضي', 'الدراسات والاتفاقيات', 'المتابعة القانونية'],
    responsibilities: [
      'تمثيل الوزارة أمام الجهات القضائية',
      'إعداد ومراجعة مشاريع القوانين واللوائح',
      'دراسة ومراجعة الاتفاقيات والعقود',
      'تقديم المشورة القانونية',
      'متابعة القضايا والدعاوى',
    ],
  },
  {
    nameAr: 'دائرة المنظمات والعلاقات الدولية',
    nameEn: 'International Relations',
    color: '#2563eb',
    secondaryColor: '#60a5fa',
    size: 125,
    planetType: 'international',
    purpose: 'تعزيز التعاون الدولي وتمثيل الوزارة في المنظمات والمحافل الدولية.',
    subDepartments: [],
    responsibilities: [
      'توثيق المستندات وتأمين إيصالها',
      'التنسيق مع المنظمات الإقليمية والدولية',
      'تعزيز التعاون وتنفيذ الاتفاقيات',
      'تنظيم المشاركة في المؤتمرات داخل وخارج السلطنة',
    ],
  },
  {
    nameAr: 'دائرة المناقصات والعقود',
    nameEn: 'Tenders & Contracts',
    color: '#14b8a6',
    secondaryColor: '#5eead4',
    size: 120,
    planetType: 'tenders',
    purpose: 'إدارة المناقصات والعقود وتقييم أداء الشركات وضمان الامتثال للإجراءات.',
    subDepartments: [
      'قسم إدارة المناقصات',
      'قسم إدارة العقود وتقييم أداء الشركات',
      'قسم أوامر التغيير',
      'قسم تصنيف وتأهيل الشركات',
    ],
    responsibilities: [
      'إعداد ودراسة وطرح المناقصات',
      'مراجعة التحليل الفني والمالي',
      'إعداد ومتابعة العقود',
      'إدارة النزاعات وتقييم الأداء',
      'دراسة أوامر التغيير واستيفاء المتطلبات',
      'متابعة التنفيذ والمفاوضات',
      'التأهيل المسبق وتصنيف الشركات',
    ],
  },
  {
    nameAr: 'دائرة التدقيق الداخلي',
    nameEn: 'Internal Audit',
    color: '#0891b2',
    size: 115,
    planetType: 'audit',
    purpose: 'ضمان فعالية الرقابة الداخلية وتقييم الأداء المالي والإداري للوزارة.',
    subDepartments: ['المراجعة المالية', 'التدقيق التخصصي', 'التدقيق المالي والإداري'],
    responsibilities: [
      'مراجعة السندات والإيرادات والعهد',
      'مهام رقابية تقنية ومشاريع البنية الأساسية',
      'الرقابة على الجوانب المالية والإدارية',
    ],
  },
  {
    nameAr: 'مكتب أمن الوزارة',
    nameEn: 'Ministry Security',
    color: '#7c3aed',
    size: 105,
    planetType: 'security',
    purpose: 'حماية الموارد البشرية والمباني والأنظمة وضمان السلامة والأمن المؤسسي.',
    subDepartments: ['قسم بيانات الموظفين', 'قسم حراسة مباني الوزارة'],
    responsibilities: [
      'التعيينات والتنقلات والندب والإعارة',
      'التدقيق الأمني للموظفين',
      'التنسيق مع الجهات المختصة',
      'إجراءات الضبطية القضائية',
      'الإشراف الأمني على مباني الوزارة',
      'إصدار البطاقات الوظيفية وتصاريح الدخول',
      'التفتيش والرقابة والتحكم بالأنظمة الأمنية',
    ],
  },
  {
    nameAr: 'قسم أمن المعلومات الإلكترونية',
    nameEn: 'Cybersecurity',
    color: '#dc2626',
    secondaryColor: '#ef4444',
    size: 115,
    planetType: 'cyber',
    purpose: 'تشغيل أمن المعلومات وفق ISO 27001 وتعزيز الأمن السيبراني والحماية المتكاملة.',
    subDepartments: [],
    responsibilities: [
      'تشغيل أمن المعلومات وفق ISO 27001',
      'إدارة الأمن السيبراني والحماية المتكاملة',
      'التدقيق وتحليل المخاطر',
      'سياسات الوصول والتوثيق الأمني',
      'التدريب والتوعية ومراقبة الشبكات',
      'إدارة الصلاحيات وتشغيل مركز الدفاع الإلكتروني',
    ],
  },
  {
    nameAr: 'مكتب متابعة تنفيذ رؤية عُمان 2040',
    nameEn: 'Vision 2040 Office',
    color: '#a855f7',
    secondaryColor: '#c084fc',
    size: 135,
    planetType: 'vision',
    purpose: 'ضمان مواءمة أعمال الوزارة مع مستهدفات الرؤية الوطنية.',
    subDepartments: [],
    responsibilities: [
      'متابعة التنفيذ ومواءمة المشاريع',
      'التنسيق المؤسسي بين الجهات',
      'قياس الأداء وتعزيز الوعي بالرؤية',
      'رفع التقارير الدورية',
    ],
  },
  {
    nameAr: 'مكتب سلامة النقل',
    nameEn: 'Transport Safety',
    color: '#10b981',
    size: 120,
    planetType: 'transport',
    purpose: 'التحقيق المستقل في حوادث النقل وضمان السلامة.',
    subDepartments: ['قسم التحقيق في حوادث الطيران', 'قسم التحقيق في حوادث الشؤون البحرية'],
    responsibilities: [
      'استلام وتقييم البلاغات',
      'الانتقال السريع لمواقع الحوادث',
      'تعيين المحققين والتنسيق مع الجهات المعنية',
      'حفظ السجلات بسرية',
      'إعداد التقارير النهائية ومتابعة التوصيات',
    ],
  },
  {
    nameAr: 'قسم القيمة المحلية المضافة',
    nameEn: 'Local Value',
    color: '#059669',
    size: 118,
    planetType: 'value',
    purpose: 'تعزيز المحتوى المحلي ودعم الاقتصاد الوطني من خلال زيادة القيمة المحلية المضافة.',
    subDepartments: ['التخطيط', 'التقييم', 'المتابعة'],
    responsibilities: [
      'تطبيق السياسات ودعم المناقصات والتوعية',
      'مراجعة الخطط وإعداد التقارير والمبادرات',
      'متابعة الالتزامات والتواصل ورصد التحديات',
    ],
  },
  {
    nameAr: 'دائرة التنسيق والمتابعة بمكتب الوزير',
    nameEn: 'Coordination & Follow-up',
    color: '#ec4899',
    size: 122,
    planetType: 'coordination',
    purpose: 'تنسيق ومتابعة أعمال مكتب الوزير ودعم قطاعات الوزارة.',
    subDepartments: [],
    responsibilities: [
      'إعداد المواضيع والخطابات والتقارير الرسمية',
      'تسجيل وتوزيع القرارات والتعاميم',
      'دعم قطاعات الوزارة والتنسيق مع الجهات',
      'متابعة الصادر والوارد',
      'إعداد تقارير نصف سنوية وسنوية',
      'توفير البيانات والمعلومات وتوثيق المستندات',
    ],
  },
  {
    nameAr: 'دائرة المجالس واللجان',
    nameEn: 'Councils & Committees',
    color: '#f97316',
    size: 112,
    planetType: 'committees',
    purpose: 'تنظيم أعمال المجالس واللجان التابعة للوزارة ومتابعة تنفيذ قراراتها.',
    subDepartments: ['قسم المجالس', 'قسم اللجان'],
    responsibilities: [
      'الإشراف على الاجتماعات وإعداد المحاضر',
      'التنسيق بشأن القرارات ومتابعة تنفيذها',
      'حفظ الملفات والتواصل مع الجهات المختصة',
    ],
  },
];

export default function App() {
  const [selectedPlanet, setSelectedPlanet] = useState<number | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [zoomedPlanet, setZoomedPlanet] = useState<number | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [introPhase, setIntroPhase] = useState<'locked' | 'playing'>('locked');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(() => {
    try {
      const stored = localStorage.getItem('musicEnabled');
      return stored === null ? true : stored === 'true';
    } catch {
      return true;
    }
  });

  const sfx = useMemo(() => createSfxPlayer({ volume: 0.35 }), []);
  const music = useMemo(
    () => createLoopingMusicPlayer({ src: '/sfx/space-chords-loop.mp3', volume: 0.18 }),
    [],
  );
  const introVideoRef = useRef<HTMLVideoElement | null>(null);

  const introMotifs = useMemo(() => {
    const picks = [0, 1, 2, 3, 7, 12];
    return picks
      .filter((i) => i >= 0 && i < departments.length)
      .map((i) => {
        const d = departments[i];
        return {
          key: `${d.planetType}-${i}`,
          planetType: d.planetType,
          color: d.color,
          secondaryColor: d.secondaryColor ?? d.color,
          size: d.size,
        };
      });
  }, []);

  const withHexAlpha = (hex: string, alpha: string) => {
    if (/^#[0-9a-fA-F]{6}$/.test(hex)) return `${hex}${alpha}`;
    if (/^#[0-9a-fA-F]{3}$/.test(hex)) {
      const r = hex[1];
      const g = hex[2];
      const b = hex[3];
      return `#${r}${r}${g}${g}${b}${b}${alpha}`;
    }
    return hex;
  };

  const introTimerRef = useRef<number | null>(null);

  const INTRO_DURATION_MS = 38000;

  const clearIntroTimer = () => {
    if (introTimerRef.current) {
      window.clearTimeout(introTimerRef.current);
      introTimerRef.current = null;
    }
  };

  const beginIntro = () => {
    if (introPhase === 'playing') return;

    clearIntroTimer();
    setIntroPhase('playing');

    // Play video once (called via Start button user gesture).
    const v = introVideoRef.current;
    let durationMs = INTRO_DURATION_MS;
    if (v) {
      try {
        v.muted = false;
        v.volume = 1;
        v.currentTime = 0;
      } catch {
        // ignore
      }

      void v.play().catch(() => {
        // Autoplay restrictions (should be allowed after user gesture).
      });

      // Prefer the actual video duration when available, but never allow
      // the intro to auto-dismiss earlier than the configured 38s.
      const videoDurationMs = Number.isFinite(v.duration) ? Math.round(v.duration * 1000) : INTRO_DURATION_MS;
      durationMs = Math.max(INTRO_DURATION_MS, videoDurationMs);
    }

    // Auto-dismiss after ~38 seconds (or longer if the video is longer).
    introTimerRef.current = window.setTimeout(() => {
      introTimerRef.current = null;
      startApp();
    }, durationMs);
  };

  const startApp = () => {
    clearIntroTimer();

    const v = introVideoRef.current;
    if (v) {
      try {
        v.pause();
        v.currentTime = 0;
      } catch {
        // ignore
      }
    }

    setShowIntro(false);
    setIsNavOpen(false);
  };

  const replayIntro = () => {
    clearIntroTimer();

    const v = introVideoRef.current;
    if (v) {
      try {
        v.pause();
        v.currentTime = 0;
      } catch {
        // ignore
      }
    }

    setIntroPhase('locked');
    setShowIntro(true);
    setIsNavOpen(false);
  };

  useEffect(() => {
    sfx.preload();
  }, [sfx]);

  useEffect(() => {
    const appStarted = !showIntro;

    music.setEnabled(appStarted && musicEnabled);
    try {
      localStorage.setItem('musicEnabled', String(musicEnabled));
    } catch {
      // ignore
    }

    // Starting may be blocked by autoplay policy; we also call ensureStarted()
    // on user taps when music is enabled.
    if (appStarted && musicEnabled) void music.ensureStarted();
  }, [music, musicEnabled, showIntro]);

  useEffect(() => {
    if (!showIntro) return;
    const v = introVideoRef.current;
    if (!v) return;

    // Preload the video and try to show the first frame.
    try {
      // Keep unmuted; actual playback still requires user gesture.
      v.muted = false;
      v.pause();
      v.currentTime = 0;
      v.load();
    } catch {
      // ignore
    }
  }, [showIntro]);

  const [viewport, setViewport] = useState(() => {
    const vv = window.visualViewport;
    return {
      width: vv?.width ?? window.innerWidth,
      height: vv?.height ?? window.innerHeight,
    };
  });

  const prefersReducedMotion = usePrefersReducedMotion();
  const reducedMotionLike = useReducedMotionLike();
  const liteMode = reducedMotionLike;

  const orbitLayout = useMemo(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const safeTop = Number.parseFloat(rootStyles.getPropertyValue('--safe-top')) || 0;
    const safeRight = Number.parseFloat(rootStyles.getPropertyValue('--safe-right')) || 0;
    const safeBottom = Number.parseFloat(rootStyles.getPropertyValue('--safe-bottom')) || 0;
    const safeLeft = Number.parseFloat(rootStyles.getPropertyValue('--safe-left')) || 0;
    const viewportPad = Number.parseFloat(rootStyles.getPropertyValue('--viewport-pad')) || 0;
    const uiTop = Number.parseFloat(rootStyles.getPropertyValue('--ui-top')) || 0;
    const uiBottom = Number.parseFloat(rootStyles.getPropertyValue('--ui-bottom')) || 0;

    const vw = viewport.width;
    const vh = viewport.height;

    const usableW = Math.max(0, vw - safeLeft - safeRight);
    const usableH = Math.max(0, vh - safeTop - safeBottom);

    const centerX = safeLeft + usableW * 0.5;

    const maxPlanetSize = Math.max(...departments.map((d) => d.size));
    const outerMargin = maxPlanetSize / 2 + 140;

    const contentTop = safeTop + uiTop + viewportPad;
    const contentBottom = safeTop + usableH - uiBottom - viewportPad;

    const availableHalfW = Math.max(0, usableW * 0.5 - viewportPad);
    const availableHalfH = Math.max(0, (contentBottom - contentTop) * 0.5);

    // Match the Figma export's orbit radius on sufficiently large screens, and
    // scale the whole system down on smaller screens instead of shrinking the orbit.
    const designOrbitRadius = 600;
    const requiredHalf = designOrbitRadius + outerMargin;
    const fitScale = requiredHalf > 0 ? Math.min(1, availableHalfW / requiredHalf, availableHalfH / requiredHalf) : 1;

    const orbitRadius = designOrbitRadius;
    const requiredHalfScaled = requiredHalf * fitScale;

    // Position the system in the upper-middle of the safe content area, but
    // clamp to ensure it stays fully visible.
    const minCenterY = contentTop + requiredHalfScaled;
    const maxCenterY = contentBottom - requiredHalfScaled;

    // On very tall portrait displays (e.g. MagicMirror), the intended design
    // places the solar system in the upper portion of the screen.
    const aspect = vh / Math.max(1, vw);
    const upperMiddleBias = aspect >= 2.4 ? 0.2 : aspect >= 2.0 ? 0.24 : 0.4;
    const unclampedCenterY = minCenterY + (maxCenterY - minCenterY) * upperMiddleBias;
    const centerY = Number.isFinite(unclampedCenterY)
      ? Math.min(Math.max(unclampedCenterY, minCenterY), maxCenterY)
      : Math.max(0, contentTop + availableHalfH);

    const baseScale = 1;

    return {
      centerX,
      centerY,
      orbitRadius,
      normalScale: baseScale * fitScale,
    };
  }, [viewport.width, viewport.height]);

  const orbitRadius = orbitLayout.orbitRadius;
  const angleStep = 360 / departments.length;

  // Animations removed for kiosk performance.

  useEffect(() => {
    let raf = 0;
    const update = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const vv = window.visualViewport;
        setViewport({
          width: vv?.width ?? window.innerWidth,
          height: vv?.height ?? window.innerHeight,
        });
      });
    };

    window.addEventListener('resize', update, { passive: true });
    window.addEventListener('orientationchange', update, { passive: true });
    window.visualViewport?.addEventListener('resize', update, { passive: true });
    window.visualViewport?.addEventListener('scroll', update, { passive: true });
    update();

    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
      window.visualViewport?.removeEventListener('resize', update);
      window.visualViewport?.removeEventListener('scroll', update);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const handlePlanetClick = (index: number) => {
    void sfx.play('open');
    setIsNavOpen(false);
    setSelectedPlanet(index);
    setZoomedPlanet(index);
    setIsPanelOpen(true);
  };

  const handleNavSelect = (index: number) => {
    void sfx.play('select');
    if (index === -1) {
      // Minister's office selected
      setSelectedPlanet(null);
      setZoomedPlanet(null);
      setIsPanelOpen(false);
    } else {
      handlePlanetClick(index);
    }
  };

  const handleClosePanel = () => {
    void sfx.play('close');
    setIsPanelOpen(false);
    setZoomedPlanet(null);
    setTimeout(() => setSelectedPlanet(null), 300);
  };

  const kioskTarget =
    typeof document !== 'undefined'
      ? (document.getElementById('kiosk-ui') ?? document.body)
      : null;

  const hideLogoUi = showIntro || selectedPlanet !== null;

  const introStartTap = useFastTap(() => {
    void sfx.play('tap');
    beginIntro();
  });

  const introSkipTap = useFastTap(() => {
    void sfx.play('tap');
    startApp();
  });

  const replayIntroTap = useFastTap(() => {
    void sfx.play('tap');
    replayIntro();
  });

  const toggleMusicTap = useFastTap(() => {
    void sfx.play('tap');
    setMusicEnabled((v) => {
      const next = !v;
      if (next) void music.ensureStarted();
      return next;
    });
  });

  const toggleNavTap = useFastTap(() => {
    void sfx.play('tap');
    if (!showIntro && musicEnabled) void music.ensureStarted();
    setIsNavOpen((v) => !v);
  });

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ background: '#000000' }}
    >
      {kioskTarget
        ? createPortal(
            <>
              {showIntro && (
                <div
                  className={`kiosk-fixed-ui intro-overlay${introPhase === 'playing' ? ' intro-overlay--playing' : ''}`}
                  onClick={() => {
                    // Start is the only action.
                  }}
                >
                  <img
                    className="intro-bg-poster"
                    src={introPosterSrc}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                  />

                  <div className="intro-bg-scrim" aria-hidden="true" />

                  <video
                    ref={introVideoRef}
                    className="intro-bg-video"
                    src={introVideoSrc}
                    poster={introPosterSrc}
                    playsInline
                    preload="auto"
                    onLoadedMetadata={(e) => {
                      const v = e.currentTarget;
                      if (v.videoWidth !== 1440 || v.videoHeight !== 3840) {
                        // eslint-disable-next-line no-console
                        console.warn(
                          `[intro] Expected intro video 1440x3840 but got ${v.videoWidth}x${v.videoHeight}. Replace the MP4 with a 1440x3840 encode for best quality.`,
                        );
                      }
                    }}
                  />

                  <div className="intro-motifs" aria-hidden="true">
                    {introMotifs.map((m) => (
                      <div
                        key={m.key}
                        className={`intro-motif intro-motif--${m.planetType}`}
                        style={
                          {
                            ['--intro-motif-c1' as unknown as string]: withHexAlpha(m.color, 'cc'),
                            ['--intro-motif-c2' as unknown as string]: withHexAlpha(m.secondaryColor, '66'),
                            ['--intro-motif-ring' as unknown as string]: withHexAlpha(m.color, '80'),
                          } as React.CSSProperties
                        }
                      />
                    ))}
                  </div>

                  <div className={introPhase === 'playing' ? 'intro-panel intro-panel--playing' : 'intro-panel'}>
                    <div className={introPhase === 'playing' ? 'intro-logo intro-logo--playing' : 'intro-logo'}>
                      <img src={ministryLogo} alt="Ministry Logo" style={{ width: 'var(--intro-logo-width, 520px)' }} />
                    </div>

                    <div dir="rtl" className="intro-title">مجرة القيادة</div>

                    <div className="intro-actions">
                      {introPhase === 'locked' && (
                        <button
                          type="button"
                          className="intro-start"
                          onTouchStart={introStartTap.onTouchStart}
                          onPointerDown={introStartTap.onPointerDown}
                          onClick={introStartTap.onClick}
                        >
                          Start
                        </button>
                      )}

                      {introPhase === 'playing' && (
                        <button
                          type="button"
                          className="intro-skip intro-skip--ar"
                          aria-label="Skip intro"
                          onTouchStart={introSkipTap.onTouchStart}
                          onPointerDown={introSkipTap.onPointerDown}
                          onClick={introSkipTap.onClick}
                        >
                          تخطي
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {!showIntro && (
                <div className="kiosk-fixed-ui kiosk-speaker-controls">
                  <button
                    type="button"
                    className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white/12 bg-black/25 text-white/85 backdrop-blur active:bg-black/45"
                    aria-label="Replay intro"
                    onTouchStart={replayIntroTap.onTouchStart}
                    onPointerDown={replayIntroTap.onPointerDown}
                    onClick={replayIntroTap.onClick}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M21 12a9 9 0 1 1-3.2-6.9"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M21 5v5h-5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white/12 bg-black/25 text-white/85 backdrop-blur active:bg-black/45"
                    aria-label={musicEnabled ? 'Mute background music' : 'Unmute background music'}
                    onTouchStart={toggleMusicTap.onTouchStart}
                    onPointerDown={toggleMusicTap.onPointerDown}
                    onClick={toggleMusicTap.onClick}
                  >
                    {musicEnabled ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M4 10v4h4l5 4V6L8 10H4Z"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16.5 9.5c.9.9.9 4.1 0 5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M19 7c2 2 2 8 0 10"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M4 10v4h4l5 4V6L8 10H4Z"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 9l4 6"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                        <path
                          d="M20 9l-4 6"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              )}

              <div className="kiosk-fixed-ui kiosk-logo-controls">
                {!hideLogoUi && (
                  <>
                    <button
                      className={`bg-transparent border-0 p-0 cursor-pointer logo-press transition-opacity duration-200 ${
                        isNavOpen ? 'opacity-50' : 'opacity-100'
                      }`}
                      onTouchStart={toggleNavTap.onTouchStart}
                      onPointerDown={toggleNavTap.onPointerDown}
                      onClick={toggleNavTap.onClick}
                      aria-label="Toggle navigation"
                      type="button"
                    >
                      <div
                        className="relative rounded-2xl border border-white/12 bg-white/4 px-3 py-2 logo-flash"
                        style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.35)' }}
                      >
                        <img
                          src={ministryLogo}
                          alt="Ministry Logo"
                          className="block h-auto"
                          style={{
                            width: 'var(--kiosk-logo-width, 750px)',
                            filter: liteMode ? 'none' : 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.18))',
                          }}
                        />
                      </div>
                    </button>

                    {isNavOpen && (
                      <div className="relative z-[10000]">
                        <FloatingNavigation
                          placement="center"
                          departments={departments}
                          selectedIndex={selectedPlanet}
                          onSelect={(idx) => {
                            handleNavSelect(idx);
                            setIsNavOpen(false);
                          }}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </>,
            kioskTarget,
          )
        : null}

      {/* Cinematic background */}
      <CinematicBackground />

      {/* Solar system container */}
      <div
        className="absolute"
        style={{
          left: `${orbitLayout.centerX}px`,
          top: `${orbitLayout.centerY}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className="relative"
          style={{
            width: `${orbitRadius * 2}px`,
            height: `${orbitRadius * 2}px`,
            transform: `scale(${orbitLayout.normalScale}) translate3d(0, 0, 0)`,
          }}
        >
        {/* Main orbit line */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none"
          style={{
            width: `${orbitRadius * 2}px`,
            height: `${orbitRadius * 2}px`,
            borderColor: 'rgba(251, 191, 36, 0.15)',
            borderWidth: '1px',
            boxShadow: '0 0 20px rgba(251, 191, 36, 0.1), inset 0 0 20px rgba(251, 191, 36, 0.05)',
          }}
        />

        {/* Central Sun - Minister's Office */}
        <MinisterSun
          onClick={() => handleNavSelect(-1)}
          isZoomed={zoomedPlanet === null && isPanelOpen}
        />

        {/* Department planets: CSS orbit rotation + counter-rotation keeps labels upright */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 orbit-rotate"
          style={
            {
              width: `${orbitRadius * 2}px`,
              height: `${orbitRadius * 2}px`,
              '--orbit-duration': '180s',
            } as React.CSSProperties
          }
        >
          {departments.map((dept, index) => {
            const angle = index * angleStep;
            return (
              <UniquePlanet
                key={index}
                nameAr={dept.nameAr}
                nameEn={dept.nameEn}
                angle={angle}
                orbitRadius={orbitRadius}
                primaryColor={dept.color}
                secondaryColor={dept.secondaryColor}
                size={dept.size}
                planetType={dept.planetType}
                onClick={() => handlePlanetClick(index)}
                isSelected={selectedPlanet === index}
              >
                {dept.subDepartments.map((sub, subIndex) => (
                  <OrbitingBadge
                    key={subIndex}
                    label={sub}
                    angle={(360 / dept.subDepartments.length) * subIndex}
                    orbitRadius={dept.size / 2 + 35}
                    color={dept.color}
                    size={24}
                  />
                ))}
              </UniquePlanet>
            );
          })}
        </div>
        </div>
      </div>
      {/* Info panel */}
      {selectedPlanet !== null && (
        <InfoPanel
          isOpen={isPanelOpen}
          nameAr={departments[selectedPlanet].nameAr}
          nameEn={departments[selectedPlanet].nameEn}
          color={departments[selectedPlanet].color}
          purpose={departments[selectedPlanet].purpose}
          subDepartments={departments[selectedPlanet].subDepartments}
          responsibilities={departments[selectedPlanet].responsibilities}
          onClose={handleClosePanel}
        />
      )}

      {/* Footer */}
      <div className="absolute bottom-12 left-0 right-0 text-center z-10">
        <div
          className="text-white/30 text-sm tracking-wide"
          style={{ fontFamily: 'var(--font-en)', fontWeight: 200 }}
        >
          Made by Shauqi For ministry of transport and communication and technology
        </div>
      </div>
    </div>
  );
}