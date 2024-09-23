import { useState, useEffect } from "react";
import { EventType } from "~/components/home-page/page";

function useSSE(initialUrl: string) {
  const [sseConnection, setSseConnection] = useState<EventSource | null>(null);
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const initializeSSE = () => {
      if (sseConnection) return;

      const newSseConnection = new EventSource(initialUrl);
      setSseConnection(newSseConnection);

      newSseConnection.onopen = () => console.log("SSE connection opened");

      newSseConnection.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.events) {
          setEvents(data.events);
        } else if (data.newEvent) {
          setEvents((prevEvents) => [...prevEvents, data.newEvent]);
        }
      };

      newSseConnection.onerror = () => {
        console.error("SSE error, closing connection");
        setSseConnection(null);
      };
    };

    initializeSSE();

    const reconnectSSE = () => {
      if (!sseConnection || sseConnection.readyState === EventSource.CLOSED) {
        console.log("Reconnecting SSE...");
        initializeSSE();
      }
    };

    window.addEventListener("focus", reconnectSSE);

    return () => {
      sseConnection?.close(); // Close the connection when the component unmounts
      window.removeEventListener("focus", reconnectSSE);
    };
  }, []);

  return { events, sseConnection };
}

export default useSSE;
