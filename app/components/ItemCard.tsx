import Image from "next/image";
import Link from "next/link";
import { Item } from "../types/item";

type Props = {
  item: Item;
};

const STATUS = {
  available: {
    text: "זמין",
    color: "bg-green-100 text-green-700",
  },
  reserved: {
    text: "שמור",
    color: "bg-yellow-100 text-yellow-700",
  },
  sold: {
    text: "נמכר",
    color: "bg-red-100 text-red-700",
  },
} as const;

export default function ItemCard({ item }: Props) {
  const current = STATUS[item.status] ?? STATUS.available;

  const image =
    item.images?.length > 0
      ? item.images[0]
      : "https://picsum.photos/600/400";

  return (
    <Link href={`/item/${item.id}`} className="group block">
      <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <Image
            src={image}
            alt={item.title}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />

          {item.status === "sold" && (
            <div className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-sm font-bold text-white shadow">
              נמכר
            </div>
          )}

          <div className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-gray-700 backdrop-blur">
            {item.category}
          </div>
        </div>

        <div className="space-y-4 p-5">
          <div className="flex items-start justify-between gap-3">
            <h2 className="line-clamp-2 text-xl font-bold text-gray-900">
              {item.title}
            </h2>

            <span
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${current.color}`}
            >
              {current.text}
            </span>
          </div>

          <div className="text-3xl font-bold text-blue-600">
            ₪{item.price.toLocaleString("he-IL")}
          </div>

          <p className="line-clamp-3 leading-6 text-gray-600">
            {item.description}
          </p>

          <div className="border-t border-gray-100 pt-3 text-sm font-medium text-blue-600 transition group-hover:text-blue-700">
            לצפייה בפרטים ←
          </div>
        </div>
      </article>
    </Link>
  );
}