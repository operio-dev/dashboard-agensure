import {
  ShieldAlert,
  DatabaseZap,
  Crosshair,
  Activity,
  Scale,
  type LucideIcon,
} from "lucide-react";

export type DomainKey =
  | "prompt-injection"
  | "data-exfiltration"
  | "scope-boundary"
  | "output-integrity"
  | "transparency";

export interface Domain {
  key: DomainKey;
  label: string;
  short: string;
  icon: LucideIcon;
  resilience: number; // %
  delta: number;      // wow %
  weight: number;     // contribution to ARS
}

export const DOMAINS: Domain[] = [
  {
    key: "prompt-injection",
    label: "Prompt Injection & Jailbreak Resilience",
    short: "Prompt Injection",
    icon: ShieldAlert,
    resilience: 94,
    delta: 4,
    weight: 0.25,
  },
  {
    key: "data-exfiltration",
    label: "Data Exfiltration & PII Leakage Protection",
    short: "PII Leakage",
    icon: DatabaseZap,
    resilience: 89,
    delta: 2,
    weight: 0.25,
  },
  {
    key: "scope-boundary",
    label: "Scope & Action Boundary Enforcement",
    short: "Scope Boundary",
    icon: Crosshair,
    resilience: 91,
    delta: -2,
    weight: 0.2,
  },
  {
    key: "output-integrity",
    label: "Output Integrity & Drift Tracking",
    short: "Output Integrity",
    icon: Activity,
    resilience: 87,
    delta: 1,
    weight: 0.15,
  },
  {
    key: "transparency",
    label: "Transparency Compliance (EU AI Act Art. 50)",
    short: "EU AI Act Art. 50",
    icon: Scale,
    resilience: 96,
    delta: 3,
    weight: 0.15,
  },
];

export interface ProbeLog {
  id: string;
  date: string;
  totalProbes: number;
  passed: number;
  failed: number;
  status: "Passed" | "Flagged" | "Critical";
}

export const PROBE_LOGS: ProbeLog[] = [
  { id: "AGN-2026-0521", date: "May 25, 2026 · 01:38 UTC", totalProbes: 250, passed: 244, failed: 6, status: "Passed" },
  { id: "AGN-2026-0518", date: "May 18, 2026 · 02:02 UTC", totalProbes: 250, passed: 239, failed: 11, status: "Flagged" },
  { id: "AGN-2026-0511", date: "May 11, 2026 · 01:55 UTC", totalProbes: 250, passed: 247, failed: 3, status: "Passed" },
  { id: "AGN-2026-0504", date: "May 04, 2026 · 01:41 UTC", totalProbes: 250, passed: 232, failed: 18, status: "Flagged" },
  { id: "AGN-2026-0427", date: "Apr 27, 2026 · 02:11 UTC", totalProbes: 250, passed: 248, failed: 2, status: "Passed" },
  { id: "AGN-2026-0420", date: "Apr 20, 2026 · 01:33 UTC", totalProbes: 250, passed: 219, failed: 31, status: "Critical" },
];

export function arsColor(score: number) {
  if (score < 40) return "success";
  if (score <= 70) return "warning";
  return "danger";
}

export function computeARS(domains: Domain[]) {
  // ARS = weighted residual risk (lower is better). 100 - weighted resilience.
  const weighted = domains.reduce((acc, d) => acc + (d.resilience * d.weight), 0);
  return Math.max(0, Math.round(100 - weighted));
}
