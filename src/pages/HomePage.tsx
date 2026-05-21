import { Dashboard } from "../components/dashboard/Dashboard";
import { Footer } from "../components/layout/Footer";
import { Sidebar } from "../components/layout/sidebar/Sidebar";

export function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-content flex-col gap-4 px-6 pt-6 pb-4">
      <div className="grid flex-1 items-stretch gap-4 lg:grid-cols-[280px_minmax(0,1096px)] lg:justify-center">
        <Sidebar />
        <Dashboard />
      </div>

      <Footer />
    </main>
  );
}

export default HomePage;
