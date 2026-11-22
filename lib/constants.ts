export const COLORS = [
  { value: "black", label: "Black" },
  { value: "white", label: "White" },
  { value: "blue", label: "Blue" },
  { value: "red", label: "Red" },
] as const;

export type Color = (typeof COLORS)[number]["value"];

export const PRICE_IN_CENTS = 1690;
