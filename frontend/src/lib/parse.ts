export function parseNumbers(input: string): { ok: true; value: number[] } | { ok: false; error: string } {
  const raw = input
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  if (raw.length === 0) return { ok: false, error: "Ingresá al menos un número." };

  const nums: number[] = [];
  for (const token of raw) {
    if (/^-?\d+$/.test(token) === false) {
      return { ok: false, error: `Valor inválido: "${token}". Usá enteros separados por comas.` };
    }
    nums.push(Number(token));
  }
  return { ok: true, value: nums };
}
