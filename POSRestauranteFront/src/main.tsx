import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// @ts-ignore: CSS module declaration not available in this project setup
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster richColors />
  </StrictMode>,
);
