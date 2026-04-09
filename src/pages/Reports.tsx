import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../lib/i18n';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Download, Filter, Target, Heart, Users, Award, Briefcase, MapPin, CheckCircle2 } from 'lucide-react';

export function Reports() {
  const { language, demoStep, setDemoStep } = useAppContext();
  const t = translations[language];
  const [isExporting, setIsExporting] = useState(false);

  const completionData = [
    { name: 'Completed', value: 75, color: '#10b981' },
    { name: 'In Progress', value: 20, color: '#3b82f6' },
    { name: 'Dropped', value: 5, color: '#ef4444' },
  ];

  const attendanceTrend = [
    { week: 'W1', rate: 85 },
    { week: 'W2', rate: 88 },
    { week: 'W3', rate: 92 },
    { week: 'W4', rate: 90 },
    { week: 'W5', rate: 94 },
    { week: 'W6', rate: 95 },
  ];

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      if (demoStep === 6) {
        setDemoStep(7); // End of demo
      }
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">{t.reports}</h1>
          <p className="text-slate-500 mt-1">{language === 'ar' ? 'تتبع الأداء وقياس الأثر المجتمعي لبرامجك' : 'Track performance and measure social impact of your programs'}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-white">
            <Filter className="w-4 h-4" />
            {language === 'ar' ? 'تصفية' : 'Filter'}
          </Button>
          <Button 
            id="export-report-btn"
            className={`gap-2 shadow-sm ${demoStep === 6 ? 'ring-4 ring-blue-500/50 animate-pulse bg-blue-600 hover:bg-blue-700' : ''}`}
            onClick={handleExport}
          >
            {isExporting ? <CheckCircle2 className="w-4 h-4" /> : <Download className="w-4 h-4" />}
            {isExporting ? (language === 'ar' ? 'تم التصدير' : 'Exported') : (language === 'ar' ? 'تصدير التقرير' : 'Export Report')}
          </Button>
        </div>
      </div>

      {/* Impact Widgets */}
      <h2 className="text-xl font-bold mt-8 mb-4 text-slate-900">{t.impactMetrics}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm bg-white overflow-hidden relative">
          <div className="absolute top-0 end-0 p-4 opacity-10">
            <Users className="w-16 h-16" />
          </div>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-slate-500 mb-2">{language === 'ar' ? 'إجمالي المستفيدين' : 'Total Beneficiaries'}</p>
            <h3 className="text-4xl font-light text-slate-900">1,250</h3>
            <p className="text-sm text-emerald-600 mt-2 font-medium">+120 {language === 'ar' ? 'هذا الربع' : 'this quarter'}</p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm bg-white overflow-hidden relative">
          <div className="absolute top-0 end-0 p-4 opacity-10">
            <Briefcase className="w-16 h-16" />
          </div>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-slate-500 mb-2">{language === 'ar' ? 'نسبة التوظيف' : 'Job Placement Rate'}</p>
            <h3 className="text-4xl font-light text-slate-900">68%</h3>
            <p className="text-sm text-slate-500 mt-2">{language === 'ar' ? 'من الخريجين خلال 3 أشهر' : 'of grads within 3 months'}</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white overflow-hidden relative">
          <div className="absolute top-0 end-0 p-4 opacity-10">
            <Target className="w-16 h-16" />
          </div>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-slate-500 mb-2">{language === 'ar' ? 'مشاركة الإناث' : 'Female Participation'}</p>
            <h3 className="text-4xl font-light text-slate-900">55%</h3>
            <p className="text-sm text-emerald-600 mt-2 font-medium">{language === 'ar' ? 'تجاوز الهدف (50%)' : 'Exceeded target (50%)'}</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white overflow-hidden relative">
          <div className="absolute top-0 end-0 p-4 opacity-10">
            <MapPin className="w-16 h-16" />
          </div>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-slate-500 mb-2">{language === 'ar' ? 'التغطية الجغرافية' : 'Geographic Reach'}</p>
            <h3 className="text-4xl font-light text-slate-900">8</h3>
            <p className="text-sm text-slate-500 mt-2">{language === 'ar' ? 'محافظات مصرية' : 'Egyptian Governorates'}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Completion Chart */}
        <Card className="border-none shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg">{t.completionRate}</CardTitle>
            <CardDescription>{language === 'ar' ? 'حالة المتدربين في البرامج الحالية' : 'Learner status in current programs'}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={completionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {completionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Trend */}
        <Card className="border-none shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg">{language === 'ar' ? 'مؤشر الحضور الأسبوعي' : 'Weekly Attendance Trend'}</CardTitle>
            <CardDescription>{language === 'ar' ? 'متوسط الحضور لجميع الدفعات' : 'Average attendance across all cohorts'}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceTrend} margin={{ top: 20, right: 0, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dx={-10} domain={[0, 100]} />
                  <Tooltip 
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="rate" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
