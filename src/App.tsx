import { useState } from 'react';
import { motion } from 'motion/react';
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
  planetType: 'service' | 'media' | 'archive' | 'legal' | 'international' | 'audit' | 'security' | 'cyber' | 'vision' | 'transport' | 'value' | 'coordination' | 'committees';
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
];

export default function App() {
  const [selectedPlanet, setSelectedPlanet] = useState<number | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [zoomedPlanet, setZoomedPlanet] = useState<number | null>(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  const reducedMotionLike = useReducedMotionLike();

  const orbitRadius = 600;
  const angleStep = 360 / departments.length;

  const shouldOrbit = !prefersReducedMotion && !isPanelOpen;
  const orbitDuration = reducedMotionLike ? 320 : 200;

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
      className="relative overflow-hidden"
      style={{ width: '1440px', height: '3830px', background: '#000000' }}
    >
      {/* Cinematic background */}
      <CinematicBackground />

      {/* Floating navigation */}
      <FloatingNavigation
        departments={departments}
        selectedIndex={selectedPlanet}
        onSelect={handleNavSelect}
      />

      {/* Ministry logo in corner */}
      <motion.div
        className="absolute top-8 left-8 z-50"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <img
          src={ministryLogo}
          alt="Ministry Logo"
          className="w-32 h-auto"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))',
          }}
        />
      </motion.div>

      {/* Solar system container */}
      <motion.div
        className="absolute left-1/2 top-[820px] -translate-x-1/2 relative"
        style={{ width: `${orbitRadius * 2}px`, height: `${orbitRadius * 2}px` }}
        animate={
          zoomedPlanet !== null
            ? {
                scale: 0.7,
                y: -150,
              }
            : {
                scale: 1,
                y: 0,
              }
        }
        transition={{ duration: 0.8, type: 'spring', damping: 20 }}
      >
        {/* Main orbit line */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none"
          style={{
            width: `${orbitRadius * 2}px`,
            height: `${orbitRadius * 2}px`,
            borderColor: 'rgba(251, 191, 36, 0.15)',
            borderWidth: '1px',
            boxShadow: '0 0 20px rgba(251, 191, 36, 0.1), inset 0 0 20px rgba(251, 191, 36, 0.05)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 200, repeat: Infinity, ease: 'linear' }}
        />

        {/* Central Sun - Minister's Office */}
        <MinisterSun
          onClick={() => handleNavSelect(-1)}
          isZoomed={zoomedPlanet === null && isPanelOpen}
        />

        {/* Department planets: rotate the whole group for a cheap orbit animation */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: `${orbitRadius * 2}px`, height: `${orbitRadius * 2}px` }}
          animate={shouldOrbit ? { rotate: 360 } : undefined}
          transition={{ duration: orbitDuration, repeat: Infinity, ease: 'linear' }}
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
                    duration={15 + subIndex * 2}
                  />
                ))}
              </UniquePlanet>
            );
          })}
        </motion.div>
      </motion.div>

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
        <motion.div
          className="text-white/30 text-sm tracking-wide"
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontWeight: 200,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
        >
          Interactive Space-Themed Organizational Dashboard • Click planets to explore
        </motion.div>
      </div>
    </div>
  );
}