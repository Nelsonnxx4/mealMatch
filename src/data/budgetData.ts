import { budgetType } from "@/types/budgetType";

export const budgetTiers: budgetType[] = [
  {
    id: 1,
    name: "Sapa",
    range: "₦500 - ₦2,000",
    color: "bg-red-500",
    desc: "On a tight budget",
    examples: [
      "Indomie with egg",
      "Bread and akara",
      "Ewa agoyin",
      "Garri and groundnut",
    ],
  },
  {
    id: 2,
    name: "Guidance",
    range: "₦2,000 - ₦8,000",
    color: "bg-orange-500",
    desc: "Moderate spending",
    examples: [
      "Jollof rice & chicken",
      "Pounded yam & egusi",
      "Fried rice combo",
      "Amala & ewedu",
    ],
  },
  {
    id: 3,
    name: "Baller",
    range: "₦8,000 - ₦15,000",
    color: "bg-green-500",
    desc: "Premium meals",
    examples: [
      "Pepper soup & assorted",
      "Seafood okro",
      "Grilled fish platter",
      "Full suya box",
    ],
  },
];
