import { useEffect, useMemo, useRef, useState, type Key, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
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

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};

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
  const [scrolled, setScrolled] = useState(false);
  const t = content[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = navItems.map((item) => (
    <AppLink
      key={item.href}
      href={item.href}
      navigate={navigate}
      onClick={() => setOpen(false)}
      className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
        normalizePath(item.href) === path
          ? "bg-slate-900 text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      {t.nav[item.key as keyof typeof t.nav]}
    </AppLink>
  ));

  return (
    <header
      className={`sticky top-0 z-40 border-b border-slate-200/60 bg-white/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "shadow-sm shadow-slate-200/80" : ""
      }`}
    >
      <div className={`${sectionClass} flex h-16 items-center justify-between gap-4`}>
        <AppLink href="/" navigate={navigate} className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 text-white shadow-sm">
            <Sparkles className="size-4" />
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-950">{t.brand}</span>
        </AppLink>

        <nav className="hidden items-center gap-0.5 lg:flex">{links}</nav>

        <div className="hidden items-center gap-2 lg:flex">
          <button
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            aria-label={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
          >
            <Globe2 className="size-3.5" />
            {lang === "ar" ? "EN" : "عربي"}
          </button>
          <AppLink
            href="/contact/"
            navigate={navigate}
            className="inline-flex h-9 items-center rounded-lg bg-teal-600 px-4 text-sm font-semibold text-white shadow-sm shadow-teal-600/20 transition hover:bg-teal-700"
          >
            {t.cta.primary}
          </AppLink>
        </div>

        <button
          className="inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-slate-200 bg-white lg:hidden"
          >
            <div className="mx-auto grid max-w-7xl gap-1 px-4 py-4">
              {links}
              <button
                className="mt-2 inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 text-sm font-medium"
                onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              >
                <Globe2 className="size-4" />
                {lang === "ar" ? "English" : "العربية"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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

  const cardStagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } },
  };

  return (
    <section className="relative overflow-hidden border-b border-slate-200/60 bg-gradient-to-br from-slate-50 via-white to-cyan-50/40">
      {/* subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #0f172a 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className={`${sectionClass} relative grid min-h-[640px] items-center gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24`}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {eyebrow && (
            <motion.p
              variants={fadeUp}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-sm font-semibold text-teal-700"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-teal-500" />
              </span>
              {eyebrow}
            </motion.p>
          )}
          <motion.h1
            variants={fadeUp}
            className="max-w-2xl text-4xl font-bold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-[3.5rem]"
          >
            {title}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-8 text-slate-500">
            {body}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <AppLink
              href="/contact/"
              navigate={navigate}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 text-sm font-bold text-white shadow-md shadow-teal-600/25 transition hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-600/30"
            >
              {primary}
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </AppLink>
            {secondary && (
              <AppLink
                href="/solutions/"
                navigate={navigate}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-bold text-slate-800 shadow-sm transition hover:border-slate-300 hover:shadow"
              >
                {secondary}
              </AppLink>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: lang === "ar" ? -40 : 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-teal-100/40 to-slate-100/40 blur-2xl" />
          <div className="relative rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xl shadow-slate-200/60 ring-1 ring-slate-100">
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
              <p className="text-sm font-semibold text-teal-700">{visual.title}</p>
              <p className="mt-1.5 text-sm leading-6 text-slate-500">{visual.subtitle}</p>
            </div>
            <motion.div
              variants={cardStagger}
              initial="hidden"
              animate="show"
              className="mt-3 grid gap-2.5"
            >
              {visual.items.map(([item, detail]) => (
                <motion.div
                  key={item}
                  variants={fadeUp}
                  className="flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm"
                >
                  <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-teal-500" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{item}</p>
                    <p className="mt-0.5 text-xs leading-5 text-slate-500">{detail}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <div className="mt-3 rounded-xl border border-teal-100 bg-gradient-to-r from-teal-50 to-cyan-50 p-3.5 text-sm font-medium leading-6 text-teal-800">
              {visual.note}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeading({ title, body }: { title: string; body?: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="mb-10 max-w-2xl"
    >
      <h2 className="text-3xl font-bold tracking-tight text-slate-950">{title}</h2>
      {body && <p className="mt-3 text-base leading-7 text-slate-500">{body}</p>}
    </motion.div>
  );
}

function CardGrid({
  lang,
  title,
  items,
  type,
  navigate,
}: {
  lang: Lang;
  title: string;
  items: Array<{ id: string; title: string; body: string; href: string }>;
  type: "service" | "sector";
  navigate: (href: string) => void;
}) {
  const t = content[lang];
  const iconGradients: Record<string, string> = {
    workspace: "from-blue-50 to-indigo-50 text-indigo-600",
    websites: "from-violet-50 to-purple-50 text-violet-600",
    automation: "from-orange-50 to-amber-50 text-amber-600",
    cloud: "from-sky-50 to-cyan-50 text-sky-600",
    sectors: "from-teal-50 to-emerald-50 text-teal-600",
    support: "from-rose-50 to-pink-50 text-rose-600",
    education: "from-blue-50 to-indigo-50 text-indigo-600",
    ngos: "from-green-50 to-emerald-50 text-emerald-600",
    ai: "from-violet-50 to-purple-50 text-violet-600",
    hr: "from-orange-50 to-amber-50 text-amber-600",
    smb: "from-teal-50 to-cyan-50 text-teal-600",
  };

  return (
    <section className={`${sectionClass} py-20`}>
      <SectionHeading title={title} />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((item) => {
          const Icon =
            type === "service"
              ? serviceIcons[item.id as keyof typeof serviceIcons]
              : sectorIcons[item.id as keyof typeof sectorIcons];
          const gradient = iconGradients[item.id] || "from-teal-50 to-cyan-50 text-teal-600";
          return (
            <motion.div key={item.title} variants={fadeUp}>
              <AppLink
                href={item.href}
                navigate={navigate}
                className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/60"
              >
                <span className={`mb-5 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient}`}>
                  <Icon className="size-5" />
                </span>
                <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-7 text-slate-500">{item.body}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-teal-700">
                  {t.ui.learnMore}
                  <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </span>
              </AppLink>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

function FeatureGrid({ lang, title, features }: { lang: Lang; title: string; features: string[] }) {
  const t = content[lang];
  return (
    <section className={`${sectionClass} py-20`}>
      <SectionHeading title={title || t.ui.whatWeBuild} />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="grid gap-3 md:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature) => (
          <motion.div
            key={feature}
            variants={fadeUp}
            className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-teal-500" />
            <p className="font-semibold leading-7 text-slate-800">{feature}</p>
          </motion.div>
        ))}
      </motion.div>
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
      <section className="bg-slate-50/60 py-20">
        <div className={sectionClass}>
          <SectionHeading title={labels.title} body={labels.body} />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="grid gap-4 lg:grid-cols-4"
          >
            {page.packages.map((pack) => (
              <motion.div
                key={pack.name}
                variants={fadeUp}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-slate-950">{pack.name}</h3>
                <p className="mt-4 text-xs font-bold uppercase tracking-wide text-teal-700">{labels.bestFor}</p>
                <p className="mt-2 min-h-20 text-sm leading-7 text-slate-500">{pack.bestFor}</p>
                <p className="mt-5 text-xs font-bold uppercase tracking-wide text-slate-400">{labels.includes}</p>
                <ul className="mt-3 grid gap-2">
                  {pack.includes.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 rounded-lg bg-slate-950 px-3 py-2 text-center text-sm font-bold text-white">{labels.request}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className={`${sectionClass} py-20`}>
        <SectionHeading title={labels.comparison} />
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
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
                <tr key={row[0]} className="border-t border-slate-100 transition hover:bg-slate-50/60">
                  {row.map((cell, index) => (
                    <td
                      key={`${row[0]}-${cell}`}
                      className={`px-4 py-4 ${index === 0 ? "font-bold text-slate-950" : "text-slate-500"}`}
                    >
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

function Process({ lang }: { lang: Lang }) {
  const t = content[lang];
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(20,184,166,0.12),transparent_60%)]" />
      <div className={`relative ${sectionClass}`}>
        <SectionHeading title={t.ui.process} body={t.ui.processBody} />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="relative grid gap-4 md:grid-cols-5"
        >
          {/* connecting line desktop */}
          <div className="absolute start-0 end-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent md:block" />
          {t.process.map((step, index) => (
            <motion.div
              key={step}
              variants={fadeUp}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-teal-500/20 text-sm font-bold text-teal-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-bold text-white">{step}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Why({ lang, title, bullets }: { lang: Lang; title: string; bullets: string[] }) {
  const t = content[lang];
  return (
    <section className="bg-gradient-to-br from-slate-50 to-white py-20">
      <div className={`${sectionClass} grid gap-12 lg:grid-cols-[0.85fr_1.15fr]`}>
        <div>
          <SectionHeading title={title} body={t.home.whyBody} />
        </div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid gap-3"
        >
          {bullets.map((bullet) => (
            <motion.div
              key={bullet}
              variants={fadeUp}
              className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:border-teal-200 hover:shadow-md"
            >
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-teal-500" />
              <p className="font-medium leading-7 text-slate-700">{bullet}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function UseCases({ lang }: { lang: Lang }) {
  const t = content[lang];
  return (
    <section className={`${sectionClass} py-20`}>
      <SectionHeading title={t.pages.useCases.title} body={t.pages.useCases.body} />
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {t.useCases.map(([title, body]) => (
          <motion.div
            key={title}
            variants={fadeUp}
            className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <h3 className="font-bold text-slate-950">{title}</h3>
            <p className="mt-2.5 text-sm leading-7 text-slate-500">{body}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function PricingStarts({ lang, navigate }: { lang: Lang; navigate: (href: string) => void }) {
  const t = content[lang];
  const gradients = [
    "from-blue-500 to-indigo-600",
    "from-teal-500 to-emerald-600",
    "from-violet-500 to-purple-600",
  ];
  return (
    <section className="bg-slate-50/60 py-20">
      <div className={sectionClass}>
        <SectionHeading title={t.home.packagesTitle} />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid gap-5 md:grid-cols-3"
        >
          {t.pricing.map(({ title, body, href }, i) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`absolute start-0 top-0 h-1 w-full rounded-t-2xl bg-gradient-to-r ${gradients[i]}`} />
              <h3 className="text-lg font-bold text-slate-950">{title}</h3>
              <p className="mt-3 min-h-14 text-sm leading-7 text-slate-500">{body}</p>
              <AppLink
                href={href}
                navigate={navigate}
                className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                {t.cta.quote}
                <ArrowRight className="size-3.5 rtl:rotate-180" />
              </AppLink>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CtaBand({ lang, message, navigate }: { lang: Lang; message?: string; navigate: (href: string) => void }) {
  const t = content[lang];
  return (
    <section className={`${sectionClass} py-20`}>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-teal-950 p-8 text-white md:p-12"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(20,184,166,0.2),transparent_60%)]" />
        <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">{t.cta.primary}</h2>
            <p className="mt-2 text-slate-300">{t.home.promise}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <AppLink
              href="/contact/"
              navigate={navigate}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-teal-500 px-5 text-sm font-bold text-white shadow-lg shadow-teal-900/30 transition hover:bg-teal-400"
            >
              {t.cta.primary}
            </AppLink>
            <a
              href={whatsappUrl(message || t.cta.primary)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 text-sm font-bold backdrop-blur transition hover:bg-white/10"
            >
              <MessageCircle className="size-4" />
              {t.cta.whatsapp}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Home({ lang, navigate }: { lang: Lang; navigate: (href: string) => void }) {
  const t = content[lang];
  return (
    <>
      <Hero lang={lang} title={t.home.heroTitle} body={t.home.heroBody} eyebrow={t.home.promise} primary={t.cta.primary} secondary={t.cta.secondary} navigate={navigate} />
      <CardGrid lang={lang} title={t.home.servicesTitle} items={t.services} type="service" navigate={navigate} />
      <CardGrid lang={lang} title={t.home.sectorsTitle} items={t.sectors} type="sector" navigate={navigate} />
      <Why lang={lang} title={t.home.whyTitle} bullets={t.home.whyBullets} />
      <Process lang={lang} />
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
      <CardGrid lang={lang} title={t.home.servicesTitle} items={t.services} type="service" navigate={navigate} />
      <Process lang={lang} />
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
      <CardGrid lang={lang} title={t.home.sectorsTitle} items={t.sectors} type="sector" navigate={navigate} />
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
      <FeatureGrid lang={lang} title={t.ui.whatWeBuild} features={page.features} />
      {path === "/website-packages/" && <WebsitePackagesDetail lang={lang} page={websitePackagesPage} />}
      <Process lang={lang} />
      <UseCases lang={lang} />
      <Faq lang={lang} />
      <CtaBand lang={lang} message={page.message} navigate={navigate} />
    </>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className={`rounded-2xl border bg-white transition-all duration-200 ${open ? "border-teal-200 shadow-md shadow-teal-100/60" : "border-slate-200 shadow-sm"}`}>
      <button
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-start font-bold text-slate-950"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="size-5 shrink-0 text-slate-400" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            ref={ref}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 leading-7 text-slate-500">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Faq({ lang }: { lang: Lang }) {
  const t = content[lang];
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
    <section className="bg-slate-50/60 py-20">
      <div className={sectionClass}>
        <SectionHeading title={t.ui.faq} />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid gap-3"
        >
          {questions.map(([q, a]) => (
            <motion.div key={q} variants={fadeUp}>
              <FaqItem q={q} a={a} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function About({ lang, navigate }: { lang: Lang; navigate: (href: string) => void }) {
  const t = content[lang];
  return (
    <>
      <Hero lang={lang} title={t.pages.about.title} body={t.pages.about.body} primary={t.cta.primary} secondary={t.cta.secondary} navigate={navigate} />
      <Why lang={lang} title={t.home.whyTitle} bullets={t.home.whyBullets} />
      <CardGrid lang={lang} title={t.home.servicesTitle} items={t.services} type="service" navigate={navigate} />
      <CtaBand lang={lang} navigate={navigate} />
    </>
  );
}

function Contact({ lang, navigate }: { lang: Lang; navigate: (href: string) => void }) {
  const t = content[lang];
  const fieldNames = ["name", "company", "email", "phone", "company_size", "service", "current_tools", "budget", "language", "message"] as const;

  return (
    <>
      <Hero lang={lang} title={t.pages.contact.title} body={t.pages.contact.body} primary={t.cta.whatsapp} secondary={t.cta.secondary} navigate={navigate} />
      <section className={`${sectionClass} grid gap-8 py-20 lg:grid-cols-[1fr_0.75fr]`}>
        <motion.form
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const message = `${t.cta.primary}\n\n${[...data.entries()].map(([k, v]) => `${k}: ${v}`).join("\n")}`;
            window.open(whatsappUrl(message), "_blank");
          }}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {t.contact.labels.slice(0, 8).map((label, i) => (
              <label key={label} className="grid gap-1.5 text-sm font-semibold text-slate-700">
                {label}
                <input
                  name={fieldNames[i]}
                  className="h-11 rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                />
              </label>
            ))}
          </div>
          <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
            {t.contact.labels[8]}
            <input
              name={fieldNames[8]}
              className="h-11 rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
            />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold text-slate-700">
            {t.contact.labels[9]}
            <textarea
              name={fieldNames[9]}
              className="min-h-32 rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
            />
          </label>
          <button
            type="submit"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 text-sm font-bold text-white shadow-sm shadow-teal-600/20 transition hover:bg-teal-700"
          >
            <Send className="size-4" />
            {t.contact.submit}
          </button>
        </motion.form>

        <motion.aside
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 p-6 text-white"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(20,184,166,0.18),transparent_60%)]" />
          <div className="relative">
            <h2 className="text-2xl font-bold">{t.cta.whatsapp}</h2>
            <p className="mt-3 leading-7 text-slate-300">{t.pages.contact.body}</p>
            <a
              href={whatsappUrl(t.pages.contact.title)}
              className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-teal-500 px-5 text-sm font-bold text-white shadow-lg shadow-teal-900/30 transition hover:bg-teal-400"
            >
              <MessageCircle className="size-4" />
              {t.cta.whatsapp}
            </a>
          </div>
        </motion.aside>
      </section>
    </>
  );
}

function NotFound({ lang, navigate }: { lang: Lang; navigate: (href: string) => void }) {
  const t = content[lang];
  return (
    <section className={`${sectionClass} py-24`}>
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4 text-slate-500">{lang === "ar" ? "الصفحة غير موجودة." : "Page not found."}</p>
      <AppLink href="/" navigate={navigate} className="mt-6 inline-flex h-11 items-center rounded-xl bg-teal-600 px-4 text-sm font-bold text-white">
        {t.nav.home}
      </AppLink>
    </section>
  );
}

function Footer({ lang, navigate }: { lang: Lang; navigate: (href: string) => void }) {
  const t = content[lang];
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className={`${sectionClass} grid gap-10 py-12 md:grid-cols-[1.2fr_2fr]`}>
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 text-white shadow-sm">
              <Sparkles className="size-4" />
            </span>
            <p className="text-lg font-bold text-slate-950">{t.brand}</p>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-7 text-slate-500">{t.home.promise}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          <div>
            <p className="text-sm font-bold text-slate-950">{t.nav.services}</p>
            <div className="mt-4 grid gap-2.5">
              {t.services.slice(0, 4).map((item) => (
                <AppLink key={item.title} href={item.href} navigate={navigate} className="text-sm text-slate-500 transition hover:text-teal-700">
                  {item.title}
                </AppLink>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-950">{t.nav.solutions}</p>
            <div className="mt-4 grid gap-2.5">
              {t.sectors.slice(0, 4).map((item) => (
                <AppLink key={item.title} href={item.href} navigate={navigate} className="text-sm text-slate-500 transition hover:text-teal-700">
                  {item.title}
                </AppLink>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-950">{t.nav.contact}</p>
            <a href={whatsappUrl(t.cta.primary)} className="mt-4 inline-flex text-sm font-semibold text-teal-600 transition hover:text-teal-700">
              {t.cta.whatsapp}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100">
        <div className={`${sectionClass} py-4`}>
          <p className="text-xs text-slate-400">{t.ui.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppButton({ lang }: { lang: Lang }) {
  const t = content[lang];
  return (
    <motion.a
      href={whatsappUrl(t.cta.primary)}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 z-50 inline-flex size-13 items-center justify-center rounded-full bg-green-500 text-white shadow-xl shadow-green-900/25 ltr:right-5 rtl:left-5"
      aria-label={t.cta.whatsapp}
    >
      <MessageCircle className="size-6" />
    </motion.a>
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
      <main>
        <AnimatePresence mode="wait">
          <motion.div key={path} variants={fadeIn} initial="hidden" animate="show">
            {page}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer lang={lang} navigate={navigate} />
      <WhatsAppButton lang={lang} />
    </div>
  );
}
