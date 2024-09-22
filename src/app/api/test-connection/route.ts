import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const surfaceId = request.nextUrl.searchParams.get('surfaceId');
    if (!surfaceId) {
      return NextResponse.json({ message: 'Surface ID is required', status: 400 });
    }
    const result = await prisma.user.findUnique({
      where: { surface_id: surfaceId },
    });
    if (!result) {
      return NextResponse.json({ message: 'User not found', status: 404 });
    }
    console.log('NextResponse.json(result, { status: 200 }) :>> ', NextResponse.json(result, { status: 200 }));
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ message: 'Failed to fetch events', status: 500 });
  }
}
