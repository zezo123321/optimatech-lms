import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../lib/i18n';
import { mockCohorts, mockLearners, mockSessions } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Check, X, Clock, Save, CheckCircle2 } from 'lucide-react';

export function Attendance() {
  const { language, demoStep, setDemoStep } = useAppContext();
  const t = translations[language];
  const [selectedCohort, setSelectedCohort] = useState(mockCohorts[0].id);
  const [selectedSession, setSelectedSession] = useState(mockSessions[0].id);
  const [attendanceData, setAttendanceData] = useState<Record<string, string>>(
    mockLearners.reduce((acc, l) => ({ ...acc, [l.id]: 'present' }), {})
  );
  const [isSaved, setIsSaved] = useState(false);

  const handleStatusChange = (learnerId: string, status: string) => {
    setAttendanceData(prev => ({ ...prev, [learnerId]: status }));
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      if (demoStep === 4) {
        setDemoStep(5);
      }
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">{t.attendance}</h1>
        <div className="flex flex-wrap gap-3">
          <Select value={selectedCohort} onValueChange={setSelectedCohort}>
            <SelectTrigger className="w-[200px] bg-white">
              <SelectValue placeholder={t.programs} />
            </SelectTrigger>
            <SelectContent>
              {mockCohorts.map(c => (
                <SelectItem key={c.id} value={c.id}>{language === 'ar' ? c.nameAr : c.nameEn}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedSession} onValueChange={setSelectedSession}>
            <SelectTrigger className="w-[200px] bg-white">
              <SelectValue placeholder={t.sessions} />
            </SelectTrigger>
            <SelectContent>
              {mockSessions.filter(s => s.cohortId === selectedCohort).map(s => (
                <SelectItem key={s.id} value={s.id}>{language === 'ar' ? s.titleAr : s.titleEn}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            id="save-attendance-btn"
            className={`gap-2 ${demoStep === 4 ? 'ring-4 ring-blue-500/50 animate-pulse' : ''}`}
            onClick={handleSave}
          >
            {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {isSaved ? (language === 'ar' ? 'تم الحفظ' : 'Saved') : t.save}
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="bg-white border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              {language === 'ar' ? 'قائمة التحضير' : 'Attendance List'}
            </CardTitle>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>{t.present}: {Object.values(attendanceData).filter(v => v === 'present').length}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span>{t.absent}: {Object.values(attendanceData).filter(v => v === 'absent').length}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50">
                <TableHead className={language === 'ar' ? 'text-right' : 'text-left'}>{t.learners}</TableHead>
                <TableHead className="text-center">{t.status}</TableHead>
                <TableHead className="text-center">{t.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLearners.map((learner) => (
                <TableRow key={learner.id}>
                  <TableCell className="font-medium">
                    <div>
                      <p>{language === 'ar' ? learner.nameAr : learner.nameEn}</p>
                      <p className="text-xs text-slate-500">{learner.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {attendanceData[learner.id] === 'present' && (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">{t.present}</Badge>
                    )}
                    {attendanceData[learner.id] === 'absent' && (
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none">{t.absent}</Badge>
                    )}
                    {attendanceData[learner.id] === 'late' && (
                      <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none">{t.late}</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <Button 
                        size="sm" 
                        variant={attendanceData[learner.id] === 'present' ? 'default' : 'outline'}
                        className={attendanceData[learner.id] === 'present' ? 'bg-green-600 hover:bg-green-700' : ''}
                        onClick={() => handleStatusChange(learner.id, 'present')}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant={attendanceData[learner.id] === 'absent' ? 'destructive' : 'outline'}
                        onClick={() => handleStatusChange(learner.id, 'absent')}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant={attendanceData[learner.id] === 'late' ? 'secondary' : 'outline'}
                        className={attendanceData[learner.id] === 'late' ? 'bg-orange-500 text-white hover:bg-orange-600' : ''}
                        onClick={() => handleStatusChange(learner.id, 'late')}
                      >
                        <Clock className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
