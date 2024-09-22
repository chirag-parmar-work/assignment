"use client";
import { useState } from "react";
import DropDown from "./dropdown";
import EventsTable from "./event-table";

import { ScriptSnippet } from "./script";
import apiRequest from "~/api";
import StatusMessage from "./status-message";

export default function MainContent() {
  const [buttonStatus, setButtonStatus] = useState({
    installdropdown: {
      buttonDisabled: false,
    },
    testDropdown: {
      buttonDisabled: true,
    },
  });
  const [status, setStatus] = useState<string>("");

  const fetchEvents=async()=>{
    const response = await apiRequest<{ status: number }>(
      "/test-connection?surfaceId=SURFACE-123123",
    );
    console.log("response :>> ", response);
  }

  const handleTestConnection = async () => {
    setStatus("checking");
   
    const response = await apiRequest<{ status: number }>(
      "/test-connection?surfaceId=SURFACE-123123",
    );
    console.log("response :>> ", response);
    if (response.status === 200) {
      
      setStatus("success");
      setButtonStatus({
        ...buttonStatus,
        testDropdown: {
          buttonDisabled: false,
        },
      });
      fetchEvents();
    }else {
      setStatus("error");
    }
  };

  return (
    <div className="flex-1 p-[48px] pt-6">
      <h2 className="text-[32px] font-semibold">Getting started</h2>
      <hr className="my-3" />
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
