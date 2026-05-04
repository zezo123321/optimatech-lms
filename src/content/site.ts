import {
  Bot,
  Building2,
  CheckCircle2,
  CloudCog,
  GraduationCap,
  HandHeart,
  Laptop,
  Mail,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";

export type Lang = "ar" | "en";
export type PageKind = "home" | "services" | "service" | "solutions" | "sector" | "use-cases" | "about" | "contact";

export const languages = {
  ar: { label: "العربية", dir: "rtl" as const },
  en: { label: "English", dir: "ltr" as const },
};

export const whatsappNumber = "201000000000";

export const navItems = [
  { href: "/", key: "home" },
  { href: "/services/", key: "services" },
  { href: "/solutions/", key: "solutions" },
  { href: "/about/", key: "about" },
  { href: "/contact/", key: "contact" },
];

export const serviceIcons = {
  workspace: Mail,
  websites: Laptop,
  automation: Workflow,
  cloud: CloudCog,
  sectors: Building2,
  support: ShieldCheck,
};

export const sectorIcons = {
  education: GraduationCap,
  ngos: HandHeart,
  ai: Bot,
  hr: Users,
  smb: Building2,
};

export const content = {
  en: {
    brand: "Optimatech",
    nav: {
      home: "Home",
      services: "Services",
      googleWorkspace: "Google Workspace",
      websites: "Websites",
      automation: "AI & Automation",
      solutions: "Solutions",
      useCases: "Use Cases",
      about: "About",
      contact: "Contact",
    },
    cta: {
      primary: "Book a Free Consultation",
      secondary: "Explore Sector Solutions",
      whatsapp: "Talk on WhatsApp",
      quote: "Request a Quote",
    },
    home: {
      heroTitle: "Build smarter digital operations for your business",
      heroBody:
        "We help companies launch and manage Google Workspace, websites, automation, and AI-powered workflows — built for growing teams in Egypt and MENA.",
      promise: "From idea to operations — practical, fast, and scalable digital solutions.",
      servicesTitle: "Digital solutions from setup to day-to-day operations",
      sectorsTitle: "Sector-ready solutions for how your business actually works",
      whyTitle: "Why teams choose Optimatech",
      whyBody: "Built for practical teams that need their tools to work together, not another isolated system.",
      whyBullets: [
        "Built for SMBs and growing teams in Egypt/MENA",
        "We connect tools instead of adding complexity",
        "Fast implementation",
        "Arabic and English support",
        "Cost-aware, flexible, and easy to operate",
      ],
      packagesTitle: "Start with the right digital foundation",
    },
    ui: {
      learnMore: "Learn more",
      whatWeBuild: "What we deliver",
      process: "How we work",
      processBody: "A clear path from initial brief to live, working digital operations.",
      faq: "Common questions",
      copyright: `© ${new Date().getFullYear()} Optimatech. All rights reserved.`,
      startingFrom: "Starting from",
    },
    pricing: [
      { title: "Workspace Launch", body: "Business email, domain, Drive structure, admin setup, and team training.", href: "/google-workspace/" },
      { title: "Website Launch", body: "A clear bilingual business website with strong messaging and lead capture.", href: "/website-packages/" },
      { title: "Automation Sprint", body: "Map and automate one painful recurring workflow in your operations.", href: "/ai-automation/" },
    ],
    services: [
      {
        id: "workspace",
        title: "Google Workspace Setup",
        body: "Email, Drive, Admin Console, migration, permissions, training, and ongoing support.",
        href: "/google-workspace/",
      },
      {
        id: "websites",
        title: "Business Websites",
        body: "Fast bilingual websites, landing pages, lead forms, WhatsApp CTAs, and SEO basics.",
        href: "/website-packages/",
      },
      {
        id: "automation",
        title: "AI & Automation",
        body: "Automate repetitive work across Gmail, Sheets, Forms, CRM, WhatsApp, and AI tools.",
        href: "/ai-automation/",
      },
      {
        id: "cloud",
        title: "Cloud & Security",
        body: "Cloud storage, access management, security settings, backup workflows, and admin hygiene.",
        href: "/services/",
      },
      {
        id: "sectors",
        title: "Sector Landing Pages",
        body: "Education, NGOs, HR, SMB, and automation pages tailored to the way each sector buys.",
        href: "/solutions/",
      },
      {
        id: "support",
        title: "Support & Optimization",
        body: "Monthly improvements, troubleshooting, workflow reviews, documentation, and team enablement.",
        href: "/contact/",
      },
    ],
    sectors: [
      {
        id: "education",
        title: "Education",
        body: "Workspace, registration forms, LMS integrations, parent communication, and reporting.",
        href: "/solutions/education/",
      },
      {
        id: "ngos",
        title: "NGOs & Impact",
        body: "Donor databases, volunteer forms, campaign pages, impact dashboards, and reporting workflows.",
        href: "/solutions/ngos-impact/",
      },
      {
        id: "ai",
        title: "AI & Automation",
        body: "Assistants, reporting bots, lead routing, support automation, and workflow orchestration.",
        href: "/solutions/ai-automation/",
      },
      {
        id: "hr",
        title: "HR & Internal Operations",
        body: "Onboarding, leave requests, approvals, document templates, dashboards, and access control.",
        href: "/solutions/hr-operations/",
      },
      {
        id: "smb",
        title: "SMB Tools",
        body: "Domain, email, website, forms, cloud storage, security, and lightweight automation.",
        href: "/solutions/smb-tools/",
      },
    ],
    process: ["Discovery", "Blueprint", "Setup", "Launch", "Support & optimization"],
    pages: {
      services: {
        title: "Integrated digital services for growing businesses",
        body: "One practical partner for Google Workspace, websites, automation, cloud tools, and managed digital operations.",
      },
      solutions: {
        title: "Sector-ready digital systems",
        body: "Choose a starting point built around the way your organization works, buys, and serves customers.",
      },
      useCases: {
        title: "Practical digital use cases",
        body: "Examples of workflows Optimatech can build, connect, and operate for growing teams.",
      },
      about: {
        title: "Practical digital operations partner",
        body: "Optimatech helps businesses and institutions in Egypt and MENA launch, connect, and operate the digital tools they need to grow.",
      },
      contact: {
        title: "Book a free consultation",
        body: "Tell us what you want to launch, fix, or automate. We will help you define the next practical step.",
      },
    },
    servicePages: {
      "/google-workspace/": {
        title: "Google Workspace setup and support for businesses",
        body: "Get Workspace setup, migration, admin configuration, procurement support, security hygiene, and team training.",
        message: "I'm interested in Google Workspace setup",
        features: ["Business email", "Domain setup", "Drive structure", "Admin Console", "Migration", "Training"],
      },
      "/website-packages/": {
        title: "Business websites built for clarity and lead generation",
        body: "Launch a bilingual website with strong messaging, responsive design, contact forms, WhatsApp CTAs, SEO basics, and analytics.",
        message: "I'm interested in building a business website",
        features: ["Bilingual pages", "Landing pages", "Lead forms", "SEO setup", "Analytics", "Maintenance"],
        packages: [
          {
            name: "Starter Website",
            bestFor: "New businesses that need a professional online presence quickly.",
            includes: ["Home page", "About/service section", "Contact form", "WhatsApp CTA", "Mobile responsive design", "Basic SEO setup"],
          },
          {
            name: "Business Website",
            bestFor: "Growing teams that need clear service pages and stronger lead capture.",
            includes: ["Home", "Services pages", "About", "Contact", "FAQ", "Analytics", "Bilingual structure", "Reusable sections"],
          },
          {
            name: "Sector Landing Page",
            bestFor: "Campaigns or offers targeting Education, NGOs, HR, SMBs, or automation buyers.",
            includes: ["Audience-specific messaging", "Use-case blocks", "Lead form", "WhatsApp routing", "FAQ", "Conversion-focused CTA flow"],
          },
          {
            name: "Custom Website",
            bestFor: "Businesses that need custom structure, integrations, dashboards, or advanced content.",
            includes: ["Custom sitemap", "Advanced UI sections", "Integrations", "Technical SEO", "Performance tuning", "Launch support"],
          },
        ],
        comparison: [
          ["Bilingual AR/EN", "Optional", "Included", "Included", "Included"],
          ["Number of pages", "1-3", "5-8", "1 focused page", "Custom"],
          ["Lead forms", "Basic", "Advanced", "Campaign-specific", "Custom"],
          ["WhatsApp CTA", "Included", "Included", "Page-specific", "Page-specific"],
          ["SEO setup", "Basic", "Standard", "Landing-page focused", "Technical + content SEO"],
          ["Best next step", "Request quote", "Request quote", "Request quote", "Discovery call"],
        ],
      },
      "/ai-automation/": {
        title: "AI automation for repetitive business operations",
        body: "We connect your tools and automate workflows across Gmail, Sheets, Forms, CRM, WhatsApp, and AI tools — reducing manual work and mistakes.",
        message: "I'm interested in AI automation",
        features: ["AI assistants", "Lead routing", "Reporting bots", "Support automation", "Workspace automation", "Workflow reviews"],
      },
    },
    sectorPages: {
      "/solutions/education/": {
        title: "Digital operations for modern education teams",
        body: "From Google Workspace setup to forms, files, reporting, registration pages, and automation — Optimatech helps education providers run smarter.",
        message: "I'm interested in education solutions",
        features: ["Google Workspace for Education", "Student/staff email", "Registration forms", "LMS integrations", "Parent communication", "Reports and dashboards"],
      },
      "/solutions/ngos-impact/": {
        title: "Digital systems for NGOs and impact teams",
        body: "Manage teams, donors, forms, documents, campaigns, and reporting with secure, easy-to-use digital workflows.",
        message: "I'm interested in NGO digital systems",
        features: ["Donor/contact database", "Google Workspace setup", "Volunteer forms", "Campaign landing pages", "Impact dashboards", "Reporting automation"],
      },
      "/solutions/ai-automation/": {
        title: "AI automation for repetitive business operations",
        body: "Turn manual processes into connected workflows with AI assistants, automations, routing rules, and reporting bots.",
        message: "I'm interested in AI automation",
        features: ["AI assistants", "Internal workflow automation", "Customer support automation", "Lead routing", "Reporting bots", "Google Workspace automation"],
      },
      "/solutions/hr-operations/": {
        title: "Internal workflows for growing teams",
        body: "Simplify onboarding, requests, approvals, documents, attendance, and reporting with practical HR and operations workflows.",
        message: "I'm interested in HR operations workflows",
        features: ["Employee onboarding", "Leave requests", "Approval flows", "Document templates", "HR dashboards", "Access management"],
      },
      "/solutions/smb-tools/": {
        title: "A practical digital stack for small and growing businesses",
        body: "Launch your business foundation with domain, email, website, forms, cloud storage, security, and automation.",
        message: "I'm interested in SMB digital tools",
        features: ["Business email", "Domain and website", "Shared files", "Forms and CRM lite", "Invoicing/payment integrations", "Support"],
      },
    },
    useCases: [
      ["New company setup", "Domain, email, file structure, website form, and admin controls ready for day one."],
      ["School registration workflow", "Forms, Sheets dashboards, Drive folders, email notifications, and registration pages."],
      ["NGO donor reporting", "Contact database, campaign landing pages, forms, dashboards, and reporting automation."],
      ["AI lead routing", "Incoming leads classified, assigned, summarized, and pushed to the right channel."],
      ["HR approval flow", "Leave requests, onboarding docs, approvals, and management dashboards."],
      ["SMB digital foundation", "Website, WhatsApp lead capture, Google Workspace, forms, and cloud storage."],
    ],
    contact: {
      labels: ["Name", "Company", "Email", "Phone / WhatsApp", "Company size", "Service needed", "Current tools", "Budget range", "Preferred language", "Message"],
      submit: "Send Request",
    },
    seo: {
      title: "Optimatech | Digital Solutions for Egypt & MENA",
      description: "Launch Google Workspace, websites, automation, AI workflows, and cloud tools for growing teams in Egypt and MENA.",
    },
  },
  ar: {
    brand: "Optimatech",
    nav: {
      home: "الرئيسية",
      services: "الخدمات",
      googleWorkspace: "Google Workspace",
      websites: "المواقع",
      automation: "الذكاء الاصطناعي",
      solutions: "القطاعات",
      useCases: "حالات استخدام",
      about: "من نحن",
      contact: "تواصل معنا",
    },
    cta: {
      primary: "احجز استشارة مجانية",
      secondary: "استكشف حلول القطاعات",
      whatsapp: "تواصل واتساب",
      quote: "اطلب عرض سعر",
    },
    home: {
      heroTitle: "شغّل شركتك بأدوات رقمية أذكى",
      heroBody:
        "نساعدك في إطلاق وإدارة Google Workspace، المواقع الإلكترونية، الأتمتة، والذكاء الاصطناعي — بحلول عملية تناسب الشركات في مصر والمنطقة.",
      promise: "من الفكرة إلى التشغيل — حلول رقمية عملية، سريعة، وقابلة للتوسع.",
      servicesTitle: "خدمات رقمية متكاملة من الإعداد إلى التشغيل",
      sectorsTitle: "حلول جاهزة حسب طبيعة نشاطك",
      whyTitle: "لماذا Optimatech",
      whyBody: "لأن الأدوات المتفرقة تخلق فوضى. نربط ما عندك بدل ما نضيف تعقيداً.",
      whyBullets: [
        "نفهم احتياجات الشركات الصغيرة والمتوسطة في مصر والمنطقة",
        "نربط الأدوات ببعضها بدل شراء برامج منفصلة",
        "حلول قابلة للتنفيذ بسرعة",
        "دعم عربي وإنجليزي",
        "تركيز على التكلفة، المرونة، وسهولة الاستخدام",
      ],
      packagesTitle: "ابدأ من الأساس الرقمي المناسب",
    },
    ui: {
      learnMore: "اعرف أكثر",
      whatWeBuild: "ماذا نقدم",
      process: "كيف نعمل",
      processBody: "مسار واضح من أول جلسة حتى التشغيل الفعلي.",
      faq: "أسئلة شائعة",
      copyright: `© ${new Date().getFullYear()} Optimatech. جميع الحقوق محفوظة.`,
      startingFrom: "يبدأ من",
    },
    pricing: [
      { title: "إطلاق Workspace", body: "بريد احترافي، دومين، تنظيم Drive، إعداد الإدارة، وتدريب الفريق.", href: "/google-workspace/" },
      { title: "إطلاق الموقع", body: "موقع ثنائي اللغة برسائل واضحة وصفحة جذب عملاء فعّالة.", href: "/website-packages/" },
      { title: "سبرينت أتمتة", body: "حدد واحد workflow متكرر وكلّفنا بأتمتته بالكامل.", href: "/ai-automation/" },
    ],
    services: [
      {
        id: "workspace",
        title: "إعداد Google Workspace",
        body: "البريد، Drive، لوحة الإدارة، نقل البيانات، الصلاحيات، التدريب، والدعم المستمر.",
        href: "/google-workspace/",
      },
      {
        id: "websites",
        title: "مواقع إلكترونية للشركات",
        body: "مواقع ثنائية اللغة، صفحات هبوط، نماذج عملاء، واتساب، وأساسيات SEO.",
        href: "/website-packages/",
      },
      {
        id: "automation",
        title: "ذكاء اصطناعي وأتمتة",
        body: "أتمتة العمل المتكرر بين Gmail وSheets وForms وCRM وWhatsApp وأدوات AI.",
        href: "/ai-automation/",
      },
      {
        id: "cloud",
        title: "السحابة والأمان",
        body: "تخزين سحابي، إدارة صلاحيات، إعدادات أمان، نسخ احتياطي، وتنظيم إداري.",
        href: "/services/",
      },
      {
        id: "sectors",
        title: "صفحات وحلول للقطاعات",
        body: "تعليم، جمعيات، HR، SMB، وأتمتة برسائل تناسب طريقة شراء كل قطاع.",
        href: "/solutions/",
      },
      {
        id: "support",
        title: "دعم وتحسين",
        body: "تحسينات شهرية، حل مشكلات، مراجعة workflows، توثيق، وتمكين الفريق.",
        href: "/contact/",
      },
    ],
    sectors: [
      {
        id: "education",
        title: "التعليم",
        body: "Workspace، نماذج تسجيل، تكامل LMS، تواصل مع أولياء الأمور، وتقارير.",
        href: "/solutions/education/",
      },
      {
        id: "ngos",
        title: "الجمعيات والمؤسسات المؤثرة",
        body: "قواعد بيانات متبرعين، نماذج متطوعين، حملات، لوحات أثر، وتقارير.",
        href: "/solutions/ngos-impact/",
      },
      {
        id: "ai",
        title: "الذكاء الاصطناعي والأتمتة",
        body: "مساعدون، bots للتقارير، توجيه leads، أتمتة دعم العملاء، وربط workflows.",
        href: "/solutions/ai-automation/",
      },
      {
        id: "hr",
        title: "HR والتشغيل الداخلي",
        body: "Onboarding، طلبات إجازات، موافقات، قوالب مستندات، dashboards، وصلاحيات.",
        href: "/solutions/hr-operations/",
      },
      {
        id: "smb",
        title: "أدوات الشركات الصغيرة",
        body: "Domain، email، website، forms، cloud storage، security، وautomation خفيف.",
        href: "/solutions/smb-tools/",
      },
    ],
    process: ["اكتشاف", "تصميم الخطة", "الإعداد", "الإطلاق", "الدعم والتحسين"],
    pages: {
      services: {
        title: "خدمات رقمية متكاملة للشركات والمؤسسات",
        body: "شريك عملي واحد لـ Google Workspace، المواقع، الأتمتة، أدوات السحابة، وتشغيل الأدوات الرقمية.",
      },
      solutions: {
        title: "حلول رقمية جاهزة حسب القطاع",
        body: "اختر نقطة بداية مبنية حول طريقة عمل مؤسستك وطريقة شراء عملائك واحتياجات فريقك.",
      },
      useCases: {
        title: "حالات استخدام عملية",
        body: "أمثلة على workflows يمكن لـ Optimatech بناؤها وربطها وتشغيلها للفرق النامية.",
      },
      about: {
        title: "شريك تشغيل رقمي عملي",
        body: "Optimatech تساعد الشركات والمؤسسات في مصر والمنطقة على إطلاق وربط وتشغيل الأدوات الرقمية التي تحتاجها للنمو.",
      },
      contact: {
        title: "احجز استشارة مجانية",
        body: "احكِ لنا ما تريد إطلاقه أو تحسينه أو أتمتته، وسنساعدك في تحديد الخطوة العملية التالية.",
      },
    },
    servicePages: {
      "/google-workspace/": {
        title: "إعداد وإدارة Google Workspace للشركات",
        body: "إعداد Workspace، نقل البيانات، ضبط لوحة الإدارة، دعم الشراء، الأمان، وتدريب الفريق.",
        message: "أنا مهتم بإعداد Google Workspace",
        features: ["بريد احترافي", "إعداد الدومين", "تنظيم Drive", "لوحة الإدارة", "نقل البيانات", "تدريب الفريق"],
      },
      "/website-packages/": {
        title: "مواقع شركات واضحة ومصممة لجذب العملاء",
        body: "أطلق موقعا ثنائي اللغة برسائل واضحة، تصميم responsive، نماذج تواصل، واتساب، SEO أساسي، وتحليلات.",
        message: "أنا مهتم ببناء موقع لشركتي",
        features: ["صفحات ثنائية اللغة", "صفحات هبوط", "نماذج عملاء", "إعداد SEO", "Analytics", "صيانة"],
        packages: [
          {
            name: "موقع بداية",
            bestFor: "للشركات الجديدة التي تحتاج وجودا احترافيا بسرعة.",
            includes: ["صفحة رئيسية", "قسم عن الشركة/الخدمات", "نموذج تواصل", "CTA واتساب", "تصميم متجاوب", "SEO أساسي"],
          },
          {
            name: "موقع شركة",
            bestFor: "للفرق النامية التي تحتاج صفحات خدمات واضحة وجذب عملاء أفضل.",
            includes: ["الرئيسية", "صفحات خدمات", "من نحن", "تواصل معنا", "FAQ", "Analytics", "هيكل عربي/إنجليزي", "Sections قابلة لإعادة الاستخدام"],
          },
          {
            name: "صفحة قطاع أو حملة",
            bestFor: "لعروض تستهدف التعليم، الجمعيات، HR، الشركات الصغيرة، أو الأتمتة.",
            includes: ["رسائل موجهة للجمهور", "حالات استخدام", "نموذج lead", "واتساب حسب الصفحة", "FAQ", "CTA flow واضح"],
          },
          {
            name: "موقع مخصص",
            bestFor: "للشركات التي تحتاج هيكل خاص، تكاملات، dashboards، أو محتوى متقدم.",
            includes: ["Sitemap مخصص", "Sections متقدمة", "تكاملات", "Technical SEO", "تحسين أداء", "دعم إطلاق"],
          },
        ],
        comparison: [
          ["عربي/إنجليزي", "اختياري", "موجود", "موجود", "موجود"],
          ["عدد الصفحات", "1-3", "5-8", "صفحة مركزة", "حسب الاحتياج"],
          ["نماذج العملاء", "أساسي", "متقدم", "حسب الحملة", "مخصص"],
          ["CTA واتساب", "موجود", "موجود", "حسب الصفحة", "حسب الصفحة"],
          ["SEO", "أساسي", "قياسي", "مناسب للصفحة", "تقني + محتوى"],
          ["الخطوة التالية", "عرض سعر", "عرض سعر", "عرض سعر", "جلسة اكتشاف"],
        ],
      },
      "/ai-automation/": {
        title: "أتمتة وذكاء اصطناعي لتقليل العمل اليدوي",
        body: "نربط أدواتك ونبني workflows بين Gmail وSheets وForms وCRM وWhatsApp وAI tools لتقليل الوقت والأخطاء.",
        message: "أنا مهتم بحلول الذكاء الاصطناعي والأتمتة",
        features: ["مساعدون AI", "توجيه leads", "Bots للتقارير", "أتمتة الدعم", "أتمتة Workspace", "مراجعة workflows"],
      },
    },
    sectorPages: {
      "/solutions/education/": {
        title: "حلول رقمية للمؤسسات التعليمية",
        body: "من البريد المؤسسي إلى إدارة الملفات، الحضور، النماذج، التقارير، وصفحات التسجيل — Optimatech تساعدك تبني نظام تعليمي رقمي قابل للتوسع.",
        message: "أنا مهتم بحلول التعليم",
        features: ["Google Workspace for Education", "بريد للطلاب والموظفين", "نماذج تسجيل", "تكامل LMS", "تواصل مع أولياء الأمور", "تقارير ولوحات متابعة"],
      },
      "/solutions/ngos-impact/": {
        title: "حلول رقمية للجمعيات والمؤسسات المؤثرة",
        body: "نساعد المؤسسات غير الربحية على إدارة البريد، الملفات، النماذج، قواعد البيانات، الحملات، والتقارير بأدوات سهلة وآمنة.",
        message: "أنا مهتم بالحلول الرقمية للجمعيات",
        features: ["قاعدة بيانات متبرعين", "إعداد Google Workspace", "نماذج متطوعين", "صفحات حملات", "Impact dashboards", "أتمتة التقارير"],
      },
      "/solutions/ai-automation/": {
        title: "أتمتة وذكاء اصطناعي لتقليل العمل اليدوي",
        body: "حوّل العمليات المتكررة إلى workflows ذكية بين أدواتك الحالية مع مساعدات AI وتقارير تلقائية.",
        message: "أنا مهتم بحلول الذكاء الاصطناعي والأتمتة",
        features: ["مساعدون AI", "أتمتة داخلية", "أتمتة دعم العملاء", "توجيه leads", "Bots للتقارير", "أتمتة Google Workspace"],
      },
      "/solutions/hr-operations/": {
        title: "حلول تشغيل داخلية للفرق النامية",
        body: "بسّط التوظيف، الحضور، الطلبات، الموافقات، المستندات، onboarding، وتقارير الإدارة.",
        message: "أنا مهتم بحلول HR والتشغيل الداخلي",
        features: ["Onboarding للموظفين", "طلبات الإجازات", "مسارات موافقة", "قوالب مستندات", "HR dashboards", "إدارة الصلاحيات"],
      },
      "/solutions/smb-tools/": {
        title: "حزمة أدوات رقمية للشركات الصغيرة والمتوسطة",
        body: "ابدأ ببريد احترافي، موقع واضح، وأدوات تشغيل منظمة: domain، email، website، forms، cloud storage، security، وautomation.",
        message: "أنا مهتم بأدوات الشركات الصغيرة والمتوسطة",
        features: ["بريد احترافي", "دومين وموقع", "ملفات مشتركة", "Forms وCRM بسيط", "تكامل دفع وفواتير", "دعم"],
      },
    },
    useCases: [
      ["إطلاق شركة جديدة", "Domain، بريد، تنظيم ملفات، نموذج تواصل، وإعدادات إدارة جاهزة من أول يوم."],
      ["تسجيل مؤسسة تعليمية", "Forms، dashboards على Sheets، مجلدات Drive، إشعارات بريد، وصفحات تسجيل."],
      ["تقارير متبرعين لجمعية", "قاعدة بيانات، صفحات حملات، نماذج، لوحات متابعة، وأتمتة تقارير."],
      ["توجيه leads بالذكاء الاصطناعي", "تصنيف العملاء المحتملين وتلخيصهم وتحويلهم للقناة أو الشخص المناسب."],
      ["مسار موافقات HR", "إجازات، مستندات onboarding، موافقات، وتقارير إدارة."],
      ["أساس رقمي لشركة صغيرة", "موقع، واتساب لجذب العملاء، Google Workspace، forms، وتخزين سحابي."],
    ],
    contact: {
      labels: ["الاسم", "الشركة", "البريد الإلكتروني", "الهاتف / واتساب", "حجم الشركة", "الخدمة المطلوبة", "الأدوات الحالية", "نطاق الميزانية", "اللغة المفضلة", "الرسالة"],
      submit: "إرسال الطلب",
    },
    seo: {
      title: "Optimatech | حلول رقمية للشركات في مصر والمنطقة",
      description: "إطلاق Google Workspace، مواقع إلكترونية، أتمتة، workflows بالذكاء الاصطناعي، وأدوات سحابية للفرق النامية.",
    },
  },
};

export function normalizePath(pathname: string) {
  if (pathname === "") return "/";
  if (pathname === "/") return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

export function whatsappUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
