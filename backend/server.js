import express from "express";
import cors from "cors";
import { getQuotes } from "./services/quotesService.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/quotes", async (req, res) => {
  try {
    const { symbols, start, end } = req.query;
    if (!symbols || !start || !end) {
      return res.status(400).json({ error: "Missing parameters. Use symbols, start, end." });
    }

    const list = symbols.split(",").map(s => s.trim().toUpperCase());
    const data = await getQuotes(list, start, end);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching quotes" });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`✅ Backend running on http://localhost:${port}`));
