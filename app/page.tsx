"use client";

import { useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CategoryBar from "./components/CategoryBar";
import ItemCard from "./components/ItemCard";

import { getItems } from "./lib/getItems";
import { Item } from "./types/item";

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("הכל");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getItems();
        setItems(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const filteredItems = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return items.filter((item) => {
      if (item.status === "sold") {
        return false;
      }

      const matchesSearch =
        !searchText ||
        `${item.title} ${item.description} ${item.category}`
          .toLowerCase()
          .includes(searchText);

      const matchesCategory =
        category === "הכל" || item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [items, search, category]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            מכירת תכולת בית
          </h1>

          <p className="text-gray-600">
            מצאו פריטים למכירה במחירים טובים
          </p>
        </div>

        <div className="space-y-5">
          <SearchBar
            value={search}
            onChange={setSearch}
          />

          <CategoryBar
            selected={category}
            onSelect={setCategory}
          />
        </div>

        <div className="mb-6 mt-8 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            פריטים זמינים
          </h2>

          {!loading && (
            <span className="rounded-full bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
              {filteredItems.length} פריטים
            </span>
          )}
        </div>

        {loading ? (
          <div className="py-20 text-center text-xl text-gray-500">
            טוען פריטים...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="rounded-3xl bg-white py-20 text-center shadow-sm">
            <div className="mb-3 text-4xl">
              🔍
            </div>

            <p className="text-xl font-semibold text-gray-700">
              לא נמצאו פריטים
            </p>

            <p className="mt-2 text-gray-500">
              נסו לשנות את החיפוש או לבחור קטגוריה אחרת
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}