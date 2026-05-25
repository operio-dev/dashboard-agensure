import { PROBE_LOGS, type ProbeLog } from "@/lib/agensure-data";
import { Download, FileCheck2, Filter, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const LIVE_PROBES = [
  { id: "AGN-live-001", domain: "Prompt Injection", status: "PASSED", ms: 142 },
  { id: "AGN-live-002", domain: "PII Leakage", status: "PASSED", ms: 98 },
  { id: "AGN-live-003", domain: "Transparency", status: "⚠ FLAGGED", ms: 203 },
  { id: "AGN-live-004", domain: "Scope Boundary", status: "PASSED", ms: 87 },
  { id: "AGN-live-005", domain: "Output Integrity", status: "PASSED", ms: 119 },
  { id: "AGN-live-006", domain: "Prompt Injection", status: "PASSED", ms: 156 },
  { id: "AGN-live-007", domain: "PII Leakage", status: "⚠ FLAGGED", ms: 231 },
  { id: "AGN-live-008", domain: "Transparency", status: "PASSED", ms: 74 },
  { id: "AGN-live-009", domain: "Scope Boundary", status: "PASSED", ms: 103 },
  { id: "AGN-live-010", domain: "Output Integrity", status: "PASSED", ms: 188 },
];

function LiveProbeFeed() {
  const [visibleIdx, setVisibleIdx] = useState(0);
  const [feed, setFeed] = useState<typeof LIVE_PROBES>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = LIVE_PROBES[visibleIdx % LIVE_PROBES.length];
      setFeed((prev) => [next, ...prev].slice(0, 5));
      setVisibleIdx((i) => i + 1);
    }, 1800);
    return () => clearInterval(interval);
  }, [visibleIdx]);

  return (
    <div className="border-b hairline px-5 py-3 bg-[var(--surface-2)]/40">
      <div className="flex items-center gap-2 mb-2">
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--success)] pulse-dot" />
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-medium">Live Probe Feed</span>
      </div>
      <div className="space-y-1 font-mono text-[11px]">
        {feed.length === 0 && (
          <span className="text-muted-foreground">Initializing probe loop...</span>
        )}
        {feed.map((p, i) => (
          <div
            key={`${p.id}-${i}`}
            className={cn(
              "flex items-center gap-2 transition-opacity",
              i === 0 ? "opacity-100" : "opacity-40"
            )}
          >
            <span className="text-muted-foreground">→</span>
            <span className="text-muted-foreground">{p.id}</span>
            <span className="text-foreground/70">·</span>
            <span className="text-foreground/80">{p.domain}</span>
            <span className="text-foreground/70">·</span>
            <span className={p.status.includes("FLAGGED") ? "text-[var(--warning)]" : "text-[var(--success)]"}>
              {p.status}
            </span>
            <span className="text-foreground/70">·</span>
            <span className="text-muted-foreground">{p.ms}ms</span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface Props {
  selectedId?: string | null;
  onSelect?: (log: ProbeLog) => void;
}

export function ProbeLogTable({ selectedId, onSelect }: Props) {
  return (
    <div className="rounded-xl border hairline bg-[var(--surface)]">
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b hairline">
        <div>
          <h2 className="text-base font-semibold tracking-tight">Probe History & Audit Trail</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Immutable log of automated adversarial probes · cryptographically signed ·{" "}
            <span className="text-foreground/70">click a row to inspect impact on ADR</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-md border hairline bg-[var(--surface-2)] px-2.5 py-1.5 text-xs hover:bg-[var(--surface-3)] transition">
            <Search className="h-3.5 w-3.5" /> Search
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md border hairline bg-[var(--surface-2)] px-2.5 py-1.5 text-xs hover:bg-[var(--surface-3)] transition">
            <Filter className="h-3.5 w-3.5" /> Filter
          </button>
        </div>
      </div>

      <LiveProbeFeed />

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-[0.18em] text-muted-foreground border-b hairline">
              <th className="px-5 py-3 font-medium">Scan Date</th>
              <th className="px-3 py-3 font-medium">Probe ID</th>
              <th className="px-3 py-3 font-medium text-right">Total</th>
              <th className="px-3 py-3 font-medium text-right">Passed</th>
              <th className="px-3 py-3 font-medium text-right">Failed</th>
              <th className="px-3 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {PROBE_LOGS.map((log) => (
              <Row
                key={log.id}
                log={log}
                selected={selectedId === log.id}
                onSelect={onSelect}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-5 py-3 border-t hairline text-[11px] text-muted-foreground">
        <span>Showing 7 of 47 probes · retained 24 months for compliance</span>
        <span className="font-mono">SHA-256 ledger verified ✓</span>
      </div>
    </div>
  );
}

function Row({
  log,
  selected,
  onSelect,
}: {
  log: ProbeLog;
  selected?: boolean;
  onSelect?: (log: ProbeLog) => void;
}) {
  const tone =
    log.status === "Passed" ? "success" :
    log.status === "Flagged" ? "warning" : "danger";
  const toneClasses =
    tone === "success"
      ? "text-[var(--success)] bg-[color-mix(in_oklab,var(--success)_12%,transparent)] border-[color-mix(in_oklab,var(--success)_35%,var(--hairline))]"
      : tone === "warning"
      ? "text-[var(--warning)] bg-[color-mix(in_oklab,var(--warning)_12%,transparent)] border-[color-mix(in_oklab,var(--warning)_35%,var(--hairline))]"
      : "text-[var(--danger)] bg-[color-mix(in_oklab,var(--danger)_12%,transparent)] border-[color-mix(in_oklab,var(--danger)_35%,var(--hairline))]";

  return (
    <tr
      onClick={() => onSelect?.(log)}
      className={cn(
        "border-b hairline last:border-0 cursor-pointer transition",
        selected
          ? "bg-[color-mix(in_oklab,var(--danger)_10%,transparent)] outline outline-1 -outline-offset-1 outline-[color-mix(in_oklab,var(--danger)_45%,transparent)]"
          : "hover:bg-[var(--surface-2)]/60"
      )}
    >
      <td className="px-5 py-3.5 font-mono text-xs tabular-nums">{log.date}</td>
      <td className="px-3 py-3.5 font-mono text-xs text-muted-foreground">{log.id}</td>
      <td className="px-3 py-3.5 text-right font-mono tabular-nums">{log.totalProbes}</td>
      <td className="px-3 py-3.5 text-right font-mono tabular-nums text-[var(--success)]">{log.passed}</td>
      <td className="px-3 py-3.5 text-right font-mono tabular-nums text-[var(--danger)]">{log.failed}</td>
      <td className="px-3 py-3.5">
        <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium", toneClasses)}>
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {log.status}
        </span>
      </td>
      <td className="px-5 py-3.5 text-right">
        <button
          onClick={(e) => e.stopPropagation()}
          className="group inline-flex items-center gap-1.5 rounded-md border hairline bg-[var(--surface-2)] px-2.5 py-1.5 text-xs font-medium hover:bg-[var(--surface-3)] transition"
        >
          <FileCheck2 className="h-3.5 w-3.5 text-[var(--success)]" />
          <span>Cryptographic PDF</span>
          <Download className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition" />
        </button>
      </td>
    </tr>
  );
}
