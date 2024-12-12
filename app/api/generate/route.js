import fetch from 'node-fetch';

export async function POST(req) {
  const { prompt } = await req.json();

  // Ensure prompt is provided
  if (!prompt) {
    return new Response(JSON.stringify({ error: "Prompt is required" }), { status: 400 });
  }

  try {
    const apiKey = process.env.GENERATIVE_API_KEY; // Use your API key from environment variables

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + apiKey, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt,
          }],
        }],
      }),
    });

    console.log("Response Status:", response.status);  // Log status code
    const textResponse = await response.text();  // Read response as text
    console.log("Response Body:", textResponse);  // Log raw response body

    if (!response.ok) {
      return new Response(JSON.stringify({ error: textResponse || "Unknown error occurred" }), { status: response.status });
    }

    const data = JSON.parse(textResponse);  // Now safely parse the response body as JSON
    console.log("Parsed Data:", data); // Log parsed data to verify structure

    // Extract the generated content from the API response
    const generatedContent = data.candidates[0]?.content?.parts[0]?.text || "No response from the model.";

    return new Response(JSON.stringify({ story: generatedContent }), { status: 200 });

  } catch (error) {
    console.error("Error during API request:", error);
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), { status: 500 });
  }
}
