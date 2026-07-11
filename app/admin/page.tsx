"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "../lib/supabase";
import AdminItemForm from "../components/AdminItemForm";
import AdminItemList from "../components/AdminItemList";
import type { Item } from "../types/item";

export default function AdminPage() {
  const router = useRouter();

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setCheckingAuth(false);
    }

    checkUser();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  function handleSaved() {
    setSelectedItem(null);
    setRefreshKey((current) => current + 1);
  }

  function handleEdit(item: Item) {
    setSelectedItem(item);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">טוען...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8 flex items-center justify-between rounded-3xl bg-white p-6 shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              ניהול פריטים
            </h1>

            <p className="mt-2 text-gray-600">
              הוספה, עריכה ומחיקה של פריטים למכירה
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-gray-900 px-5 py-2 font-semibold text-white transition hover:bg-gray-700"
          >
            יציאה
          </button>
        </div>

        <AdminItemForm
          item={selectedItem}
          onSaved={handleSaved}
        />

        {selectedItem && (
          <button
            onClick={() => setSelectedItem(null)}
            className="mt-4 rounded-xl bg-gray-200 px-5 py-2 font-semibold text-gray-700 transition hover:bg-gray-300"
          >
            ביטול עריכה
          </button>
        )}

        <AdminItemList
          key={refreshKey}
          onEdit={handleEdit}
        />
      </div>
    </main>
  );
}