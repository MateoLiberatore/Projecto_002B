// cliente api minimo para el front

import type { SeriesAnalysis, SeriesOut } from "../types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

async function readJson(res: Response) {
  return (await res.json()) as any;
}

function errMsg(data: any) {
  return data?.error?.message || "Error inesperado.";
}

export async function listSeries(): Promise<SeriesOut[]> {
  const res = await fetch(`${API_URL}/series`);
  const data = await readJson(res);
  if (!res.ok) throw new Error(errMsg(data));
  return data;
}

export async function createSeries(payload: { title: string; numbers: number[] }): Promise<SeriesOut> {
  const res = await fetch(`${API_URL}/series`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await readJson(res);
  if (!res.ok) throw new Error(errMsg(data));
  return data;
}

export async function analyzeSeries(id: string): Promise<SeriesAnalysis> {
  const res = await fetch(`${API_URL}/series/${id}/analyze`);
  const data = await readJson(res);
  if (!res.ok) throw new Error(errMsg(data));
  return data;
}
