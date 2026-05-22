import { Dashboard } from "../components/dashboard/Dashboard";
import { AppNavigation } from "../components/navigation/AppNavigation";
import { Footer } from "../components/Footer";

export function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-content flex-col gap-3 px-3 py-3 lg:px-5 lg:pt-5">
      <div className="grid flex-1 items-stretch gap-3 lg:grid-cols-[280px_minmax(0,1096px)] lg:justify-center">
        <AppNavigation />
        <Dashboard />
      </div>

      <Footer />
    </main>
  );
}

export default HomePage;
