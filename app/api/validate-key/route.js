import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function POST(request) {
  try {
    const { apiKey } = await request.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('key', apiKey)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      );
    }

    // Check if usage exceeds monthly limit
    if (data.usage >= data.monthly_limit) {
      return NextResponse.json(
        { error: 'API key has exceeded monthly limit' },
        { status: 403 }
      );
    }

    // Increment usage counter
    const { error: updateError } = await supabase
      .from('api_keys')
      .update({ 
        usage: data.usage + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', data.id);

    if (updateError) {
      console.error('Error updating usage:', updateError);
    }

    return NextResponse.json({ 
      valid: true,
      name: data.name,
      usage: data.usage + 1,
      limit: data.monthly_limit
    });

  } catch (error) {
    console.error('Error validating API key:', error);
    return NextResponse.json(
      { error: 'Failed to validate API key' },
      { status: 500 }
    );
  }
} 