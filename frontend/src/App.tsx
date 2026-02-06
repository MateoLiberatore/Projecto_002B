import SeriesForm from "./components/SeriesForm";
import SeriesList from "./components/SeriesList";
import SeriesAnalysis from "./components/SeriesAnalysis";
import type { SeriesAnalysis as Analysis, SeriesOut } from "./types";

type Props = {
  series: SeriesOut[];
  selectedId: string | null;
  selectedTitle: string | null;
  analysis: Analysis | null;

  loadingList: boolean;
  loadingAnalysis: boolean;
  saving: boolean;

  error: string | null;

  onSave: (payload: { title: string; numbersText: string }) => void | Promise<void>;
  onSelect: (id: string) => void | Promise<void>;
};

export function AppView({
  series,
  selectedId,
  selectedTitle,
  analysis,
  loadingList,
  loadingAnalysis,
  saving,
  error,
  onSave,
  onSelect,
}: Props) {
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
          <SeriesForm onSave={onSave} disabled={saving} />

          <div>
            {loadingList ? <p className="mb-3 text-sm text-muted-foreground">Cargando...</p> : null}
            <SeriesList series={series} selectedId={selectedId} onSelect={onSelect} />
          </div>

          <SeriesAnalysis result={analysis} serieTitle={selectedTitle} loading={loadingAnalysis} />
        </div>
      </div>
    </div>
  );
}

// default export  
export default AppView;
