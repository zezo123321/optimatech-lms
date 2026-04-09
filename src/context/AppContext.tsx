import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'ar' | 'en';
type Role = 'admin' | 'manager' | 'instructor';

interface Organization {
  id: string;
  nameAr: string;
  nameEn: string;
  logo?: string;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  role: Role;
  setRole: (role: Role) => void;
  currentOrg: Organization;
  setCurrentOrg: (org: Organization) => void;
  organizations: Organization[];
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  demoStep: number;
  setDemoStep: (step: number) => void;
  activePage: string;
  setActivePage: (page: string) => void;
  activeProgramId: string | null;
  setActiveProgramId: (id: string | null) => void;
}

const organizations: Organization[] = [
  { id: '1', nameAr: 'أكاديمية التدريب المصرية', nameEn: 'Egyptian Training Academy' },
  { id: '2', nameAr: 'مؤسسة مصر الخير', nameEn: 'Misr El Kheir Foundation' },
  { id: '3', nameAr: 'مركز المهارات الرقمية', nameEn: 'Digital Skills Center' },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar');
  const [role, setRole] = useState<Role>('admin');
  const [currentOrg, setCurrentOrg] = useState<Organization>(organizations[0]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [activePage, setActivePage] = useState('dashboard');
  const [activeProgramId, setActiveProgramId] = useState<string | null>(null);

  useEffect(() => {
    document.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    setIsLoggedIn(false);
    setDemoStep(0);
    setActivePage('dashboard');
    setActiveProgramId(null);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        role,
        setRole,
        currentOrg,
        setCurrentOrg,
        organizations,
        isLoggedIn,
        login,
        logout,
        demoStep,
        setDemoStep,
        activePage,
        setActivePage,
        activeProgramId,
        setActiveProgramId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
