import { DashboardHeroSection } from "../components/dashboard/DashboardHeroSection";
import { WishlistPreview } from "../components/dashboard/WishlistPreview";
import { DashboardCardsGrid } from "../components/dashboard/DashboardCardsGrid";

export function Dashboard() {
  return (
    <div aria-label="Home dashboard" className="grid w-full self-start gap-3">
      <DashboardHeroSection />
      <WishlistPreview />
      <DashboardCardsGrid />
    </div>
  );
}
