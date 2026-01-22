import { budgetType } from "@/types/budgetType";

export const budgetTiers: budgetType[] = [
  {
    id: 1,
    name: "Sapa",
    range: "₦500 - ₦2,000",
    color: "bg-red-500",
    desc: "On a tight budget",
  },
  {
    id: 2,
    name: "Guidance",
    range: "₦2,000 - ₦8,000",
    color: "bg-orange-500",
    desc: "Moderate spending",
  },
  {
    id: 3,
    name: "Baller",
    range: "₦8,000 - ₦15,000",
    color: "bg-green-500",
    desc: "Premium meals",
  },
];
