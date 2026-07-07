"use client";

import { useEffect, useMemo, useState } from "react";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CategoryBar from "./components/CategoryBar";
import ItemCard from "./components/ItemCard";

import { getItems } from "./lib/getItems";

export default function Home() {
  const [items, setItems] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("הכל");

  useEffect(() => {
    async function load() {
      const data = await getItems();
      setItems(data);
    }

    load();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (item.status === "sold") return false;

      const matchesSearch = (
        item.title +
        " " +
        item.description +
        " " +
        item.category
      )
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "הכל" || item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [items, search, category]);

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <div className="mb-8">
          <CategoryBar
            selected={category}
            onSelect={setCategory}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
            />
          ))}

          {filteredItems.length === 0 && (
            <div className="col-span-full py-20 text-center text-2xl text-gray-500">
              לא נמצאו פריטים
            </div>
          )}
        </div>
      </div>
    </main>
  );
}