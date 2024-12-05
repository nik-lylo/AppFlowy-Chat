import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "@appflowy-chat/index.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App></App>
  </StrictMode>
);
