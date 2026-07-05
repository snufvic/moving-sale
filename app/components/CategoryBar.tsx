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
  
  export default function CategoryBar() {
    return (
      <div className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            className="whitespace-nowrap rounded-full border bg-white px-4 py-2 text-sm transition hover:bg-blue-600 hover:text-white"
          >
            {category}
          </button>
        ))}
      </div>
    );
  }