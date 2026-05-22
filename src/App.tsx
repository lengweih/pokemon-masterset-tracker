import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import { Footer } from "./components/Footer";
import { AppNavigation } from "./components/navigation/AppNavigation";
import CardDetailPage from "./pages/CardDetailPage";
import ChangelogPage from "./pages/ChangelogPage";
import CollectionPage from "./pages/CollectionPage";
import ProductListPage from "./pages/ProductListPage";
import WishlistPage from "./pages/WishlistPage";
import { ROUTE_PATTERNS, ROUTES } from "./routes/paths";
import { Dashboard } from "./pages/Dashboard";

export function App() {
  return (
    <HashRouter>
      <main className="mx-auto flex min-h-screen w-full max-w-content flex-col gap-3 px-3 py-3 lg:px-5 lg:pt-5">
        <div className="grid flex-1 content-start items-start gap-3 lg:content-stretch lg:items-stretch lg:grid-cols-[280px_minmax(0,1096px)] lg:justify-center">
          <AppNavigation />

          <Routes>
            <Route element={<Dashboard />} path={ROUTES.home} />
            <Route element={<CollectionPage />} path={ROUTES.collection} />
            <Route
              element={<CardDetailPage />}
              path={ROUTE_PATTERNS.cardDetail}
            />
            <Route element={<WishlistPage />} path={ROUTES.wishlist} />
            <Route element={<ProductListPage />} path={ROUTES.products} />
            <Route element={<ChangelogPage />} path={ROUTES.changelog} />
            <Route element={<Navigate replace to={ROUTES.home} />} path="*" />
          </Routes>
        </div>

        <Footer />
      </main>
    </HashRouter>
  );
}
