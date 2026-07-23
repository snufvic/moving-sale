"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../../lib/supabase";
import { Item } from "../../types/item";

export default function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [item, setItem] = useState<Item | null>(null);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadItem() {
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setItem(data);
      setLoading(false);
    }

    loadItem();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-500">טוען פריט...</p>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="mb-4 text-xl text-gray-700">
            הפריט לא נמצא
          </p>

          <Link
            href="/"
            className="text-blue-600 hover:underline"
          >
            חזרה לדף הראשי
          </Link>
        </div>
      </main>
    );
  }

  const phone = "972544613797";

  const message = encodeURIComponent(
    `שלום, אני מעוניין ב-${item.title}. האם הוא עדיין זמין?`
  );

  const images =
    item.images && item.images.length > 0
      ? item.images
      : ["https://picsum.photos/600/400"];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <Link
          href="/"
          className="mb-6 inline-block font-medium text-blue-600 hover:underline"
        >
          ← חזרה לכל הפריטים
        </Link>

        <div className="grid gap-8 rounded-3xl bg-white p-6 shadow-sm lg:grid-cols-2 lg:p-8">
          <div>
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
              <Image
                src={images[selected]}
                alt={item.title}
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />

              {item.status === "sold" && (
                <div className="absolute left-4 top-4 rounded-full bg-red-600 px-4 py-2 font-bold text-white shadow">
                  נמכר
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto">
                {images.map((img, index) => (
                  <button
                    key={img}
                    onClick={() => setSelected(index)}
                    className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 ${
                      selected === index
                        ? "border-blue-600"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="mb-3 text-sm text-gray-500">
              {item.category}
            </div>

            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              {item.title}
            </h1>

            <div className="mb-6 text-4xl font-bold text-blue-600">
              ₪{item.price.toLocaleString("he-IL")}
            </div>

            <p className="mb-8 whitespace-pre-line text-lg leading-8 text-gray-700">
              {item.description}
            </p>

            {item.status !== "sold" && (
              <a
                href={`https://wa.me/${phone}?text=${message}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-green-600 py-4 text-center text-lg font-bold text-white transition hover:bg-green-700"
              >
                💬 אני מעוניין
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}