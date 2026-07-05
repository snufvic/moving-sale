import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative">
      <Search
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        size={20}
      />

      <input
        type="text"
        placeholder="חיפוש..."
        className="w-full rounded-xl border border-gray-300 bg-white py-3 pr-12 pl-4 outline-none transition focus:border-blue-500"
      />
    </div>
  );
}