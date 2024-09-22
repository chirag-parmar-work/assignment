import { PrismaClient } from "@prisma/client";
import { NextRequest } from 'next/server';
import { eventEmitter } from "./helper";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

const sendData = (writer: any, data: any) => {
  const formattedData = `data: ${JSON.stringify(data)}\n\n`;
  writer.write(new TextEncoder().encode(formattedData));
};

export async function GET(request: NextRequest) {
  const visitorId = request.nextUrl.searchParams.get('visitorId');
  if (!visitorId) {
    return new Response('User ID is required', { status: 400 });
  }

  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();

  const initialEvents = await prisma.event.findMany({
    where: { visitor: { id: visitorId } },
    include: { visitor: true, user: true },
  });

  sendData(writer, { events: initialEvents });

  const newEventListener = (event: any) => {
    console.log(12)
    sendData(writer, { newEvent: event });
  };

  eventEmitter.on('newEvent', newEventListener);

  request.signal.addEventListener('abort', () => {
    console.log('SSE connection closed');
    eventEmitter.off('newEvent', newEventListener);
    writer.close();
  });

  return new Response(responseStream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache, no-transform',
    },
  });
}
