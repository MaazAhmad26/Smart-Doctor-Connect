import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export const suggestSpecialization = async (symptoms: string) => {
  const prompt = `A patient describes their symptoms as: "${symptoms}". 
  Based on these symptoms, suggest the most relevant medical doctor specialization (e.g., Cardiologist, Orthopedic, Dermatologist, etc.) from standard medical practices.
  Respond ONLY with a JSON object in this format: { "specialization": "Doctor Title", "reason": "Short explanation" }`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            specialization: { type: Type.STRING },
            reason: { type: Type.STRING }
          },
          required: ["specialization", "reason"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Suggestion Error:", error);
    return null;
  }
};

export const getAIChatResponse = async (
  doctorName: string, 
  doctorSpecialization: string, 
  message: string, 
  history: { sender: string, text: string }[] = []
) => {
  const systemInstruction = `You are an AI assistant for ${doctorName}, a ${doctorSpecialization} specialization doctor. 
  The doctor is currently unavailable. Your goal is to:
  1. Greet the patient politely.
  2. Acknowledge their concern.
  3. Reassure them that the doctor will follow up soon.
  4. Collect basic details if not provided: their name, contact, and specific problem.
  Keep responses short, professional, and compassionate.`;

  try {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction,
      }
    });

    // Start with history if any, but simplified for the SDK
    const response = await chat.sendMessage({
      message: message,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm sorry, I'm having trouble connecting to the system. Please try again later or contact the clinic directly.";
  }
};
