import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

// GET /api/consultations/[id] - Fetch single consultation
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

    const { data, error } = await supabaseAdmin
      .from('consultations')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', session.user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Consultation not found' },
          { status: 404 }
        );
      }
      throw error;
    }

    return NextResponse.json({
      consultation: {
        id: data.id,
        birthDate: data.birth_date,
        birthTime: data.birth_time,
        timezone: data.timezone,
        scenario: data.scenario,
        eventContext: data.event_context,
        efficiencyScore: data.efficiency_score,
        riskIndex: data.risk_index,
        timelineData: data.timeline_data,
        executiveSummary: data.executive_summary,
        actionableSteps: data.actionable_steps,
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

// DELETE /api/consultations/[id] - Delete consultation
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

    const { error } = await supabaseAdmin
      .from('consultations')
      .delete()
      .eq('id', params.id)
      .eq('user_id', session.user.id);

    if (error) {
      throw error;
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
