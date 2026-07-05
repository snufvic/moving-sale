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
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`rounded-full px-4 py-2 whitespace-nowrap transition ${
            selected === category
              ? "bg-blue-600 text-white"
              : "bg-white border hover:bg-gray-100"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}