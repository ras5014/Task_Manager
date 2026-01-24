import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import App from "./app/App.tsx";
import { AppProviders } from "./app/providers.tsx";


createRoot(document.getElementById("root")!).render(
  <AppProviders>
    <App />
    <Toaster position="top-right" />
  </AppProviders>
);
