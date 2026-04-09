import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../lib/i18n';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  CheckSquare, 
  Users, 
  CreditCard, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export function Sidebar({ activePage, setActivePage }: SidebarProps) {
  const { language, logout, role } = useAppContext();
  const t = translations[language];
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'programs', label: t.programs, icon: BookOpen },
    { id: 'sessions', label: t.sessions, icon: Calendar },
    { id: 'attendance', label: t.attendance, icon: CheckSquare },
    { id: 'learners', label: t.learners, icon: Users },
    { id: 'payments', label: t.payments, icon: CreditCard },
    { id: 'reports', label: t.reports, icon: BarChart3 },
    { id: 'settings', label: t.settings, icon: Settings },
  ];

  return (
    <div 
      className={cn(
        "h-screen bg-white border-e transition-all duration-300 flex flex-col sticky top-0",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b h-16">
        {!isCollapsed && (
          <span className="text-xl font-bold text-primary tracking-tight">
            OptimaTech
          </span>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex"
        >
          {language === 'ar' ? (
            isCollapsed ? <ChevronLeft /> : <ChevronRight />
          ) : (
            isCollapsed ? <ChevronRight /> : <ChevronLeft />
          )}
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
        >
          <Menu />
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium",
              activePage === item.id 
                ? "bg-primary text-primary-foreground" 
                : "text-slate-600 hover:bg-slate-100",
              isCollapsed && "justify-center px-0"
            )}
            title={isCollapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={logout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-medium",
            isCollapsed && "justify-center px-0"
          )}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span>{t.logout}</span>}
        </button>
      </div>
    </div>
  );
}
