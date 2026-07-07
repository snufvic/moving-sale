"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

type Item = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  status: string;
  images: string[];
};

export default function AdminItemList() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setItems(data || []);
  }

  async function deleteItem(id: number) {
    if (!confirm("למחוק את הפריט?")) return;

    const { error } = await supabase
      .from("items")
      .delete()
      .eq("id", id);

   if (error) {
    console.error(error);
    alert(error.message);
    return;
  }

    loadItems();
  }

  return (
    <div className="mt-10 rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        פריטים קיימים
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-500">אין עדיין פריטים.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-gray-200 p-4"
            >
              <div>
                <h3 className="font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="text-gray-600">
                  ₪{item.price.toLocaleString()}
                </p>

                <p className="text-sm text-gray-500">
                  {item.category}
                </p>
              </div>

              <div className="flex gap-3">
                <Link
                  href={`/item/${item.id}`}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  צפייה
                </Link>

                <button
                  className="rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
                >
                  עריכה
                </button>

                <button
                  onClick={() => deleteItem(item.id)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  מחיקה
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}