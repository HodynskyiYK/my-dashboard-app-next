// formatCurrency(12345) => "$123.45"
export function formatCurrency(amount: number) {
  
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount / 100);
}