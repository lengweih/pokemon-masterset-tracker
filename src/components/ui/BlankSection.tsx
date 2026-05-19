type BlankSectionElement = "div" | "footer" | "section";
type BlankSectionVariant = "card" | "panel" | "placeholder";

interface BlankSectionProps {
  ariaLabel: string;
  className?: string;
  element?: BlankSectionElement;
  variant?: BlankSectionVariant;
}

const variantClasses: Record<BlankSectionVariant, string> = {
  card: "surface-card",
  panel: "surface-panel",
  placeholder: "rounded-button bg-surface-secondary",
};

export function BlankSection({
  ariaLabel,
  className = "",
  element: Element = "section",
  variant = "panel",
}: BlankSectionProps) {
  const classes = [variantClasses[variant], className].filter(Boolean).join(" ");

  return <Element aria-label={ariaLabel} className={classes} />;
}
