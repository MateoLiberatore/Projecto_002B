import type { SeriesAnalysis } from "../types";

interface SeriesAnalysisProps {
  result: SeriesAnalysis | null;
  serieTitle: string | null;
  loading?: boolean;
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg bg-muted p-3">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold text-card-foreground tabular-nums">{value}</p>
    </div>
  );
}

export default function SeriesAnalysis({ result, serieTitle, loading }: SeriesAnalysisProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-card-foreground">Resultados de análisis</h2>

      {!result && !loading ? (
        <p className="text-sm text-muted-foreground">Seleccioná una serie para ver el análisis.</p>
      ) : null}

      {loading ? <p className="text-sm text-muted-foreground">Analizando...</p> : null}

      {result ? (
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-card-foreground">{serieTitle ?? "Serie"}</p>
            <p className="text-xs text-muted-foreground">{result.numbers.join(", ")}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <StatCard label="MCD" value={result.gcd_all} />
            <StatCard label="Media" value={result.mean} />
            <StatCard label="Desv. estándar" value={result.std_dev} />
            <StatCard label="Primos" value={result.primes.length ? result.primes.join(", ") : "Ninguno"} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
