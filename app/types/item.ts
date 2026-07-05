export type ItemStatus = "available" | "reserved" | "sold";

export type Category =
  | "ריהוט"
  | "מוצרי חשמל"
  | "מטבח"
  | "מוזיקה"
  | "ספרים"
  | "ילדים"
  | "גינה"
  | "כלי עבודה"
  | "אחר";

export interface Item {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  status: ItemStatus;
  images: string[];
}
