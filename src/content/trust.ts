/**
 * Central trust & social proof config.
 * Edit this file to update stats, badges, and testimonials across the site.
 * All placeholder values are clearly marked — replace before launch.
 */

import { CalendarCheck, Globe2, ShieldCheck, Zap } from "lucide-react";
import type { ComponentType } from "react";

// ─── Trust badges ────────────────────────────────────────────────────────────
// Factual claims only — these are safe to show without real stats.

export interface TrustBadge {
  en: string;
  ar: string;
  Icon: ComponentType<{ className?: string }>;
}

export const trustBadges: TrustBadge[] = [
  { en: "Free consultation", ar: "استشارة مجانية", Icon: CalendarCheck },
  { en: "Arabic & English support", ar: "دعم عربي وإنجليزي", Icon: Globe2 },
  { en: "Fast setup", ar: "إعداد سريع", Icon: Zap },
  { en: "No long-term contracts", ar: "بدون عقود طويلة", Icon: ShieldCheck },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
// REPLACE each entry with a real client quote before launch.
// Set placeholder: false once replaced.

export interface Testimonial {
  quote: { en: string; ar: string };
  name: { en: string; ar: string };
  role: { en: string; ar: string };
  /** Two-letter initials shown in avatar until real photo is added */
  initials: string;
  /** Remove or set false once replaced with real data */
  placeholder: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote: {
      en: "Replace this with a real client quote. Specific outcomes work better than general praise — e.g. 'Saved us 3 hours a week on reporting.'",
      ar: "استبدل هذا بشهادة حقيقية من العميل. النتائج المحددة أفضل من الإطراء العام — مثلاً: 'وفّر علينا 3 ساعات أسبوعياً في التقارير.'",
    },
    name: { en: "Client Name", ar: "اسم العميل" },
    role: { en: "Role · Company Name", ar: "المسمى الوظيفي · اسم الشركة" },
    initials: "؟",
    placeholder: true,
  },
  {
    quote: {
      en: "Replace this with a real client quote. Mention the service used and the outcome for credibility.",
      ar: "استبدل هذا بشهادة حقيقية. اذكر الخدمة المستخدمة والنتيجة لتعزيز المصداقية.",
    },
    name: { en: "Client Name", ar: "اسم العميل" },
    role: { en: "Role · Company Name", ar: "المسمى الوظيفي · اسم الشركة" },
    initials: "؟",
    placeholder: true,
  },
  {
    quote: {
      en: "Replace this with a real client quote. One or two sentences is enough — keep it authentic.",
      ar: "استبدل هذا بشهادة حقيقية. جملة أو اثنتان تكفيان — المهم أن تكون حقيقية.",
    },
    name: { en: "Client Name", ar: "اسم العميل" },
    role: { en: "Role · Company Name", ar: "المسمى الوظيفي · اسم الشركة" },
    initials: "؟",
    placeholder: true,
  },
];
