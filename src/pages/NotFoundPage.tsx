import { Link } from "react-router-dom";

import { ROUTES } from "../routes/paths";

export function NotFoundPage() {
  return (
    <section className="grid w-full self-start gap-3">
      <div className="empty-state lg:h-full">
        <p className="text-card text-text-primary">Page not found</p>
        <p className="max-w-md text-sm font-medium text-text-secondary">
          We couldn&apos;t find that page. The link may be incorrect or the page
          may have moved.
        </p>
        <Link className="btn-primary mt-1" to={ROUTES.home}>
          Back to Dashboard
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
