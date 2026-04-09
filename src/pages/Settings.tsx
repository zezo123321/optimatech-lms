import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../lib/i18n';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Building2, Palette, Globe, Users, Upload, CheckCircle2 } from 'lucide-react';

export function Settings() {
  const { language, setLanguage, currentOrg } = useAppContext();
  const t = translations[language];
  const [primaryColor, setPrimaryColor] = useState('#2563eb');

  const handleSave = () => {
    toast.success(
      language === 'ar' 
        ? 'تم حفظ الإعدادات بنجاح' 
        : 'Settings saved successfully'
    );
  };

  const handleLanguageChange = (lang: 'ar' | 'en') => {
    setLanguage(lang);
    toast.success(
      lang === 'ar' 
        ? 'تم تغيير اللغة إلى العربية' 
        : 'Language changed to English'
    );
  };

  return (
    <div className="space-y-8 pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">{t.settings}</h1>
          <p className="text-slate-500 mt-1">{language === 'ar' ? 'إدارة إعدادات المؤسسة والهوية البصرية' : 'Manage organization settings and branding'}</p>
        </div>
        <Button className="shadow-sm" onClick={handleSave}>{t.save}</Button>
      </div>

      <Tabs defaultValue="branding" className="w-full">
        <TabsList className="bg-slate-100/50 p-1 h-auto flex-wrap justify-start rounded-xl mb-8">
          <TabsTrigger value="profile" className="gap-2 py-2.5 px-5 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Building2 className="w-4 h-4" />
            {language === 'ar' ? 'ملف المؤسسة' : 'Profile'}
          </TabsTrigger>
          <TabsTrigger value="branding" className="gap-2 py-2.5 px-5 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Palette className="w-4 h-4" />
            {t.branding}
          </TabsTrigger>
          <TabsTrigger value="language" className="gap-2 py-2.5 px-5 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Globe className="w-4 h-4" />
            {t.language}
          </TabsTrigger>
          <TabsTrigger value="team" className="gap-2 py-2.5 px-5 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Users className="w-4 h-4" />
            {t.teamManagement}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="border-none shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg">{language === 'ar' ? 'معلومات المؤسسة' : 'Organization Information'}</CardTitle>
              <CardDescription>{language === 'ar' ? 'إدارة المعلومات الأساسية لمؤسستك' : 'Manage your organization basic information'}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>{language === 'ar' ? 'اسم المؤسسة (بالعربية)' : 'Org Name (Arabic)'}</Label>
                  <Input defaultValue={currentOrg.nameAr} />
                </div>
                <div className="space-y-2">
                  <Label>{language === 'ar' ? 'اسم المؤسسة (بالإنجليزية)' : 'Org Name (English)'}</Label>
                  <Input defaultValue={currentOrg.nameEn} />
                </div>
                <div className="space-y-2">
                  <Label>{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</Label>
                  <Input defaultValue="info@academy.eg" />
                </div>
                <div className="space-y-2">
                  <Label>{language === 'ar' ? 'رقم الهاتف' : 'Phone'}</Label>
                  <Input defaultValue="+20 100 123 4567" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{language === 'ar' ? 'العنوان' : 'Address'}</Label>
                <Input defaultValue="القاهرة، مصر" />
              </div>
              <Button onClick={handleSave}>{t.save}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-none shadow-sm bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">{t.logoUpload}</CardTitle>
                  <CardDescription>{language === 'ar' ? 'ارفع شعار مؤسستك ليظهر في المنصة والشهادات' : 'Upload your logo to appear in the platform and certificates'}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50 text-slate-400 shrink-0">
                      <Building2 className="w-10 h-10 opacity-50" />
                    </div>
                    <div className="space-y-3 text-center sm:text-start w-full">
                      <Button variant="outline" className="gap-2 w-full sm:w-auto" onClick={() => toast.info(language === 'ar' ? 'جاري فتح نافذة اختيار الملفات...' : 'Opening file picker...')}>
                        <Upload className="w-4 h-4" />
                        {language === 'ar' ? 'اختر صورة' : 'Choose Image'}
                      </Button>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {language === 'ar' ? 'يفضل أن تكون بصيغة PNG بخلفية شفافة. أقصى حجم 2MB.' : 'Preferably PNG with transparent background. Max 2MB.'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">{t.colorSelection}</CardTitle>
                  <CardDescription>{language === 'ar' ? 'اختر اللون الأساسي ليتناسب مع هويتك البصرية' : 'Choose the primary color to match your brand'}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg shadow-inner border border-slate-200" style={{ backgroundColor: primaryColor }} />
                    <Input 
                      type="color" 
                      value={primaryColor} 
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-24 h-10 p-1 cursor-pointer"
                    />
                    <Input 
                      type="text" 
                      value={primaryColor} 
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-32 font-mono uppercase"
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100">
                    {['#2563eb', '#10b981', '#8b5cf6', '#f97316', '#e11d48', '#0f172a'].map(color => (
                      <button
                        key={color}
                        className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${primaryColor === color ? 'border-slate-900 scale-110' : 'border-transparent'}`}
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          setPrimaryColor(color);
                          toast.success(language === 'ar' ? 'تم تحديث اللون الأساسي' : 'Primary color updated');
                        }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-white">
                <CardHeader>
                  <CardTitle className="text-lg">{language === 'ar' ? 'إزالة علامة OptimaTech' : 'Remove OptimaTech Branding'}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{language === 'ar' ? 'تفعيل العلامة البيضاء (White-label)' : 'Enable White-label'}</p>
                    <p className="text-xs text-slate-500">{language === 'ar' ? 'متاح فقط في الباقة الاحترافية' : 'Available only in Pro plan'}</p>
                  </div>
                  <Switch disabled onClick={() => toast.error(language === 'ar' ? 'قم بترقية الباقة لتفعيل هذه الميزة' : 'Upgrade your plan to enable this feature')} />
                </CardContent>
              </Card>
            </div>

            {/* Live Preview */}
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">{language === 'ar' ? 'معاينة حية' : 'Live Preview'}</h3>
                <Card className="border border-slate-200 shadow-xl overflow-hidden bg-white">
                  <div className="h-10 border-b bg-slate-50 flex items-center px-4 gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm" style={{ backgroundColor: primaryColor }}>
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div className="font-bold text-lg">{language === 'ar' ? currentOrg.nameAr : currentOrg.nameEn}</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="h-2 rounded bg-slate-100 w-full" />
                      <div className="h-2 rounded bg-slate-100 w-4/5" />
                      <div className="h-2 rounded bg-slate-100 w-3/4" />
                    </div>

                    <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                      <div className="flex items-center gap-2 text-sm font-medium mb-4" style={{ color: primaryColor }}>
                        <CheckCircle2 className="w-4 h-4" />
                        {language === 'ar' ? 'تم تسجيل الحضور بنجاح' : 'Attendance Recorded Successfully'}
                      </div>
                      <button 
                        className="w-full py-2.5 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90 shadow-sm"
                        style={{ backgroundColor: primaryColor }}
                        onClick={() => toast.success(language === 'ar' ? 'تم تأكيد الإجراء' : 'Action confirmed')}
                      >
                        {language === 'ar' ? 'تأكيد الإجراء' : 'Confirm Action'}
                      </button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="language" className="space-y-6">
          <Card className="border-none shadow-sm bg-white max-w-2xl">
            <CardHeader>
              <CardTitle className="text-lg">{t.language}</CardTitle>
              <CardDescription>{language === 'ar' ? 'اختر لغة واجهة المستخدم' : 'Choose the user interface language'}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div 
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${language === 'ar' ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 hover:bg-slate-50'}`}
                onClick={() => handleLanguageChange('ar')}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🇪🇬</div>
                  <div className="font-medium">العربية (Arabic)</div>
                </div>
                {language === 'ar' && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
              </div>
              <div 
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${language === 'en' ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 hover:bg-slate-50'}`}
                onClick={() => handleLanguageChange('en')}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🇬🇧</div>
                  <div className="font-medium">English</div>
                </div>
                {language === 'en' && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card className="border-none shadow-sm bg-white">
            <CardHeader>
              <CardTitle className="text-lg">{t.teamManagement}</CardTitle>
              <CardDescription>{language === 'ar' ? 'إدارة صلاحيات فريق العمل والمدربين' : 'Manage team and instructor permissions'}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-16 text-slate-500">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>{language === 'ar' ? 'هذه الميزة غير مفعلة في النسخة التجريبية.' : 'This feature is not enabled in the demo version.'}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
