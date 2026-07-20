import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  // Set CORS headers for Vercel
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

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

    const lastMessage = messages[messages.length - 1]?.content || "";
    const msgLower = lastMessage.toLowerCase();

    // Static mock reply generator in case of complete service failure (bypasses 404 or server downtime)
    const getMockReply = () => {
      if (msgLower.includes("ciao") || msgLower.includes("hello") || msgLower.includes("salve")) {
        return "Benvenuto nello Studio Elena Angelini. Sono l'Assistente Virtuale di Criminologia e Scienze Forensi. Come posso aiutarla oggi riguardo al suo caso o a quesiti tecnici?";
      } else if (msgLower.includes("fora") || msgLower.includes("software") || msgLower.includes("3d")) {
        return "Il software FORA (Forensic Open Reconstruction) è la nostra piattaforma di eccellenza open-source. Permette la ricostruzione tridimensionale millimetrica della scena del crimine, l'analisi vettoriale delle traiettorie balistiche e la simulazione dinamica dei fluidi biologici.";
      } else if (msgLower.includes("costo") || msgLower.includes("prezzo") || msgLower.includes("gratis") || msgLower.includes("free")) {
        return "Lo Studio Elena Angelini offre il primo colloquio telefonico conoscitivo in modo completamente gratuito e coperto dal segreto professionale. Ogni indagine successiva viene preventivata in modo trasparente e personalizzato.";
      } else {
        return `Grazie per aver contattato lo Studio Criminalistica Elena Angelini. In merito al suo messaggio: "${lastMessage}", il nostro team di specialisti (criminologi, giuristi e ingegneri forensi) è pronto ad esaminare gli atti. Le consigliamo di prenotare una consulenza gratuita telefonica tramite il nostro modulo online per discutere dei dettagli in massima riservatezza.`;
      }
    };

    let replyText = "";
    let success = false;

    // Tier 1: Try GROQ using GROQ_API_KEY
    let groqApiKey = process.env.GROQ_API_KEY || process.env["GROQ_API_ KEY"] || process.env.GROQ_APY_KEY || process.env["GROQ_APY_ KEY"];

    if (groqApiKey) {
      const cleanKey = groqApiKey.replace(/^['"]|['"]$/g, "").trim();
      if (cleanKey) {
        try {
          console.log("Vercel Function: Attempting GROQ API chat completion...");
          const formattedMessages = [
            { role: "system", content: systemInstruction },
            ...messages.map((m: any) => ({
              role: m.role === "assistant" ? "assistant" : "user",
              content: m.content
            }))
          ];

          const modelsToTry = [
            "llama-3.3-70b-versatile",
            "llama-3.1-70b-versatile",
            "llama3-70b-8192",
            "mixtral-8x7b-32768"
          ];

          let groqResponse = null;
          let lastGroqError = "";

          for (const modelName of modelsToTry) {
            try {
              const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${cleanKey}`
                },
                body: JSON.stringify({
                  model: modelName,
                  messages: formattedMessages,
                  temperature: 0.7,
                  max_tokens: 1024
                })
              });

              if (response.ok) {
                groqResponse = await response.json();
                break;
              } else {
                const errBody = await response.text();
                lastGroqError = `HTTP ${response.status} - ${errBody}`;
                if (response.status === 401) {
                  break;
                }
              }
            } catch (err: any) {
              lastGroqError = err.message || String(err);
            }
          }

          if (groqResponse && groqResponse.choices && groqResponse.choices[0] && groqResponse.choices[0].message) {
            replyText = groqResponse.choices[0].message.content;
            success = true;
          } else {
            throw new Error(lastGroqError || "No successful response from Groq models");
          }
        } catch (groqError: any) {
          console.error("Vercel Function: GROQ API Failed:", groqError.message || groqError);
        }
      }
    }

    // Tier 2: Try Gemini API as fallback
    if (!success) {
      let geminiApiKey = process.env.GEMINI_API_KEY;
      if (geminiApiKey) {
        const cleanGeminiKey = geminiApiKey.replace(/^['"]|['"]$/g, "").trim();
        if (cleanGeminiKey) {
          try {
            console.log("Vercel Function: Attempting Gemini API as fallback...");
            const ai = new GoogleGenAI({
              apiKey: cleanGeminiKey,
              httpOptions: {
                headers: {
                  'User-Agent': 'aistudio-build',
                }
              }
            });

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

            if (response.text) {
              replyText = response.text;
              success = true;
            }
          } catch (geminiError: any) {
            console.error("Vercel Function: Gemini API Fallback Failed:", geminiError.message || geminiError);
          }
        }
      }
    }

    // Tier 3: Pure local mock
    if (!success) {
      console.log("Vercel Function: Using static mock fallback...");
      replyText = getMockReply();
    }

    return res.status(200).json({ reply: replyText });
  } catch (error: any) {
    console.error("Vercel Function: Critical Chat Proxy Error:", error);
    return res.status(200).json({ 
      reply: `Spiacenti, si è verificato un errore temporaneo nel sistema di comunicazione sicura dello studio. Dettagli errore: ${error.message || error}` 
    });
  }
}
