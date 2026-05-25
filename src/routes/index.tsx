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

  // Demo override: selecting a Critical probe sends ARS above the 70 threshold,
  // which auto-suspends the ADR certificate in RiskScoreBanner.
  const selectedProbe = useMemo(
    () => PROBE_LOGS.find((p) => p.id === selectedProbeId) ?? null,
    [selectedProbeId],
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
