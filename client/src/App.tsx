import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";
import { HomePage } from "./pages/HomePage";

const AuthPage = lazy(() => import("./pages/AuthPage").then((module) => ({ default: module.AuthPage })));
const MapPage = lazy(() => import("./pages/MapPage").then((module) => ({ default: module.MapPage })));
const PinsPage = lazy(() => import("./pages/PinsPage").then((module) => ({ default: module.PinsPage })));
const StyleGuide = lazy(() => import("./pages/StyleGuide").then((module) => ({ default: module.StyleGuide })));

function App() {
  const routeFallback = (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 text-[13px] font-medium text-muted-foreground sm:text-sm">
      Loading...
    </div>
  );

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={routeFallback}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/style-guide" element={<StyleGuide />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/pins" element={<PinsPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
