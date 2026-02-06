import { useEffect, useMemo, useState } from "react";
import SeriesForm from "./components/SeriesForm";
import SeriesList from "./components/SeriesList";
import SeriesAnalysis from "./components/SeriesAnalysis";
import type { SeriesAnalysis as Analysis, SeriesOut } from "./types";
import { analyzeSeries, createSeries, listSeries } from "./lib/api";
import { parseNumbers } from "./lib/parse";

export default function App() {
  const [series, setSeries] = useState<SeriesOut[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  const [loadingList, setLoadingList] = useState(false);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const selected = useMemo(() => series.find((s) => s.id === selectedId) || null, [series, selectedId]);

  async function refresh() {
    setLoadingList(true);
    setError(null);
    try {
      const items = await listSeries();
      setSeries(items);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo listar series.");
      setSeries([]);
    } finally {
      setLoadingList(false);
    }
  }

  async function runAnalysis(id: string) {
    setLoadingAnalysis(true);
    setError(null);
    setAnalysis(null);
    try {
      const res = await analyzeSeries(id);
      setAnalysis(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo analizar.");
    } finally {
      setLoadingAnalysis(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleSave(payload: { title: string; numbersText: string }) {
    setError(null);

    const title = payload.title.trim();
    if (!title) {
      setError("El título es obligatorio.");
      return;
    }

    const parsed = parseNumbers(payload.numbersText);
    if (!parsed.ok) {
      setError(parsed.error);
      return;
    }

    setSaving(true);
    try {
      const created = await createSeries({ title, numbers: parsed.value });
      await refresh();
      setSelectedId(created.id);
      await runAnalysis(created.id);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo guardar.");
    } finally {
      setSaving(false);
    }
  }

  async function handleSelect(id: string) {
    setSelectedId(id);
    await runAnalysis(id);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl p-6">
        <h1 className="mb-6 text-2xl font-bold">Analizador de Series Numéricas</h1>

        {error ? (
          <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm">
            <strong>Error:</strong> {error}
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-3">
          <SeriesForm onSave={handleSave} disabled={saving} />
          <div>
            {loadingList ? <p className="mb-3 text-sm text-muted-foreground">Cargando...</p> : null}
            <SeriesList series={series} selectedId={selectedId} onSelect={handleSelect} />
          </div>
          <SeriesAnalysis result={analysis} serieTitle={selected?.title ?? null} loading={loadingAnalysis} />
        </div>
      </div>
    </div>
  );
}
