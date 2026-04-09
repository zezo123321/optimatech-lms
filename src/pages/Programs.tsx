import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../lib/i18n';
import { mockCohorts } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { Plus, Users, Calendar, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export function Programs() {
  const { language, demoStep, setDemoStep } = useAppContext();
  const t = translations[language];
  const [isNewCohortOpen, setIsNewCohortOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCreate = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsNewCohortOpen(false);
      setStep(1);
      if (demoStep === 1) {
        setDemoStep(2);
      }
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{t.programs}</h1>
        <Button 
          id="new-cohort-btn"
          className={`gap-2 ${demoStep === 1 ? 'ring-4 ring-blue-500/50 animate-pulse' : ''}`}
          onClick={() => setIsNewCohortOpen(true)}
        >
          <Plus className="w-4 h-4" />
          {language === 'ar' ? 'دفعة جديدة' : 'New Cohort'}
        </Button>
      </div>

      <Dialog open={isNewCohortOpen} onOpenChange={(open) => {
        setIsNewCohortOpen(open);
        if (!open) {
          setStep(1);
          setIsSuccess(false);
        }
      }}>
        <DialogContent className="sm:max-w-[500px]">
          {isSuccess ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold">{language === 'ar' ? 'تم إنشاء الدفعة بنجاح!' : 'Cohort Created Successfully!'}</h2>
              <p className="text-slate-500">{language === 'ar' ? 'تمت إضافة "معسكر تطوير الويب - الدفعة 6" إلى برامجك.' : '"Web Development Bootcamp - Cohort 6" has been added to your programs.'}</p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>{language === 'ar' ? 'إنشاء دفعة جديدة' : 'Create New Cohort'}</DialogTitle>
                <DialogDescription>
                  {language === 'ar' ? 'أدخل تفاصيل البرنامج التدريبي الجديد.' : 'Enter the details for the new training program.'}
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                {step === 1 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    <div className="space-y-2">
                      <Label>{language === 'ar' ? 'اسم البرنامج / الدفعة' : 'Program / Cohort Name'}</Label>
                      <Input defaultValue={language === 'ar' ? 'معسكر تطوير الويب - الدفعة 6' : 'Web Development Bootcamp - Cohort 6'} />
                    </div>
                    <div className="space-y-2">
                      <Label>{language === 'ar' ? 'المنظمة' : 'Organization'}</Label>
                      <Select defaultValue="1">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">{language === 'ar' ? 'أكاديمية التدريب المصرية' : 'Egyptian Training Academy'}</SelectItem>
                          <SelectItem value="2">{language === 'ar' ? 'مؤسسة مصر الخير' : 'Misr El Kheir Foundation'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>{language === 'ar' ? 'تاريخ البدء' : 'Start Date'}</Label>
                        <Input type="date" defaultValue="2024-09-01" />
                      </div>
                      <div className="space-y-2">
                        <Label>{language === 'ar' ? 'تاريخ الانتهاء' : 'End Date'}</Label>
                        <Input type="date" defaultValue="2024-12-01" />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                    <div className="space-y-2">
                      <Label>{language === 'ar' ? 'المدرب الرئيسي' : 'Lead Instructor'}</Label>
                      <Select defaultValue="1">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">{language === 'ar' ? 'د. محمد علي' : 'Dr. Mohamed Ali'}</SelectItem>
                          <SelectItem value="2">{language === 'ar' ? 'م. سارة حسن' : 'Eng. Sarah Hassan'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>{language === 'ar' ? 'الموقع / طريقة التقديم' : 'Location / Delivery Mode'}</Label>
                      <Select defaultValue="hybrid">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="online">{language === 'ar' ? 'أونلاين' : 'Online'}</SelectItem>
                          <SelectItem value="offline">{language === 'ar' ? 'حضور شخصي (القاهرة)' : 'In-person (Cairo)'}</SelectItem>
                          <SelectItem value="hybrid">{language === 'ar' ? 'مدمج' : 'Hybrid'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>{language === 'ar' ? 'العدد المستهدف للمتدربين' : 'Target Learner Count'}</Label>
                      <Input type="number" defaultValue="25" />
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter className="flex justify-between sm:justify-between">
                <div className="flex gap-1 items-center">
                  <div className={`w-2 h-2 rounded-full ${step === 1 ? 'bg-blue-600' : 'bg-slate-200'}`} />
                  <div className={`w-2 h-2 rounded-full ${step === 2 ? 'bg-blue-600' : 'bg-slate-200'}`} />
                </div>
                <div className="flex gap-2">
                  {step === 2 && (
                    <Button variant="outline" onClick={() => setStep(1)}>
                      {language === 'ar' ? 'السابق' : 'Back'}
                    </Button>
                  )}
                  {step === 1 ? (
                    <Button onClick={() => setStep(2)}>
                      {language === 'ar' ? 'التالي' : 'Next'}
                    </Button>
                  ) : (
                    <Button onClick={handleCreate} className="bg-blue-600 hover:bg-blue-700">
                      {language === 'ar' ? 'إنشاء الدفعة' : 'Create Cohort'}
                    </Button>
                  )}
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCohorts.map((cohort) => (
          <Card key={cohort.id} className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-none">
                  {cohort.program}
                </Badge>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">
                  {language === 'ar' ? 'نشط' : 'Active'}
                </Badge>
              </div>
              <CardTitle className="text-xl mt-4 group-hover:text-primary transition-colors">
                {language === 'ar' ? cohort.nameAr : cohort.nameEn}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 opacity-50" />
                  <span>{cohort.learnersCount} {t.learners}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 opacity-50" />
                  <span>{cohort.startDate}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-500">{t.attendanceRate}</span>
                  <span className="text-green-600">{cohort.attendanceRate}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${cohort.attendanceRate}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2 text-primary font-bold text-sm">
                {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
