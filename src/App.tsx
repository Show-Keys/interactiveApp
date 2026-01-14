import { useEffect, useMemo, useState } from 'react';
import CinematicBackground from './components/CinematicBackground';
import MinisterSun from './components/MinisterSun';
import UniquePlanet from './components/UniquePlanet';
import OrbitingBadge from './components/OrbitingBadge';
import FloatingNavigation from './components/FloatingNavigation';
import InfoPanel from './components/InfoPanel';
import { usePrefersReducedMotion, useReducedMotionLike } from './components/ui/use-reduced-motion';
import ministryLogo from 'figma:asset/e9f3f4cb580b0827ed78bb6ecbe12efcb70b7930.png';

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
    subDepartments: ['المتابعة', 'مركز الاتصالات', 'قاعة الخدمة الموحدة', 'فريق رضا العملاء', 'فريق منصة تجاوب'],
    responsibilities: [
      'استقبال المراجعين وتوجيههم للجهات المختصة',
      'إدارة مركز الاتصالات والرد على الاستفسارات',
      'تشغيل قاعة الخدمة الموحدة',
      'قياس رضا المتعاملين وتحسين الخدمات',
      'إدارة منصة تجاوب الإلكترونية',
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
      'تطوير وتنفيذ استراتيجيات التواصل',
      'إدارة منصات التواصل الاجتماعي والرقمي',
      'التنسيق مع وسائل الإعلام المحلية والدولية',
      'إنتاج المحتوى الإبداعي والمرئي',
      'تنظيم الفعاليات والمؤتمرات الصحفية',
    ],
  },
  {
    nameAr: 'دائرة الوثائق',
    nameEn: 'Archives & Records',
    color: '#06b6d4',
    size: 110,
    planetType: 'archive',
    purpose: 'إدارة وحفظ وثائق الوزارة بطريقة منظمة وآمنة تضمن سهولة الوصول والاسترجاع.',
    subDepartments: ['البريد', 'تنظيم الوثائق', 'الحفظ'],
    responsibilities: [
      'إدارة نظام البريد الوارد والصادر',
      'تصنيف وفهرسة الوثائق الرسمية',
      'حفظ السجلات والأرشيف الإلكتروني',
      'ضمان سرية المعلومات الحساسة',
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
    subDepartments: ['المنظمات', 'التعاون الدولي'],
    responsibilities: [
      'إدارة العلاقات مع المنظمات الدولية',
      'التنسيق للمشاركة في المؤتمرات الدولية',
      'متابعة تنفيذ الاتفاقيات الدولية',
      'تطوير الشراكات الاستراتيجية الدولية',
    ],
  },
  {
    nameAr: 'دائرة التدقيق الداخلي',
    nameEn: 'Internal Audit',
    color: '#0891b2',
    size: 115,
    planetType: 'audit',
    purpose: 'ضمان فعالية الرقابة الداخلية وتقييم الأداء المالي والإداري للوزارة.',
    subDepartments: ['التدقيق التخصصي', 'التدقيق المالي والإداري', 'المراجعة المالية', 'تدقيق ظفار'],
    responsibilities: [
      'مراجعة العمليات المالية والإدارية',
      'تقييم فعالية الرقابة الداخلية',
      'إعداد تقارير التدقيق والتوصيات',
      'متابعة تنفيذ التوصيات',
      'إجراء تدقيق متخصص للمكاتب الفرعية',
    ],
  },
  {
    nameAr: 'مكتب أمن الوزارة',
    nameEn: 'Ministry Security',
    color: '#7c3aed',
    size: 105,
    planetType: 'security',
    purpose: 'حماية منشآت ومرافق الوزارة وضمان سلامة الموظفين والمراجعين.',
    subDepartments: ['الحراسة', 'التفتيش', 'البطاقات', 'بيانات الموظفين'],
    responsibilities: [
      'حماية مباني ومنشآت الوزارة',
      'إدارة نظام الدخول والخروج',
      'التفتيش الأمني',
      'إصدار البطاقات الأمنية',
      'إدارة بيانات الموظفين الأمنية',
    ],
  },
  {
    nameAr: 'قسم أمن المعلومات',
    nameEn: 'Cybersecurity',
    color: '#dc2626',
    secondaryColor: '#ef4444',
    size: 115,
    planetType: 'cyber',
    purpose: 'حماية البنية التحتية المعلوماتية ومواجهة التهديدات السيبرانية.',
    subDepartments: ['تحليل المخاطر', 'سياسات الوصول', 'المراقبة الشبكية', 'الصيانة الوقائية'],
    responsibilities: [
      'تحليل وتقييم المخاطر السيبرانية',
      'وضع سياسات أمن المعلومات',
      'مراقبة الشبكات والأنظمة',
      'الصيانة الوقائية للبنية التحتية الرقمية',
      'التوعية بأمن المعلومات',
    ],
  },
  {
    nameAr: 'مكتب متابعة تنفيذ رؤية عُمان 2040',
    nameEn: 'Vision 2040 Office',
    color: '#a855f7',
    secondaryColor: '#c084fc',
    size: 135,
    planetType: 'vision',
    purpose: 'متابعة تنفيذ المبادرات المرتبطة برؤية عُمان 2040 وتحقيق الأهداف الاستراتيجية.',
    subDepartments: ['المواءمة', 'متابعة المشاريع', 'قياس الأداء', 'الوعي بالرؤية'],
    responsibilities: [
      'مواءمة خطط الوزارة مع رؤية عُمان 2040',
      'متابعة تنفيذ المبادرات والمشاريع الاستراتيجية',
      'قياس مؤشرات الأداء والنجاح',
      'نشر الوعي برؤية عُمان 2040',
      'إعداد التقارير الدورية عن التقدم المحرز',
    ],
  },
  {
    nameAr: 'مكتب سلامة النقل',
    nameEn: 'Transport Safety',
    color: '#10b981',
    size: 120,
    planetType: 'transport',
    purpose: 'ضمان سلامة النقل الجوي والبحري من خلال التحقيقات والتخطيط.',
    subDepartments: ['تحقيقات الطيران', 'تحقيقات البحرية', 'التخطيط والجودة'],
    responsibilities: [
      'إجراء تحقيقات حوادث الطيران',
      'إجراء تحقيقات حوادث النقل البحري',
      'التخطيط الاستراتيجي لسلامة النقل',
      'ضمان الجودة في أنظمة السلامة',
    ],
  },
  {
    nameAr: 'قسم القيمة المحلية المضافة',
    nameEn: 'Local Value',
    color: '#059669',
    size: 118,
    planetType: 'value',
    purpose: 'تعزيز المحتوى المحلي ودعم الاقتصاد الوطني من خلال زيادة القيمة المحلية المضافة.',
    subDepartments: [],
    responsibilities: [
      'تطوير استراتيجيات زيادة المحتوى المحلي',
      'دعم المؤسسات الصغيرة والمتوسطة',
      'قياس ومتابعة مؤشرات القيمة المحلية',
      'تعزيز الشراكة مع القطاع الخاص',
      'توطين الوظائف والمهارات',
    ],
  },
  {
    nameAr: 'دائرة التنسيق والمتابعة',
    nameEn: 'Coordination & Follow-up',
    color: '#ec4899',
    size: 122,
    planetType: 'coordination',
    purpose: 'تنسيق العمل بين مختلف وحدات الوزارة ومتابعة تنفيذ القرارات والتوجيهات.',
    subDepartments: [],
    responsibilities: [
      'تنسيق العمل بين الدوائر والوحدات',
      'متابعة تنفيذ القرارات الوزارية',
      'إعداد التقارير الدورية',
      'تنظيم الاجتماعات واللقاءات الرسمية',
    ],
  },
  {
    nameAr: 'دائرة المجالس واللجان',
    nameEn: 'Councils & Committees',
    color: '#f97316',
    size: 112,
    planetType: 'committees',
    purpose: 'تنظيم أعمال المجالس واللجان التابعة للوزارة ومتابعة تنفيذ قراراتها.',
    subDepartments: [],
    responsibilities: [
      'تنظيم أعمال المجالس واللجان',
      'إعداد جداول الأعمال والمحاضر',
      'متابعة تنفيذ القرارات',
      'التنسيق مع الجهات ذات العلاقة',
    ],
  },
  {
    nameAr: 'دائرة العلاقات العامة',
    nameEn: 'Public Relations',
    color: '#f472b6',
    secondaryColor: '#fb7185',
    size: 118,
    planetType: 'public-relations',
    purpose: 'تعزيز صورة الوزارة وإدارة بروتوكولات الاستقبال والضيافة وتنظيم الأنشطة والفعاليات.',
    subDepartments: ['قسم الاستقبال والضيافة', 'قسم الأنشطة والفعاليات'],
    responsibilities: [
      'الاستقبال والضيافة',
      'حجز القاعات',
      'حجز الغرف',
      'التأشيرات والجوازات',
      'تصاريح المطار',
      'تنظيم الفعاليات',
      'تنظيم الأنشطة',
      'إعداد العروض',
      'طلب الرعايات',
      'تنسيق الهدايا',
    ],
  },
];

export default function App() {
  const [selectedPlanet, setSelectedPlanet] = useState<number | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [zoomedPlanet, setZoomedPlanet] = useState<number | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);

  // The ministry logo PNG contains generous transparent padding.
  // We crop + zoom in CSS so it can fill the intended header slot.
  const ministryLogoCrop = {
    top: 26,
    right: 12,
    bottom: 26,
    left: 12,
  };
  const ministryLogoZoom = 3.2;

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
    const timeoutMs = prefersReducedMotion ? 800 : 1800;
    const t = window.setTimeout(() => setShowWelcome(false), timeoutMs);
    return () => window.clearTimeout(t);
  }, [prefersReducedMotion]);

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
    setSelectedPlanet(index);
    setZoomedPlanet(index);
    setIsPanelOpen(true);
  };

  const handleNavSelect = (index: number) => {
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
    setIsPanelOpen(false);
    setZoomedPlanet(null);
    setTimeout(() => setSelectedPlanet(null), 300);
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ background: '#000000' }}
    >
      {showWelcome && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85"
          onClick={() => setShowWelcome(false)}
        >
          <div
            dir="rtl"
            className="text-center px-10 py-8 rounded-2xl border border-white/10 bg-white/5"
          >
            <div className="text-white text-3xl font-light tracking-wide">مرحبا بكم في البرنامج التفاعلي</div>
            <div className="text-white/60 text-sm mt-3 font-extralight tracking-widest">TAP TO START</div>
          </div>
        </div>
      )}

      {/* Cinematic background */}
      <CinematicBackground />

      {/* Ministry logo + Navigation */}
      <div
        className="absolute left-0 right-0 top-0 z-50 flex justify-center pointer-events-none"
        style={{ height: 'clamp(280px, 34vh, 680px)' }}
      >
        <div
          className="pointer-events-auto"
          style={{ paddingTop: 'clamp(10px, 2vh, 34px)' }}
        >
          <button
            className="bg-transparent border-0 p-0 cursor-pointer logo-press"
            onClick={() => setIsNavOpen((v) => !v)}
            aria-label="Toggle navigation"
            style={{ transition: 'transform 150ms ease-out' }}
          >
            <div
              className="relative rounded-2xl border border-white/12 bg-white/4 logo-flash"
              style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.35)', width: 'min(96vw, 1200px)' }}
            >
              <div
                className="flex items-center justify-center overflow-hidden"
                style={{
                  height: 'clamp(240px, 30vh, 620px)',
                  width: '100%',
                }}
              >
                <img
                  src={ministryLogo}
                  alt="Ministry Logo"
                  className="block"
                  style={{
                    height: '100%',
                    width: '100%',
                    maxWidth: 'none',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    imageRendering: 'auto',
                    clipPath: `inset(${ministryLogoCrop.top}% ${ministryLogoCrop.right}% ${ministryLogoCrop.bottom}% ${ministryLogoCrop.left}%)`,
                    transform: `scale(${ministryLogoZoom})`,
                    transformOrigin: 'center',
                  }}
                />
              </div>
            </div>
          </button>

          {isNavOpen && (
            <FloatingNavigation
              placement="right-side"
              departments={departments}
              selectedIndex={selectedPlanet}
              onSelect={(idx) => {
                handleNavSelect(idx);
                setIsNavOpen(false);
              }}
            />
          )}
        </div>
      </div>

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