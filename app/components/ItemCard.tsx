import Image from "next/image";
import { Item } from "../types/item";

type Props = {
  item: Item;
};

export default function ItemCard({ item }: Props) {
  const badge =
    item.status === "available"
      ? "bg-green-100 text-green-700"
      : item.status === "reserved"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  const statusText =
    item.status === "available"
      ? "זמין"
      : item.status === "reserved"
      ? "שמור"
      : "נמכר";

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-xl">
      <div className="relative aspect-[4/3]">
        <Image
          src={item.images[0]}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="space-y-3 p-5">
        <h2 className="text-xl font-bold">{item.title}</h2>

        <p className="text-2xl font-bold text-blue-600">
          ₪{item.price}
        </p>

        <p className="text-sm text-gray-600">
          {item.description}
        </p>

        <span
          className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${badge}`}
        >
          {statusText}
        </span>
      </div>
    </div>
  );
}