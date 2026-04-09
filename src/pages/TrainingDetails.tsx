import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../lib/i18n';
import { mockCohorts, mockLearners, mockSessions, mockVideos, mockMaterials, mockInvoices } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, ArrowRight, Calendar, Users, PlayCircle, FileText, 
  CheckCircle2, Clock, MapPin, Sparkles, MessageSquare, BookOpen,
  TrendingUp, Wallet, Download, Search, AlertCircle, Plus
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function TrainingDetails() {
  const { language, activeProgramId, setActivePage, role } = useAppContext();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState('overview');
  const [aiChat, setAiChat] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [aiInput, setAiInput] = useState('');

  const program = mockCohorts.find(c => c.id === activeProgramId) || mockCohorts[0];
  const sessions = mockSessions.filter(s => s.cohortId === program.id);
  const videos = mockVideos.filter(v => sessions.some(s => s.id === v.sessionId));
  const materials = mockMaterials.filter(m => sessions.some(s => s.id === m.sessionId));

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    
    setAiChat(prev => [...prev, { role: 'user', text: aiInput }]);
    
    // Mock AI response
    setTimeout(() => {
      let response = '';
      if (role === 'admin' || role === 'manager') {
        response = language === 'ar' ? 'بناءً على البيانات، أنصح بالتواصل مع المتدربين الذين تقل نسبة حضورهم عن 70%. هل تريدني أن أصيغ رسالة لهم؟' : 'Based on the data, I recommend contacting learners with attendance below 70%. Would you like me to draft a message?';
      } else if (role === 'instructor') {
        response = language === 'ar' ? 'لقد قمت بإنشاء ملخص لجلسة "مقدمة في React". يمكنك مراجعته في قسم المواد.' : 'I have generated a summary for the "Intro to React" session. You can review it in the materials section.';
      } else {
        response = language === 'ar' ? 'للاستعداد للجلسة القادمة، أنصح بمراجعة فيديو "أساسيات البرمجة بلغة JS".' : 'To prepare for the next session, I recommend reviewing the "JS Programming Basics" video.';
      }
      setAiChat(prev => [...prev, { role: 'ai', text: response }]);
    }, 1000);
    
    setAiInput('');
  };

  const aiPrompts = role === 'instructor' || role === 'admin' || role === 'manager' ? [
    language === 'ar' ? 'تلخيص الجلسة الأخيرة' : 'Summarize last session',
    language === 'ar' ? 'تحديد المتدربين المعرضين للخطر' : 'Identify at-risk learners',
    language === 'ar' ? 'إنشاء أسئلة اختبار' : 'Generate quiz questions',
  ] : [
    language === 'ar' ? 'اشرح لي هذا المفهوم' : 'Explain this concept',
    language === 'ar' ? 'ماذا يجب أن أدرس تالياً؟' : 'What should I study next?',
    language === 'ar' ? 'اختبرني في هذا الفيديو' : 'Quiz me on this video',
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Back Button */}
      <Button variant="ghost" className="gap-2 -ml-2 text-slate-500" onClick={() => setActivePage('programs')}>
        {language === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
        {language === 'ar' ? 'العودة للبرامج' : 'Back to Programs'}
      </Button>

      {/* Hero Section */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className={program.status === 'active' ? 'bg-green-100 text-green-700 hover:bg-green-100 border-none' : program.status === 'completed' ? 'bg-slate-100 text-slate-700 hover:bg-slate-100 border-none' : 'bg-orange-100 text-orange-700 hover:bg-orange-100 border-none'}>
                {language === 'ar' ? (program.status === 'active' ? 'نشط' : program.status === 'completed' ? 'مكتمل' : 'قادم') : (program.status === 'active' ? 'Active' : program.status === 'completed' ? 'Completed' : 'Upcoming')}
              </Badge>
              <Badge variant="outline" className="text-slate-600 border-slate-200">{program.program}</Badge>
              <span className="text-sm text-slate-500 font-medium">{language === 'ar' ? program.organizationAr : program.organizationEn}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              {language === 'ar' ? program.nameAr : program.nameEn}
            </h1>
            
            <p className="text-slate-600 text-lg leading-relaxed">
              {language === 'ar' ? program.descriptionAr : program.descriptionEn}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 pt-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{program.startDate} — {program.endDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{language === 'ar' ? (program.deliveryMode === 'online' ? 'أونلاين' : program.deliveryMode === 'hybrid' ? 'مدمج' : 'حضور شخصي') : (program.deliveryMode === 'online' ? 'Online' : program.deliveryMode === 'hybrid' ? 'Hybrid' : 'Onsite')} - {program.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-400" />
                <span>{language === 'ar' ? program.instructorAr : program.instructorEn}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 min-w-[200px]">
            <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700">
              <PlayCircle className="w-4 h-4" />
              {language === 'ar' ? 'بدء الجلسة القادمة' : 'Start Next Session'}
            </Button>
            <Button variant="outline" className="w-full gap-2" onClick={() => setActiveTab('ai')}>
              <Sparkles className="w-4 h-4 text-purple-600" />
              {language === 'ar' ? 'المساعد الذكي' : 'AI Assistant'}
            </Button>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100">
          <div>
            <p className="text-sm text-slate-500 mb-1">{t.learners}</p>
            <p className="text-2xl font-bold text-slate-900">{program.learnersCount}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 mb-1">{t.attendanceRate}</p>
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-slate-900">{program.attendanceRate}%</p>
              <span className="text-xs text-green-600 mb-1 flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> +2%</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-slate-500 mb-1">{language === 'ar' ? 'نسبة الإنجاز' : 'Completion'}</p>
            <p className="text-2xl font-bold text-slate-900">45%</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 mb-1">{language === 'ar' ? 'نسبة التحصيل' : 'Collection Rate'}</p>
            <p className="text-2xl font-bold text-slate-900">{program.collectionRate}%</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto bg-transparent border-b border-slate-200 rounded-none h-auto p-0 space-x-6 rtl:space-x-reverse">
          <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none bg-transparent px-2 py-3 shadow-none">{language === 'ar' ? 'نظرة عامة' : 'Overview'}</TabsTrigger>
          <TabsTrigger value="sessions" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none bg-transparent px-2 py-3 shadow-none">{t.sessions}</TabsTrigger>
          <TabsTrigger value="materials" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none bg-transparent px-2 py-3 shadow-none">{language === 'ar' ? 'الفيديوهات والمواد' : 'Videos & Materials'}</TabsTrigger>
          <TabsTrigger value="learners" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none bg-transparent px-2 py-3 shadow-none">{t.learners}</TabsTrigger>
          <TabsTrigger value="attendance" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none bg-transparent px-2 py-3 shadow-none">{t.attendance}</TabsTrigger>
          <TabsTrigger value="payments" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none bg-transparent px-2 py-3 shadow-none">{t.payments}</TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none bg-transparent px-2 py-3 shadow-none">{t.reports}</TabsTrigger>
          <TabsTrigger value="ai" className="data-[state=active]:border-b-2 data-[state=active]:border-purple-600 data-[state=active]:text-purple-600 rounded-none bg-transparent px-2 py-3 shadow-none flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {language === 'ar' ? 'المساعد الذكي' : 'AI Assistant'}
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">{language === 'ar' ? 'أهداف البرنامج' : 'Learning Objectives'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-slate-600">{language === 'ar' ? 'إتقان أساسيات تطوير الويب باستخدام HTML, CSS, JavaScript.' : 'Master web development basics using HTML, CSS, JavaScript.'}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-slate-600">{language === 'ar' ? 'بناء تطبيقات ويب تفاعلية باستخدام React.' : 'Build interactive web applications using React.'}</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-slate-600">{language === 'ar' ? 'فهم كيفية التعامل مع قواعد البيانات وبناء واجهات برمجة التطبيقات (APIs).' : 'Understand how to work with databases and build APIs.'}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">{language === 'ar' ? 'الجدول الزمني' : 'Timeline'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                      {sessions.map((session, i) => (
                        <div key={session.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-100 text-blue-600 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                            {session.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                          </div>
                          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-bold text-slate-900">{language === 'ar' ? session.titleAr : session.titleEn}</h3>
                              <span className="text-xs font-medium text-slate-500">{session.date}</span>
                            </div>
                            <p className="text-sm text-slate-500">{language === 'ar' ? session.instructorAr : session.instructorEn}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="border-none shadow-sm bg-blue-50/50">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                      {language === 'ar' ? 'رؤى المساعد الذكي' : 'AI Insights'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {language === 'ar' ? 'معدل الحضور ممتاز (92%). هناك 3 متدربين تغيبوا عن الجلسة الأخيرة، أنصح بإرسال رسالة تذكير لهم.' : 'Attendance rate is excellent (92%). 3 learners missed the last session, I recommend sending them a reminder.'}
                      </p>
                      <Button variant="link" className="px-0 h-auto text-blue-600 mt-2 text-xs">{language === 'ar' ? 'صياغة رسالة' : 'Draft message'}</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">{language === 'ar' ? 'إعلانات حديثة' : 'Recent Announcements'}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-l-2 border-blue-500 pl-4 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4 py-1">
                      <p className="font-medium text-sm text-slate-900">{language === 'ar' ? 'تغيير موعد الجلسة القادمة' : 'Next session time change'}</p>
                      <p className="text-xs text-slate-500 mt-1">2 days ago</p>
                    </div>
                    <div className="border-l-2 border-slate-200 pl-4 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4 py-1">
                      <p className="font-medium text-sm text-slate-900">{language === 'ar' ? 'تم رفع مواد الجلسة الأولى' : 'Session 1 materials uploaded'}</p>
                      <p className="text-xs text-slate-500 mt-1">1 week ago</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions" className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-lg">{t.sessions}</CardTitle>
                  <CardDescription>{language === 'ar' ? 'إدارة الجلسات والمحتوى المرتبط بها' : 'Manage sessions and related content'}</CardDescription>
                </div>
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  {language === 'ar' ? 'جلسة جديدة' : 'New Session'}
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/50">
                      <TableHead>{language === 'ar' ? 'العنوان' : 'Title'}</TableHead>
                      <TableHead>{t.date}</TableHead>
                      <TableHead>{language === 'ar' ? 'المدرب' : 'Instructor'}</TableHead>
                      <TableHead>{t.status}</TableHead>
                      <TableHead className="text-center">{t.actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell className="font-medium">{language === 'ar' ? session.titleAr : session.titleEn}</TableCell>
                        <TableCell className="text-sm text-slate-600">{session.date} • {session.time}</TableCell>
                        <TableCell>{language === 'ar' ? session.instructorAr : session.instructorEn}</TableCell>
                        <TableCell>
                          <Badge variant={session.status === 'completed' ? 'secondary' : 'outline'} className={session.status === 'completed' ? 'bg-slate-100 text-slate-700 border-none' : 'text-blue-600 border-blue-200 bg-blue-50'}>
                            {session.status === 'completed' ? (language === 'ar' ? 'مكتمل' : 'Completed') : (language === 'ar' ? 'قادم' : 'Upcoming')}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Button variant="ghost" size="sm">{language === 'ar' ? 'التفاصيل' : 'Details'}</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Videos & Materials Tab */}
          <TabsContent value="materials" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input placeholder={language === 'ar' ? 'البحث في المحتوى...' : 'Search content...'} className="ps-10 bg-white" />
              </div>
              <Button variant="outline" className="gap-2 bg-white">
                <Plus className="w-4 h-4" />
                {language === 'ar' ? 'رفع محتوى' : 'Upload Content'}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map(video => (
                <Card key={video.id} className="border-none shadow-sm overflow-hidden group cursor-pointer">
                  <div className="relative h-48 bg-slate-100">
                    <img src={video.thumbnail} alt={video.titleEn} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-slate-900 line-clamp-2 mb-2">{language === 'ar' ? video.titleAr : video.titleEn}</h3>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{language === 'ar' ? video.uploadedByAr : video.uploadedByEn}</span>
                      <span>{video.uploadDate}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {video.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h3 className="text-lg font-bold mt-8 mb-4">{language === 'ar' ? 'الملفات والمستندات' : 'Files & Documents'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {materials.map(material => (
                <div key={material.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-slate-900">{language === 'ar' ? material.titleAr : material.titleEn}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{material.type} • {material.size} • {material.uploadDate}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* AI Assistant Tab */}
          <TabsContent value="ai" className="h-[600px] flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{language === 'ar' ? 'المساعد الذكي لـ OptimaTech' : 'OptimaTech AI Assistant'}</h3>
                <p className="text-xs text-slate-500">{language === 'ar' ? 'مدعوم بالذكاء الاصطناعي لمساعدتك في إدارة البرنامج' : 'Powered by AI to help you manage the program'}</p>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none p-4 shadow-sm max-w-[80%]">
                  <p className="text-sm text-slate-700">
                    {language === 'ar' 
                      ? `مرحباً بك في مساحة عمل "${program.nameAr}". كيف يمكنني مساعدتك اليوم؟` 
                      : `Welcome to the "${program.nameEn}" workspace. How can I help you today?`}
                  </p>
                </div>
              </div>

              {aiChat.map((msg, idx) => (
                <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                    {msg.role === 'user' ? <Users className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  </div>
                  <div className={`border rounded-2xl p-4 shadow-sm max-w-[80%] ${msg.role === 'user' ? 'bg-blue-600 text-white border-blue-600 rounded-tr-none' : 'bg-white border-slate-100 text-slate-700 rounded-tl-none'}`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-100 bg-white">
              <div className="flex flex-wrap gap-2 mb-4">
                {aiPrompts.map((prompt, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setAiInput(prompt)}
                    className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <form onSubmit={handleAiSubmit} className="relative">
                <Input 
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder={language === 'ar' ? 'اسأل المساعد الذكي...' : 'Ask AI Assistant...'} 
                  className="pr-12 py-6 bg-slate-50 border-slate-200 focus-visible:ring-purple-500"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-700 h-8 w-8 rounded-full"
                  disabled={!aiInput.trim()}
                >
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Button>
              </form>
            </div>
          </TabsContent>

          {/* Placeholder for other tabs to keep it concise for the prototype */}
          <TabsContent value="learners">
            <Card className="border-none shadow-sm"><CardContent className="p-12 text-center text-slate-500">{language === 'ar' ? 'قائمة المتدربين الخاصة بهذا البرنامج' : 'Learners list for this program'}</CardContent></Card>
          </TabsContent>
          <TabsContent value="attendance">
            <Card className="border-none shadow-sm"><CardContent className="p-12 text-center text-slate-500">{language === 'ar' ? 'سجل الحضور الخاص بهذا البرنامج' : 'Attendance record for this program'}</CardContent></Card>
          </TabsContent>
          <TabsContent value="payments">
            <Card className="border-none shadow-sm"><CardContent className="p-12 text-center text-slate-500">{language === 'ar' ? 'سجل المدفوعات الخاص بهذا البرنامج' : 'Payments record for this program'}</CardContent></Card>
          </TabsContent>
          <TabsContent value="reports">
            <Card className="border-none shadow-sm"><CardContent className="p-12 text-center text-slate-500">{language === 'ar' ? 'تقارير الأداء الخاصة بهذا البرنامج' : 'Performance reports for this program'}</CardContent></Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
