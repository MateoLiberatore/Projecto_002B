"use client";

import React from "react"

import { useState } from "react";
import type { Serie } from "@/lib/series-types";

interface SeriesFormProps {
  onSave: (serie: Serie) => void;
}

export default function SeriesForm({ onSave }: SeriesFormProps) {
  const [title, setTitle] = useState("");
  const [numbersInput, setNumbersInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError("El título es obligatorio.");
      return;
    }

    const parts = numbersInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (parts.length === 0) {
      setError("Introduce al menos un número.");
      return;
    }

    const parsed: number[] = [];
    for (const part of parts) {
      const n = Number(part);
      if (!Number.isInteger(n)) {
        setError(`"${part}" no es un entero válido.`);
        return;
      }
      parsed.push(n);
    }

    onSave({
      id: crypto.randomUUID(),
      title: trimmedTitle,
      numbers: parsed,
    });

    setTitle("");
    setNumbersInput("");
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-card-foreground">
        Cargar serie
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="serie-title"
            className="text-sm font-medium text-card-foreground"
          >
            Título
          </label>
          <input
            id="serie-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Serie Fibonacci"
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="serie-numbers"
            className="text-sm font-medium text-card-foreground"
          >
            Números
          </label>
          <input
            id="serie-numbers"
            type="text"
            value={numbersInput}
            onChange={(e) => setNumbersInput(e.target.value)}
            placeholder="Ej: 2, 4, 6, 8, 10"
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <p className="text-xs text-muted-foreground">
            Enteros separados por comas
          </p>
        </div>

        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Guardar serie
        </button>
      </form>
    </div>
  );
}
