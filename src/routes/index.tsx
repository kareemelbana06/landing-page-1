import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  Check,
  CircleDollarSign,
  Copy,
  ExternalLink,
  Link2,
  Lock,
  Minus,
  Plus,
  ShieldCheck,
  Smartphone,
  Wallet,
} from "lucide-react";

import bikeImage from "@/assets/delivery-bike.jpg";
import carImage from "@/assets/delivery-car.jpg";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Start Your Journey With Uber" },
      {
        name: "description",
        content:
          "Independent referral page: apply to deliver with Uber. Work your own hours and finish your signup on Uber's official platform.",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: "Start Your Journey With Uber" },
      {
        property: "og:description",
        content:
          "Apply through this referral link. Independent page — signup is completed on Uber's official platform.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Start Your Journey With Uber" },
      {
        name: "twitter:description",
        content: "Independent referral page for the Uber delivery signup.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Start Your Journey With Uber",
          description:
            "Independent referral page for applying to deliver with Uber.",
          url: "/",
          inLanguage: "en",
          isPartOf: {
            "@type": "WebSite",
            name: "Deliver.Invite",
            url: "/",
          },
        }),
      },
    ],
  }),
  component: Index,
});

/* ---------------------------------- data --------------------------------- */

const trustPoints = [
  { icon: Lock, label: "Secure application", note: "Handled on uber.com over HTTPS" },
  { icon: ExternalLink, label: "Official Uber signup", note: "The button opens Uber's own site" },
  { icon: Link2, label: "Referral code included", note: "Invite code is included in the link" },
];

const benefits = [
  {
    icon: CalendarClock,
    title: "Your own schedule",
    body: "No shifts and no manager — go online whenever it suits you.",
  },
  {
    icon: Wallet,
    title: "Weekly payouts",
    body: "Uber pays out weekly, with instant cash-out available in many cities.",
  },
  {
    icon: CircleDollarSign,
    title: "See pay upfront",
    body: "Each offer shows the trip and what you earn before you accept it.",
  },
  {
    icon: ShieldCheck,
    title: "Support on the road",
    body: "In-app safety tools and support while you are on an active delivery.",
  },
];

const steps = [
  {
    icon: Smartphone,
    title: "Start your application",
    body: "Open the referral link — the invite code travels with it.",
  },
  {
    icon: BadgeCheck,
    title: "Complete your information",
    body: "Add your details and upload the documents Uber asks for.",
  },
  {
    icon: ArrowRight,
    title: "Finish the signup process",
    body: "Once Uber approves you, go online and start delivering.",
  },
];

const requirements = [
  "Be at least 18 years old (19 in some cities)",
  "A valid driver's licence, or a bike/scooter where allowed",
  "A smartphone that runs the Uber Driver app",
  "Pass the standard background check",
];

const faqs = [
  {
    q: "Does the invite code cost anything?",
    a: "No. Signing up is free — the code simply links your application to this referral.",
  },
  {
    q: "Can I deliver on a bike?",
    a: "In many cities, yes. The sign-up flow shows which vehicle types are available where you live.",
  },
  {
    q: "How long does approval take?",
    a: "It depends on your documents and the background check, usually a few days.",
  },
  {
    q: "Do I need a car of my own?",
    a: "For car delivery you need an eligible vehicle, but bike and scooter options need no car at all.",
  },
];

/* -------------------------------- helpers -------------------------------- */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, shown };
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${shown ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

function reportConversion() {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === "function") {
    gtag("event", "conversion", {
      send_to: "AW-18455663339/hL3YCOO9hfwcEOulrOBE",
    });
  }
}

type LandingCustomization = {
  primaryColor?: string;
  buttonColor?: string;
  backgroundColor?: string;
  textColor?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroButtonText?: string;
  showImage?: boolean;
  showCTA?: boolean;
};

function normalizeCustomization(value: unknown): LandingCustomization {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return {};

  const candidate = value as Record<string, unknown>;
  const customization: LandingCustomization = {};
  const stringFields = [
    "primaryColor",
    "buttonColor",
    "backgroundColor",
    "textColor",
    "heroTitle",
    "heroDescription",
    "heroButtonText",
  ] as const;

  for (const field of stringFields) {
    const fieldValue = candidate[field];
    if (typeof fieldValue === "string" && fieldValue.trim()) {
      customization[field] = fieldValue.trim();
    }
  }

  if (typeof candidate["showImage"] === "boolean") {
    customization.showImage = candidate["showImage"];
  }
  if (typeof candidate["showCTA"] === "boolean") {
    customization.showCTA = candidate["showCTA"];
  }

  return customization;
}

function PrimaryCta({
  label,
  inviteUrl,
  buttonColor,
  className = "",
}: {
  label: string;
  inviteUrl: string | null;
  buttonColor?: string;
  className?: string;
}) {
  return (
    <a
      href={inviteUrl ?? undefined}
      target="_blank"
      rel="noopener noreferrer"
      aria-disabled={!inviteUrl}
      tabIndex={inviteUrl ? undefined : -1}
      style={buttonColor ? { backgroundColor: buttonColor } : undefined}
      onClick={(event) => {
        if (!inviteUrl) {
          event.preventDefault();
          return;
        }
        reportConversion();
      }}
      className={`group inline-flex h-14 min-h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 font-display text-base font-semibold text-primary-foreground shadow-glow transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${className}`}
    >
      {label}
      <ArrowRight
        aria-hidden="true"
        className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
      />
    </a>
  );
}

function CopyCode({ inviteCode }: { inviteCode: string | null }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!inviteCode) return;

    try {
      await navigator.clipboard.writeText(inviteCode);
    } catch {
      /* clipboard unavailable — still give feedback */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="inline-flex max-w-full items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 text-left">
      <div className="min-w-0">
        <p className="text-[0.7rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
          Invite code
        </p>
        <p className="truncate font-display text-xl font-semibold text-primary tabular-nums">
          {inviteCode}
        </p>
      </div>
      <button
        type="button"
        onClick={copy}
        disabled={!inviteCode}
        aria-label={copied ? "Invite code copied" : `Copy invite code ${inviteCode ?? ""}`}
        title="Copy invite code"
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95 motion-reduce:transition-none motion-reduce:active:scale-100"
      >
        {copied ? (
          <Check aria-hidden="true" className="h-5 w-5 text-primary" />
        ) : (
          <Copy aria-hidden="true" className="h-5 w-5" />
        )}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied!" : ""}
      </span>
      <span
        aria-hidden="true"
        className={`text-sm font-medium text-primary transition-opacity duration-200 ${copied ? "opacity-100" : "opacity-0"}`}
      >
        Copied!
      </span>
    </div>
  );
}

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const id = `faq-panel-${index}`;
  const btnId = `faq-button-${index}`;

  return (
    <div className="px-5 sm:px-6">
      <h3>
        <button
          id={btnId}
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-base font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          <span className="min-w-0">{q}</span>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-primary">
            {open ? (
              <Minus aria-hidden="true" className="h-4 w-4" />
            ) : (
              <Plus aria-hidden="true" className="h-4 w-4" />
            )}
          </span>
        </button>
      </h3>
      <div
        id={id}
        role="region"
        aria-labelledby={btnId}
        hidden={!open}
        className="accordion-panel pb-5"
      >
        <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">{a}</p>
      </div>
    </div>
  );
}

/* ---------------------------------- page --------------------------------- */

function Index() {
  const year = new Date().getFullYear();
  const [inviteUrl, setInviteUrl] = useState<string | null>(null);
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [customization, setCustomization] = useState<LandingCustomization>({});

  useEffect(() => {
    let active = true;

    const loadLandingPage = async () => {
      try {
        const { data, error } = await supabase
          .from("landing_pages")
          .select("invite_link, invite_code, customization")
          .eq("slug", "landing-1")
          .single();

        if (error) {
          console.error("Failed to load Uber landing page", error);
          return;
        }

        if (typeof data?.invite_link !== "string" || !data.invite_link.trim()) {
          console.error("Supabase returned an invalid Uber invite link");
          return;
        }

        const url = new URL(data.invite_link);
        if (url.protocol !== "https:") {
          console.error("Supabase returned an invalid Uber invite link");
          return;
        }

        if (active) {
          setInviteUrl(url.href);
          setCustomization(normalizeCustomization(data.customization));
          if (typeof data.invite_code === "string" && data.invite_code.trim()) {
            setInviteCode(data.invite_code.trim());
          } else {
            console.error("Supabase returned an invalid Uber invite code");
          }
        }
      } catch (error) {
        console.error("Failed to load Uber landing page", error);
      }
    };

    void loadLandingPage();
    return () => {
      active = false;
    };
  }, []);

  const pageStyle: CSSProperties & {
    "--primary"?: string;
    "--background"?: string;
    "--foreground"?: string;
    "--muted-foreground"?: string;
  } = {
    ...(customization.primaryColor ? { "--primary": customization.primaryColor } : {}),
    ...(customization.backgroundColor ? { "--background": customization.backgroundColor } : {}),
    ...(customization.textColor
      ? {
          "--foreground": customization.textColor,
          "--muted-foreground": customization.textColor,
        }
      : {}),
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground" style={pageStyle}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-3.5">
          <a href="#main" className="truncate font-display text-base font-semibold tracking-tight">
            Deliver<span className="text-primary">.</span>Invite
          </a>
          <nav aria-label="Primary" className="flex items-center gap-2">
            <a
              href="#how-it-works"
              className="hidden h-10 items-center rounded-full px-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex"
            >
              How it works
            </a>
            <a
              href={inviteUrl ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!inviteUrl}
              tabIndex={inviteUrl ? undefined : -1}
              onClick={(event) => {
                if (!inviteUrl) event.preventDefault();
              }}
              className="inline-flex h-10 shrink-0 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-px active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
            >
              Apply
            </a>
          </nav>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section className="bg-hero-glow px-5 pt-14 pb-12 sm:pt-20 sm:pb-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium tracking-wide text-primary uppercase">
              Independent referral page
            </p>
            <h1
              className="text-balance-title mt-6 font-display text-[2rem] leading-[1.08] font-bold sm:text-5xl lg:text-6xl"
              style={customization.primaryColor ? { color: customization.primaryColor } : undefined}
            >
              {customization.heroTitle ?? "Start Your Journey With Uber"}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {customization.heroDescription ??
                "Apply to deliver through the referral link below. The invite code is carried in the link, so it is applied automatically wherever Uber supports it."}
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
              {customization.showCTA !== false && (
                <PrimaryCta
                  inviteUrl={inviteUrl}
                  label={customization.heroButtonText ?? "Start Your Application"}
                  {...(customization.buttonColor ? { buttonColor: customization.buttonColor } : {})}
                  className="w-full sm:w-auto"
                />
              )}
              <a
                href="#how-it-works"
                className="inline-flex h-14 min-h-14 w-full items-center justify-center rounded-full border border-border px-8 font-display text-base font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
              >
                How It Works
              </a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">Free to apply · takes a few minutes</p>
          </div>

          {customization.showImage !== false && (
            <Reveal className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 sm:gap-5">
              {[
                {
                  src: bikeImage,
                  alt: "Courier riding an e-bike with a delivery box through a city street at dusk",
                  label: "On a bike",
                  note: "No car needed in most cities",
                },
                {
                  src: carImage,
                  alt: "Driver in a car at night with a phone showing navigation on the dashboard",
                  label: "In a car",
                  note: "Longer trips, bigger orders",
                },
              ].map((v) => (
                <figure
                  key={v.label}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-surface shadow-elevated"
                >
                  <img
                    src={v.src}
                    alt={v.alt}
                    width={1280}
                    height={960}
                    className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none sm:h-72"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/85 to-transparent px-5 pt-12 pb-5 text-left">
                    <p className="font-display text-lg font-semibold">{v.label}</p>
                    <p className="text-sm text-muted-foreground">{v.note}</p>
                  </figcaption>
                </figure>
              ))}
            </Reveal>
          )}
        </section>

        {/* Trust */}
        <section aria-labelledby="trust-heading" className="border-y border-border bg-surface/60 px-5 py-10">
          <div className="mx-auto max-w-5xl">
            <h2 id="trust-heading" className="text-center text-sm leading-relaxed text-muted-foreground">
              This is an independent referral page. You&rsquo;ll complete your application through
              Uber&rsquo;s official platform.
            </h2>
            <ul className="mt-7 grid gap-4 sm:grid-cols-3">
              {trustPoints.map((t) => (
                <li
                  key={t.label}
                  className="flex items-start gap-3 rounded-2xl border border-border bg-background/40 px-4 py-4"
                >
                  <t.icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <p className="font-display text-sm font-semibold">{t.label}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{t.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Benefits */}
        <section aria-labelledby="benefits-heading" className="px-5 py-16 sm:py-20">
          <Reveal className="mx-auto max-w-6xl">
            <h2
              id="benefits-heading"
              className="text-balance-title text-center font-display text-2xl font-bold sm:text-4xl"
            >
              Built around the way you want to work
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((b) => (
                <article
                  key={b.title}
                  className="rounded-2xl border border-border bg-surface p-6 transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-primary/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/12 text-primary">
                    <b.icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-base font-semibold">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          aria-labelledby="how-heading"
          className="scroll-mt-20 border-y border-border bg-surface/40 px-5 py-16 sm:py-20"
        >
          <Reveal className="mx-auto max-w-5xl">
            <h2
              id="how-heading"
              className="text-balance-title text-center font-display text-2xl font-bold sm:text-4xl"
            >
              How it works
            </h2>
            <ol className="mt-10 grid gap-4 sm:grid-cols-3">
              {steps.map((step, i) => (
                <li
                  key={step.title}
                  className="relative rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-primary/40"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                      <step.icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="font-display text-3xl font-semibold text-border" aria-hidden="true">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-base font-semibold">
                    <span className="text-primary">Step {i + 1}.</span> {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        {/* Requirements */}
        <section aria-labelledby="requirements-heading" className="px-5 py-16 sm:py-20">
          <Reveal className="mx-auto max-w-3xl">
            <h2 id="requirements-heading" className="font-display text-2xl font-bold sm:text-3xl">
              What you need
            </h2>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {requirements.map((r) => (
                <li key={r} className="flex items-start gap-3 rounded-xl border border-border/70 px-4 py-3.5">
                  <BadgeCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="min-w-0 text-sm leading-relaxed text-muted-foreground">{r}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              Requirements vary by city — the sign-up page shows the exact list for your area.
            </p>
          </Reveal>
        </section>

        {/* Invite code CTA */}
        <section aria-labelledby="cta-heading" className="px-5 pb-16 sm:pb-20">
          <Reveal className="mx-auto max-w-4xl">
            <div className="rounded-3xl border border-primary/25 bg-surface px-6 py-12 text-center shadow-elevated sm:px-12">
              <h2 id="cta-heading" className="font-display text-2xl font-bold sm:text-3xl">
                Ready to get started?
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                Apply through the referral link and use invite code{" "}
                <span className="font-semibold text-primary">{inviteCode}</span>.
              </p>
              <div className="mt-7 flex flex-col items-center gap-4">
                <CopyCode inviteCode={inviteCode} />
                <PrimaryCta
                  inviteUrl={inviteUrl}
                  label="Start Your Application"
                  {...(customization.buttonColor ? { buttonColor: customization.buttonColor } : {})}
                  className="w-full sm:w-auto"
                />
              </div>
            </div>
          </Reveal>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          aria-labelledby="faq-heading"
          className="scroll-mt-20 border-t border-border bg-surface/40 px-5 py-16 sm:py-20"
        >
          <div className="mx-auto max-w-3xl">
            <h2 id="faq-heading" className="font-display text-2xl font-bold sm:text-3xl">
              Questions
            </h2>
            <div className="mt-7 divide-y divide-border rounded-2xl border border-border bg-surface">
              {faqs.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-5 py-10">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
          <div className="min-w-0">
            <p className="font-display text-base font-semibold tracking-tight">
              Deliver<span className="text-primary">.</span>Invite
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              This page is independently operated and is not affiliated with, endorsed by, or
              sponsored by Uber. Terms, earnings and requirements are set by Uber and vary by city.
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href="#how-it-works" className="text-muted-foreground transition-colors hover:text-primary">
              How it works
            </a>
            <a href="#requirements-heading" className="text-muted-foreground transition-colors hover:text-primary">
              Requirements
            </a>
            <a href="#faq" className="text-muted-foreground transition-colors hover:text-primary">
              FAQ
            </a>
            <a
              href={inviteUrl ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!inviteUrl}
              tabIndex={inviteUrl ? undefined : -1}
              onClick={(event) => {
                if (!inviteUrl) event.preventDefault();
              }}
              className="font-medium text-primary hover:underline"
            >
              Start your application
            </a>
          </nav>
        </div>
        <p className="mx-auto mt-8 max-w-6xl border-t border-border/60 pt-6 text-xs text-muted-foreground">
          © {year} Deliver.Invite · Invite code {inviteCode}
        </p>
      </footer>
    </div>
  );
}
