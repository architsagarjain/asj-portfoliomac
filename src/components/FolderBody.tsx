import { ArrowUpRight, Mail, MapPin, Linkedin, Quote } from 'lucide-react';
import {
  cases,
  certifications,
  education,
  experience,
  headlineMetrics,
  modes,
  press,
  pressQuote,
  pressSummary,
  profile,
  skills,
  timeline,
  writing,
  type FolderId,
} from '../content';

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/45">
      {children}
    </p>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-black/10 pt-6 first:border-0 first:pt-0">
      <Eyebrow>{label}</Eyebrow>
      {children}
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg bg-black/[0.04] px-3 py-2">
      <div className="text-[17px] font-semibold tracking-tight text-black/85">{value}</div>
      <div className="mt-0.5 text-[11px] uppercase tracking-[0.08em] text-black/45">{label}</div>
    </div>
  );
}

function About() {
  return (
    <div className="space-y-7">
      <Section label={`${profile.role} · ${profile.location}`}>
        <h2 className="text-[26px] font-semibold leading-tight tracking-tight text-black/85">
          {profile.name}
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-black/70">{profile.intro}</p>
      </Section>

      <Section label="The numbers">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {headlineMetrics.map((m) => (
            <Stat key={m.label} value={m.value} label={m.label} />
          ))}
        </div>
      </Section>

      <Section label="How I think">
        <p className="text-[15px] leading-relaxed text-black/75">{profile.thesis}</p>
      </Section>

      <Section label="One throughline">
        <p className="mb-4 text-[14px] leading-relaxed text-black/70">
          Most people pick a lane. I’ve run the agency, sat on the consulting side of the table, and
          done the unglamorous execution inside an early-stage startup, which is roughly the job
          description of a founder’s office.
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          {modes.map((m) => (
            <div key={m.n} className="rounded-xl border border-black/10 p-3.5">
              <div className="text-[11px] uppercase tracking-[0.12em] text-black/40">
                Mode {m.n}
              </div>
              <div className="mt-1 text-[15px] font-semibold text-black/85">{m.title}</div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-black/65">{m.body}</p>
              <ul className="mt-2.5 space-y-1">
                {m.bullets.map((b) => (
                  <li key={b} className="flex gap-1.5 text-[12px] leading-snug text-black/55">
                    <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-black/30" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section label="The short version">
        <ol className="space-y-3">
          {timeline.map((t) => (
            <li key={t.year} className="flex gap-4">
              <span className="w-12 shrink-0 text-[13px] font-semibold tabular-nums text-black/45">
                {t.year}
              </span>
              <span className="text-[13px] leading-relaxed text-black/70">{t.body}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section label="What this looks like for you">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-black/[0.04] p-3.5">
            <Eyebrow>For founders</Eyebrow>
            <p className="text-[13px] leading-relaxed text-black/70">{profile.forFounders}</p>
          </div>
          <div className="rounded-xl bg-black/[0.04] p-3.5">
            <Eyebrow>For investors</Eyebrow>
            <p className="text-[13px] leading-relaxed text-black/70">{profile.forInvestors}</p>
          </div>
        </div>
      </Section>
    </div>
  );
}

function Experience() {
  return (
    <div className="space-y-6">
      <p className="text-[14px] leading-relaxed text-black/70">
        Eight years, compounding. Every role built on the last: founder, enterprise consultant,
        growth operator.
      </p>
      {experience.map((e) => (
        <article key={e.org} className="border-t border-black/10 pt-5">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="rounded-full bg-black/[0.06] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-black/50">
              {e.tag}
            </span>
            <h3 className="text-[17px] font-semibold tracking-tight text-black/85">{e.org}</h3>
            <span className="text-[12px] text-black/45">{e.period}</span>
          </div>
          <div className="mt-1 text-[12px] uppercase tracking-[0.08em] text-black/45">{e.role}</div>
          <p className="mt-2.5 text-[13.5px] leading-relaxed text-black/70">{e.body}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {e.stats.map((s) => (
              <div key={s.label} className="min-w-[120px] flex-1">
                <Stat value={s.value} label={s.label} />
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function CaseList({ only }: { only?: string[] }) {
  const list = only ? cases.filter((c) => only.includes(c.n)) : cases;
  return (
    <div className="space-y-5">
      {list.map((c) => (
        <article key={c.n} className="rounded-xl border border-black/10 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[11px] uppercase tracking-[0.12em] text-black/40">{c.n}</div>
              <h3 className="mt-0.5 text-[16px] font-semibold tracking-tight text-black/85">
                {c.title}
              </h3>
              <div className="mt-1 text-[12px] uppercase tracking-[0.08em] text-black/45">
                {c.meta}
              </div>
            </div>
            <span className="shrink-0 rounded-full bg-black/[0.06] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-black/50">
              {c.status}
            </span>
          </div>
          <dl className="mt-3.5 space-y-2.5">
            {(
              [
                ['Challenge', c.challenge],
                ['The move', c.move],
                ['Result', c.result],
              ] as const
            ).map(([k, v]) => (
              <div key={k}>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-black/40">
                  {k}
                </dt>
                <dd className="mt-0.5 text-[13px] leading-relaxed text-black/70">{v}</dd>
              </div>
            ))}
          </dl>
        </article>
      ))}
    </div>
  );
}

function Education() {
  return (
    <div className="space-y-6">
      <Section label="Education">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[460px] border-collapse text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.12em] text-black/40">
                <th className="pb-2 pr-4 font-semibold">Period</th>
                <th className="pb-2 pr-4 font-semibold">Program</th>
                <th className="pb-2 pr-4 font-semibold">Institution</th>
                <th className="pb-2 font-semibold">Result</th>
              </tr>
            </thead>
            <tbody>
              {education.map((e) => (
                <tr key={e.program} className="border-t border-black/10 align-top">
                  <td className="py-2.5 pr-4 text-[12px] tabular-nums text-black/50">{e.period}</td>
                  <td className="py-2.5 pr-4 text-[13px] font-medium text-black/80">{e.program}</td>
                  <td className="py-2.5 pr-4 text-[13px] text-black/65">{e.institution}</td>
                  <td className="py-2.5 text-[13px] text-black/65">{e.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

function Certifications() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {certifications.map((c) => (
        <div key={c.name} className="rounded-xl border border-black/10 p-3.5">
          <div className="text-[14px] font-medium leading-snug text-black/85">{c.name}</div>
          <div className="mt-1 text-[12px] text-black/50">{c.issuer}</div>
        </div>
      ))}
    </div>
  );
}

function Skills() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {skills.map((s) => (
        <div key={s.group}>
          <Eyebrow>{s.group}</Eyebrow>
          <ul className="flex flex-wrap gap-1.5">
            {s.items.map((i) => (
              <li
                key={i}
                className="rounded-full bg-black/[0.05] px-2.5 py-1 text-[12px] text-black/70"
              >
                {i}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Projects() {
  return (
    <div className="space-y-7">
      <Section label="Builds">
        <CaseList only={['03', '04', '05', '06']} />
      </Section>
      <Section label="Writing">
        <div className="space-y-3">
          {writing.map((w) => (
            <article key={w.title} className="rounded-xl border border-black/10 p-3.5">
              <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-black/40">
                <span>{w.date}</span>
                <span className="h-1 w-1 rounded-full bg-black/25" />
                <span>{w.kind}</span>
              </div>
              <h3 className="mt-1 text-[15px] font-semibold leading-snug text-black/85">
                {w.title}
              </h3>
              <p className="mt-1 text-[13px] leading-relaxed text-black/65">{w.blurb}</p>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Contact() {
  const rows = [
    { Icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    {
      Icon: Linkedin,
      label: 'LinkedIn',
      value: profile.linkedinLabel,
      href: profile.linkedin,
    },
    { Icon: MapPin, label: 'Based in', value: profile.location },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[24px] font-semibold leading-tight tracking-tight text-black/85">
          Start the conversation.
        </h2>
        <p className="mt-2.5 text-[14px] leading-relaxed text-black/70">
          Building at ZenCabs, writing along the way, and always up for a sharp conversation about
          growth, mobility or whatever you’re working on. {profile.availability}.
        </p>
      </div>

      <div className="divide-y divide-black/10 rounded-xl border border-black/10">
        {rows.map(({ Icon, label, value, href }) => {
          const inner = (
            <>
              <Icon className="h-4 w-4 shrink-0 text-black/40" strokeWidth={1.8} />
              <span className="w-[76px] shrink-0 text-[11px] uppercase tracking-[0.1em] text-black/40">
                {label}
              </span>
              <span className="min-w-0 flex-1 truncate text-[13.5px] text-black/80">{value}</span>
              {href && <ArrowUpRight className="h-4 w-4 shrink-0 text-black/30" strokeWidth={1.8} />}
            </>
          );
          return href ? (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="flex items-center gap-3 px-3.5 py-3 hover:bg-black/[0.03]"
            >
              {inner}
            </a>
          ) : (
            <div key={label} className="flex items-center gap-3 px-3.5 py-3">
              {inner}
            </div>
          );
        })}
      </div>

      <p className="text-[12px] uppercase tracking-[0.1em] text-black/40">
        {profile.status} · Since {profile.since}
      </p>
    </div>
  );
}

function Press() {
  const [featured, ...rest] = press;
  return (
    <div className="space-y-6">
      <a
        href={featured.href}
        target="_blank"
        rel="noreferrer"
        className="block rounded-xl border border-black/10 p-4 transition-colors hover:bg-black/[0.03]"
      >
        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-black/40">
          <span className="rounded-full bg-black/[0.06] px-2 py-0.5 font-semibold text-black/50">
            Featured
          </span>
          <span>{featured.outlet}</span>
          <span className="h-1 w-1 rounded-full bg-black/25" />
          <span>{featured.date}</span>
        </div>
        <h2 className="mt-2 flex items-start gap-2 text-[18px] font-semibold leading-snug tracking-tight text-black/85">
          <span className="min-w-0">{featured.title}</span>
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-black/30" strokeWidth={1.8} />
        </h2>
        <p className="mt-1 text-[12px] text-black/45">
          {featured.section} · {featured.byline}
        </p>
      </a>

      <Section label="What it covers">
        <div className="space-y-3">
          {pressSummary.map((para) => (
            <p key={para.slice(0, 24)} className="text-[13.5px] leading-relaxed text-black/70">
              {para}
            </p>
          ))}
        </div>
      </Section>

      <figure className="rounded-xl bg-black/[0.04] p-4">
        <Quote className="h-4 w-4 text-black/25" strokeWidth={2} />
        <blockquote className="mt-2 text-[16px] font-medium leading-snug tracking-tight text-black/80">
          {pressQuote.text}
        </blockquote>
        <figcaption className="mt-2 text-[11px] uppercase tracking-[0.1em] text-black/45">
          {pressQuote.who}
        </figcaption>
      </figure>

      {rest.length > 0 && (
        <Section label="Also published at">
          <div className="space-y-2">
            {rest.map((a) => (
              <a
                key={a.href}
                href={a.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-lg border border-black/10 px-3.5 py-3 hover:bg-black/[0.03]"
              >
                <span className="w-[150px] shrink-0 text-[11px] uppercase tracking-[0.1em] text-black/40">
                  {a.outlet}
                </span>
                <span className="min-w-0 flex-1 truncate text-[13px] text-black/75">
                  {a.section}
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-black/30" strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

export default function FolderBody({ id }: { id: FolderId }) {
  switch (id) {
    case 'about':
      return <About />;
    case 'education':
      return <Education />;
    case 'experience':
      return <Experience />;
    case 'cases':
      return <CaseList />;
    case 'projects':
      return <Projects />;
    case 'certifications':
      return <Certifications />;
    case 'skills':
      return <Skills />;
    case 'press':
      return <Press />;
    case 'contact':
      return <Contact />;
  }
}
