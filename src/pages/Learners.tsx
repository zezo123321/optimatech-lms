import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../lib/i18n';
import { mockLearners } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription 
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus, FileUp, MoreVertical, Mail, Phone, Calendar, CreditCard, CheckCircle2, AlertCircle, UploadCloud } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';

export function Learners() {
  const { language, demoStep, setDemoStep } = useAppContext();
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLearner, setSelectedLearner] = useState<any>(null);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [importStep, setImportStep] = useState(1);

  const filteredLearners = mockLearners.filter(l => 
    l.nameAr.includes(searchTerm) || l.nameEn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImport = () => {
    setImportStep(3); // Success state
    setTimeout(() => {
      setIsImportOpen(false);
      setImportStep(1);
      if (demoStep === 2) {
        setDemoStep(3);
      }
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">{t.learners}</h1>
        <div className="flex gap-2">
          <Button 
            id="import-learners-btn"
            variant="outline" 
            className={`gap-2 ${demoStep === 2 ? 'ring-4 ring-blue-500/50 animate-pulse border-blue-500' : ''}`} 
            onClick={() => setIsImportOpen(true)}
          >
            <FileUp className="w-4 h-4" />
            {t.import}
          </Button>
          <Button className="gap-2">
            <UserPlus className="w-4 h-4" />
            {language === 'ar' ? 'إضافة متدرب' : 'Add Learner'}
          </Button>
        </div>
      </div>

      <Dialog open={isImportOpen} onOpenChange={(open) => {
        setIsImportOpen(open);
        if (!open) setImportStep(1);
      }}>
        <DialogContent className="sm:max-w-[600px]">
          {importStep === 3 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold">{language === 'ar' ? 'تم الاستيراد بنجاح!' : 'Import Successful!'}</h2>
              <div className="flex gap-4 mt-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 min-w-[120px]">
                  <p className="text-3xl font-bold text-green-600">25</p>
                  <p className="text-xs text-slate-500 mt-1">{language === 'ar' ? 'تمت الإضافة' : 'Added'}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 min-w-[120px]">
                  <p className="text-3xl font-bold text-orange-500">2</p>
                  <p className="text-xs text-slate-500 mt-1">{language === 'ar' ? 'مكرر (تم التحديث)' : 'Duplicates (Updated)'}</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>{language === 'ar' ? 'استيراد المتدربين' : 'Import Learners'}</DialogTitle>
                <DialogDescription>
                  {language === 'ar' ? 'قم برفع ملف Excel أو CSV لنقل بيانات المتدربين.' : 'Upload an Excel or CSV file to migrate learner data.'}
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                {importStep === 1 && (
                  <div 
                    className="py-12 border-2 border-dashed border-blue-200 rounded-xl flex flex-col items-center justify-center bg-blue-50/50 hover:bg-blue-50 transition-colors cursor-pointer text-blue-600"
                    onClick={() => setImportStep(2)}
                  >
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                      <UploadCloud className="w-8 h-8" />
                    </div>
                    <p className="text-base font-bold">{language === 'ar' ? 'انقر لرفع الملف' : 'Click to upload file'}</p>
                    <p className="text-xs text-slate-500 mt-2">{language === 'ar' ? 'يدعم صيغ .csv, .xlsx' : 'Supports .csv, .xlsx'}</p>
                  </div>
                )}

                {importStep === 2 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-100 rounded-lg">
                      <div className="flex items-center gap-3 text-green-700">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="font-medium text-sm">{language === 'ar' ? 'تم قراءة الملف: learners_cohort6.xlsx' : 'File read: learners_cohort6.xlsx'}</span>
                      </div>
                      <Badge variant="secondary" className="bg-white">{language === 'ar' ? '27 صف' : '27 rows'}</Badge>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-bold">{language === 'ar' ? 'مطابقة الأعمدة' : 'Column Mapping'}</h4>
                      <div className="border rounded-lg overflow-hidden">
                        <Table>
                          <TableHeader className="bg-slate-50">
                            <TableRow>
                              <TableHead>{language === 'ar' ? 'عمود الملف' : 'File Column'}</TableHead>
                              <TableHead>{language === 'ar' ? 'حقل النظام' : 'System Field'}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">Full_Name</TableCell>
                              <TableCell><Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Name</Badge></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Email_Address</TableCell>
                              <TableCell><Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Email</Badge></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">Phone_Num</TableCell>
                              <TableCell><Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Phone</Badge></TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsImportOpen(false)}>{language === 'ar' ? 'إلغاء' : 'Cancel'}</Button>
                {importStep === 2 && (
                  <Button onClick={handleImport} className="bg-blue-600 hover:bg-blue-700">
                    {language === 'ar' ? 'تأكيد الاستيراد' : 'Confirm Import'}
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Card className="border-none shadow-sm">
        <CardHeader className="pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder={Math.random() > 0.5 ? "Search by name or email..." : "ابحث بالاسم أو البريد الإلكتروني..."} 
              className="ps-10 bg-slate-50 border-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50">
                <TableHead className={language === 'ar' ? 'text-right' : 'text-left'}>{t.learners}</TableHead>
                <TableHead>{language === 'ar' ? 'رقم الهاتف' : 'Phone'}</TableHead>
                <TableHead className="text-center">{t.attendanceRate}</TableHead>
                <TableHead className="text-center">{t.status}</TableHead>
                <TableHead className="text-center">{t.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLearners.map((learner) => (
                <TableRow key={learner.id} className="cursor-pointer hover:bg-slate-50/50" onClick={() => setSelectedLearner(learner)}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-9 h-9 border">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${learner.id}`} />
                        <AvatarFallback>{learner.nameEn.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{language === 'ar' ? learner.nameAr : learner.nameEn}</p>
                        <p className="text-xs text-slate-500">{learner.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">{learner.phone}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm font-bold">{learner.attendance}%</span>
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${learner.attendance > 80 ? 'bg-green-500' : learner.attendance > 60 ? 'bg-orange-500' : 'bg-red-500'}`}
                          style={{ width: `${learner.attendance}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={learner.status === 'active' ? 'default' : 'secondary'} className={learner.status === 'active' ? 'bg-green-100 text-green-700 hover:bg-green-100 border-none' : ''}>
                      {learner.status === 'active' ? (language === 'ar' ? 'نشط' : 'Active') : (language === 'ar' ? 'غير نشط' : 'Inactive')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet open={!!selectedLearner} onOpenChange={(open) => !open && setSelectedLearner(null)}>
        <SheetContent className="w-full sm:max-w-md">
          {selectedLearner && (
            <div className="space-y-8 py-6">
              <div className="flex flex-col items-center text-center gap-4">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedLearner.id}`} />
                  <AvatarFallback>{selectedLearner.nameEn.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{language === 'ar' ? selectedLearner.nameAr : selectedLearner.nameEn}</h2>
                  <p className="text-slate-500">{selectedLearner.email}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Mail className="w-4 h-4" />
                    {language === 'ar' ? 'رسالة' : 'Message'}
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Phone className="w-4 h-4" />
                    {language === 'ar' ? 'اتصال' : 'Call'}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs font-medium">{t.attendanceRate}</span>
                  </div>
                  <p className="text-xl font-bold">{selectedLearner.attendance}%</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <CreditCard className="w-4 h-4" />
                    <span className="text-xs font-medium">{t.paidAmount}</span>
                  </div>
                  <p className="text-xl font-bold">{selectedLearner.paid} EGP</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold border-b pb-2">{language === 'ar' ? 'البرامج المسجلة' : 'Enrolled Programs'}</h3>
                <div className="p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Full Stack Development</p>
                    <p className="text-xs text-slate-500">Cohort: Cairo-2024</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none">In Progress</Badge>
                </div>
              </div>

              <div className="pt-6">
                <Button className="w-full" variant="outline">{language === 'ar' ? 'تعديل الملف الشخصي' : 'Edit Profile'}</Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
