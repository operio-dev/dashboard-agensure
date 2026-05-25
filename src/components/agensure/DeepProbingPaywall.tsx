import { Lock, Sparkles, ShieldCheck, Zap, Unlock } from "lucide-react";
import { useState } from "react";

export function DeepProbingPaywall() {
  const [unlocked, setUnlocked] = useState(false);

  if (unlocked) {
    return (
      <div className="rounded-xl border hairline bg-[var(--surface)] p-8 md:p-12">
        <div className="mx-auto max-w-2xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--success)_40%,var(--hairline))] bg-[color-mix(in_oklab,var(--success)_8%,transparent)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--success)]">
            <Unlock className="h-3 w-3" />
            Premium Tier — Active
          </div>
          <h3 className="text-2xl font-semibold tracking-tight">Deep Probing Audit Unlocked</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Full <span className="text-foreground font-semibold">10,000 adversarial probe matrix</span> is now active.
            Our team will schedule your deep audit within 24 hours.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-left">
            <Feature icon={<Sparkles className="h-3.5 w-3.5" />} title="10K Probes" sub="Full adversarial matrix" active />
            <Feature icon={<Zap className="h-3.5 w-3.5" />} title="On-Demand" sub="Pre-deploy gating" active />
            <Feature icon={<ShieldCheck className="h-3.5 w-3.5" />} title="CISO-Ready" sub="Signed deep report" active />
          </div>
          <p className="pt-2 text-xs text-muted-foreground font-mono">
            Contact: team@agensure.eu · Expected delivery: 24–48h
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-xl border hairline bg-[var(--surface)] overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
      <div className="absolute inset-0 p-6 grid grid-cols-3 gap-4 select-none pointer-events-none" aria-hidden>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="rounded-lg border hairline bg-[var(--surface-2)] p-4">
            <div className="h-3 w-24 bg-[var(--surface-3)] rounded" />
            <div className="mt-3 h-8 w-20 bg-[var(--surface-3)] rounded" />
            <div className="mt-4 h-1 w-full bg-[var(--surface-3)] rounded-full overflow-hidden">
              <div className="h-full bg-[var(--success)]/60" style={{ width: `${30 + (i * 7) % 60}%` }} />
            </div>
            <div className="mt-3 grid grid-cols-6 gap-1">
              {Array.from({ length: 6 }).map((__, j) => (
                <div key={j} className="h-6 rounded-sm bg-[var(--surface-3)]" />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="relative z-10 backdrop-blur-md bg-[color-mix(in_oklab,var(--background)_55%,transparent)] border-t hairline p-8 md:p-12">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border hairline bg-[var(--surface-2)]/80 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <Lock className="h-3 w-3" />
            Premium Tier
          </div>
          <h3 className="mt-5 text-2xl md:text-3xl font-semibold tracking-tight">
            Deep Probing Audit
          </h3>
          <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
            Upgrade to Premium Tier to unlock the full{" "}
            <span className="text-foreground font-semibold">10,000 adversarial probe matrix</span>{" "}
            on-demand before major production deploys.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3 text-left">
            <Feature icon={<Sparkles className="h-3.5 w-3.5" />} title="10K Probes" sub="Full adversarial matrix" />
            <Feature icon={<Zap className="h-3.5 w-3.5" />} title="On-Demand" sub="Pre-deploy gating" />
            <Feature icon={<ShieldCheck className="h-3.5 w-3.5" />} title="CISO-Ready" sub="Signed deep report" />
          </div>
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-2">
            <button
              onClick={() => setUnlocked(true)}
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-[var(--success)] px-5 py-2.5 text-sm font-semibold text-[var(--success-foreground)] hover:brightness-110 transition shadow-[0_8px_30px_-10px_color-mix(in_oklab,var(--success)_60%,transparent)]"
            >
              <Lock className="h-4 w-4" />
              Unlock Deep Probing Audit
            </button>
            <button className="text-xs text-muted-foreground hover:text-foreground transition px-3 py-2">
              Talk to procurement →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, title, sub, active }: { icon: React.ReactNode; title: string; sub: string; active?: boolean }) {
  return (
    <div className="rounded-lg border hairline bg-[var(--surface-2)]/80 p-3">
      <div className={`flex items-center gap-1.5 ${active ? "text-[var(--success)]" : "text-[var(--success)]"}`}>
        {icon}
        <span className="text-xs font-semibold tracking-tight text-foreground">{title}</span>
      </div>
      <div className="mt-1 text-[11px] text-muted-foreground">{sub}</div>
    </div>
  );
}
