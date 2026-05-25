import { useMemo } from "react";
import type { Domain } from "@/lib/agensure-data";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  domains: Domain[];
  highlightKey?: string;
}

/** Custom SVG radar — institutional look, no library required. */
export function RiskRadar({ domains, highlightKey }: Props) {
  const size = 360;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 130;
  const levels = 5;

  const points = useMemo(() => {
    return domains.map((d, i) => {
      const angle = (Math.PI * 2 * i) / domains.length - Math.PI / 2;
      const r = (d.resilience / 100) * radius;
      return {
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        lx: cx + Math.cos(angle) * (radius + 22),
        ly: cy + Math.sin(angle) * (radius + 22),
        ax: cx + Math.cos(angle) * radius,
        ay: cy + Math.sin(angle) * radius,
        angle,
        domain: d,
      };
    });
  }, [domains, cx, cy, radius]);

  const polygon = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="rounded-xl border hairline bg-[var(--surface)] p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold tracking-tight">Risk Resilience Surface</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Weekly 250-probe loop · safety curves across the 5 AIUC domains
          </p>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <Legend dot="var(--success)" label="This week" />
          <Legend dot="var(--surface-3)" label="Baseline" outline />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 items-center">
        <svg width={size} height={size} className="mx-auto">
          {/* Concentric web */}
          {Array.from({ length: levels }).map((_, i) => {
            const r = ((i + 1) / levels) * radius;
            const pts = domains.map((_, j) => {
              const a = (Math.PI * 2 * j) / domains.length - Math.PI / 2;
              return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`;
            }).join(" ");
            return (
              <polygon
                key={i}
                points={pts}
                fill="none"
                stroke="var(--hairline)"
                strokeWidth={1}
                opacity={0.6}
              />
            );
          })}

          {/* Axes */}
          {points.map((p, i) => (
            <line key={i} x1={cx} y1={cy} x2={p.ax} y2={p.ay} stroke="var(--hairline)" strokeWidth={1} />
          ))}

          {/* Data polygon */}
          <polygon
            points={polygon}
            fill="color-mix(in oklab, var(--success) 18%, transparent)"
            stroke="var(--success)"
            strokeWidth={1.5}
          />

          {/* Vertices */}
          {points.map((p, i) => {
            const isHi = highlightKey === p.domain.key;
            return (
              <g key={i}>
                <circle
                  cx={p.x} cy={p.y}
                  r={isHi ? 5 : 3.2}
                  fill={isHi ? "var(--success)" : "var(--surface)"}
                  stroke="var(--success)"
                  strokeWidth={1.5}
                />
                <text
                  x={p.lx} y={p.ly}
                  textAnchor={p.lx < cx - 4 ? "end" : p.lx > cx + 4 ? "start" : "middle"}
                  dominantBaseline="middle"
                  className="fill-muted-foreground"
                  style={{ font: "500 10px var(--font-mono), monospace", letterSpacing: 0.4 }}
                >
                  {p.domain.short.toUpperCase()}
                </text>
              </g>
            );
          })}

          {/* Center label */}
          <text x={cx} y={cy - 4} textAnchor="middle" className="fill-foreground" style={{ font: "600 22px var(--font-mono)" }}>
            {Math.round(domains.reduce((a, d) => a + d.resilience, 0) / domains.length)}%
          </text>
          <text x={cx} y={cy + 12} textAnchor="middle" className="fill-muted-foreground" style={{ font: "500 9px var(--font-mono)", letterSpacing: 1 }}>
            AVG RESILIENCE
          </text>
        </svg>

        {/* Domain table */}
        <div className="grid gap-2">
          {domains.map((d) => {
            const Icon = d.icon;
            const up = d.delta >= 0;
            const isHi = highlightKey === d.key;
            return (
              <div
                key={d.key}
                className={cn(
                  "flex items-center gap-3 rounded-md border hairline bg-[var(--surface-2)] px-3 py-2.5",
                  isHi && "border-[color-mix(in_oklab,var(--success)_40%,var(--hairline))]"
                )}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--surface-3)] text-muted-foreground">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{d.short}</div>
                  <div className="mt-1 h-1 rounded-full bg-[var(--surface-3)] overflow-hidden">
                    <div
                      className="h-full bg-[var(--success)]/80"
                      style={{ width: `${d.resilience}%` }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm tabular-nums">{d.resilience}%</div>
                  <div className={cn(
                    "inline-flex items-center gap-1 text-[11px] font-medium",
                    up ? "text-[var(--success)]" : "text-[var(--danger)]"
                  )}>
                    {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {up ? "+" : ""}{d.delta}% wow
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Legend({ dot, label, outline }: { dot: string; label: string; outline?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="h-2 w-2 rounded-full"
        style={{
          background: outline ? "transparent" : dot,
          border: outline ? `1px solid ${dot}` : "none",
        }}
      />
      {label}
    </span>
  );
}
