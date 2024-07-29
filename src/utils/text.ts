export const formatPrice = (price: string) => {
  if (!price) return "0";
  return parseFloat(parseFloat(price).toFixed(2)).toLocaleString();
};
