import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const surfaceId = request.nextUrl.searchParams.get('surfaceId');
    if (!surfaceId) {
      return NextResponse.json({ message: 'Surface ID is required', status: 400 });
    }
    const result = await prisma.event.findMany({
      where: { surface_id: surfaceId },
      orderBy: { timestamp: 'desc' },
      take: 10, // Limit to the most recent 10 events
    });

    if (!result || result.length === 0) {
      return NextResponse.json({ message: 'No events found for this Surface ID', status: 404 });
    }
 
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ message: 'Failed to fetch events', status: 500 });
  }
}
