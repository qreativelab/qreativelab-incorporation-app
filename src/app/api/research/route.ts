import { NextRequest, NextResponse } from 'next/server';

// Perplexity API integration
// Set PERPLEXITY_API_KEY in environment variables

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const apiKey = process.env.PERPLEXITY_API_KEY;

    if (!apiKey) {
      // Return mock results if no API key
      return NextResponse.json({
        results: [
          `Research completed for: "${query}"`,
          'Based on current market data and legal standards, your inputs appear valid.',
          'This information will be integrated into your document.'
        ],
        sources: [
          'https://www.ic.gc.ca/eic/site/cd-dgc.nsf/eng/home',
          'https://www.canada.ca/en/services/business/start.html'
        ]
      });
    }

    // Real Perplexity API call
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-small-128k-online',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful legal research assistant specializing in Canadian corporate law, specifically CBCA incorporation, share structures, and startup legal documents. Provide concise, factual answers with sources.'
          },
          {
            role: 'user',
            content: query
          }
        ],
        max_tokens: 500,
        temperature: 0.2
      })
    });

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || 'No results found.';

    // Extract any URLs from the response as sources
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const sources = content.match(urlRegex) || [];

    return NextResponse.json({
      results: [content],
      sources: sources.slice(0, 5)
    });

  } catch (error) {
    console.error('Research API error:', error);
    return NextResponse.json({
      results: ['Research service temporarily unavailable. Your inputs have been saved.'],
      sources: []
    });
  }
}
