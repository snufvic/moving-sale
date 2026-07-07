"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import AdminItemList from "../components/AdminItemList";
export default function AdminPage() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("ריהוט");
    const [description, setDescription] = useState("");  
    const [files, setFiles] = useState<FileList | null>(null);
return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <div className="mx-auto max-w-3xl p-8">

        <h1 className="mb-8 text-4xl font-bold text-gray-900">
          ניהול פריטים
        </h1>

        <div className="rounded-2xl bg-white p-8 shadow">

          <div className="mb-6">
            <label className="mb-2 block font-semibold text-gray-900">
              כותרת
            </label>

            <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-3 text-gray-900 placeholder:text-gray-500"
            placeholder="למשל: ספה תלת מושבית"
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block font-semibold text-gray-900">
              מחיר
            </label>

            <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-3 text-gray-900 placeholder:text-gray-500"
            placeholder="0"
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block font-semibold text-gray-900">
              קטגוריה
            </label>

            <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-3 text-gray-900"
            >
            <option>ריהוט</option>
            <option>מוצרי חשמל</option>
            <option>מטבח</option>
            <option>מוזיקה</option>
            <option>ספרים</option>
            <option>ילדים</option>
            <option>גינה</option>
            <option>כלי עבודה</option>
            <option>אחר</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="mb-2 block font-semibold text-gray-900">
              תיאור
            </label>

            <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-3 text-gray-900 placeholder:text-gray-500"
            />
          </div>

          <div className="mb-8">
            <label className="mb-2 block font-semibold text-gray-900">
              תמונות
            </label>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setFiles(e.target.files)}
            />
          </div>

          <button onClick={saveItem} className="w-full rounded-xl bg-blue-600 py-4 text-lg font-bold text-white hover:bg-blue-700">
            שמור פריט
          </button>

        </div>
<AdminItemList />
      </div>
    </main>
  );
  async function saveItem() {
    const imageUrls: string[] = [];

  if (files) {
    for (const file of Array.from(files)) {
      const fileName = `${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from("items")
        .upload(fileName, file);

      if (error) {
        alert(error.message);
        return;
      }

      const { data } = supabase.storage
        .from("items")
        .getPublicUrl(fileName);

      imageUrls.push(data.publicUrl);
    }
  }
    const { error } = await supabase.from("items").insert({
    title,
    price: Number(price),
    description,
    category,
    status: "available",
    images: imageUrls,
  });

  if (error) {
    alert("שגיאה: " + error.message);
    return;
  }

  alert("הפריט נשמר!");

  setTitle("");
  setPrice("");
  setCategory("ריהוט");
  setDescription("");
}
}