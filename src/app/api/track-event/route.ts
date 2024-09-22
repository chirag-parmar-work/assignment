import { NextRequest, NextResponse } from "next/server";
import { PrismaClient} from "@prisma/client";
import { eventEmitter } from "../event-sse/helper";

const prisma = new PrismaClient();

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
export async function GET() {
  const events = await prisma.event.findMany();
 
  return NextResponse.json({ events }, { status: 200 });
  // ... rest of the function
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
        console.log("form_submit");
       const visitor = await prisma.visitor.update({
          where: { id: visitorId },
          data: {
            company_size: metadata.companySize,
            name: metadata.name,
            email: metadata.email,
          },
        });

        console.log('visitor :>> ', visitor);
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
    console.error("Error tracking event:", error instanceof Error ? error.message : String(error));
    return NextResponse.json({ message: "Failed to track event", status: 500 });
  }
}


// ============================== Helper Functions ==============================

export const createEvent = async ({
  eventName,
  metadata,
  visitorId,
  surfaceId
}: {
  eventName: string;
  metadata:EventMetadata;
  visitorId: string;
  surfaceId: string;
}) => {
  const {
    description,
  } = metadata;
  
   const data = await prisma.event.create({
      data: {
        name:eventName,
        description,
        start_date:  new Date().toISOString(),
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
    });
   
    eventEmitter.emit('newEvent', data);

  };
