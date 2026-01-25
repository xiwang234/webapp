import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { z } from 'zod';

const consultationSchema = z.object({
  birthDate: z.string(),
  birthTime: z.string(),
  timezone: z.string(),
  scenario: z.enum(['investment', 'career', 'negotiation', 'timing']),
  eventContext: z.object({
    description: z.string(),
    additionalDetails: z.string().optional(),
  }).optional(),
  efficiencyScore: z.number(),
  riskIndex: z.number(),
  timelineData: z.any(),
  executiveSummary: z.string(),
  actionableSteps: z.array(z.any()),
  calculationResult: z.any().optional(),
  geminiResponse: z.any().optional(),
});

// GET /api/consultations - Fetch user's consultation history
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const scenario = searchParams.get('scenario');

    let query = supabaseAdmin
      .from('consultations')
      .select('*', { count: 'exact' })
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (scenario) {
      query = query.eq('scenario', scenario);
    }

    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    return NextResponse.json({
      consultations: data.map((c) => ({
        id: c.id,
        birthDate: c.birth_date,
        birthTime: c.birth_time,
        timezone: c.timezone,
        scenario: c.scenario,
        eventContext: c.event_context,
        efficiencyScore: c.efficiency_score,
        riskIndex: c.risk_index,
        timelineData: c.timeline_data,
        executiveSummary: c.executive_summary,
        actionableSteps: c.actionable_steps,
        createdAt: c.created_at,
      })),
      total: count,
    });
  } catch (error) {
    console.error('Error fetching consultations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/consultations - Create new consultation record
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = consultationSchema.parse(body);

    const { data, error } = await supabaseAdmin
      .from('consultations')
      .insert({
        user_id: session.user.id,
        birth_date: validatedData.birthDate,
        birth_time: validatedData.birthTime,
        timezone: validatedData.timezone,
        scenario: validatedData.scenario,
        event_context: validatedData.eventContext,
        efficiency_score: validatedData.efficiencyScore,
        risk_index: validatedData.riskIndex,
        timeline_data: validatedData.timelineData,
        executive_summary: validatedData.executiveSummary,
        actionable_steps: validatedData.actionableSteps,
        calculation_result: validatedData.calculationResult,
        gemini_response: validatedData.geminiResponse,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      consultation: {
        id: data.id,
        createdAt: data.created_at,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid consultation data', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error creating consultation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
