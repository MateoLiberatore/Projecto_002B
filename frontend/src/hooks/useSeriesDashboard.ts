import { useEffect, useMemo, useState } from "react";
import type { SeriesAnalysis as Analysis, SeriesOut } from "../types";
import { analyzeSeries, createSeries, listSeries } from "../lib/api";
import { parseNumbers } from "../lib/parse";

export type SavePayload = { title: string; numbersText: string };

export function useSeriesDashboard() {
  const [series, setSeries] = useState<SeriesOut[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  const [loadingList, setLoadingList] = useState(false);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const selected = useMemo(
    () => series.find((s) => s.id === selectedId) || null,
    [series, selectedId]
  );

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

  async function onSave(payload: SavePayload) {
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

  async function onSelect(id: string) {
    setSelectedId(id);
    await runAnalysis(id);
  }

  return {
    // data
    series,
    selectedId,
    selectedTitle: selected?.title ?? null,
    analysis,

    // ui state
    loadingList,
    loadingAnalysis,
    saving,
    error,

    // actions
    onSave,
    onSelect,
    refresh,
  };
}
