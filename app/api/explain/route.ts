import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(request: NextRequest) {
  try {
    const { code, language } = await request.json()

    if (!code || !language) {
      return NextResponse.json(
        { error: 'Code and language are required' },
        { status: 400 }
      )
    }

    // Check for API key
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey || apiKey === 'your_api_key_here') {
      return NextResponse.json(
        {
          error: 'Gemini API key not configured. Please add your API key to .env.local file.'
        },
        { status: 500 }
      )
    }

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(apiKey)

    // List of models to try in order of preference
    // Using newer models like 2.0-flash and latest aliases for better compatibility
    const modelsToTry = [
      'gemini-flash-latest',
      'gemini-2.0-flash',
      'gemini-1.5-flash',
      'gemini-pro-latest',
      'gemini-1.5-pro',
      'gemini-pro'
    ]

    let model
    let result
    let lastError

    // Try to get a comprehensive response using available models
    for (const modelName of modelsToTry) {
      try {
        console.log(`Attempting to use model: ${modelName}`)
        model = genAI.getGenerativeModel({ model: modelName })

        // Create structured prompt for code explanation
        const prompt = `You are an expert code explainer. Analyze the following ${language} code and provide a detailed explanation in JSON format.

Code to analyze:
\`\`\`${language}
${code}
\`\`\`

Please provide your response in the following JSON structure:
{
  "overview": "A brief 2-3 sentence overview of what this code does and its purpose",
  "logic": [
    "Step 1: Detailed explanation of the first logical step",
    "Step 2: Detailed explanation of the second logical step",
    "Continue with more steps as needed..."
  ],
  "complexity": {
    "time": "Time complexity in Big O notation (e.g., O(n), O(log n), O(n^2))",
    "space": "Space complexity in Big O notation"
  },
  "improvements": [
    "Specific improvement suggestion 1",
    "Specific improvement suggestion 2",
    "Continue with more suggestions as needed..."
  ]
}

Important guidelines:
- Provide clear, beginner-friendly explanations
- Break down the logic into numbered steps that follow the code's execution flow
- Be specific about complexity analysis
- Suggest practical, actionable improvements
- If the code is already optimal, you can provide fewer improvement suggestions or mention that it's well-written
- Return ONLY valid JSON, no additional text or markdown formatting`

        // Call Gemini API
        result = await model.generateContent(prompt)
        console.log(`Successfully generated content with model: ${modelName}`)
        break // Stop if successful
      } catch (error: any) {
        console.warn(`Failed to generate content with model ${modelName}:`, error.message)
        lastError = error
        // Continue to next model
      }
    }

    if (!result) {
      throw lastError || new Error('All models failed to generate content')
    }

    const response = await result.response
    const text = response.text()

    // Parse the JSON response
    let explanation
    try {
      // Try to extract JSON from the response (in case it's wrapped in markdown)
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        explanation = JSON.parse(jsonMatch[0])
      } else {
        explanation = JSON.parse(text)
      }

      // Validate the structure
      if (!explanation.overview || !explanation.logic || !explanation.complexity || !explanation.improvements) {
        throw new Error('Invalid response structure')
      }
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', parseError)
      console.error('Raw response:', text)

      // Fallback: create a basic explanation from the text
      explanation = {
        overview: text.substring(0, 200) + '...',
        logic: ['Unable to parse structured response. Please try again.'],
        complexity: {
          time: 'Unable to determine',
          space: 'Unable to determine'
        },
        improvements: ['Please try submitting the code again for a detailed analysis.']
      }
    }

    return NextResponse.json({ explanation })
  } catch (error: any) {
    console.error('Error in explain API:', error)

    // Handle specific error types
    if (error.message?.includes('API key')) {
      return NextResponse.json(
        { error: 'Invalid API key. Please check your Gemini API configuration.' },
        { status: 401 }
      )
    }

    if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
      return NextResponse.json(
        { error: 'API rate limit exceeded. Please try again in a few moments.' },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to explain code. Please try again.' },
      { status: 500 }
    )
  }
}
