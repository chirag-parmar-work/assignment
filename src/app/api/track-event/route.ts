import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { EventEmitter } from "stream";

const prisma = new PrismaClient();
const eventEmitter = new EventEmitter();

export interface EventMetadata {
  formId?: string;
  companySize?: string;
  name?: string;
  email?: string;
  [key: string]: string | undefined;
}

interface EventBody {
  eventName: string;
  visitorId: string;
  surfaceId: string;
  metadata: EventMetadata;
}

export async function POST(request: NextRequest) {
  try {
    const { eventName, visitorId, surfaceId, metadata }: EventBody =
      await request.json();

    if (!eventName || !visitorId || !metadata) {
      return NextResponse.json({
        message: "Missing required fields",
        status: 400,
      });
    }

    switch (eventName) {
      case "script_initialization":
        const user = await prisma.user.upsert({
          where: { surface_id: surfaceId },
          update: { status: "ACTIVE" },
          create: {
            id: "U-123123",
            surface_id: surfaceId,
            name: "default user",
            email: "user@default.com",
            status: "ACTIVE",
          },
        });

        await prisma.visitor.upsert({
          where: { id: visitorId },
          update: {},
          create: {
            id: visitorId,
            user: {
              connect: { id: user.id },
            },
          },
        });

        await createEvent({ eventName, metadata, surfaceId, visitorId });
        break;

      case "form_submit":
        const visitor = await prisma.visitor.update({
          where: { id: visitorId },
          data: {
            company_size: metadata.companySize,
            name: metadata.name,
            email: metadata.email,
          },
        });

        await createEvent({ eventName, metadata, visitorId, surfaceId });
        break;
      default:
        await createEvent({ eventName, metadata, visitorId, surfaceId });
        break;
    }

    return NextResponse.json(
      { message: "Event tracked successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error(
      "Error tracking event:",
      error instanceof Error ? error.message : String(error),
    );
    return NextResponse.json({ message: "Failed to track event", status: 500 });
  }
}

// ============================== Helper Functions ==============================

export const createEvent = async ({
  eventName,
  metadata,
  visitorId,
  surfaceId,
}: {
  eventName: string;
  metadata: EventMetadata;
  visitorId: string;
  surfaceId: string;
}) => {
  const { description, ...res } = metadata;

  const _metadata = Object.keys(res).length > 0 ? res : undefined;

  const data = await prisma.event.create({
    data: {
      name: eventName,
      description,
      metadata: _metadata,
      start_date: new Date().toISOString(),
      user: {
        connect: {
          surface_id: surfaceId,
        },
      },
      visitor: {
        connect: {
          id: visitorId,
        },
      },
    },
    include: {
      user: true,
      visitor: true,
    },
  });

  eventEmitter.emit("newEvent", data);
  console.log("event emit :>> ");
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const sendData = (writer: any, data: any) => {
  const formattedData = `data: ${JSON.stringify(data)}\n\n`;
  writer.write(new TextEncoder().encode(formattedData));
};

export async function GET(request: NextRequest) {
  const visitorId = request.nextUrl.searchParams.get("visitorId");
  if (!visitorId) {
    return new Response("User ID is required", { status: 400 });
  }

  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();

  const initialEvents = await prisma.event.findMany({
    where: { visitor: { id: visitorId } },
    include: { visitor: true, user: true },
  });

  sendData(writer, { events: initialEvents });

  const newEventListener = (event: any) => {
    sendData(writer, { newEvent: event });
  };

  eventEmitter.on("newEvent", newEventListener);

  request.signal.addEventListener("abort", () => {
    console.log("SSE connection closed");
    // eventEmitter.off("newEvent", newEventListener);
    // writer.close();
  });

  return new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
