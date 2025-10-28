import axios from "axios";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 60 * 60 }); // 1 hour TTL

function toUnixSeconds(dateStr) {
  return Math.floor(new Date(dateStr + "T00:00:00").getTime() / 1000);
}

export async function getQuotes(symbols, start, end) {
  const cacheKey = `${symbols.join(",")}-${start}-${end}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    return { fromCache: true, data: cached };
  }

  const period1 = toUnixSeconds(start);
  // Yahoo API expects period2 to be later than the last needed date; add one day to include end
  const period2 = Math.floor(new Date(end + "T00:00:00").getTime() / 1000) + 24*3600;

  const results = {};

  for (const rawSymbol of symbols) {
    // Yahoo uses BR stock tickers with .SA suffix (e.g., PETR4.SA)
    const symbol = rawSymbol.includes(".") ? rawSymbol : `${rawSymbol}.SA`;
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${period1}&period2=${period2}&interval=1d`;
    try {
      const resp = await axios.get(url, { timeout: 15000 });
      const chart = resp.data.chart;
      if (!chart || !chart.result || !chart.result[0]) {
        results[rawSymbol] = [];
        continue;
      }
      const r = chart.result[0];
      const timestamps = r.timestamp || [];
      const closes = (r.indicators && r.indicators.quote && r.indicators.quote[0] && r.indicators.quote[0].close) || [];
      const rows = timestamps.map((t, i) => {
        const date = new Date(t * 1000).toISOString().split("T")[0];
        const close = closes[i] === null ? null : Number(closes[i].toFixed ? closes[i].toFixed(2) : closes[i]);
        return { date, close };
      });
      results[rawSymbol] = rows;
    } catch (err) {
      console.error("Error fetching", symbol, err.message || err);
      results[rawSymbol] = [];
    }
  }

  cache.set(cacheKey, results);
  return { fromCache: false, data: results };
}
