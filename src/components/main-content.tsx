"use client";
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

interface ApiResponse {
  result: {
    status: number;
    id: string;
  };
}

export default function MainContent() {
  const [buttonStatus, setButtonStatus] = useState({
    installdropdown: { buttonDisabled: false },
    testDropdown: { buttonDisabled: true },
  });
  const [status, setStatus] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [opendropdown, setOpenDropdown] = useState<string>("");


  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       const response = await apiRequest<{ events: Event[], status: number }>('/track-event?userId=U-123123');
  //       if (response?.status === 200 && response.result) {
  //         setEvents(response.result);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching events:", error);
  //     }
  //   };

  //   console.log(1)
  //   fetchEvents();
  // }, []);

  useEffect(() => {
    console.log(11)
    const eventSource = new EventSource(`/api/event-sse?visitorId=V-123123`);
    eventSource.onopen = (e) => {
      console.log("SSE connection opened");
    };

    eventSource.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log("New SSE message:",data);
      if (data.events) {
        setEvents(data.events);
      } else if (data.newEvent) {
        setEvents((prevEvents) => [...prevEvents, data.newEvent]);
      }
    };

    eventSource.onerror = (e) => {
      console.error("SSE error:", e);
      eventSource.close();
    };

    return () => {
      // eventSource.close();
    };
  }, []);

  const handleTestConnection = async () => {
    setStatus("checking");
    try {
      const response = await apiRequest<ApiResponse>(
      "/test-connection?surfaceId=SURFACE-123123",
    );
    if (response?.status === 200) {
      setStatus("success");
      setButtonStatus((prev) => ({
        ...prev,
        testDropdown: { buttonDisabled: false },
      }));
    }
    }catch(e){
      setStatus("error");
      console.log('e :>> ', e);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-[48px] pt-6">
      <h2 className="text-[32px] font-semibold">Getting started</h2>
      <hr className="my-3" />
      {events.length}
      <div className="">
        <DropDown
          open={opendropdown === "install"}
          button={
            <button
              onClick={() => {
                setOpenDropdown("install");
              }}
              disabled={buttonStatus.installdropdown.buttonDisabled}
              className={`rounded-lg px-4 py-1.5 text-[14px] ${buttonStatus.installdropdown.buttonDisabled ? "cursor-not-allowed bg-[#F1F1F2]" : "cursor-pointer bg-blue-600 text-white"} ${opendropdown === "install" ? "hidden" : "block"} `}
            >
              Install tag
            </button>
          }
          status={status}
          title="Install the Surface Tag"
          description="Enable tracking and analytics."
          content={<ScriptSnippet />}
          footer={
            <div className="p-6">
              {status && <StatusMessage status={status} />}
              <div className="flex justify-end">
                <button
                  onClick={handleTestConnection}
                  className="rounded-lg bg-blue-600 px-4 py-1.5 text-[14px] text-white"
                >
                  Test connection
                </button>
              </div>
            </div>
          }
        />
        <DropDown
          open={opendropdown === "test"}
          button={
            <button
              onClick={() => {
                setOpenDropdown("test");
              }}
              className={`rounded-lg px-4 py-1.5 text-[14px] ${buttonStatus.testDropdown.buttonDisabled ? "cursor-not-allowed bg-[#F1F1F2]" : "cursor-pointer bg-blue-600 text-white"} ${opendropdown === "test" ? "hidden" : "block"} `}
            >
              Test tag
            </button>
          }
          title="Test Surface Tag Events"
          description="Test if the Surface Tag is properly emitting events."
          content={<EventsTable events={events} />}
        />
      </div>
    </div>
  );
}
