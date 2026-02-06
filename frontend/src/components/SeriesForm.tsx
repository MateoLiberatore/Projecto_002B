import React, { useState } from "react";

interface SeriesFormProps {
  onSave: (payload: { title: string; numbersText: string }) => void | Promise<void>;
  disabled?: boolean;
}

export default function SeriesForm({ onSave, disabled }: SeriesFormProps) {
  const [title, setTitle] = useState("");
  const [numbersInput, setNumbersInput] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({ title, numbersText: numbersInput });
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-card-foreground">Cargar serie</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="serie-title" className="text-sm font-medium text-card-foreground">
            Título
          </label>
          <input
            id="serie-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={disabled}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none"
            placeholder="Ej: Serie 1"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="serie-numbers" className="text-sm font-medium text-card-foreground">
            Números (separados por comas)
          </label>
          <input
            id="serie-numbers"
            value={numbersInput}
            onChange={(e) => setNumbersInput(e.target.value)}
            disabled={disabled}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none"
            placeholder="Ej: 12, 15, 21, 30"
          />
        </div>

        <button
          type="submit"
          disabled={disabled}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-50"
        >
          {disabled ? "Guardando..." : "Guardar serie"}
        </button>
      </form>
    </div>
  );
}
