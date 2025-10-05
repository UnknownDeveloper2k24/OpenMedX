import { NextRequest, NextResponse } from 'next/server';
import { analyzeResearchData } from '@/lib/medgemma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studyTitle, studyDescription, participantData } = body;

    if (!studyTitle || !studyDescription) {
      return NextResponse.json(
        { error: 'Study title and description are required' },
        { status: 400 }
      );
    }

    console.log(`Analyzing research study with MedGemma: ${studyTitle}`);

    // Call MedGemma AI for research analysis
    const analysis = await analyzeResearchData(
      studyTitle,
      studyDescription,
      participantData
    );

    return NextResponse.json({
      success: true,
      analysis,
      timestamp: new Date().toISOString(),
      model: 'MedGemma-4B-IT',
    });
  } catch (error) {
    console.error('Error in research analysis API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to analyze research data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
