import type { SeriesOut } from "../types";

interface SeriesListProps {
  series: SeriesOut[];
  selectedId: string | null;
  onSelect: (id: string) => void | Promise<void>;
}

export default function SeriesList({ series, selectedId, onSelect }: SeriesListProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-card-foreground">Series guardadas</h2>

      {series.length === 0 ? (
        <p className="text-sm text-muted-foreground">Aún no hay series guardadas.</p>
      ) : (
        <ul className="flex flex-col gap-3" role="list">
          {series.map((serie) => {
            const isSelected = serie.id === selectedId;
            return (
              <li
                key={serie.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-border p-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-card-foreground">{serie.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{serie.numbers.join(", ")}</p>
                </div>

                <button
                  onClick={() => onSelect(serie.id)}
                  className={`h-9 rounded-md px-3 text-sm font-medium ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-background text-foreground"
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
