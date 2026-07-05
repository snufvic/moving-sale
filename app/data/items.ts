import { Item } from "../types/item";

export const items: Item[] = [
  {
    id: 1,
    title: "גיטרה אקוסטית",
    price: 1200,
    description: "גיטרה במצב מצוין, כמעט ולא הייתה בשימוש.",
    category: "מוזיקה",
    status: "available",
    images: ["/images/placeholder.jpg"],
  },
  {
    id: 2,
    title: "ספריית עץ",
    price: 350,
    description: "ספרייה גדולה בצבע לבן.",
    category: "ריהוט",
    status: "available",
    images: ["/images/placeholder.jpg"],
  },
  {
    id: 3,
    title: "מיקסר KitchenAid",
    price: 900,
    description: "עובד מצוין.",
    category: "מטבח",
    status: "sold",
    images: ["/images/placeholder.jpg"],
  },
];
