"use client";

import type { Serie } from "@/lib/series-types";

interface SeriesListProps {
  series: Serie[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function SeriesList({
  series,
  selectedId,
  onSelect,
}: SeriesListProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-card-foreground">
        Series guardadas
      </h2>

      {series.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Aún no hay series guardadas. Crea una en el formulario.
        </p>
      ) : (
        <ul className="flex flex-col gap-3" role="list">
          {series.map((serie) => {
            const isSelected = serie.id === selectedId;
            return (
              <li
                key={serie.id}
                className={`flex items-start justify-between gap-3 rounded-lg border p-3 transition-colors ${
                  isSelected
                    ? "border-primary/40 bg-primary/5"
                    : "border-border bg-background"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-card-foreground">
                    {serie.title}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    [{serie.numbers.join(", ")}]
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onSelect(serie.id)}
                  disabled={isSelected}
                  className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                    isSelected
                      ? "cursor-default bg-primary/10 text-primary"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {isSelected ? "Seleccionada" : "Seleccionar"}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
