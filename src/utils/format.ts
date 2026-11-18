// Shows a number as a South African Rand price, e.g. 120 -> "R120.00".
export function formatPrice(value: number | string): string {
  return `R${Number(value).toFixed(2)}`;
}

// "1 menu item" / "3 menu items"
export function formatItemCount(count: number): string {
  return count === 1 ? '1 menu item' : `${count} menu items`;
}
