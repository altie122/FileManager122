import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/page";
import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "./components/theme-provider";
import "./main.css";
import { BaseLayout } from "@/layout";
import HomePage from "./home/page";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <BrowserRouter>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route index element={<HomePage />} />
            <Route path='/files/*' element={<App />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
