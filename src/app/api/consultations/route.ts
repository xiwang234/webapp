import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { mockDbService } from '@/lib/mockDb';
import { z } from 'zod';

const consultationSchema = z.object({
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  birthTime: z.string().regex(/^\d{2}:\d{2}$/),
  timezone: z.string(),
  scene: z.string(),
  efficiencyScore: z.number().optional(),
  riskIndex: z.number().optional(),
  timelineData: z.any().optional(),
  summary: z.string().optional(),
  actionSteps: z.array(z.string()).optional(),
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

    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    const scene = searchParams.get('scene') || undefined;

    const result = await mockDbService.consultations.list(session.user.id, {
      limit,
      offset,
      scene,
    });

    return NextResponse.json({
      consultations: result.data.map((c) => ({
        id: c.id,
        birthDate: c.birth_date,
        birthTime: c.birth_time,
        timezone: c.timezone,
        scene: c.scene,
        efficiencyScore: c.efficiency_score,
        riskIndex: c.risk_index,
        summary: c.summary,
        createdAt: c.created_at,
      })),
      total: result.total,
    });
  } catch (error) {
    console.error('Error fetching consultations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/consultations - Create a new consultation
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

    const data = await mockDbService.consultations.create(session.user.id, {
      birth_date: validatedData.birthDate,
      birth_time: validatedData.birthTime,
      timezone: validatedData.timezone,
      scene: validatedData.scene,
      efficiency_score: validatedData.efficiencyScore,
      risk_index: validatedData.riskIndex,
      timeline_data: validatedData.timelineData,
      summary: validatedData.summary,
      action_steps: validatedData.actionSteps,
    });

    return NextResponse.json({
      consultation: {
        id: data.id,
        birthDate: data.birth_date,
        birthTime: data.birth_time,
        timezone: data.timezone,
        scene: data.scene,
        efficiencyScore: data.efficiency_score,
        riskIndex: data.risk_index,
        timelineData: data.timeline_data,
        summary: data.summary,
        actionSteps: data.action_steps,
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
