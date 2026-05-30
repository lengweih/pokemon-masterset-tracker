import { Package } from "lucide-react";

import { StatCard } from "../common/StatCard";

interface ProductSummaryCardProps {
  totalProducts: number;
}

export function ProductSummaryCard({ totalProducts }: ProductSummaryCardProps) {
  return (
    <StatCard icon={Package} label="Total Products" value={totalProducts} />
  );
}
