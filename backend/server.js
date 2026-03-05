require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");


const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hola Mundo desde Express 👋" });
});

app.get("/api/db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() as now");
    res.json({ message: "Hola desde PostgreSQL ✅", now: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error consultando PostgreSQL" });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend escuchando en http://localhost:${port}`));
