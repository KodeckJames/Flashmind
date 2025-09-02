// app/api/generate-flashcards/route.ts
import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that creates educational flashcards. 
          Generate flashcards from the given text. Return a JSON array of objects, 
          each with 'question' and 'answer' fields. Make 5-10 flashcards that cover 
          the key concepts from the text. Focus on important facts, definitions, 
          and concepts that would be useful for studying.`
        },
        {
          role: 'user',
          content: `Create flashcards from this text: ${text}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const content = response.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content generated');
    }

    // Parse the JSON response
    let flashcards;
    try {
      // Extract JSON from the response (in case there's additional text)
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      const jsonString = jsonMatch ? jsonMatch[0] : content;
      flashcards = JSON.parse(jsonString);
    } catch (parseError) {
      // If parsing fails, try to create a structured response
      flashcards = [
        {
          question: "Generated from AI",
          answer: content
        }
      ];
    }

    return NextResponse.json({ flashcards });
  } catch (error) {
    console.error('Error generating flashcards:', error);
    return NextResponse.json(
      { error: 'Failed to generate flashcards' },
      { status: 500 }
    );
  }
}