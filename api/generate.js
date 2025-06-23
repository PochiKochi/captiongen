
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "No prompt provided" });
  }

  try {
    const response = await fetch("https://api.cohere.ai/v1/generate", {
      method: "POST",
      headers: {
        Authorization: "Bearer CYP9IcVYunwiVKldGpKhWCrgDKMm6QMoqqanBd5t",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command",
        prompt: `Write a catchy Instagram caption for: ${prompt}`,
        max_tokens: 50,
        temperature: 0.8,
      }),
    });

    const data = await response.json();

    if (data.generations && data.generations.length > 0) {
      res.status(200).json({ caption: data.generations[0].text.trim() });
    } else {
      res.status(500).json({ error: "AI response was empty" });
    }
  } catch (err) {
    res.status(500).json({ error: "Something went wrong", details: err.message });
  }
}
