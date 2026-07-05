import Image from "next/image";
import Link from "next/link";
import { Item } from "../types/item";

type Props = {
  item: Item;
};

export default function ItemCard({ item }: Props) {
  const status = {
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
  };

  const current = status[item.status];

  return (
    <Link href={`/item/${item.id}`}>
      <div className="overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:shadow-xl cursor-pointer">

        <div className="relative aspect-[4/3]">
          <Image
            src={item.images[0]}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="space-y-3 p-5">

          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-bold text-gray-900">
              {item.title}
            </h2>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${current.color}`}
            >
              {current.text}
            </span>
          </div>

          <div className="text-3xl font-bold text-blue-600">
            ₪{item.price.toLocaleString()}
          </div>

          <p className="line-clamp-2 text-gray-600">
            {item.description}
          </p>

          <div className="pt-2">
            <span className="text-sm text-gray-500">
              {item.category}
            </span>
          </div>

        </div>
      </div>
    </Link>
  );
}