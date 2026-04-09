import { useAppContext } from '../context/AppContext';
import { translations } from '../lib/i18n';
import { toast } from 'sonner';
import { 
  Bell, 
  Globe, 
  UserCircle,
  ChevronDown,
  Building2
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export function Header() {
  const { language, setLanguage, role, setRole, currentOrg, setCurrentOrg, organizations } = useAppContext();
  const t = translations[language];

  const roles = [
    { id: 'admin', label: t.admin },
    { id: 'manager', label: t.manager },
    { id: 'instructor', label: t.instructor },
  ];

  const handleOrgChange = (org: any) => {
    setCurrentOrg(org);
    toast.success(
      language === 'ar' 
        ? `تم التبديل إلى ${org.nameAr}` 
        : `Switched to ${org.nameEn}`
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

  const handleRoleChange = (newRole: string, label: string) => {
    setRole(newRole as any);
    toast.success(
      language === 'ar' 
        ? `تم تغيير الصلاحية إلى ${label}` 
        : `Role changed to ${label}`
    );
  };

  return (
    <header className="h-16 border-b bg-white/80 backdrop-blur-md sticky top-0 z-10 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" className="gap-2 px-3" />}>
            <Building2 className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">{language === 'ar' ? currentOrg.nameAr : currentOrg.nameEn}</span>
            <ChevronDown className="w-4 h-4 opacity-50" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align={language === 'ar' ? 'end' : 'start'} className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>{t.organization}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {organizations.map((org) => (
                <DropdownMenuItem key={org.id} onClick={() => handleOrgChange(org)}>
                  {language === 'ar' ? org.nameAr : org.nameEn}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Badge variant="secondary" className="hidden lg:flex gap-1.5 px-2.5 py-0.5 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          {roles.find(r => r.id === role)?.label}
        </Badge>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="rounded-full" />}>
            <Globe className="w-5 h-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleLanguageChange('ar')}>العربية</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguageChange('en')}>English</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="rounded-full" />}>
            <UserCircle className="w-5 h-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>{t.role}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {roles.map((r) => (
                <DropdownMenuItem key={r.id} onClick={() => handleRoleChange(r.id, r.label)}>
                  <div className="flex items-center justify-between w-full">
                    {r.label}
                    {role === r.id && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="rounded-full relative" onClick={() => toast.info(language === 'ar' ? 'لا توجد إشعارات جديدة' : 'No new notifications')}>
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </Button>

        <div className="hidden sm:flex items-center gap-3 ps-2 border-s">
          <div className="text-end">
            <p className="text-sm font-semibold leading-none">زياد الشريف</p>
            <p className="text-xs text-slate-500 mt-1">zeyad@optimatech.com</p>
          </div>
          <Avatar className="w-9 h-9 border">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Zeyad" />
            <AvatarFallback>ZS</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
