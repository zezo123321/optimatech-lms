import { useAppContext } from '../context/AppContext';
import { translations } from '../lib/i18n';
import { mockCohorts, mockActivity, mockSessions } from '../data/mockData';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  BookOpen, 
  CheckCircle2, 
  Wallet,
  ArrowUpRight,
  Clock,
  Calendar as CalendarIcon,
  Plus,
  FileText,
  UserCheck,
  PlayCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

export function Dashboard() {
  const { language, setDemoStep } = useAppContext();
  const t = translations[language];

  const stats = [
    { label: t.activeCohorts, value: '12', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: t.enrolledLearners, value: '450', icon: Users, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: t.attendanceRate, value: '92%', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100' },
    { label: t.collectionRate, value: '85%', icon: Wallet, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  const chartData = [
    { name: 'Jan', attendance: 85, collection: 70 },
    { name: 'Feb', attendance: 88, collection: 75 },
    { name: 'Mar', attendance: 92, collection: 85 },
    { name: 'Apr', attendance: 90, collection: 80 },
    { name: 'May', attendance: 95, collection: 90 },
  ];

  return (
    <div className="space-y-8 pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">{t.dashboard}</h1>
          <p className="text-slate-500 mt-1">{language === 'ar' ? 'نظرة عامة على أداء برامجك التدريبية' : 'Overview of your training programs performance'}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setDemoStep(1)} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
            <PlayCircle className="w-4 h-4" />
            {language === 'ar' ? 'بدء الجولة التعريفية' : 'Start Guided Demo'}
          </Button>
          <Button className="gap-2 shadow-sm">
            <Plus className="w-4 h-4" />
            {t.newCohort}
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="outline" className="h-14 justify-start gap-3 bg-white hover:bg-slate-50 border-slate-200">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <UserCheck className="w-4 h-4" />
          </div>
          {t.recordAttendance}
        </Button>
        <Button variant="outline" className="h-14 justify-start gap-3 bg-white hover:bg-slate-50 border-slate-200">
          <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
            <Wallet className="w-4 h-4" />
          </div>
          {t.newInvoice}
        </Button>
        <Button variant="outline" className="h-14 justify-start gap-3 bg-white hover:bg-slate-50 border-slate-200">
          <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
            <FileText className="w-4 h-4" />
          </div>
          {language === 'ar' ? 'تقرير جديد' : 'New Report'}
        </Button>
        <Button variant="outline" className="h-14 justify-start gap-3 bg-white hover:bg-slate-50 border-slate-200">
          <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
            <Users className="w-4 h-4" />
          </div>
          {language === 'ar' ? 'إضافة متدرب' : 'Add Learner'}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm bg-white">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <h3 className="text-3xl font-light text-slate-900">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts */}
        <Card className="lg:col-span-2 border-none shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg">{language === 'ar' ? 'نظرة عامة على الأداء' : 'Performance Overview'}</CardTitle>
            <CardDescription>{language === 'ar' ? 'مقارنة بين نسب الحضور والتحصيل المالي' : 'Comparison between attendance and collection rates'}</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="attendance" name={t.attendanceRate} stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="collection" name={t.collectionRate} stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        <Card className="border-none shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg">{t.upcomingSessions}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockSessions.map((session) => (
              <div key={session.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-white border flex flex-col items-center justify-center shrink-0 shadow-sm">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">{session.date.split('-')[1]}</span>
                  <span className="text-sm font-bold leading-none text-slate-900">{session.date.split('-')[2]}</span>
                </div>
                <div className="min-w-0 pt-1">
                  <p className="text-sm font-bold truncate text-slate-900">{language === 'ar' ? session.titleAr : session.titleEn}</p>
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>{session.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="border-none shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg">{t.recentActivity}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 relative before:absolute before:inset-0 before:ms-7 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {mockActivity.map((activity, i) => (
              <div key={i} className="flex gap-4 relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 border-white shadow-sm ${
                  activity.type === 'attendance' ? 'bg-blue-100 text-blue-600' : 
                  activity.type === 'payment' ? 'bg-green-100 text-green-600' : 
                  activity.type === 'enrollment' ? 'bg-purple-100 text-purple-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  {activity.type === 'attendance' ? <CheckCircle2 className="w-4 h-4" /> : 
                   activity.type === 'payment' ? <Wallet className="w-4 h-4" /> : 
                   activity.type === 'enrollment' ? <Users className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                </div>
                <div className="pt-1">
                  <p className="text-sm font-medium text-slate-700">{language === 'ar' ? activity.textAr : activity.textEn}</p>
                  <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Active Cohorts List */}
        <Card className="lg:col-span-2 border-none shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">{t.activeCohorts}</CardTitle>
            <Button variant="ghost" size="sm" className="gap-1 text-blue-600">
              {language === 'ar' ? 'عرض الكل' : 'View All'}
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCohorts.slice(0, 3).map((cohort) => (
                <div key={cohort.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{language === 'ar' ? cohort.nameAr : cohort.nameEn}</p>
                      <p className="text-sm text-slate-500 mt-0.5">{cohort.program} • {cohort.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-8 text-end hidden md:flex">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">{t.attendanceRate}</p>
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">{cohort.attendanceRate}%</Badge>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">{t.collectionRate}</p>
                      <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">{cohort.collectionRate}%</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
