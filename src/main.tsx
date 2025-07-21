import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HoldingsProvider } from "./context/HoldingsContext";
import AppRoutes from "./pages/AppRoutes";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);
root.render(
  <StrictMode>
    <BrowserRouter>
      <HoldingsProvider>
        <AppRoutes />
      </HoldingsProvider>
    </BrowserRouter>
  </StrictMode>,
);
