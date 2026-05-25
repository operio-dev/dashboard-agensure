import { DOMAINS, type DomainKey } from "@/lib/agensure-data";
import { ShieldCheck, Settings, LifeBuoy } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  active: DomainKey | "all";
  onChange: (k: DomainKey | "all") => void;
}

export function Sidebar({ active, onChange }: Props) {
  return (
    <aside className="hidden md:flex w-72 shrink-0 flex-col border-r hairline bg-[var(--sidebar)]">
      <div className="flex items-center gap-2.5 px-5 py-5 border-b hairline">
        <div className="relative h-9 w-9 rounded-md bg-gradient-to-br from-[color-mix(in_oklab,var(--success)_60%,transparent)] to-[color-mix(in_oklab,var(--chart-4)_60%,transparent)] flex items-center justify-center">
          <ShieldCheck className="h-5 w-5 text-background" strokeWidth={2.5} />
        </div>
        <div>
          <div className="text-sm font-semibold tracking-tight">Agensure</div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            AI Underwriting
          </div>
        </div>
      </div>

      <div className="px-3 py-4">
        <div className="px-2 pb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          AIUC Risk Domains
        </div>
        <nav className="flex flex-col gap-0.5">
          <DomainItem
            label="All Domains"
            sub="Aggregated view"
            active={active === "all"}
            onClick={() => onChange("all")}
            icon={<ShieldCheck className="h-4 w-4" />}
          />
          {DOMAINS.map((d) => {
            const Icon = d.icon;
            const isActive = active === d.key;
            return (
              <DomainItem
                key={d.key}
                label={d.short}
                sub={d.label.replace(d.short, "").replace(/^[\s—-]+/, "")}
                active={isActive}
                onClick={() => onChange(d.key)}
                icon={<Icon className="h-4 w-4" />}
                resilience={d.resilience}
              />
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-3 border-t hairline">
        <div className="rounded-lg p-3 bg-[var(--surface-2)] border hairline">
          <div className="flex items-center gap-2 text-xs">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--success)] pulse-dot" />
            <span className="font-medium">All systems probing</span>
          </div>
          <div className="mt-1 text-[11px] text-muted-foreground">
            Continuous probe loop active · 250/wk
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between px-2 text-xs text-muted-foreground">
          <button className="inline-flex items-center gap-1.5 hover:text-foreground transition">
            <Settings className="h-3.5 w-3.5" /> Settings
          </button>
          <button className="inline-flex items-center gap-1.5 hover:text-foreground transition">
            <LifeBuoy className="h-3.5 w-3.5" /> Support
          </button>
        </div>
      </div>
    </aside>
  );
}

function DomainItem({
  label, sub, active, onClick, icon, resilience,
}: {
  label: string; sub?: string; active: boolean;
  onClick: () => void; icon: React.ReactNode; resilience?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex items-start gap-3 rounded-md px-3 py-2.5 text-left transition",
        "hover:bg-[var(--sidebar-accent)]",
        active && "bg-[var(--sidebar-accent)]"
      )}
    >
      {active && (
        <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r bg-[var(--success)]" />
      )}
      <span className={cn(
        "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border hairline bg-[var(--surface)] text-muted-foreground",
        active && "text-[var(--success)] border-[color-mix(in_oklab,var(--success)_40%,var(--hairline))]"
      )}>
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium leading-tight truncate">{label}</span>
        {sub && (
          <span className="block text-[11px] text-muted-foreground truncate">{sub || "—"}</span>
        )}
      </span>
      {typeof resilience === "number" && (
        <span className="font-mono text-[10px] text-muted-foreground tabular-nums mt-0.5">
          {resilience}%
        </span>
      )}
    </button>
  );
}
