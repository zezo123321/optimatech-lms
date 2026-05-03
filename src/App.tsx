import { useEffect, useMemo, useState, type Key, type ReactNode } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Globe2,
  Menu,
  MessageCircle,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import {
  content,
  languages,
  navItems,
  normalizePath,
  sectorIcons,
  serviceIcons,
  type Lang,
  whatsappUrl,
} from "@/content/site";

const sectionClass = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

function usePath() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const onPopState = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = (href: string) => {
    const next = normalizePath(href);
    window.history.pushState({}, "", next);
    setPath(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { path, navigate };
}

function AppLink({
  href,
  navigate,
  className,
  children,
  onClick,
}: {
  key?: Key;
  href: string;
  navigate: (href: string) => void;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        onClick?.();
        navigate(href);
      }}
    >
      {children}
    </a>
  );
}

function Header({
  lang,
  setLang,
  path,
  navigate,
}: {
  lang: Lang;
  setLang: (lang: Lang) => void;
  path: string;
  navigate: (href: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const t = content[lang];

  const links = navItems.map((item) => (
    <AppLink
      key={item.href}
      href={item.href}
      navigate={navigate}
      onClick={() => setOpen(false)}
      className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
        normalizePath(item.href) === path ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
      }`}
    >
      {t.nav[item.key as keyof typeof t.nav]}
    </AppLink>
  ));

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className={`${sectionClass} flex h-16 items-center justify-between gap-4`}>
        <AppLink href="/" navigate={navigate} className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-slate-950 text-white">
            <Sparkles className="size-4" />
          </span>
          <span className="text-lg font-bold tracking-normal text-slate-950">{t.brand}</span>
        </AppLink>

        <nav className="hidden items-center gap-1 lg:flex">{links}</nav>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
          >
            <Globe2 className="size-4" />
            {lang === "ar" ? "EN" : "عربي"}
          </button>
          <AppLink href="/contact/" navigate={navigate} className="inline-flex h-10 items-center rounded-lg bg-teal-600 px-4 text-sm font-semibold text-white transition hover:bg-teal-700">
            {t.cta.primary}
          </AppLink>
        </div>

        <button className="inline-flex size-10 items-center justify-center rounded-lg border border-slate-200 lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-1 px-4 py-4">
            {links}
            <button className="mt-2 inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 text-sm font-semibold" onClick={() => setLang(lang === "ar" ? "en" : "ar")}>
              <Globe2 className="size-4" />
              {lang === "ar" ? "English" : "العربية"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({
  lang,
  title,
  body,
  eyebrow,
  primary,
  secondary,
  navigate,
}: {
  lang: Lang;
  title: string;
  body: string;
  eyebrow?: string;
  primary: string;
  secondary?: string;
  navigate: (href: string) => void;
}) {
  const visual =
    lang === "ar"
      ? {
          title: "مخرجات عملية من أول مشروع",
          subtitle: "بدل أدوات منفصلة، نبني أساسا رقميا واضحا قابل للتشغيل.",
          items: [
            ["Google Workspace", "بريد احترافي، ملفات، صلاحيات، وتدريب"],
            ["موقع الشركة", "صفحات واضحة، نماذج leads، واتساب، وSEO أساسي"],
            ["الأتمتة", "ربط النماذج، الجداول، البريد، والتقارير"],
            ["الدعم", "تحسينات، حل مشكلات، وتوثيق للخطوات"],
          ],
          note: "الهدف: أدوات مرتبطة ببعضها وتخدم التشغيل اليومي، مش مجرد شكل جميل.",
        }
      : {
          title: "Practical deliverables from the first project",
          subtitle: "Instead of disconnected tools, we build a clear digital foundation your team can operate.",
          items: [
            ["Google Workspace", "Business email, files, permissions, and training"],
            ["Company website", "Clear pages, lead forms, WhatsApp, and SEO basics"],
            ["Automation", "Connected forms, sheets, email, and reporting"],
            ["Support", "Improvements, troubleshooting, and documentation"],
          ],
          note: "The goal: connected tools that support daily operations, not just a polished surface.",
        };

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(135deg,#f8fafc_0%,#ffffff_45%,#ecfeff_100%)]">
      <div className={`${sectionClass} grid min-h-[620px] items-center gap-10 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:py-20`}>
        <div>
          {eyebrow && <p className="mb-4 inline-flex rounded-lg bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">{eyebrow}</p>}
          <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{body}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <AppLink href="/contact/" navigate={navigate} className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 text-sm font-bold text-white transition hover:bg-teal-700">
              {primary}
              <ArrowRight className="size-4 rtl:rotate-180" />
            </AppLink>
            {secondary && (
              <AppLink href="/solutions/" navigate={navigate} className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 text-sm font-bold text-slate-900 transition hover:bg-slate-50">
                {secondary}
              </AppLink>
            )}
          </div>
        </div>
        <div className="relative">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/60">
            <div className="grid gap-3">
              <div className="rounded-lg border border-slate-200 bg-white p-4 text-slate-950">
                <div>
                  <p className="text-sm font-semibold text-teal-700">{visual.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{visual.subtitle}</p>
                </div>
              </div>
              <div className="grid gap-3">
                {visual.items.map(([item, detail]) => (
                  <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="size-5 shrink-0 text-teal-600" />
                      <div>
                        <p className="text-sm font-bold text-slate-900">{item}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-teal-100 bg-teal-50 p-4 text-sm font-medium text-teal-900">
                {visual.note}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ title, body }: { title: string; body?: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      <h2 className="text-3xl font-bold tracking-normal text-slate-950">{title}</h2>
      {body && <p className="mt-3 text-base leading-7 text-slate-600">{body}</p>}
    </div>
  );
}

function CardGrid({
  title,
  items,
  type,
  navigate,
}: {
  title: string;
  items: Array<{ id: string; title: string; body: string; href: string }>;
  type: "service" | "sector";
  navigate: (href: string) => void;
}) {
  return (
    <section className={`${sectionClass} py-16`}>
      <SectionHeading title={title} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const Icon = type === "service" ? serviceIcons[item.id as keyof typeof serviceIcons] : sectorIcons[item.id as keyof typeof sectorIcons];
          return (
            <AppLink key={item.title} href={item.href} navigate={navigate} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg">
              <span className="mb-5 flex size-11 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                <Icon className="size-5" />
              </span>
              <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>
              <p className="mt-3 min-h-20 text-sm leading-7 text-slate-600">{item.body}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-teal-700">
                Learn more
                <ArrowRight className="size-4 transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </span>
            </AppLink>
          );
        })}
      </div>
    </section>
  );
}

function FeatureGrid({ title, features }: { title: string; features: string[] }) {
  return (
    <section className={`${sectionClass} py-16`}>
      <SectionHeading title={title} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div key={feature} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-5">
            <CheckCircle2 className="mt-1 size-5 shrink-0 text-teal-600" />
            <p className="font-semibold leading-7 text-slate-800">{feature}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function WebsitePackagesDetail({
  lang,
  page,
}: {
  lang: Lang;
  page: {
    packages?: Array<{ name: string; bestFor: string; includes: string[] }>;
    comparison?: string[][];
  };
}) {
  if (!page.packages || !page.comparison) return null;

  const labels =
    lang === "ar"
      ? {
          title: "اختار نقطة البداية المناسبة",
          body: "الباقات مرنة وليست أسعارا مغلقة. الهدف هو تحديد حجم الموقع، مستوى المحتوى، ونوع التحويل المطلوب.",
          bestFor: "مناسب لـ",
          includes: "يشمل",
          comparison: "مقارنة عملية بين الباقات",
          request: "عرض سعر",
          columns: ["البند", "موقع بداية", "موقع شركة", "صفحة قطاع", "مخصص"],
        }
      : {
          title: "Choose the right starting point",
          body: "Packages are flexible starting points, not rigid pricing boxes. The goal is to define page depth, content needs, and conversion flow.",
          bestFor: "Best for",
          includes: "Includes",
          comparison: "Practical package comparison",
          request: "Request quote",
          columns: ["Item", "Starter", "Business", "Sector Page", "Custom"],
        };

  return (
    <>
      <section className="bg-slate-50 py-16">
        <div className={sectionClass}>
          <SectionHeading title={labels.title} body={labels.body} />
          <div className="grid gap-4 lg:grid-cols-4">
            {page.packages.map((pack) => (
              <div key={pack.name} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-bold text-slate-950">{pack.name}</h3>
                <p className="mt-4 text-xs font-bold uppercase tracking-wide text-teal-700">{labels.bestFor}</p>
                <p className="mt-2 min-h-20 text-sm leading-7 text-slate-600">{pack.bestFor}</p>
                <p className="mt-5 text-xs font-bold uppercase tracking-wide text-slate-500">{labels.includes}</p>
                <ul className="mt-3 grid gap-2">
                  {pack.includes.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
                      <CheckCircle2 className="mt-1 size-4 shrink-0 text-teal-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 rounded-lg bg-slate-950 px-3 py-2 text-center text-sm font-bold text-white">{labels.request}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${sectionClass} py-16`}>
        <SectionHeading title={labels.comparison} />
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead>
              <tr className="bg-slate-950 text-white">
                {labels.columns.map((column) => (
                  <th key={column} className="px-4 py-4 text-start font-bold">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {page.comparison.map((row) => (
                <tr key={row[0]} className="border-t border-slate-200">
                  {row.map((cell, index) => (
                    <td key={`${row[0]}-${cell}`} className={`px-4 py-4 ${index === 0 ? "font-bold text-slate-950" : "text-slate-600"}`}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function Process({ steps }: { steps: string[] }) {
  return (
    <section className="bg-slate-950 py-16 text-white">
      <div className={sectionClass}>
        <SectionHeading title="Process" body="A clear delivery path from business need to working digital operations." />
        <div className="grid gap-4 md:grid-cols-5">
          {steps.map((step, index) => (
            <div key={step} className="rounded-xl border border-white/10 bg-white/5 p-5">
              <span className="text-sm font-bold text-teal-300">0{index + 1}</span>
              <h3 className="mt-4 font-bold">{step}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <section className="bg-slate-50 py-16">
      <div className={`${sectionClass} grid gap-8 lg:grid-cols-[0.8fr_1.2fr]`}>
        <SectionHeading title={title} body="Built for practical teams that need tools to work together, not another isolated system." />
        <div className="grid gap-3">
          {bullets.map((bullet) => (
            <div key={bullet} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <CheckCircle2 className="mt-1 size-5 shrink-0 text-teal-600" />
              <p className="font-medium leading-7 text-slate-700">{bullet}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCases({ lang }: { lang: Lang }) {
  const t = content[lang];
  return (
    <section className={`${sectionClass} py-16`}>
      <SectionHeading title={t.pages.useCases.title} body={t.pages.useCases.body} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {t.useCases.map(([title, body]) => (
          <div key={title} className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="font-bold text-slate-950">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PricingStarts({ lang, navigate }: { lang: Lang; navigate: (href: string) => void }) {
  const t = content[lang];
  const packages = [
    ["Workspace Launch", "Email, domain, Drive, admin setup, and training.", "/google-workspace/"],
    ["Website Launch", "A clear bilingual business website with lead capture.", "/website-packages/"],
    ["Automation Sprint", "Map and automate one painful recurring workflow.", "/ai-automation/"],
  ];
  return (
    <section className="bg-white py-16">
      <div className={sectionClass}>
        <SectionHeading title={t.home.packagesTitle} />
        <div className="grid gap-4 md:grid-cols-3">
          {packages.map(([title, body, href]) => (
            <div key={title} className="rounded-xl border border-slate-200 p-5">
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-3 min-h-16 text-sm leading-7 text-slate-600">{body}</p>
              <p className="mt-5 text-sm font-bold text-slate-950">Starting from request quote</p>
              <AppLink href={href} navigate={navigate} className="mt-5 inline-flex h-10 items-center rounded-lg bg-slate-950 px-4 text-sm font-bold text-white">
                {t.cta.quote}
              </AppLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBand({ lang, message, navigate }: { lang: Lang; message?: string; navigate: (href: string) => void }) {
  const t = content[lang];
  return (
    <section className={`${sectionClass} py-16`}>
      <div className="grid gap-6 rounded-xl bg-slate-950 p-6 text-white md:grid-cols-[1fr_auto] md:items-center md:p-8">
        <div>
          <h2 className="text-2xl font-bold">{t.cta.primary}</h2>
          <p className="mt-2 text-slate-300">{t.home.promise}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <AppLink href="/contact/" navigate={navigate} className="inline-flex h-11 items-center justify-center rounded-lg bg-teal-500 px-4 text-sm font-bold text-white">
            {t.cta.primary}
          </AppLink>
          <a href={whatsappUrl(message || t.cta.primary)} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/20 px-4 text-sm font-bold">
            <MessageCircle className="size-4" />
            {t.cta.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}

function Home({ lang, navigate }: { lang: Lang; navigate: (href: string) => void }) {
  const t = content[lang];
  return (
    <>
      <Hero lang={lang} title={t.home.heroTitle} body={t.home.heroBody} eyebrow={t.home.promise} primary={t.cta.primary} secondary={t.cta.secondary} navigate={navigate} />
      <CardGrid title={t.home.servicesTitle} items={t.services} type="service" navigate={navigate} />
      <CardGrid title={t.home.sectorsTitle} items={t.sectors} type="sector" navigate={navigate} />
      <Why title={t.home.whyTitle} bullets={t.home.whyBullets} />
      <Process steps={t.process} />
      <UseCases lang={lang} />
      <PricingStarts lang={lang} navigate={navigate} />
      <CtaBand lang={lang} navigate={navigate} />
    </>
  );
}

function Services({ lang, navigate }: { lang: Lang; navigate: (href: string) => void }) {
  const t = content[lang];
  return (
    <>
      <Hero lang={lang} title={t.pages.services.title} body={t.pages.services.body} primary={t.cta.primary} secondary={t.cta.secondary} navigate={navigate} />
      <CardGrid title={t.home.servicesTitle} items={t.services} type="service" navigate={navigate} />
      <Process steps={t.process} />
      <UseCases lang={lang} />
      <CtaBand lang={lang} navigate={navigate} />
    </>
  );
}

function Solutions({ lang, navigate }: { lang: Lang; navigate: (href: string) => void }) {
  const t = content[lang];
  return (
    <>
      <Hero lang={lang} title={t.pages.solutions.title} body={t.pages.solutions.body} primary={t.cta.primary} secondary={t.cta.secondary} navigate={navigate} />
      <CardGrid title={t.home.sectorsTitle} items={t.sectors} type="sector" navigate={navigate} />
      <UseCases lang={lang} />
      <CtaBand lang={lang} navigate={navigate} />
    </>
  );
}

function DetailPage({ lang, path, navigate }: { lang: Lang; path: string; navigate: (href: string) => void }) {
  const t = content[lang];
  const page = t.servicePages[path as keyof typeof t.servicePages] || t.sectorPages[path as keyof typeof t.sectorPages];

  if (!page) return <NotFound lang={lang} navigate={navigate} />;

  const websitePackagesPage = t.servicePages["/website-packages/"];

  return (
    <>
      <Hero lang={lang} title={page.title} body={page.body} primary={t.cta.primary} secondary={t.cta.whatsapp} navigate={navigate} />
      <FeatureGrid title="What we build" features={page.features} />
      {path === "/website-packages/" && <WebsitePackagesDetail lang={lang} page={websitePackagesPage} />}
      <Process steps={t.process} />
      <UseCases lang={lang} />
      <Faq lang={lang} />
      <CtaBand lang={lang} message={page.message} navigate={navigate} />
    </>
  );
}

function Faq({ lang }: { lang: Lang }) {
  const questions =
    lang === "ar"
      ? [
          ["هل تقدمون الدعم بالعربية والإنجليزية؟", "نعم، يمكن تنفيذ وتسليم التدريب والدعم باللغتين حسب فريقك."],
          ["هل الأسعار ثابتة؟", "نستخدم أسعار تبدأ من أو عرض سعر حسب حجم العمل، لأن احتياجات الشركات تختلف."],
          ["هل يمكن البدء بخدمة واحدة فقط؟", "نعم، يمكنك البدء بـ Google Workspace أو موقع أو workflow واحد ثم التوسع."],
        ]
      : [
          ["Do you support Arabic and English teams?", "Yes, delivery, training, and support can be handled in Arabic or English."],
          ["Are prices fixed?", "We use starting points or custom quotes because scope depends on the current setup and business needs."],
          ["Can we start with one service?", "Yes, you can start with Workspace, a website, or one automation workflow and expand later."],
        ];
  return (
    <section className="bg-slate-50 py-16">
      <div className={sectionClass}>
        <SectionHeading title="FAQ" />
        <div className="grid gap-3">
          {questions.map(([q, a]) => (
            <details key={q} className="rounded-xl border border-slate-200 bg-white p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-slate-950">
                {q}
                <ChevronDown className="size-5 shrink-0" />
              </summary>
              <p className="mt-4 leading-7 text-slate-600">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function About({ lang, navigate }: { lang: Lang; navigate: (href: string) => void }) {
  const t = content[lang];
  return (
    <>
      <Hero lang={lang} title={t.pages.about.title} body={t.pages.about.body} primary={t.cta.primary} secondary={t.cta.secondary} navigate={navigate} />
      <Why title={t.home.whyTitle} bullets={t.home.whyBullets} />
      <CardGrid title={t.home.servicesTitle} items={t.services} type="service" navigate={navigate} />
      <CtaBand lang={lang} navigate={navigate} />
    </>
  );
}

function Contact({ lang, navigate }: { lang: Lang; navigate: (href: string) => void }) {
  const t = content[lang];
  return (
    <>
      <Hero lang={lang} title={t.pages.contact.title} body={t.pages.contact.body} primary={t.cta.whatsapp} secondary={t.cta.secondary} navigate={navigate} />
      <section className={`${sectionClass} grid gap-8 py-16 lg:grid-cols-[1fr_0.8fr]`}>
        <form className="grid gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm" onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-4 md:grid-cols-2">
            {t.contact.labels.slice(0, 9).map((label) => (
              <label key={label} className="grid gap-2 text-sm font-semibold text-slate-700">
                {label}
                <input className="h-11 rounded-lg border border-slate-300 px-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100" />
              </label>
            ))}
          </div>
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            {t.contact.labels[9]}
            <textarea className="min-h-32 rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100" />
          </label>
          <button className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 text-sm font-bold text-white hover:bg-teal-700">
            <Send className="size-4" />
            {t.contact.submit}
          </button>
        </form>
        <aside className="rounded-xl bg-slate-950 p-6 text-white">
          <h2 className="text-2xl font-bold">{t.cta.whatsapp}</h2>
          <p className="mt-3 leading-7 text-slate-300">{t.pages.contact.body}</p>
          <a href={whatsappUrl(t.pages.contact.title)} className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-teal-500 px-5 text-sm font-bold text-white">
            <MessageCircle className="size-4" />
            {t.cta.whatsapp}
          </a>
        </aside>
      </section>
    </>
  );
}

function NotFound({ lang, navigate }: { lang: Lang; navigate: (href: string) => void }) {
  const t = content[lang];
  return (
    <section className={`${sectionClass} py-24`}>
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4 text-slate-600">Page not found.</p>
      <AppLink href="/" navigate={navigate} className="mt-6 inline-flex h-11 items-center rounded-lg bg-teal-600 px-4 text-sm font-bold text-white">
        {t.nav.home}
      </AppLink>
    </section>
  );
}

function Footer({ lang, navigate }: { lang: Lang; navigate: (href: string) => void }) {
  const t = content[lang];
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className={`${sectionClass} grid gap-8 py-10 md:grid-cols-[1fr_2fr]`}>
        <div>
          <p className="text-xl font-bold">{t.brand}</p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-slate-600">{t.home.promise}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <p className="font-bold">{t.nav.services}</p>
            <div className="mt-3 grid gap-2">
              {t.services.slice(0, 4).map((item) => (
                <AppLink key={item.title} href={item.href} navigate={navigate} className="text-sm text-slate-600 hover:text-teal-700">
                  {item.title}
                </AppLink>
              ))}
            </div>
          </div>
          <div>
            <p className="font-bold">{t.nav.solutions}</p>
            <div className="mt-3 grid gap-2">
              {t.sectors.slice(0, 4).map((item) => (
                <AppLink key={item.title} href={item.href} navigate={navigate} className="text-sm text-slate-600 hover:text-teal-700">
                  {item.title}
                </AppLink>
              ))}
            </div>
          </div>
          <div>
            <p className="font-bold">{t.nav.contact}</p>
            <a href={whatsappUrl(t.cta.primary)} className="mt-3 inline-flex text-sm font-semibold text-teal-700">
              {t.cta.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppButton({ lang }: { lang: Lang }) {
  const t = content[lang];
  return (
    <a href={whatsappUrl(t.cta.primary)} className="fixed bottom-4 z-50 inline-flex size-12 items-center justify-center rounded-full bg-green-500 text-white shadow-xl shadow-green-900/20 ltr:right-4 rtl:left-4 md:hidden" aria-label={t.cta.whatsapp}>
      <MessageCircle className="size-6" />
    </a>
  );
}

export default function App() {
  const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem("optimatech-lang") as Lang) || "ar");
  const { path, navigate } = usePath();
  const t = content[lang];

  const setLang = (next: Lang) => {
    localStorage.setItem("optimatech-lang", next);
    setLangState(next);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = languages[lang].dir;
    document.title = t.seo.title;
    const description = document.querySelector("meta[name='description']");
    description?.setAttribute("content", t.seo.description);
  }, [lang, t.seo.description, t.seo.title]);

  const page = useMemo(() => {
    if (path === "/") return <Home lang={lang} navigate={navigate} />;
    if (path === "/services/") return <Services lang={lang} navigate={navigate} />;
    if (path === "/solutions/") return <Solutions lang={lang} navigate={navigate} />;
    if (path === "/use-cases/") return <UseCases lang={lang} />;
    if (path === "/about/") return <About lang={lang} navigate={navigate} />;
    if (path === "/contact/") return <Contact lang={lang} navigate={navigate} />;
    if (t.servicePages[path as keyof typeof t.servicePages] || t.sectorPages[path as keyof typeof t.sectorPages]) {
      return <DetailPage lang={lang} path={path} navigate={navigate} />;
    }
    return <NotFound lang={lang} navigate={navigate} />;
  }, [lang, navigate, path, t.sectorPages, t.servicePages]);

  return (
    <div className={`min-h-screen bg-white text-slate-950 ${lang === "ar" ? "rtl" : "ltr"}`}>
      <Header lang={lang} setLang={setLang} path={path} navigate={navigate} />
      <main>{page}</main>
      <Footer lang={lang} navigate={navigate} />
      <WhatsAppButton lang={lang} />
    </div>
  );
}
