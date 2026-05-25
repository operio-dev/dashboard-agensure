import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/qr-verification")({
  component: QRVerification,
});

function QRVerification() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-[color-mix(in_oklab,var(--success)_12%,transparent)] border border-[color-mix(in_oklab,var(--success)_35%,var(--hairline))]">
            <ShieldCheck className="h-8 w-8 text-[var(--success)]" strokeWidth={1.8} />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
              ADR Certificate · Public Verification
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Agent Deployment Readiness</h1>
          </div>
        </div>

        {/* Status card */}
        <div className="rounded-xl border hairline bg-[var(--surface)] overflow-hidden">
          <div className="border-b hairline px-5 py-3 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Certificate Status</span>
            <span className="font-mono text-[10px] text-muted-foreground">EU AI Act · ISO 42001</span>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-3 rounded-lg border border-[color-mix(in_oklab,var(--success)_40%,var(--hairline))] bg-[color-mix(in_oklab,var(--success)_8%,transparent)] px-4 py-3">
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--success)] pulse-dot" />
              <div>
                <div className="text-sm font-semibold text-[var(--success)]">VALID</div>
                <div className="text-[11px] text-muted-foreground">Issued 25 May 2026 · Expires 25 Aug 2026</div>
              </div>
            </div>

            <div className="space-y-2.5">
              {[
                ["Agent", "CustomerBot v2.3"],
                ["Company", "Acme Corp"],
                ["Framework", "AIUC-1 · EU AI Act Art. 50"],
                ["ARS Score", "13 — Low Risk"],
                ["Weekly Probes", "250 vectors · 5 domains"],
                ["Last Verified", "May 25, 2026 · 01:38 UTC"],
              ].map(([key, val]) => (
                <div key={key} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{key}</span>
                  <span className="font-mono text-xs text-foreground">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cryptographic hash */}
        <div className="rounded-lg border hairline bg-[var(--surface)] px-4 py-3 space-y-1">
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Cryptographic Signature</div>
          <div className="font-mono text-[10px] text-muted-foreground break-all">
            SHA-256: 3a7f2c9d1b8e4f6a0c5d2e8b1f4a7c3d9e2f5b8a1c4d7e0f3a6b9c2d5e8f1a4
          </div>
          <div className="text-[10px] text-[var(--success)]">✓ Ledger verified · Tamper-proof</div>
        </div>

        {/* Footer */}
        <div className="text-center space-y-2">
          <p className="text-[11px] text-muted-foreground">
            This certificate is automatically suspended if the agent fails weekly probing.
          </p>
          <a
            href="https://agensure.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition"
          >
            agensure.eu <ExternalLink className="h-3 w-3" />
          </a>
        </div>

      </div>
    </div>
  );
}
