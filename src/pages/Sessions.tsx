import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../lib/i18n';
import { mockSessions } from '../data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Calendar as CalendarIcon, Clock, User, MapPin, CheckCircle2 } from 'lucide-react';

export function Sessions() {
  const { language, demoStep, setDemoStep, setActivePage } = useAppContext();
  const t = translations[language];
  const [isNewSessionOpen, setIsNewSessionOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCreate = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsNewSessionOpen(false);
      if (demoStep === 3) {
        setDemoStep(4);
      }
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{t.sessions}</h1>
        <Button 
          id="new-session-btn"
          className={`gap-2 ${demoStep === 3 ? 'ring-4 ring-blue-500/50 animate-pulse' : ''}`}
          onClick={() => setIsNewSessionOpen(true)}
        >
          <Plus className="w-4 h-4" />
          {language === 'ar' ? 'جلسة جديدة' : 'New Session'}
        </Button>
      </div>

      <Dialog open={isNewSessionOpen} onOpenChange={(open) => {
        setIsNewSessionOpen(open);
        if (!open) setIsSuccess(false);
      }}>
        <DialogContent className="sm:max-w-[500px]">
          {isSuccess ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold">{language === 'ar' ? 'تم جدولة الجلسة بنجاح!' : 'Session Scheduled Successfully!'}</h2>
              <p className="text-slate-500">{language === 'ar' ? 'تمت إضافة "مقدمة في React" إلى جدولك.' : '"Introduction to React" has been added to your schedule.'}</p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>{language === 'ar' ? 'جدولة جلسة جديدة' : 'Schedule New Session'}</DialogTitle>
                <DialogDescription>
                  {language === 'ar' ? 'أدخل تفاصيل الجلسة التدريبية.' : 'Enter the details for the training session.'}
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <Label>{language === 'ar' ? 'عنوان الجلسة' : 'Session Title'}</Label>
                  <Input defaultValue={language === 'ar' ? 'مقدمة في React' : 'Introduction to React'} />
                </div>
                <div className="space-y-2">
                  <Label>{language === 'ar' ? 'البرنامج / الدفعة' : 'Program / Cohort'}</Label>
                  <Select defaultValue="1">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">{language === 'ar' ? 'معسكر تطوير الويب - الدفعة 6' : 'Web Development Bootcamp - Cohort 6'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{language === 'ar' ? 'التاريخ' : 'Date'}</Label>
                    <Input type="date" defaultValue="2024-09-15" />
                  </div>
                  <div className="space-y-2">
                    <Label>{language === 'ar' ? 'الوقت' : 'Time'}</Label>
                    <Input type="time" defaultValue="10:00" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{language === 'ar' ? 'المدرب' : 'Instructor'}</Label>
                    <Select defaultValue="1">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">{language === 'ar' ? 'د. محمد علي' : 'Dr. Mohamed Ali'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{language === 'ar' ? 'القاعة / الرابط' : 'Room / Link'}</Label>
                    <Input defaultValue="Room A" />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewSessionOpen(false)}>{language === 'ar' ? 'إلغاء' : 'Cancel'}</Button>
                <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700">
                  {language === 'ar' ? 'جدولة الجلسة' : 'Schedule Session'}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        {mockSessions.map((session) => (
          <Card key={session.id} className="border-none shadow-sm hover:bg-slate-50/50 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-primary/5 text-primary shrink-0">
                  <span className="text-xs font-bold uppercase">{session.date.split('-')[1]}</span>
                  <span className="text-3xl font-black leading-none">{session.date.split('-')[2]}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold truncate">{language === 'ar' ? session.titleAr : session.titleEn}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4" />
                      <span>{language === 'ar' ? session.instructorAr : session.instructorEn}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      <span>القاهرة - المقر الرئيسي</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">{language === 'ar' ? 'تعديل' : 'Edit'}</Button>
                  <Button 
                    size="sm"
                    id={session.id === '1' ? 'record-attendance-btn' : undefined}
                    className={session.id === '1' && demoStep === 4 ? 'ring-4 ring-blue-500/50 animate-pulse' : ''}
                    onClick={() => setActivePage('attendance')}
                  >
                    {t.attendance}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
