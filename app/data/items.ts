import { Item } from "../types/item";

export const items: Item[] = [
  {
    id: 1,
    title: "גיטרה אקוסטית",
    price: 1200,
    description: "גיטרה במצב מצוין, כמעט ולא הייתה בשימוש.",
    category: "מוזיקה",
    status: "available",
    images: [
      "https://picsum.photos/id/20/900/700",
      "https://picsum.photos/id/21/900/700",
      "https://picsum.photos/id/22/900/700",
    ],
  },
  {
    id: 2,
    title: "ספריית עץ",
    price: 350,
    description: "ספרייה גדולה בצבע לבן.",
    category: "ריהוט",
    status: "available",
    images: [
      "https://picsum.photos/id/30/900/700",
      "https://picsum.photos/id/31/900/700",
      "https://picsum.photos/id/32/900/700",
    ],
  },
  {
    id: 3,
    title: "מיקסר KitchenAid",
    price: 900,
    description: "עובד מצוין.",
    category: "מטבח",
    status: "sold",
    images: [
      "https://picsum.photos/id/40/900/700",
      "https://picsum.photos/id/41/900/700",
      "https://picsum.photos/id/42/900/700",
    ],
  },
];
