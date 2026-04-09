import { useAppContext } from '../context/AppContext';
import { translations } from '../lib/i18n';
import { Button } from '@/components/ui/button';
import { Globe, ArrowRight, ArrowLeft, ShieldCheck, Zap, BarChart, CheckCircle2, Building2, GraduationCap, LineChart } from 'lucide-react';
import { motion } from 'motion/react';

export function Landing() {
  const { language, setLanguage, login } = useAppContext();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Nav */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="text-2xl font-bold text-primary tracking-tight">OptimaTech</div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')} className="gap-2">
            <Globe className="w-4 h-4" />
            {language === 'ar' ? 'English' : 'العربية'}
          </Button>
          <Button variant="outline" onClick={login} className="hidden sm:flex">{t.loginDemo}</Button>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-6xl mx-auto mt-12 md:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center w-full"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-8 border border-blue-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            {language === 'ar' ? 'النسخة التجريبية متاحة الآن' : 'Demo version available now'}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1] max-w-5xl">
            {language === 'ar' ? 'نظام التشغيل المتكامل لمراكز التدريب والمبادرات التنموية' : 'The Operating System for Training Centers & NGOs'}
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            {language === 'ar' 
              ? 'تخلص من فوضى جداول الإكسيل وجروبات الواتساب. منصة واحدة لإدارة المتدربين، تتبع الحضور، تحصيل المدفوعات، واستخراج تقارير الأثر المجتمعي بضغطة زر.' 
              : 'Replace Excel chaos and WhatsApp groups. One unified platform to manage learners, track attendance, collect payments, and generate impact reports instantly.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
            <Button size="lg" className="text-lg px-8 h-14 gap-2 w-full sm:w-auto shadow-lg shadow-blue-500/20" onClick={login}>
              {language === 'ar' ? 'ابدأ الجولة التعريفية' : 'Start Guided Demo'}
              {language === 'ar' ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 h-14 w-full sm:w-auto bg-white" onClick={login}>
              {t.loginDemo}
            </Button>
          </div>
          
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> {language === 'ar' ? 'مصمم خصيصاً للسوق العربي' : 'Built for the MENA market'}</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> {language === 'ar' ? 'جاهز للعمل في 5 دقائق' : 'Ready in 5 minutes'}</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> {language === 'ar' ? 'مساعد ذكي مدمج' : 'Built-in AI Copilot'}</div>
          </div>
        </motion.div>

        {/* Mock Dashboard Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full mt-20 relative max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent z-10 h-full w-full" />
          <div className="rounded-t-2xl border border-slate-200/60 bg-white shadow-2xl overflow-hidden">
            <div className="h-12 border-b bg-slate-50/50 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="p-8 grid grid-cols-4 gap-6 opacity-80">
              <div className="col-span-1 space-y-4">
                <div className="h-8 bg-slate-100 rounded w-3/4" />
                <div className="h-4 bg-slate-100 rounded w-1/2" />
                <div className="h-4 bg-slate-100 rounded w-2/3" />
                <div className="h-4 bg-slate-100 rounded w-1/2" />
              </div>
              <div className="col-span-3 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-24 bg-slate-100 rounded-xl" />
                  <div className="h-24 bg-slate-100 rounded-xl" />
                  <div className="h-24 bg-slate-100 rounded-xl" />
                </div>
                <div className="h-64 bg-slate-100 rounded-xl" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Value Proposition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-24 w-full text-start border-t border-slate-200 mt-10">
          <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">{language === 'ar' ? 'عمليات تشغيلية سلسة' : 'Seamless Operations'}</h3>
            <p className="text-slate-600 leading-relaxed">{language === 'ar' ? 'إدارة الدفعات، جدولة الجلسات، وتسجيل الحضور والغياب في مكان واحد مخصص لاحتياجات مراكز التدريب.' : 'Manage cohorts, schedule sessions, and record attendance in one place tailored for training centers.'}</p>
          </div>
          <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-6">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">{language === 'ar' ? 'تجربة تعلم متكاملة' : 'Integrated Learning'}</h3>
            <p className="text-slate-600 leading-relaxed">{language === 'ar' ? 'مساحة عمل مخصصة لكل برنامج تحتوي على الفيديوهات، المواد العلمية، ومساعد ذكي لدعم المتدربين والمدربين.' : 'Dedicated workspace for each program with videos, materials, and an AI copilot to support learners and trainers.'}</p>
          </div>
          <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 mb-6">
              <LineChart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">{language === 'ar' ? 'تقارير الأثر المجتمعي' : 'Impact Reporting'}</h3>
            <p className="text-slate-600 leading-relaxed">{language === 'ar' ? 'تتبع نسب الإنجاز، التحصيل المالي، واستخرج تقارير احترافية تعكس أثر برامجك لتقديمها للجهات المانحة.' : 'Track completion rates, financial collection, and extract professional reports for donors and stakeholders.'}</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t bg-white text-center">
        <p className="text-slate-500 text-sm">© 2024 OptimaTech. {language === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
      </footer>
    </div>
  );
}
