export const CATEGORIES = [
  "ריהוט",
  "מוצרי חשמל",
  "מטבח",
  "מוזיקה",
  "ספרים",
  "ילדים",
  "גינה",
  "כלי עבודה",
  "אחר",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const DEFAULT_CATEGORY: Category = "ריהוט";
