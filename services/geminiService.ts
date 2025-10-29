import { GoogleGenAI, Modality, Part } from "@google/genai";

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateImage = async (imagePart: Part, textPrompt: string): Promise<string> => {
  if (!textPrompt) {
      throw new Error("A text prompt is required to edit the image.");
  }
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          imagePart,
          { text: textPrompt },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    
    const safetyFeedback = response.candidates?.[0]?.safetyRatings;
    if (safetyFeedback?.length) {
        const blockedCategories = safetyFeedback
            .filter(rating => rating.blocked)
            .map(rating => rating.category)
            .join(', ');
        if (blockedCategories) {
            throw new Error(`Request blocked due to safety concerns: ${blockedCategories}. Please revise your prompt.`);
        }
    }

    throw new Error("No image data found in the response from Gemini API.");
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while generating the image.");
  }
};