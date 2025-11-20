import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateTutorResponse = async (
  history: { role: 'user' | 'model'; text: string }[],
  currentSlideContext: string
): Promise<string> => {
  if (!apiKey) return "API Key is missing. Please configure the environment.";

  const systemInstruction = `
    You are a friendly and encouraging Finnish language tutor named "Aino".
    
    Current Lesson Context:
    ${currentSlideContext}

    Your goal is to help the student understand the specific topic of the current slide.
    - If they ask for pronunciation, explain it phonetically.
    - If they ask for examples, give simple ones relevant to the slide.
    - Keep answers concise (under 100 words) unless asked for more detail.
    - Use emojis occasionally to be friendly 🇫🇮.
    - Correct their Finnish gently if they try to speak it.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      })),
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "Anteeksi, I couldn't think of a response right now.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the Finnish language database right now.";
  }
};