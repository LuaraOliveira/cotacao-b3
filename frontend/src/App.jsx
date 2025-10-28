import React, { useState } from "react";
import { fetchQuotes } from "./api";
import MultiLineChart from "./components/MultiLineChart";

export default function App() {
  const [symbols, setSymbols] = useState("PETR4,VALE3");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await fetchQuotes(symbols, start, end);
      setResult(data);
    } catch (err) {
      alert("Erro ao buscar cotações. Veja console.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Consulta de Cotações B3</h1>

        <form className="flex flex-col gap-3 mb-4" onSubmit={handleSubmit}>
          <label className="flex flex-col">
            <span className="text-sm">Ativos (ex: PETR4,VALE3)</span>
            <input className="border rounded p-2 mt-1" value={symbols} onChange={e => setSymbols(e.target.value)} />
          </label>

          <div className="flex gap-2">
            <label className="flex-1 flex flex-col">
              <span className="text-sm">Data início</span>
              <input type="date" className="border rounded p-2 mt-1" value={start} onChange={e => setStart(e.target.value)} />
            </label>

            <label className="flex-1 flex flex-col">
              <span className="text-sm">Data fim</span>
              <input type="date" className="border rounded p-2 mt-1" value={end} onChange={e => setEnd(e.target.value)} />
            </label>
          </div>

          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
              {loading ? "Carregando..." : "Consultar"}
            </button>
            <button type="button" className="bg-gray-200 px-4 py-2 rounded" onClick={() => { setSymbols(""); setStart(""); setEnd(""); setResult(null); }}>
              Limpar
            </button>
          </div>
        </form>

        <div>
          {result ? (
            <>
              <div className="mb-2 text-sm text-gray-600">
                Fonte: Yahoo Finance. {result.fromCache ? "Dados servidos do cache." : "Consulta realizada na API externa."}
              </div>
              <MultiLineChart data={result.data} />
            </>
          ) : (
            <div className="text-sm text-gray-500">Preencha o formulário e clique em "Consultar".</div>
          )}
        </div>
      </div>
    </div>
  );
}
