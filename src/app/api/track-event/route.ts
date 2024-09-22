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
    metadata: EventMetadata;
    visitorId: string;
    surfaceId: string;
  }) => {
    const {
      description,
      ...res
    } = metadata;

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
    
      
      eventEmitter.emit('newEvent', data);
      console.log('event emit :>> ');
    };

    export async function GET(request: NextRequest) {
      try {
        const userId = request.nextUrl.searchParams.get('userId');
        if (!userId) {
          return NextResponse.json({ message: 'User ID is required', status: 400 });
        }

        const events = await prisma.event.findMany({
          where: {
            user: {
              id: userId
            }
          },
          include: {
            user: true,
            visitor: true,
          },
          orderBy: {
            start_date: 'desc'
          }
        });

        return NextResponse.json(events);
      } catch (error) {
        console.error("Error fetching events:", error instanceof Error ? error.message : String(error));
        return NextResponse.json({ message: "Failed to fetch events"});
      }
    }