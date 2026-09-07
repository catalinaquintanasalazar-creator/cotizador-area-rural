import express from "express";
import dotenv from "dotenv";
import Anthropic from "@anthropic-ai/sdk";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

app.post("/api/sugerir", async (req, res) => {
  try {
    const { systemPrompt, userPrompt } = req.body;

    const message = await anthropic.messages.create({
      model: "claude-opus-5",
      max_tokens: 8000,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    const texto = message.content
      .filter((bloque) => bloque.type === "text")
      .map((bloque) => bloque.text)
      .join("");

    res.json({ texto });
  } catch (error) {
    console.error("Error con Claude:", error);
    res.status(500).json({
      error: "No fue posible obtener una respuesta de Claude.",
    });
  }
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "dist")));

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});


app.listen(PORT, () => {
  console.log(`Servidor Claude funcionando en http://localhost:${PORT}`);
});
