import { AppView } from "../App";
import { useSeriesDashboard } from "../hooks/useSeriesDashboard";

export default function SeriesDashboardPage() {
  const vm = useSeriesDashboard();

  return (
    <AppView
      series={vm.series}
      selectedId={vm.selectedId}
      selectedTitle={vm.selectedTitle}
      analysis={vm.analysis}
      loadingList={vm.loadingList}
      loadingAnalysis={vm.loadingAnalysis}
      saving={vm.saving}
      error={vm.error}
      onSave={vm.onSave}
      onSelect={vm.onSelect}
    />
  );
}
