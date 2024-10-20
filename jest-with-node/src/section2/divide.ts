export class ZeroDivisorError extends Error {}

export function divide(dividend: number, divisor: number) {
  if (divisor === 0) throw new ZeroDivisorError("Can not divide to 0");
  return dividend / divisor;
}
