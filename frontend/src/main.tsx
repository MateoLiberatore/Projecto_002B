import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SeriesDashboardPage from "./pages/SeriesDashboardPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SeriesDashboardPage />
  </StrictMode>
);
