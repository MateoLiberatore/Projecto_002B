"use client";

import type { AnalysisResult } from "@/lib/series-types";

interface SeriesAnalysisProps {
  result: AnalysisResult | null;
  serieTitle: string | null;
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-lg bg-muted p-3">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold text-card-foreground tabular-nums">
        {value}
      </p>
    </div>
  );
}

export default function SeriesAnalysis({
  result,
  serieTitle,
}: SeriesAnalysisProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-card-foreground">
        Resultados de análisis
      </h2>

      {!result ? (
        <p className="text-sm text-muted-foreground">
          Selecciona una serie para ver su análisis.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {serieTitle && (
            <p className="text-sm text-muted-foreground">
              Serie:{" "}
              <span className="font-medium text-card-foreground">
                {serieTitle}
              </span>
            </p>
          )}

          <div className="grid grid-cols-2 gap-3">
            <StatCard label="GCD (MCD)" value={result.gcd_all} />
            <StatCard label="Media" value={result.mean.toFixed(2)} />
            <StatCard
              label="Desviación Estándar"
              value={result.std_dev.toFixed(4)}
            />
            <StatCard
              label="Primos"
              value={
                result.primes.length > 0
                  ? result.primes.join(", ")
                  : "Ninguno"
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
