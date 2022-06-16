export function toInt(data: number | string): number {
  return typeof data === 'number' ? data : parseInt(data);
}
