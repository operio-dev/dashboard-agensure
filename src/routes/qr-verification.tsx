import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/qr-verification")({
  component: QRVerification,
});

const COMPLIANCE_LOG = [
  { time: "May 25, 01:38 UTC", event: "Full 5-Domain Adversarial Attack Loop Completed.", status: "ok" },
  { time: "May 25, 01:35 UTC", event: "Prompt Injection & Jailbreak Boundaries: SECURE.", status: "ok" },
  { time: "May 25, 01:34 UTC", event: "EU AI Act Art. 50 Identity Disclosure Check: COMPLIANT.", status: "ok" },
  { time: "May 25, 01:33 UTC", event: "Output Drift Verification: PASS.", status: "ok" },
  { time: "May 25, 01:32 UTC", event: "PII Leakage & Data Exfiltration Probe: SECURE.", status: "ok" },
  { time: "May 25, 01:31 UTC", event: "Scope & Action Boundary Enforcement: PASS.", status: "ok" },
];

function LiveLog() {
  const [visible, setVisible] = useState<number>(0);

  useEffect(() => {
    if (visible >= COMPLIANCE_LOG.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), 600);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div className="space-y-2">
      {COMPLIANCE_LOG.slice(0, visible).map((entry, i) => (
        <div
          key={i}
          className="flex items-start gap-3 text-sm"
          style={{ animation: "fadeIn 0.3s ease both" }}
        >
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
          <span className="font-mono text-xs text-zinc-400">[{entry.time}]</span>
          <span className="text-zinc-600 text-xs">{entry.event}</span>
        </div>
      ))}
      {visible < COMPLIANCE_LOG.length && (
        <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-zinc-400 animate-pulse" />
          Processing next verification cycle...
        </div>
      )}
      {visible >= COMPLIANCE_LOG.length && (
        <div className="mt-3 flex items-center gap-2 text-xs font-mono text-emerald-600 font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          [STATUS] Certificate confirmed · Active for next 24 hours
        </div>
      )}
    </div>
  );
}

function QRVerification() {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-start justify-center py-12 px-4">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes radarPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.3); }
          50% { box-shadow: 0 0 0 8px rgba(16,185,129,0); }
        }
      `}</style>

      <div className="w-full max-w-xl space-y-0 font-sans">

        {/* Header */}
        <div className="pb-6 border-b border-zinc-200">
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono tracking-widest uppercase mb-4">
            <ShieldCheck className="h-3.5 w-3.5" />
            Agensure · Public Verification Portal
          </div>
          <h1 className="text-2xl font-semibold text-zinc-900 tracking-tight">
            Agent Deployment Readiness (ADR) Registry
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Certificate ID: <span className="font-mono">ADR-2026-0525-N9</span>
          </p>
        </div>

        {/* Status Badge */}
        <div className="py-6 border-b border-zinc-200">
          <div
            className="inline-flex items-center gap-3 rounded-md bg-emerald-50 border border-emerald-200 px-4 py-2.5"
            style={{ animation: "radarPulse 2.5s infinite" }}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />
            <div>
              <div className="text-sm font-semibold text-emerald-700 tracking-wide uppercase">
                Verified Compliant · ARS Secure
              </div>
              <div className="text-xs text-emerald-600 mt-0.5">
                Dynamic attestation — auto-suspends on behavioral drift
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Profile */}
        <div className="py-6 border-b border-zinc-200 space-y-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">
            Certificate Profile
          </div>
          <div className="space-y-2">
            {[
              ["Certificate ID", "ADR-2026-0525-N9"],
              ["Issued", "May 25, 2026 · 01:38 UTC"],
              ["Expires", "August 25, 2026 (90-Day Dynamic Validity)"],
              ["Target Agent", "CustomerBot v2.3"],
              ["Deployer Company", "Acme Corp"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4">
                <span className="text-xs text-zinc-500 flex-shrink-0 w-36">{k}</span>
                <span className="font-mono text-xs text-zinc-800 text-right">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance & Risk Metrics */}
        <div className="py-6 border-b border-zinc-200 space-y-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">
            Compliance & Risk Metrics
          </div>
          <div className="space-y-2">
            {[
              ["Regulatory Frame", "EU AI Act Article 50 (Transparency Mandate)"],
              ["Gov. Standard", "ISO/IEC 42001 Crosswalk Aligned"],
              ["Risk Methodology", "AIUC-1 Framework Taxonomy Reference"],
              ["Agensure Risk Score", "13 / 100 — LOW RISK PROFILE"],
              ["Monitoring Protocol", "Continuous Multi-Domain Adversarial Probing"],
              ["Active Enforcement", "Zero-Access Endpoint Probing Loop"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4">
                <span className="text-xs text-zinc-500 flex-shrink-0 w-36">{k}</span>
                <span className={`font-mono text-xs text-right ${
                  k === "Agensure Risk Score"
                    ? "text-emerald-700 font-semibold"
                    : "text-zinc-800"
                }`}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Compliance Log */}
        <div className="py-6 border-b border-zinc-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">
              Real-Time Compliance Log
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Feed
            </div>
          </div>
          <LiveLog />
        </div>

        {/* Cryptographic Validation */}
        <div className="py-6 border-b border-zinc-200 space-y-4">
          <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">
            Cryptographic Validation
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-xs text-zinc-500 flex-shrink-0 w-36">Ledger Authority</span>
              <span className="font-mono text-xs text-zinc-800 text-right">Decentralized Tamper-Proof Audit Trail</span>
            </div>
            <div className="flex items-start justify-between gap-4">
              <span className="text-xs text-zinc-500 flex-shrink-0 w-36 mt-0.5">SHA-256 Signature</span>
              <span className="font-mono text-xs text-zinc-600 text-right break-all">
                3a7f2c9d1b8e4f6a0c5d2e8b1f4a7c3d9e2f5b8a1c4d7e0f3a6b9c2d5e8f1a4
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-mono mt-1">
              <span>✓</span>
              <span>Ledger verified · Tamper-proof</span>
            </div>
          </div>
        </div>

        {/* Public Notice */}
        <div className="py-6 border-b border-zinc-200">
          <div className="rounded-md border border-zinc-200 bg-zinc-100 px-4 py-3 space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-zinc-500">
              ⚠ Public Notice
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              This certificate is a dynamic, automated attestation. It is bound to active endpoint
              probing cycles. If the target agent experiences a behavioral drift or cedes to an
              adversarial vector, this verification page will instantly flag the status as{" "}
              <span className="font-semibold text-zinc-800">SUSPENDED</span> with zero manual
              intervention.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 flex items-center justify-between text-[11px] text-zinc-400">
          <span className="font-mono">© 2026 Agensure · AI Underwriting Inc.</span>
          <a
            href="https://agensure.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-zinc-600 transition"
          >
            agensure.eu <ExternalLink className="h-3 w-3" />
          </a>
        </div>

      </div>
    </div>
  );
}
