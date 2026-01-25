import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { mockDbService } from '@/lib/mockDb';

// GET /api/consultations/[id] - Get a specific consultation
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await mockDbService.consultations.get(params.id, session.user.id);

    if (!data) {
      return NextResponse.json(
        { error: 'Consultation not found' },
        { status: 404 }
      );
    }

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
    console.error('Error fetching consultation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/consultations/[id] - Delete a consultation
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const success = await mockDbService.consultations.delete(params.id, session.user.id);

    if (!success) {
      return NextResponse.json(
        { error: 'Consultation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting consultation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
