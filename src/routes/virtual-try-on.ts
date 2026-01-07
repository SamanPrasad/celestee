import axios from "axios";
import Router from "express";
const router = Router();

router.post("/", async (req, res) => {
  try {
    const { person, outfit } = req.body;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: "Missing Gemini API key" });
    }

    if (!person || !outfit) {
      return res.status(400).json({ error: "Missing images" });
    }

    const body = {
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: person,
              },
            },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: outfit,
              },
            },
            {
              text: `Generate a photorealistic image where the person in the first image is wearing the exact outfit from the second image. 
     Preserve the original outfit color, shade, pattern, texture, fabric, logos, and design details exactly as shown in the second image. 
     Do not alter, reinterpret, stylize, enhance, recolor, or substitute the outfit in any way. 
     Only change the fit to match the person’s body while keeping the outfit visually identical.`,
            },
          ],
        },
      ],
      generationConfig: {
        responseModalities: ["IMAGE"],
        imageConfig: {
          aspectRatio: "1:1",
        },
      },
    };

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent",
      body,
      {
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": GEMINI_API_KEY,
        },
        timeout: 600_000, // 600 seconds (same as your PHP code)
      }
    );

    const data =
      response.data["candidates"][0]["content"]["parts"][0]["inlineData"][
        "data"
      ] ?? null;

    res.json({
      success: data ? true : false,
      data,
    });
  } catch (error: any) {
    console.error("Gemini API error:", error.response?.data || error.message);

    res.status(500).json({
      error: "Image generation failed",
      details: error.response?.data || error.message,
    });
  }
});

export default router;
