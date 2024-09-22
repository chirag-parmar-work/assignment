"use client"
import React, { useEffect, useState } from "react";
import DropDown from "./dropdown";
import EventsTable from "./event-table";
import { ScriptSnippet } from "./script";
import apiRequest from "~/api";
import StatusMessage from "./status-message";

interface Event {
  id: string;
  name: string;
}
export default function MainContent() {
  const [buttonStatus, setButtonStatus] = useState({
    installdropdown: { buttonDisabled: false },
    testDropdown: { buttonDisabled: true },
  });
  const [status, setStatus] = useState("");
  const [events, setEvents] = useState<Event[]>([]);


  useEffect(() => {
    const eventSource = new EventSource('/api/event-sse');

    eventSource.onopen = (e) => {
      console.log('SSE connection opened');
    };

    eventSource.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log('New SSE message:', data);
      if (data.events) {
        setEvents(data.events);
      } else if (data.newEvent) {
        setEvents(prevEvents => [...prevEvents, data.newEvent]);
      }
    };

    eventSource.onerror = (e) => {
      console.error('SSE error:', e);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleTestConnection = async () => {
    setStatus("checking");
    const response = await apiRequest("/test-connection?surfaceId=SURFACE-123123");
    if (response?.status === 200) {
      setStatus("success");
      setButtonStatus(prev => ({
        ...prev,
        testDropdown: { buttonDisabled: false },
      }));
    } else {
      setStatus("error");
    }
  };

  
  return (
    <div className="flex-1 p-[48px] pt-6">
      <h2 className="text-[32px] font-semibold">Getting started</h2>
      <hr className="my-3" />
      {events.map((e: { id: string; name: string }) => (
        <div key={e.id}>{e.name}</div>
      ))}
      <div className="">
        <DropDown
          status={status}
          title="Install the Surface Tag"
          description="Enable tracking and analytics."
          content={<ScriptSnippet />}
          buttonDisabled={buttonStatus.installdropdown.buttonDisabled}
          buttonText="Install tag"
          footer={
            <div className="p-6">
             {status && <StatusMessage
                status={status}
              />}
              <div className="flex justify-end">
                <button
                  onClick={handleTestConnection}
                  className="rounded-lg bg-blue-600 px-4 py-1.5 text-white"
                >
                  Test connection
                </button>
              </div>
            </div>
          }
        />
        <DropDown
          status={true}
          title="Test Surface Tag Events"
          description="Test if the Surface Tag is properly emitting events."
          content={<EventsTable />}
          buttonDisabled={buttonStatus.testDropdown.buttonDisabled}
          buttonText="Test tag"
        />
      </div>
    </div>
  );
}