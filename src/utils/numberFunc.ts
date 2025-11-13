export const converToFloatingFormat = (num: number): string => {
  if (typeof num !== 'number' || isNaN(num)) return '0';
  const numWithComma = Number(num).toFixed(2).toString().replace('.', ',');
  const parts = numWithComma.split(',');
  const integerPart = parts[0];
  const decimalPart = parts[1];
  const withSpaces = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return num !== Math.floor(num) ? `${withSpaces},${decimalPart}` : withSpaces;
};
