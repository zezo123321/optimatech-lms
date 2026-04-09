import { useAppContext } from '../context/AppContext';
import { Button } from './ui/button';
import { ChevronRight, ChevronLeft, X, PlayCircle, CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';

const DEMO_STEPS = [
  {
    id: 1,
    titleEn: 'Create a Cohort',
    titleAr: 'إنشاء دفعة جديدة',
    descEn: 'Start by creating a new training cohort or program.',
    descAr: 'ابدأ بإنشاء دفعة تدريبية أو برنامج جديد.',
    page: 'programs',
    target: 'new-cohort-btn'
  },
  {
    id: 2,
    titleEn: 'Import Learners',
    titleAr: 'استيراد المتدربين',
    descEn: 'Easily import learners from Excel or CSV files.',
    descAr: 'استيراد المتدربين بسهولة من ملفات Excel أو CSV.',
    page: 'learners',
    target: 'import-learners-btn'
  },
  {
    id: 3,
    titleEn: 'Schedule Sessions',
    titleAr: 'جدولة الجلسات',
    descEn: 'Set up the training schedule and assign instructors.',
    descAr: 'إعداد جدول التدريب وتعيين المدربين.',
    page: 'sessions',
    target: 'new-session-btn'
  },
  {
    id: 4,
    titleEn: 'Record Attendance',
    titleAr: 'تسجيل الحضور',
    descEn: 'Quickly record attendance for the scheduled sessions.',
    descAr: 'تسجيل الحضور بسرعة للجلسات المجدولة.',
    page: 'attendance',
    target: 'record-attendance-btn'
  },
  {
    id: 5,
    titleEn: 'Track Payments',
    titleAr: 'تتبع المدفوعات',
    descEn: 'Monitor collections and learner payment statuses.',
    descAr: 'مراقبة التحصيلات وحالات دفع المتدربين.',
    page: 'payments',
    target: 'record-payment-btn'
  },
  {
    id: 6,
    titleEn: 'Generate Impact Report',
    titleAr: 'إنشاء تقرير الأثر',
    descEn: 'Export comprehensive reports for NGOs and stakeholders.',
    descAr: 'تصدير تقارير شاملة للمنظمات غير الحكومية وأصحاب المصلحة.',
    page: 'reports',
    target: 'export-report-btn'
  },
  {
    id: 7,
    titleEn: 'Demo Completed!',
    titleAr: 'اكتملت الجولة!',
    descEn: 'You have successfully completed the OptimaTech guided demo.',
    descAr: 'لقد أكملت الجولة التعريفية لـ OptimaTech بنجاح.',
    page: 'dashboard',
    target: ''
  }
];

export function DemoGuide() {
  const { demoStep, setDemoStep, language, activePage, setActivePage } = useAppContext();

  const currentStepData = DEMO_STEPS.find(s => s.id === demoStep);

  useEffect(() => {
    if (demoStep > 0 && currentStepData && activePage !== currentStepData.page) {
      setActivePage(currentStepData.page);
    }
  }, [demoStep, currentStepData, activePage, setActivePage]);

  if (demoStep === 0) return null;

  const handleNext = () => {
    if (demoStep < DEMO_STEPS.length) {
      setDemoStep(demoStep + 1);
    } else {
      setDemoStep(0); // End demo
      setActivePage('dashboard');
    }
  };

  const handlePrev = () => {
    if (demoStep > 1) {
      setDemoStep(demoStep - 1);
    }
  };

  if (demoStep === 7) {
    return (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-md bg-white rounded-2xl shadow-2xl border border-green-100 p-6 animate-in slide-in-from-bottom-10 text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold mb-2">
          {language === 'ar' ? currentStepData?.titleAr : currentStepData?.titleEn}
        </h3>
        <p className="text-slate-600 text-sm mb-6">
          {language === 'ar' ? currentStepData?.descAr : currentStepData?.descEn}
        </p>
        <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => { setDemoStep(0); setActivePage('dashboard'); }}>
          {language === 'ar' ? 'العودة للوحة التحكم' : 'Return to Dashboard'}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-md bg-white rounded-2xl shadow-2xl border border-blue-100 p-4 animate-in slide-in-from-bottom-10">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 text-blue-600 font-semibold">
          <PlayCircle className="w-5 h-5" />
          <span>{language === 'ar' ? 'جولة تعريفية' : 'Guided Demo'} ({demoStep}/{DEMO_STEPS.length - 1})</span>
        </div>
        <button onClick={() => setDemoStep(0)} className="text-slate-400 hover:text-slate-600">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <h3 className="text-lg font-bold mb-1">
        {language === 'ar' ? currentStepData?.titleAr : currentStepData?.titleEn}
      </h3>
      <p className="text-slate-600 text-sm mb-4">
        {language === 'ar' ? currentStepData?.descAr : currentStepData?.descEn}
      </p>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
        <Button variant="ghost" size="sm" onClick={handlePrev} disabled={demoStep === 1}>
          {language === 'ar' ? <ChevronRight className="w-4 h-4 ml-1" /> : <ChevronLeft className="w-4 h-4 mr-1" />}
          {language === 'ar' ? 'السابق' : 'Previous'}
        </Button>
        <Button size="sm" onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
          {demoStep === DEMO_STEPS.length - 1 ? (language === 'ar' ? 'إنهاء الجولة' : 'Finish Demo') : (language === 'ar' ? 'التالي' : 'Next Step')}
          {demoStep !== DEMO_STEPS.length - 1 && (language === 'ar' ? <ChevronLeft className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 ml-1" />)}
        </Button>
      </div>
    </div>
  );
}
