import { AppProvider, useAppContext } from './context/AppContext';
import { Landing } from './pages/Landing';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Programs } from './pages/Programs';
import { Sessions } from './pages/Sessions';
import { Attendance } from './pages/Attendance';
import { Learners } from './pages/Learners';
import { Payments } from './pages/Payments';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { DemoGuide } from './components/DemoGuide';

function AppContent() {
  const { isLoggedIn, language, activePage, setActivePage } = useAppContext();

  if (!isLoggedIn) {
    return <Landing />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard': return <Dashboard />;
      case 'programs': return <Programs />;
      case 'sessions': return <Sessions />;
      case 'attendance': return <Attendance />;
      case 'learners': return <Learners />;
      case 'payments': return <Payments />;
      case 'reports': return <Reports />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className={`flex min-h-screen bg-slate-50 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {renderPage()}
          </div>
        </main>
      </div>
      <DemoGuide />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

