import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Sidebar } from "@/components/agensure/Sidebar";
import { Topbar } from "@/components/agensure/Topbar";
import { RiskScoreBanner } from "@/components/agensure/RiskScoreBanner";
import { RiskRadar } from "@/components/agensure/RiskRadar";
import { ProbeLogTable } from "@/components/agensure/ProbeLogTable";
import { DeepProbingPaywall } from "@/components/agensure/DeepProbingPaywall";
import { DOMAINS, PROBE_LOGS, computeARS, type DomainKey } from "@/lib/agensure-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agensure — AI Underwriting & Continuous Probing" },
      { name: "description", content: "Enterprise dashboard for AI agent risk underwriting, adversarial probing, and EU AI Act Art. 50 transparency compliance." },
      { property: "og:title", content: "Agensure — AI Underwriting Dashboard" },
      { property: "og:description", content: "Continuous probing, ADR certificates, and immutable audit trails for production AI agents." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [active, setActive] = useState<DomainKey | "all">("all");
  const [selectedProbeId, setSelectedProbeId] = useState<string | null>(null);

  const filteredDomains = useMemo(() => {
    if (active === "all") return DOMAINS;
    const target = DOMAINS.find((d) => d.key === active)!;
    return DOMAINS.map((d) =>
      d.key === active
        ? { ...d, resilience: Math.min(99, target.resilience + 2) }
        : { ...d, resilience: Math.max(60, d.resilience - 6) }
    );
  }, [active]);

  const baseArs = useMemo(() => computeARS(filteredDomains), [filteredDomains]);

  const selectedProbe = useMemo(
    () => PROBE_LOGS.find((p) => p.id === selectedProbeId) ?? null,
    [selectedProbeId]
  );

  const ars =
    selectedProbe?.status === "Critical"
      ? Math.max(baseArs, 82)
      : selectedProbe?.status === "Flagged"
      ? Math.max(baseArs, 58)
      : baseArs;

  const suspendReason =
    selectedProbe?.status === "Critical"
      ? `Auto-suspended · probe ${selectedProbe.id} reported ${selectedProbe.failed} critical failures`
      : null;

  const scope =
    active === "all"
      ? "All Domains"
      : DOMAINS.find((d) => d.key === active)?.short ?? "All Domains";

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <Sidebar active={active} onChange={setActive} />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar scope={scope} />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1400px] px-6 py-6 space-y-6">

            <RiskScoreBanner score={ars} scope={scope} suspendReason={suspendReason} />
            <RiskRadar domains={filteredDomains} highlightKey={active === "all" ? undefined : active} />

            <ProbeLogTable
              selectedId={selectedProbeId}
              onSelect={(log) =>
                setSelectedProbeId((prev) => (prev === log.id ? null : log.id))
              }
            />

            {/* PAYLOAD INSPECTOR — visible when a probe row is selected */}
            {selectedProbe && (
              <div className="rounded-xl border hairline bg-[var(--surface)] overflow-hidden">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b hairline">
                  <div className="flex items-center gap-3">
                    <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
                      selectedProbe.status === "Critical"
                        ? "bg-[var(--danger)] pulse-dot-danger"
                        : "bg-[var(--warning)] pulse-dot"
                    }`} />
                    <div>
                      <h3 className="font-mono text-sm font-semibold">
                        Payload Inspector — {selectedProbe.id}
                      </h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {selectedProbe.date} · {selectedProbe.failed} violation{selectedProbe.failed !== 1 ? "s" : ""} detected
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="rounded border hairline bg-[var(--surface-2)] px-2 py-1 text-muted-foreground">
                      {selectedProbe.mitreId}
                    </span>
                    <span className="rounded border hairline bg-[var(--surface-2)] px-2 py-1 text-muted-foreground">
                      {selectedProbe.owaspId}
                    </span>
                  </div>
                </div>

                {/* Payload grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--hairline)]">
                  {/* Input */}
                  <div className="bg-[var(--surface)] p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        ⚡ Adversarial Attack String (Input)
                      </span>
                      <span className="font-mono text-[10px] rounded border border-[color-mix(in_oklab,var(--danger)_35%,var(--hairline))] bg-[color-mix(in_oklab,var(--danger)_8%,transparent)] px-2 py-0.5 text-[var(--danger)]">
                        PROBE ATTEMPT
                      </span>
                    </div>
                    <pre className="rounded-lg border hairline bg-black/60 p-4 overflow-x-auto font-mono text-xs text-red-300/90 whitespace-pre-wrap leading-relaxed">
                      {selectedProbe.adversarialInput}
                    </pre>
                  </div>

                  {/* Output */}
                  <div className="bg-[var(--surface)] p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        🤖 Agent Runtime Disclosure Log (Output)
                      </span>
                      <span className={`font-mono text-[10px] rounded border px-2 py-0.5 ${
                        selectedProbe.status === "Critical"
                          ? "border-[color-mix(in_oklab,var(--danger)_35%,var(--hairline))] bg-[color-mix(in_oklab,var(--danger)_8%,transparent)] text-[var(--danger)]"
                          : "border-[color-mix(in_oklab,var(--warning)_35%,var(--hairline))] bg-[color-mix(in_oklab,var(--warning)_8%,transparent)] text-[var(--warning)]"
                      }`}>
                        {selectedProbe.status === "Critical" ? "ART. 50 BREACH" : "SECURITY DRIFT"}
                      </span>
                    </div>
                    <pre className={`rounded-lg border p-4 overflow-x-auto font-mono text-xs whitespace-pre-wrap leading-relaxed bg-black/60 ${
                      selectedProbe.status === "Critical"
                        ? "border-[color-mix(in_oklab,var(--danger)_25%,var(--hairline))] text-red-200/90"
                        : "border-[color-mix(in_oklab,var(--warning)_25%,var(--hairline))] text-amber-200/90"
                    }`}>
                      {selectedProbe.modelOutput}
                    </pre>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-5 py-3 border-t hairline text-[11px] text-muted-foreground font-mono">
                  <span>Probe vector: proprietary · methodology: AIUC-1 · MITRE ATLAS · OWASP Agentic Top 10</span>
                  <span className="text-[var(--success)]">SHA-256 signed ✓</span>
                </div>
              </div>
            )}

            <DeepProbingPaywall />

            <footer className="pt-2 pb-8 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>© 2026 Agensure · AI Underwriting Inc.</span>
              <span className="font-mono">build 3.2.1 · region eu-west-1</span>
            </footer>

          </div>
        </main>
      </div>
    </div>
  );
}
