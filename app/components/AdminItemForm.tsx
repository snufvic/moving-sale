"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { CATEGORIES, DEFAULT_CATEGORY } from "../data/categories";

type Item = {
  id?: number;
  title: string;
  price: number;
  category: string;
  description: string;
  status: string;
  images: string[];
};

type Props = {
  item?: Item | null;
  onSaved: () => void;
};

export default function AdminItemForm({ item, onSaved }: Props) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(DEFAULT_CATEGORY);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("available");
  const [files, setFiles] = useState<FileList | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!item) {
      setTitle("");
      setPrice("");
      setCategory(DEFAULT_CATEGORY);
      setDescription("");
      setStatus("available");
      setFiles(null);
      return;
    }

    setTitle(item.title);
    setPrice(item.price.toString());
    setCategory(item.category);
    setDescription(item.description);
    setStatus(item.status);
    setFiles(null);
  }, [item]);

  async function save() {
    if (!title.trim()) {
      alert("יש להזין כותרת");
      return;
    }

    if (!price || Number(price) < 0) {
      alert("יש להזין מחיר תקין");
      return;
    }

    setSaving(true);

    try {
      const imageUrls = [...(item?.images ?? [])];

      if (files) {
        for (const file of Array.from(files)) {
          const fileName = `${Date.now()}-${Math.random()
            .toString(36)
            .substring(2)}-${file.name}`;

          const upload = await supabase.storage
            .from("items")
            .upload(fileName, file);

          if (upload.error) {
            alert(upload.error.message);
            setSaving(false);
            return;
          }

          const { data } = supabase.storage
            .from("items")
            .getPublicUrl(fileName);

          imageUrls.push(data.publicUrl);
        }
      }

      const payload = {
        title: title.trim(),
        price: Number(price),
        category,
        description: description.trim(),
        status,
        images: imageUrls,
      };

      const result = item?.id
        ? await supabase.from("items").update(payload).eq("id", item.id)
        : await supabase.from("items").insert(payload);

      if (result.error) {
        alert(result.error.message);
        setSaving(false);
        return;
      }

      alert(item ? "הפריט עודכן!" : "הפריט נשמר!");

      setTitle("");
      setPrice("");
      setCategory(DEFAULT_CATEGORY);
      setDescription("");
      setStatus("available");
      setFiles(null);

      onSaved();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-2xl bg-white p-8 shadow">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        {item ? "עריכת פריט" : "פריט חדש"}
      </h2>

      <div className="space-y-5">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="כותרת"
          className="w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900 placeholder:text-gray-500"
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="מחיר"
          className="w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900 placeholder:text-gray-500"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <textarea
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="תיאור"
          className="w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900 placeholder:text-gray-500"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900"
        >
          <option value="available">זמין</option>
          <option value="sold">נמכר</option>
        </select>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setFiles(e.target.files)}
        />

        <button
          onClick={save}
          disabled={saving}
          className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          {saving
            ? "שומר..."
            : item
            ? "עדכן פריט"
            : "שמור פריט"}
        </button>
      </div>
    </div>
  );
}