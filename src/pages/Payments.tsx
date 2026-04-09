import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../lib/i18n';
import { mockInvoices } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Wallet, TrendingUp, Download, Plus, Search, CheckCircle2 } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Input } from '@/components/ui/input';

export function Payments() {
  const { language, demoStep, setDemoStep, setActivePage } = useAppContext();
  const t = translations[language];
  const [invoices, setInvoices] = useState(mockInvoices);
  const [isPaid, setIsPaid] = useState(false);

  const paymentData = [
    { month: 'Jan', amount: 12000 },
    { month: 'Feb', amount: 15000 },
    { month: 'Mar', amount: 22000 },
    { month: 'Apr', amount: 18000 },
    { month: 'May', amount: 25000 },
  ];

  const handleRecordPayment = (id: string) => {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, status: 'paid' } : inv));
    setIsPaid(true);
    setTimeout(() => {
      setIsPaid(false);
      if (demoStep === 5) {
        setDemoStep(6);
      }
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">{t.payments}</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            {t.export}
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            {language === 'ar' ? 'فاتورة جديدة' : 'New Invoice'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
              <Badge variant="outline" className="text-white border-white/30">
                {language === 'ar' ? 'هذا الشهر' : 'This Month'}
              </Badge>
            </div>
            <p className="text-primary-foreground/80 text-sm">{language === 'ar' ? 'إجمالي التحصيلات' : 'Total Collections'}</p>
            <h2 className="text-3xl font-bold mt-1">45,200 EGP</h2>
            <div className="flex items-center gap-1 mt-4 text-xs">
              <TrendingUp className="w-3 h-3" />
              <span>+12% {language === 'ar' ? 'عن الشهر الماضي' : 'from last month'}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{language === 'ar' ? 'نمو التحصيلات' : 'Collection Growth'}</CardTitle>
          </CardHeader>
          <CardContent className="h-[160px] p-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={paymentData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" hide />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="amount" stroke="#2563eb" fillOpacity={1} fill="url(#colorAmount)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg">{language === 'ar' ? 'الفواتير الأخيرة' : 'Recent Invoices'}</CardTitle>
              <CardDescription>{language === 'ar' ? 'تتبع المدفوعات والمستحقات' : 'Track payments and receivables'}</CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder={t.search} className="ps-10 bg-slate-50 border-none" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50">
                <TableHead>{language === 'ar' ? 'رقم الفاتورة' : 'Invoice ID'}</TableHead>
                <TableHead>{t.learners}</TableHead>
                <TableHead>{t.date}</TableHead>
                <TableHead>{language === 'ar' ? 'المبلغ' : 'Amount'}</TableHead>
                <TableHead className="text-center">{t.status}</TableHead>
                <TableHead className="text-center">{t.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-mono text-xs text-slate-500 uppercase">{invoice.id}</TableCell>
                  <TableCell className="font-medium">{language === 'ar' ? invoice.learnerNameAr : invoice.learnerNameEn}</TableCell>
                  <TableCell className="text-sm text-slate-600">{invoice.date}</TableCell>
                  <TableCell className="font-bold">{invoice.amount} EGP</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={invoice.status === 'paid' ? 'default' : 'outline'} className={invoice.status === 'paid' ? 'bg-green-100 text-green-700 hover:bg-green-100 border-none' : 'text-orange-600 border-orange-200'}>
                      {invoice.status === 'paid' ? (language === 'ar' ? 'مدفوع' : 'Paid') : (language === 'ar' ? 'معلق' : 'Pending')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {invoice.status === 'pending' ? (
                      <Button 
                        size="sm" 
                        id={invoice.id === 'INV-002' ? 'record-payment-btn' : undefined}
                        className={`gap-2 ${invoice.id === 'INV-002' && demoStep === 5 ? 'ring-4 ring-blue-500/50 animate-pulse bg-blue-600 hover:bg-blue-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                        onClick={() => handleRecordPayment(invoice.id)}
                      >
                        {isPaid && invoice.id === 'INV-002' ? <CheckCircle2 className="w-4 h-4" /> : <Wallet className="w-4 h-4" />}
                        {isPaid && invoice.id === 'INV-002' ? (language === 'ar' ? 'تم الدفع' : 'Paid') : (language === 'ar' ? 'تسجيل الدفع' : 'Record Payment')}
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm">{language === 'ar' ? 'عرض' : 'View'}</Button>
                    )}
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
