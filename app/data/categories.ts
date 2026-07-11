export const CATEGORIES = [
  "מוצרי חשמל",
  "קמפינג",
  "מטבח",
  "מוזיקה",
  "ספרים",
  "ילדים",
  "גינה",
  "ריהוט",
  "כלי עבודה",
  "אחר",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const DEFAULT_CATEGORY: Category = "מוצרי חשמל";
