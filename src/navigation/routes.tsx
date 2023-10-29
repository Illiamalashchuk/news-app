import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PAGES } from "./constants";
import { MainPage } from "../pages/MainPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PAGES.ROOT} element={<MainPage />} />
        <Route path={PAGES.WILDCARD} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
