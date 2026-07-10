import type { Category } from "../data/categories";

export type ItemStatus = "available" | "reserved" | "sold";

export interface Item {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  status: ItemStatus;
  images: string[];
}
