import { NextRequest, NextResponse } from 'next/server'
import { supabase } from "@/lib/supabase/admin"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content } = body

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    // Insert notification into database
    const { data, error } = await supabase
      .from('notifications')
      .insert([
        {
          title,
          content,
          viewed: false
        }
      ])
      .select()

    if (error) {
      console.error('Error inserting notification:', error)
      return NextResponse.json(
        { error: 'Failed to create notification' },
        { status: 500 }
      )
    }

    console.log('Notification created successfully:', data)
    return NextResponse.json({ 
      success: true, 
      notification: data[0] 
    })

  } catch (error) {
    console.error('Notification API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve notifications
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('Error fetching notifications:', error)
      return NextResponse.json(
        { error: 'Failed to fetch notifications' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      notifications: data 
    })

  } catch (error) {
    console.error('Get notifications error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH endpoint to mark notification as viewed
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Notification ID is required' },
        { status: 400 }
      )
    }

    // Update notification to mark as viewed
    const { data, error } = await supabase
      .from('notifications')
      .update({ viewed: true })
      .eq('id', id)
      .select()

    if (error) {
      console.error('Error updating notification:', error)
      return NextResponse.json(
        { error: 'Failed to mark notification as viewed' },
        { status: 500 }
      )
    }

    console.log('Notification marked as viewed:', data)
    return NextResponse.json({ 
      success: true, 
      notification: data[0] 
    })

  } catch (error) {
    console.error('Mark notification as viewed error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
