"use client";

type Props = {
  selected: string;
  onSelect: (category: string) => void;
};

const categories = [
  "הכל",
  "ריהוט",
  "מוצרי חשמל",
  "מטבח",
  "מוזיקה",
  "ספרים",
  "ילדים",
  "גינה",
  "כלי עבודה",
  "אחר",
];

export default function CategoryBar({
  selected,
  onSelect,
}: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categories.map((category) => {
        const isSelected = selected === category;

        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`whitespace-nowrap rounded-full border px-4 py-2 font-medium transition ${
              isSelected
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-gray-300 bg-white text-gray-900 hover:bg-gray-100"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}