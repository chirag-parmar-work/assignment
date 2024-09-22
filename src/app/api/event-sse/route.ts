

import { PrismaClient} from "@prisma/client";

import { NextRequest } from 'next/server';
import { eventEmitter } from "./helper";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  function sendData(data: any) {
    const formattedData = `data: ${JSON.stringify(data)}\n\n`;
    writer.write(encoder.encode(formattedData));
  }


  const initialEvents = await prisma.event.findMany();
  sendData({ events: initialEvents });


  const newEventListener = (event: any) => {
    console.log('event :>> ', event);
    sendData({ newEvent: event });
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
      'Cache-Control': 'no-cache, no-transform'
    }
  });
}