/** Rs. 5,500 — the format the brand uses on Instagram. */
export function formatPkr(amount: number): string {
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}
