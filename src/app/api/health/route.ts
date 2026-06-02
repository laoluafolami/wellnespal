import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { status: 'error', message: 'Supabase credentials not configured' },
        { status: 500 }
      );
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Perform a lightweight query to keep the database active
    // This queries the user_settings table but doesn't return actual data
    const { error } = await supabase
      .from('user_settings')
      .select('user_id')
      .limit(1);

    if (error) {
      console.error('Health check error:', error);
      return NextResponse.json(
        {
          status: 'error',
          message: 'Database connection failed',
          error: error.message,
          timestamp: new Date().toISOString(),
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      status: 'healthy',
      message: 'Database is active',
      timestamp: new Date().toISOString(),
      database: 'connected',
    });
  } catch (error: any) {
    console.error('Health check exception:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Health check failed',
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
