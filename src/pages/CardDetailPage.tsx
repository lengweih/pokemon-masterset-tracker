import { IdCard } from "lucide-react";
import { useParams } from "react-router-dom";

import { PagePlaceholder } from "../components/ui/PagePlaceholder";

export function CardDetailPage() {
  const { cardId } = useParams<{ cardId: string }>();

  return (
    <PagePlaceholder
      description={`Card detail controls will live here for ${cardId ?? "the selected card"}, including variant ownership and wishlist status.`}
      eyebrow="Card Detail"
      icon={IdCard}
      title="Card Detail"
    />
  );
}

export default CardDetailPage;
