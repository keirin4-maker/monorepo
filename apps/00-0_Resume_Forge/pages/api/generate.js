import { OpenAI } from "openai";
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 1. Secure the endpoint: Check if user is logged in
  const supabase = createPagesServerClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { prompt, type } = req.body;

  // 2. Construct the AI Prompt
  let systemInstruction = "You are a helpful, expert professional resume writer. You rewrite text to be concise, action-oriented, and impactful.";
  let userPrompt = "";

  if (type === 'improve') {
    userPrompt = `Rewrite the following resume bullet point to be more professional and results-driven. Use active voice. \n\nOriginal text: "${prompt}"`;
  } else {
    return res.status(400).json({ error: 'Invalid generation type' });
  }

  try {
    // 3. Call OpenAI
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: userPrompt }
      ],
      model: "gpt-3.5-turbo", // Efficient and fast for this task
      max_tokens: 150,
      temperature: 0.7,
    });

    const suggestion = completion.choices[0].message.content.trim();
    
    // 4. Remove surrounding quotes if the AI added them
    const cleanSuggestion = suggestion.replace(/^["']|["']$/g, '');

    res.status(200).json({ suggestion: cleanSuggestion });

  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ error: 'Error generating text' });
  }
}