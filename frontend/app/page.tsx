"use client";

import { useState, useMemo } from "react";
import type { Serie, AnalysisResult } from "@/lib/series-types";
import SeriesForm from "@/components/SeriesForm";
import SeriesList from "@/components/SeriesList";
import SeriesAnalysis from "@/components/SeriesAnalysis";

/* ── Pure math helpers ── */

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

function gcdArray(nums: number[]): number {
  return nums.reduce((acc, n) => gcd(acc, n));
}

function mean(nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function stdDev(nums: number[]): number {
  const m = mean(nums);
  const variance = nums.reduce((sum, n) => sum + (n - m) ** 2, 0) / nums.length;
  return Math.sqrt(variance);
}

function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function analyze(nums: number[]): AnalysisResult {
  return {
    gcd_all: gcdArray(nums),
    mean: mean(nums),
    std_dev: stdDev(nums),
    primes: [...new Set(nums)].filter(isPrime).sort((a, b) => a - b),
  };
}

/* ── App ── */

export default function Page() {
  const [series, setSeries] = useState<Serie[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedSerie = useMemo(
    () => series.find((s) => s.id === selectedId) ?? null,
    [series, selectedId],
  );

  const analysisResult = useMemo(
    () => (selectedSerie ? analyze(selectedSerie.numbers) : null),
    [selectedSerie],
  );

  function handleSave(serie: Serie) {
    setSeries((prev) => [...prev, serie]);
    setSelectedId(serie.id);
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-balance">
          Analizador de Series Numéricas
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Crea series, selecciona una y observa su análisis al instante.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <SeriesForm onSave={handleSave} />
        <SeriesList
          series={series}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        <SeriesAnalysis
          result={analysisResult}
          serieTitle={selectedSerie?.title ?? null}
        />
      </div>
    </main>
  );
}
