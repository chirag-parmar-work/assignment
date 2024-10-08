"use client";

import React, { useState, useCallback, useMemo } from "react";
import EventsTable from "../event-table/page";
import apiRequest from "~/api";
import StatusMessage from "../status-message/page";
import ScriptSnippet from "../script/page";
import DropDown from "../dropdown/page";
import useSSE from "~/hooks/use-sse";

interface ApiResponse {
  result: {
    status: number;
    id: string;
  };
}

export interface EventType {
  id: string;
  name: string;
  description: string | null;
  start_date: Date;
  metadata: JSON;
  user_id: string;
  visitor_id: string | null;
}

export default function MainContent() {
  const [buttonStatus, setButtonStatus] = useState({
    installdropdown: { buttonDisabled: false },
    testDropdown: { buttonDisabled: true },
  });
  const [status, setStatus] = useState("");
  const [opendropdown, setOpenDropdown] = useState<string>("");

  const { events } = useSSE(`/api/track-event?visitorId=V-123123`);

  const handleTestConnection = useCallback(async () => {
    if (status === "success") {
      setOpenDropdown("test");
      return;
    }

    setStatus("checking");
    try {
      const response = await apiRequest<ApiResponse>(
        "/test-connection?surfaceId=SURFACE-123123",
      );
      console.log("response  :>> ", response);
      if (response?.status === 200) {
        setStatus("success");
        setButtonStatus((prev) => ({
          ...prev,
          testDropdown: { buttonDisabled: false },
        }));
      }
    } catch (error) {
      setStatus("error");
      console.error("Error during test connection:", error);
    }
  }, [status]);

  const installButton = useMemo(
    () => (
      <button
        onClick={() => setOpenDropdown("install")}
        disabled={buttonStatus.installdropdown.buttonDisabled}
        className={`rounded-lg px-4 py-1.5 text-[14px] ${
          buttonStatus.installdropdown.buttonDisabled
            ? "cursor-not-allowed bg-[#F1F1F2]"
            : "cursor-pointer bg-blue-600 text-white"
        } ${opendropdown === "install" ? "hidden" : "block"}`}
      >
        Install tag
      </button>
    ),
    [buttonStatus.installdropdown.buttonDisabled, opendropdown],
  );

  const testButton = useMemo(
    () => (
      <button
        onClick={() => setOpenDropdown("test")}
        disabled={buttonStatus.testDropdown.buttonDisabled}
        className={`rounded-lg px-4 py-1.5 text-[14px] ${
          buttonStatus.testDropdown.buttonDisabled
            ? "cursor-not-allowed bg-[#F1F1F2]"
            : "cursor-pointer bg-blue-600 text-white"
        } ${opendropdown === "test" ? "hidden" : "block"}`}
      >
        Test tag
      </button>
    ),
    [buttonStatus.testDropdown.buttonDisabled, opendropdown],
  );

  return (
    <div className="flex-1 overflow-y-auto p-[48px] pt-6">
      <h2 className="text-[32px] font-semibold">Getting started</h2>
      <hr className="my-3" />
      <div>
        <DropDown
          open={opendropdown === "install"}
          button={installButton}
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
                  {status === "success" ? "Next step" : "Test connection"}
                </button>
              </div>
            </div>
          }
        />
        <DropDown
          status=""
          open={opendropdown === "test"}
          button={testButton}
          title="Test Surface Tag Events"
          description="Test if the Surface Tag is properly emitting events."
          content={<EventsTable events={events} />}
          footer={
            <div className="p-6">
              <div className="flex justify-end">
                <button
                  onClick={() => {}}
                  className="rounded-lg bg-blue-600 px-4 py-1.5 text-[14px] text-white"
                >
                  Test teg
                </button>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}
