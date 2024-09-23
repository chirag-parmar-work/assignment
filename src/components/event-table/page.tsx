import React from "react";
import { EventType } from "../home-page/page";

const EventsTable = ({ events }: { events: EventType[] }) => {
  const eventData = events
    .filter(
      (event: EventType, index: number, self: EventType[]) =>
        index === self.findIndex((e: EventType) => e.id === event.id),
    )
    .map((e) => {
      return {
        id: e.id,
        event: e.name,
        visitor: e.visitor_id,
        metadata: e.metadata,
        start_date: e.start_date,
      };
    });
  console.log("eventsLength :>> ", eventData.length);

  return (
    <div className="overflow-auto rounded-lg border-gray-200 bg-white shadow-sm">
      <div className="p-6">
        <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-lg border-2 border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Event
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Visitor
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Metadata
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Created at
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {eventData.length > 0 &&
              eventData.map((row, index: number) => (
                <tr key={index}>
                  <td className="font-small m whitespace-nowrap px-6 py-4 text-left text-[16px] text-sm leading-[18px] text-gray-500">
                    {row.event}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {row.visitor}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {JSON.stringify(row.metadata)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {new Date(row.start_date).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventsTable;
