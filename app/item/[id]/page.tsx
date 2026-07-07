"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [item, setItem] = useState<any>(null);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    async function loadItem() {
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setItem(data);
    }

    loadItem();
  }, [id]);

  if (!item) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        טוען...
      </main>
    );
  }

  const phone = "972525757870";

  const message = encodeURIComponent(
    `שלום, אני מעוניין ב-${item.title}. האם הוא עדיין זמין?`
  );

  const image =
    item.images && item.images.length > 0
      ? item.images[selected]
      : "https://picsum.photos/600/400";

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-6xl p-8">

        <Link href="/" className="mb-6 inline-block text-blue-600">
          ← חזרה
        </Link>

        <div className="grid gap-10 rounded-3xl bg-white p-8 shadow lg:grid-cols-2">

          <div>
            <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl">
              <Image
                src={image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            {item.images?.length > 0 && (
              <div className="flex gap-3">
                {item.images.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelected(index)}
                    className={`relative h-24 w-24 overflow-hidden rounded-xl border-2 ${
                      selected === index
                        ? "border-blue-600"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="mb-4 text-4xl font-bold">
              {item.title}
            </h1>

            <div className="mb-6 text-5xl font-bold text-blue-600">
              ₪{item.price.toLocaleString()}
            </div>

            <p className="mb-8 text-lg leading-8 text-gray-700">
              {item.description}
            </p>

            <a
              href={`https://wa.me/${phone}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl bg-green-600 py-4 text-center text-lg font-bold text-white hover:bg-green-700"
            >
              💬 אני מעוניין
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}