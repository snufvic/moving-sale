"use client";

import { CATEGORIES } from "../data/categories";

type Props = {
  selected: string;
  onSelect: (category: string) => void;
};

const ALL_CATEGORIES = ["הכל", ...CATEGORIES];

export default function CategoryBar({
  selected,
  onSelect,
}: Props) {
  return (
    <div className="mb-6 overflow-x-auto">
      <div className="flex w-max gap-2 pb-2">
        {ALL_CATEGORIES.map((category) => {
          const isSelected = selected === category;

          return (
            <button
              key={category}
              onClick={() => onSelect(category)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-200 ${
                isSelected
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-300 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}