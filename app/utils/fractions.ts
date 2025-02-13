export interface FractionOption {
  value: number;
  label: string;
}

export const COMMON_FRACTIONS: FractionOption[] = [
  { value: 0.0625, label: '1/16' },
  { value: 0.125, label: '1/8' },
  { value: 0.25, label: '1/4' },
  { value: 0.333, label: '1/3' },
  { value: 0.375, label: '3/8' },
  { value: 0.5, label: '1/2' },
  { value: 0.666, label: '2/3' },
  { value: 0.75, label: '3/4' },
  { value: 0.875, label: '7/8' },
  { value: 1, label: '1' },
  { value: 1.25, label: '1 1/4' },
  { value: 1.5, label: '1 1/2' },
  { value: 1.75, label: '1 3/4' },
  { value: 2, label: '2' },
  { value: 2.5, label: '2 1/2' },
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
