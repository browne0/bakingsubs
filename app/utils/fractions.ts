export interface FractionOption {
  value: number;
  label: string;
}

export const COMMON_FRACTIONS: FractionOption[] = [
  { value: 0.0625, label: '1/16' },
  { value: 0.125, label: '⅛' },
  { value: 0.25, label: '¼' },
  { value: 0.333, label: '⅓' },
  { value: 0.375, label: '⅜' },
  { value: 0.5, label: '½' },
  { value: 0.666, label: '⅔' },
  { value: 0.75, label: '¾' },
  { value: 0.875, label: '⅞' },
  { value: 1, label: '1' },
  { value: 1.25, label: '1¼' },
  { value: 1.5, label: '1½' },
  { value: 1.75, label: '1¾' },
  { value: 2, label: '2' },
  { value: 2.5, label: '2½' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
];

export function decimalToFraction(decimal: number): string {
  const exactMatch = COMMON_FRACTIONS.find((f) => f.value === decimal);
  if (exactMatch) return exactMatch.label;

  // For numbers greater than those in our common fractions
  const wholeNumber = Math.floor(decimal);
  const fraction = decimal - wholeNumber;

  if (fraction === 0) return wholeNumber.toString();

  const closestFraction = COMMON_FRACTIONS.find((f) => f.value === fraction);
  if (closestFraction) {
    return wholeNumber > 0 ? `${wholeNumber}${closestFraction.label}` : closestFraction.label;
  }

  // If no exact match found, return the decimal
  return decimal.toString();
}
