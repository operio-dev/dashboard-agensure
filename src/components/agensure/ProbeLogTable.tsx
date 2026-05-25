import { PROBE_LOGS, type ProbeLog } from "@/lib/agensure-data";
import { Download, FileCheck2, Filter, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProbeLogTable() {
  return (
    <div className="rounded-xl border hairline bg-[var(--surface)]">
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b hairline">
        <div>
          <h2 className="text-base font-semibold tracking-tight">Probe History & Audit Trail</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Immutable log of automated adversarial probes · cryptographically signed
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
              <Row key={log.id} log={log} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-5 py-3 border-t hairline text-[11px] text-muted-foreground">
        <span>Showing 6 of 47 probes · retained 24 months for compliance</span>
        <span className="font-mono">SHA-256 ledger verified ✓</span>
      </div>
    </div>
  );
}

function Row({ log }: { log: ProbeLog }) {
  const tone =
    log.status === "Passed"   ? "success" :
    log.status === "Flagged"  ? "warning" : "danger";
  const toneClasses =
    tone === "success" ? "text-[var(--success)] bg-[color-mix(in_oklab,var(--success)_12%,transparent)] border-[color-mix(in_oklab,var(--success)_35%,var(--hairline))]" :
    tone === "warning" ? "text-[var(--warning)] bg-[color-mix(in_oklab,var(--warning)_12%,transparent)] border-[color-mix(in_oklab,var(--warning)_35%,var(--hairline))]" :
    "text-[var(--danger)] bg-[color-mix(in_oklab,var(--danger)_12%,transparent)] border-[color-mix(in_oklab,var(--danger)_35%,var(--hairline))]";

  return (
    <tr className="border-b hairline last:border-0 hover:bg-[var(--surface-2)]/60 transition">
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
        <button className="group inline-flex items-center gap-1.5 rounded-md border hairline bg-[var(--surface-2)] px-2.5 py-1.5 text-xs font-medium hover:bg-[var(--surface-3)] transition">
          <FileCheck2 className="h-3.5 w-3.5 text-[var(--success)]" />
          <span>Cryptographic PDF</span>
          <Download className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition" />
        </button>
      </td>
    </tr>
  );
}
