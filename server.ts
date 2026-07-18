import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: chat proxy to Gemini
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Fallback for demo when API key is not configured yet
        const lastMessage = messages[messages.length - 1]?.content || "";
        let mockReply = "";
        const msgLower = lastMessage.toLowerCase();
        
        if (msgLower.includes("ciao") || msgLower.includes("hello") || msgLower.includes("salve")) {
          mockReply = "Benvenuto nello Studio Elena Angelini. Sono l'Assistente Virtuale di Criminologia e Scienze Forensi. Come posso aiutarla oggi riguardo al suo caso o a quesiti tecnici?";
        } else if (msgLower.includes("fora") || msgLower.includes("software") || msgLower.includes("3d")) {
          mockReply = "Il software FORA (Forensic Open Reconstruction) è la nostra piattaforma di eccellenza open-source. Permette la ricostruzione tridimensionale millimetrica della scena del crimine, l'analisi vettoriale delle traiettorie balistiche e la simulazione dinamica dei fluidi biologici.";
        } else if (msgLower.includes("costo") || msgLower.includes("prezzo") || msgLower.includes("gratis") || msgLower.includes("free")) {
          mockReply = "Lo Studio Elena Angelini offre il primo colloquio telefonico conoscitivo in modo completamente gratuito e coperto dal segreto professionale. Ogni indagine successiva viene preventivata in modo trasparente e personalizzato.";
        } else {
          mockReply = `Grazie per aver contattato lo Studio Criminalistica Elena Angelini. In merito al suo messaggio: "${lastMessage}", il nostro team di specialisti (criminologi, giuristi e ingegneri forensi) è pronto ad esaminare gli atti. Le consigliamo di prenotare una consulenza gratuita telefonica tramite il nostro modulo online per discutere dei dettagli in massima riservatezza.`;
        }
        return res.json({ reply: mockReply });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // System prompt in multiple languages
      const systemInstruction = `
You are the Virtual Forensic Assistant of "Studio Elena Angelini" (based in Rimini, Italy), specializing in Criminology, Criminalistics, and Forensic Sciences.
Your tone must be highly professional, serious, empathetic, objective, and deeply scientific. Avoid any casual or overly conversational slang. Speak like an expert criminologist and crime scene reconstruction specialist.

Context about the Studio:
- Founded by Elena Angelini, criminologist and expert.
- Major tools include FORA (Forensic Open Reconstruction), an open-source 3D spatial reconstruction software to recreate crime scenes, analyze ballistic trajectories, and model biological fluids.
- Services: Defensive crime investigations (profiling, crime scene analysis), Suspicious deaths (investigating suicides/accidents that look like homicide, psychological autopsy), Employment law (mobbing, bossing, straining), and Geographical criminological mapping.
- Studio provides a free initial telephone consultation.
- Strict confidentiality under professional and judicial secrecy (Art. 200 of Italian Criminal Procedure Code).

Instructions:
1. Always offer helpful and scientifically grounded information on forensics, profiling, and criminalistics.
2. Politely encourage the user to book a free preliminary phone consultation for specific case evaluations.
3. Keep answers relatively concise but structured.
4. Reply in the same language as the user's message (support Italian, English, Spanish, French, German, Portuguese, Romanian, Polish, Dutch, Turkish, Russian, Arabic, Hindi, Albanian, Chinese, Japanese, etc.).
`;

      // Format the conversation log for the model
      let promptText = "";
      messages.forEach((msg: any) => {
        const roleName = msg.role === "user" ? "Utente" : "Assistente Forense";
        promptText += `${roleName}: ${msg.content}\n`;
      });
      promptText += "Assistente Forense:";

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: promptText,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text || "Non ho potuto elaborare una risposta. La preghiamo di riprovare o contattare direttamente lo studio.";
      res.json({ reply });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  });

  // Serve static files in production / Vite middleware in dev
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
