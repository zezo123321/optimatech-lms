export const mockLearners = [
  { id: '1', nameAr: 'أحمد محمد علي', nameEn: 'Ahmed Mohamed Ali', email: 'ahmed.m@example.com', phone: '01012345678', status: 'active', attendance: 95, paid: 1500, total: 2000, governorate: 'القاهرة' },
  { id: '2', nameAr: 'نورهان طارق محمود', nameEn: 'Nourhan Tarek Mahmoud', email: 'nourhan.t@example.com', phone: '01123456789', status: 'active', attendance: 88, paid: 2000, total: 2000, governorate: 'الإسكندرية' },
  { id: '3', nameAr: 'كريم الشاذلي', nameEn: 'Karim El Shazly', email: 'karim.s@example.com', phone: '01234567890', status: 'active', attendance: 75, paid: 500, total: 2000, governorate: 'الجيزة' },
  { id: '4', nameAr: 'فاطمة الزهراء حسن', nameEn: 'Fatma El Zahraa Hassan', email: 'fatma.h@example.com', phone: '01545678901', status: 'inactive', attendance: 40, paid: 0, total: 2000, governorate: 'أسيوط' },
  { id: '5', nameAr: 'عمر خالد عبد الرحمن', nameEn: 'Omar Khaled Abdelrahman', email: 'omar.k@example.com', phone: '01098765432', status: 'active', attendance: 92, paid: 2000, total: 2000, governorate: 'المنيا' },
  { id: '6', nameAr: 'مريم علي فؤاد', nameEn: 'Mariam Ali Fouad', email: 'mariam.a@example.com', phone: '01187654321', status: 'active', attendance: 100, paid: 2000, total: 2000, governorate: 'القاهرة' },
];

export const mockCohorts = [
  { id: 'c1', nameAr: 'معسكر تطوير الويب - الدفعة 5', nameEn: 'Web Dev Bootcamp - Cohort 5', program: 'Full Stack Development', startDate: '2024-01-15', endDate: '2024-04-15', learnersCount: 25, attendanceRate: 92, collectionRate: 85, location: 'القاهرة' },
  { id: 'c2', nameAr: 'مبادرة تمكين المرأة بالصعيد', nameEn: 'Upper Egypt Women Empowerment', program: 'Business Skills', startDate: '2024-02-01', endDate: '2024-03-15', learnersCount: 40, attendanceRate: 88, collectionRate: 100, location: 'أسيوط' },
  { id: 'c3', nameAr: 'برنامج فرصة للتشغيل', nameEn: 'Forsa Employment Program', program: 'Career Readiness', startDate: '2024-03-10', endDate: '2024-05-10', learnersCount: 150, attendanceRate: 95, collectionRate: 100, location: 'متعدد' },
  { id: 'c4', nameAr: 'دبلومة التسويق الرقمي المتقدمة', nameEn: 'Advanced Digital Marketing', program: 'Digital Marketing', startDate: '2024-01-01', endDate: '2024-06-30', learnersCount: 120, attendanceRate: 78, collectionRate: 60, location: 'أونلاين' },
];

export const mockSessions = [
  { id: 's1', titleAr: 'مقدمة في React', titleEn: 'Introduction to React', date: '2024-03-20', time: '10:00 AM', cohortId: 'c1', instructorAr: 'د. محمد علي', instructorEn: 'Dr. Mohamed Ali' },
  { id: 's2', titleAr: 'أساسيات البرمجة بلغة JS', titleEn: 'JS Programming Basics', date: '2024-03-21', time: '02:00 PM', cohortId: 'c1', instructorAr: 'م. سارة حسن', instructorEn: 'Eng. Sara Hassan' },
  { id: 's3', titleAr: 'إدارة المشاريع الصغيرة', titleEn: 'Small Project Management', date: '2024-03-20', time: '09:00 AM', cohortId: 'c2', instructorAr: 'أ. ليلى كمال', instructorEn: 'Ms. Layla Kamal' },
  { id: 's4', titleAr: 'مهارات المقابلة الشخصية', titleEn: 'Interview Skills', date: '2024-03-22', time: '11:00 AM', cohortId: 'c3', instructorAr: 'أ. كريم الشاذلي', instructorEn: 'Mr. Karim El Shazly' },
];

export const mockInvoices = [
  { id: 'inv-2024-001', learnerNameAr: 'أحمد محمد علي', amount: 500, date: '2024-03-01', status: 'paid' },
  { id: 'inv-2024-002', learnerNameAr: 'كريم الشاذلي', amount: 1500, date: '2024-03-05', status: 'unpaid' },
  { id: 'inv-2024-003', learnerNameAr: 'نورهان طارق محمود', amount: 1000, date: '2024-03-10', status: 'paid' },
  { id: 'inv-2024-004', learnerNameAr: 'عمر خالد عبد الرحمن', amount: 2000, date: '2024-03-12', status: 'paid' },
];

export const mockActivity = [
  { id: 'a1', type: 'attendance', textAr: 'تم تسجيل الحضور لمعسكر تطوير الويب', textEn: 'Attendance recorded for Web Dev Bootcamp', time: 'منذ ساعتين' },
  { id: 'a2', type: 'payment', textAr: 'تم استلام دفعة من أحمد محمد علي (500 ج.م)', textEn: 'Payment received from Ahmed Mohamed Ali (500 EGP)', time: 'منذ 5 ساعات' },
  { id: 'a3', type: 'enrollment', textAr: 'انضم 15 متدرب جديد لبرنامج فرصة للتشغيل', textEn: '15 new learners joined Forsa Employment Program', time: 'أمس' },
  { id: 'a4', type: 'certificate', textAr: 'تم إصدار 40 شهادة لمبادرة تمكين المرأة', textEn: '40 certificates issued for Women Empowerment initiative', time: 'منذ يومين' },
];
