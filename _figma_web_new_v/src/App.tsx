import { useState } from 'react';
import { motion } from 'motion/react';
import CinematicBackground from './components/CinematicBackground';
import MinisterSun from './components/MinisterSun';
import UniquePlanet from './components/UniquePlanet';
import OrbitingBadge from './components/OrbitingBadge';
import FloatingNavigation from './components/FloatingNavigation';
import InfoPanel from './components/InfoPanel';
import ministryLogo from 'figma:asset/e9f3f4cb580b0827ed78bb6ecbe12efcb70b7930.png';

interface DepartmentData {
  nameAr: string;
  nameEn: string;
  color: string;
  secondaryColor?: string;
  size: number;
  planetType: 'service' | 'media' | 'archive' | 'legal' | 'international' | 'audit' | 'security' | 'cyber' | 'vision' | 'transport' | 'value' | 'coordination' | 'committees' | 'tenders' | 'public-relations';
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
    nameAr: 'المناقصات والعقود',
    nameEn: 'Tenders & Contracts',
    color: '#4f46e5',
    secondaryColor: '#6366f1',
    size: 128,
    planetType: 'tenders',
    purpose: 'إدارة المناقصات والعقود بكفاءة عالية وضمان الشفافية في جميع مراحل التعاقد والتنفيذ.',
    subDepartments: [
      'قسم إدارة المناقصات',
      'قسم إدارة العقود وتقييم أداء الشركات',
      'قسم تصنيف وتأهيل الشركات',
      'قسم إدارة الأوامر التغييرية'
    ],
    responsibilities: [
      'إعداد ودراسة المناقصات ومراجعة إجراءاتها',
      'مراجعة التحاليل الفنية والمالية للعطاءات',
      'إدارة جلسات التفاوض مع الشركات',
      'إدارة ومتابعة العقود بعد الترسية ميدانيًا وماليًا',
      'تقييم أداء الشركات المتعاقدة وإدارة النزاعات',
      'تصنيف وتأهيل الشركات حسب الأنظمة المعتمدة',
      'إدارة ومتابعة الأوامر التغييرية للعقود',
      'التأكد من اكتمال الوثائق والمرفقات للأوامر التغييرية',
    ],
  },
  {
    nameAr: 'دائرة العلاقات العامة',
    nameEn: 'Public Relations',
    color: '#f43f5e',
    size: 115,
    planetType: 'public-relations',
    purpose: 'إدارة علاقات الوزارة مع الجمهور والمؤسسات الأخرى لتعزيز صورة الوزارة وبناء الثقة.',
    subDepartments: ['إدارة العلاقات العامة', 'التسويق', 'العلاقات العامة'],
    responsibilities: [
      'إدارة علاقات الوزارة مع الجمهور والمؤسسات الأخرى',
      'تطوير استراتيجيات التسويق والترويج',
      'تنظيم الفعاليات والمؤتمرات الصحفية',
      'إعداد الأخبار والمواد الترويجية',
      'إدارة العلاقات العامة مع الوسائل الإعلامية',
    ],
  },
];

export default function App() {
  const [selectedPlanet, setSelectedPlanet] = useState<number | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [zoomedPlanet, setZoomedPlanet] = useState<number | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const orbitRadius = 600;
  const angleStep = 360 / departments.length;

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
      {isNavOpen && (
        <FloatingNavigation
          departments={departments}
          selectedIndex={selectedPlanet}
          onSelect={handleNavSelect}
        />
      )}

      {/* Ministry logo - Navigation Toggle */}
      <motion.button
        className="absolute top-8 left-8 z-50 bg-transparent border-0 p-0 cursor-pointer"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        onClick={() => setIsNavOpen(!isNavOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          {/* Animated pulsing glow effect */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{
              background: 'radial-gradient(circle, rgba(251, 191, 36, 0.25), transparent)',
              filter: 'blur(25px)',
              transform: 'scale(1.3)',
            }}
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [1.2, 1.4, 1.2],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Static glow effect */}
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              background: 'radial-gradient(circle, rgba(251, 191, 36, 0.15), transparent)',
              filter: 'blur(20px)',
              transform: 'scale(1.3)',
            }}
          />
          
          {/* Logo container with glass-morphism */}
          <motion.div 
            className="relative bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all hover:bg-white/10 hover:border-white/30"
            animate={{
              boxShadow: [
                '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(251, 191, 36, 0.1)',
                '0 8px 32px rgba(0,0,0,0.4), 0 0 30px rgba(251, 191, 36, 0.3)',
                '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(251, 191, 36, 0.1)',
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img
              src={ministryLogo}
              alt="Ministry Logo"
              className="w-32 h-auto relative z-10"
              style={{
                filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.2))',
              }}
            />
            
            {/* Interactive indicator - small pulsing dot */}
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-br from-amber-400 to-orange-500"
              style={{
                boxShadow: '0 0 10px rgba(251, 191, 36, 0.6)',
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.6, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </motion.button>

      {/* Solar system container */}
      <motion.div
        className="absolute left-1/2 top-[700px] -translate-x-1/2"
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

        {/* Department planets */}
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
              {/* Orbiting badges for sub-departments */}
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
          Made by Shauqi for Ministry of Transport and Communication and Technology
        </motion.div>
      </div>
    </div>
  );
}