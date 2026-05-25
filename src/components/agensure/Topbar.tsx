import { Bell, Command, Search } from "lucide-react";

export function Topbar({ scope }: { scope: string }) {
  return (
    <header className="sticky top-0 z-20 border-b hairline bg-[color-mix(in_oklab,var(--background)_85%,transparent)] backdrop-blur">
      <div className="flex items-center gap-4 px-6 py-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="text-foreground/80">Workspace</span>
          <span className="text-muted-foreground/50">/</span>
          <span className="text-foreground/80">Production</span>
          <span className="text-muted-foreground/50">/</span>
          <span className="text-foreground font-medium">{scope}</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 rounded-md border hairline bg-[var(--surface)] px-2.5 py-1.5 text-xs text-muted-foreground w-72">
            <Search className="h-3.5 w-3.5" />
            <span className="flex-1">Search probes, agents, reports…</span>
            <span className="inline-flex items-center gap-0.5 rounded border hairline px-1 py-0.5 font-mono text-[10px]">
              <Command className="h-2.5 w-2.5" />K
            </span>
          </div>
          <button className="relative inline-flex h-8 w-8 items-center justify-center rounded-md border hairline bg-[var(--surface)] hover:bg-[var(--surface-2)] transition">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[var(--warning)]" />
          </button>
          <div className="flex items-center gap-2 rounded-md border hairline bg-[var(--surface)] pl-1 pr-2.5 py-1">
            <div className="h-6 w-6 rounded-sm bg-gradient-to-br from-[var(--success)] to-[var(--chart-4)] text-[10px] font-bold text-background flex items-center justify-center">
              EM
            </div>
            <div className="leading-tight">
              <div className="text-xs font-medium">Elena Marsh</div>
              <div className="text-[10px] text-muted-foreground">CISO · Acme Corp</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
