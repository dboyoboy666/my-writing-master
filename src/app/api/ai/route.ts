import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt, stage } = await request.json();

    const apiKey = process.env.BAILIAN_API_KEY;
    const model = process.env.NEXT_PUBLIC_CLAUDE_MODEL || 'qwen-plus';

    if (!apiKey) {
      console.error('BAILIAN_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const response = await fetch(
      'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          input: {
            messages: [{
              role: 'user',
              content: prompt
            }]
          },
          parameters: {
            max_tokens: 1024,
            temperature: 0.7,
            result_format: 'text'
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || 'API request failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      content: data.output.choices[0].message.content,
    });

  } catch (error) {
    console.error('AI API proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}