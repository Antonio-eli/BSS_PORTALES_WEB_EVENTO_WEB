import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "@fontsource/montserrat/400.css";
import '@fontsource/nunito/800.css'
import '@fontsource/nunito/900.css'
import '@fontsource/orbitron/600.css'
import '@fontsource/orbitron/700.css'
import "./index.css";
import router from "./router/index.tsx";

const container = document.getElementById("root");
if (!container) throw new Error('Root element not found');

const root = createRoot(container);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
