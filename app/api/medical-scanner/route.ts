import { NextRequest, NextResponse } from 'next/server';
import { analyzeMedicalScan } from '@/lib/medgemma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { scanType, imageData, textData } = body;

    if (!scanType) {
      return NextResponse.json(
        { error: 'Scan type is required' },
        { status: 400 }
      );
    }

    console.log(`Analyzing ${scanType} scan with MedGemma...`);

    // Call MedGemma AI for analysis
    const analysis = await analyzeMedicalScan(scanType, imageData, textData);

    return NextResponse.json({
      success: true,
      analysis,
      timestamp: new Date().toISOString(),
      model: 'MedGemma-4B-IT',
    });
  } catch (error) {
    console.error('Error in medical scanner API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to analyze medical scan',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
