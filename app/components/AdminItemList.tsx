"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import type { Item } from "../types/item";

type Props = {
  onEdit: (item: Item) => void;
};

export default function AdminItemList({ onEdit }: Props) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    setLoading(true);

    const { data, error } = await supabase
      .from("items")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setItems((data ?? []) as Item[]);
    setLoading(false);
  }

  async function deleteItem(id: number) {
    const confirmed = confirm("האם למחוק את הפריט?");

    if (!confirmed) {
      return;
    }

    const { error } = await supabase
      .from("items")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setItems((current) =>
      current.filter((item) => item.id !== id)
    );
  }

  return (
    <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        ניהול פריטים
      </h2>

      {loading ? (
        <p className="text-gray-500">
          טוען פריטים...
        </p>
      ) : items.length === 0 ? (
        <p className="text-gray-500">
          אין פריטים עדיין.
        </p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-gray-200 p-4 lg:flex-row lg:items-center lg:justify-between"
            >
              <div className="flex gap-4">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                  {item.images?.length > 0 ? (
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-2xl">
                      📦
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="text-gray-700">
                    ₪{item.price.toLocaleString("he-IL")}
                  </p>

                  <p className="text-sm text-gray-500">
                    {item.category}
                  </p>

                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      item.status === "sold"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.status === "sold" ? "נמכר" : "זמין"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onEdit(item)}
                  className="rounded-xl bg-orange-500 px-4 py-2 font-semibold text-white transition hover:bg-orange-600"
                >
                  עריכה
                </button>

                <button
                  onClick={() => deleteItem(item.id)}
                  className="rounded-xl bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
                >
                  מחיקה
                </button>

                <Link
                  href={`/item/${item.id}`}
                  target="_blank"
                  className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
                >
                  צפייה
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}