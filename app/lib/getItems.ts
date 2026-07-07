import { supabase } from "./supabase";

export async function getItems() {
  const { data, error } = await supabase.from("items").select("*").order("id");

  if (error) {
    throw error;
  }

  return data;
}
