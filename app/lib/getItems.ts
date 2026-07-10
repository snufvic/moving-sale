import { supabase } from "./supabase";
import type { Item } from "../types/item";

export async function getItems(): Promise<Item[]> {
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Failed to load items:", error.message);
    throw error;
  }

  return (data ?? []) as Item[];
}
