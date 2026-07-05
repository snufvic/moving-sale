import Header from "../app/components/Header";
import SearchBar from "../app/components/SearchBar";
import CategoryBar from "../app/components/CategoryBar";
import ItemCard from "../app/components/ItemCard";

import { items } from "../app/data/items";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">

      <Header />

      <div className="mx-auto max-w-7xl space-y-8 p-6">

        <SearchBar />

        <CategoryBar />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
            />
          ))}

        </div>

      </div>

    </main>
  );
}