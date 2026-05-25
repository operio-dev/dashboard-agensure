import { arsColor } from "@/lib/agensure-data";
import { QrCode, Clock, Calendar, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  score: number;
  scope: string;
  suspendReason?: string | null;
}

export function RiskScoreBanner({ score, scope, suspendReason }: Props) {
  const tone = arsColor(score);
  const toneClass =
    tone === "success" ? "text-[var(--success)]" :
    tone === "warning" ? "text-[var(--warning)]" :
    "text-[var(--danger)]";

  const ringBg =
    tone === "success" ? "from-[color-mix(in_oklab,var(--success)_35%,transparent)]" :
    tone === "warning" ? "from-[color-mix(in_oklab,var(--warning)_35%,transparent)]" :
    "from-[color-mix(in_oklab,var(--danger)_35%,transparent)]";

  const adrValid = score <= 70;

  return (
    <section className="relative overflow-hidden rounded-xl border hairline bg-[var(--surface)]">
      <div className="absolute inset-0 grid-bg opacity-[0.35] pointer-events-none" />
      <div className={cn(
        "absolute -top-32 -left-32 h-80 w-80 rounded-full blur-3xl opacity-60 bg-gradient-to-br to-transparent",
        ringBg
      )} />

      <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr_1fr] gap-px bg-[var(--hairline)]">
        {/* ARS */}
        <div className="bg-[var(--surface)] p-6 lg:p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--success)] pulse-dot" />
              Agensure Risk Score
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">ARS · v3.2</span>
          </div>

          <div className="mt-6 flex items-end gap-4">
            <div className={cn("font-mono text-[88px] leading-none font-semibold tracking-tight tabular-nums", toneClass)}>
              {String(score).padStart(2, "0")}
            </div>
            <div className="pb-3">
              <div className={cn("text-xs font-semibold uppercase tracking-widest", toneClass)}>
                {tone === "success" ? "Low Risk" : tone === "warning" ? "Elevated" : "Critical"}
              </div>
              <div className="text-xs text-muted-foreground mt-1">Scope: {scope}</div>
            </div>
          </div>

          {/* Threshold bar */}
          <div className="mt-6">
            <div className="relative h-1.5 w-full rounded-full bg-[var(--surface-3)] overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-[40%] bg-[var(--success)]/70" />
              <div className="absolute inset-y-0 left-[40%] w-[30%] bg-[var(--warning)]/70" />
              <div className="absolute inset-y-0 left-[70%] w-[30%] bg-[var(--danger)]/70" />
              <div
                className="absolute -top-1.5 h-4 w-0.5 bg-foreground"
                style={{ left: `${Math.min(100, score)}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-[10px] font-mono text-muted-foreground tabular-nums">
              <span>0</span><span>40</span><span>70</span><span>100</span>
            </div>
          </div>
        </div>

        {/* Timestamps */}
        <div className="bg-[var(--surface)] p-6 lg:p-8 flex flex-col justify-between">
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Probe Cadence
          </div>
          <div className="mt-4 space-y-4">
            <Stamp icon={<Clock className="h-4 w-4" />} label="Last Scan" value="May 25, 2026" sub="01:38 UTC · Probe AGN-2026-0521" tone="success" />
            <Stamp icon={<Calendar className="h-4 w-4" />} label="Next Scheduled Probe" value="Jun 01, 2026" sub="02:00 UTC · Auto-trigger" />
          </div>
          <div className="mt-6 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>250 probe / weekly loop</span>
            <span className="font-mono">+1 deploy gate</span>
          </div>
        </div>

        {/* ADR Certificate */}
        <div className="bg-[var(--surface)] p-6 lg:p-8 flex flex-col">
          <div className="flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              ADR Certificate Status
            </div>
            <span className="font-mono text-[10px] text-muted-foreground">EU AI Act · ISO 42001</span>
          </div>

          <div className={cn(
            "mt-4 flex items-center gap-3 rounded-lg border px-4 py-3",
            adrValid
              ? "border-[color-mix(in_oklab,var(--success)_40%,var(--hairline))] bg-[color-mix(in_oklab,var(--success)_8%,transparent)]"
              : "border-[color-mix(in_oklab,var(--danger)_40%,var(--hairline))] bg-[color-mix(in_oklab,var(--danger)_8%,transparent)]"
          )}>
            <span className={cn(
              "relative inline-flex h-2.5 w-2.5 rounded-full",
              adrValid ? "bg-[var(--success)] pulse-dot" : "bg-[var(--danger)] pulse-dot-danger"
            )} />
            <div className="flex-1">
              <div className={cn("text-sm font-semibold tracking-tight", adrValid ? "text-[var(--success)]" : "text-[var(--danger)]")}>
                {adrValid ? "VALID" : "SUSPENDED"}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {adrValid
                  ? "Issued 25 May 2026 · Expires 25 Aug 2026"
                  : suspendReason ?? "Auto-suspended · residual risk above 70 threshold"}
              </div>
            </div>
            <QrCode className="h-9 w-9 text-foreground/80" strokeWidth={1.4} />
          </div>

          <button className="group mt-4 inline-flex items-center justify-between rounded-md border hairline bg-[var(--surface-2)] px-3.5 py-2.5 text-sm font-medium hover:bg-[var(--surface-3)] transition">
            <span>View Dynamic QR Verification</span>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Stamp({
  icon, label, value, sub, tone,
}: {
  icon: React.ReactNode; label: string; value: string; sub: string; tone?: "success";
}) {
  return (
    <div className="flex items-start gap-3">
      <span className={cn(
        "mt-0.5 flex h-8 w-8 items-center justify-center rounded-md border hairline bg-[var(--surface-2)]",
        tone === "success" && "text-[var(--success)]"
      )}>
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-[11px] text-muted-foreground">{label}</div>
        <div className="font-mono text-sm tabular-nums">{value}</div>
        <div className="text-[11px] text-muted-foreground">{sub}</div>
      </div>
    </div>
  );
}
