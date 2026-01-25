import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { z } from 'zod';

const profileSchema = z.object({
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  birthTime: z.string().regex(/^\d{2}:\d{2}$/),
  timezone: z.string(),
  displayName: z.string().optional(),
});

// GET /api/profile - Fetch user's saved profile
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('user_profiles')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No profile found
        return NextResponse.json({ profile: null });
      }
      throw error;
    }

    return NextResponse.json({
      profile: {
        birthDate: data.birth_date,
        birthTime: data.birth_time,
        timezone: data.timezone,
        displayName: data.display_name,
      },
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/profile - Create or update user profile
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
    const validatedData = profileSchema.parse(body);

    const { data, error } = await supabaseAdmin
      .from('user_profiles')
      .upsert({
        user_id: session.user.id,
        birth_date: validatedData.birthDate,
        birth_time: validatedData.birthTime,
        timezone: validatedData.timezone,
        display_name: validatedData.displayName,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id',
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      profile: {
        birthDate: data.birth_date,
        birthTime: data.birth_time,
        timezone: data.timezone,
        displayName: data.display_name,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid profile data', details: error.errors },
        { status: 400 }
      );
    }
    console.error('Error saving profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/profile - Delete user profile
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { error } = await supabaseAdmin
      .from('user_profiles')
      .delete()
      .eq('user_id', session.user.id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
