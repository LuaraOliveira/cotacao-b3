export async function fetchQuotes(symbols, start, end) {
  const params = new URLSearchParams({ symbols, start, end });
  const res = await fetch(`http://localhost:3001/api/quotes?${params.toString()}`);
  if (!res.ok) throw new Error('Erro na requisição');
  return res.json();
}
