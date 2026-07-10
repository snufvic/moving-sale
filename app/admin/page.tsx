"use client";

import { useState } from "react";

import AdminItemForm from "../components/AdminItemForm";
import AdminItemList from "../components/AdminItemList";
import type { Item } from "../types/item";

export default function AdminPage() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  function handleSaved() {
    setSelectedItem(null);
    setRefreshKey((current) => current + 1);
  }

  function handleEdit(item: Item) {
    setSelectedItem(item);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            ניהול פריטים
          </h1>

          <p className="mt-2 text-gray-600">
            הוספה, עריכה ומחיקה של פריטים למכירה
          </p>
        </div>

        <AdminItemForm
          item={selectedItem}
          onSaved={handleSaved}
        />

        {selectedItem && (
          <button
            onClick={() => setSelectedItem(null)}
            className="mt-4 rounded-xl bg-gray-200 px-5 py-2 font-semibold text-gray-700 transition hover:bg-gray-300"
          >
            ביטול עריכה
          </button>
        )}

        <AdminItemList
          key={refreshKey}
          onEdit={handleEdit}
        />
      </div>
    </main>
  );
}