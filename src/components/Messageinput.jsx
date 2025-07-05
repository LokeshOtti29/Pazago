import React, { useState } from "react";
import Typebar from "./Typebar";
import Messageresponse from "./Messageresponse";

const Messageinput = () => {
  const apiUrl = import.meta.env.VITE_CHAT_API_URL;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (newMessage) => {
    const userMsg = {
      id: messages.length + 1,
      text: newMessage,
      isSender: true,
    };

    setMessages((prev) => [...prev, userMsg]);

    try {
      setLoading(true);

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          "x-mastra-dev-playground": "true",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: newMessage }],
          runId: "weatherAgent",
          maxRetries: 2,
          maxSteps: 5,
          temperature: 0.5,
          topP: 1,
          runtimeContext: {},
          threadId: "TU3F2122044",
          resourceId: "weatherAgent",
        }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let botText = "";
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("0:")) {
            const content = line.slice(2).trim();
            const cleaned = content
              .replace(/""/g, "")
              .replace(/\\n/g, " ")
              .replace(/^[*"“”\s]+|[*"“”\s]+$/g, "")
              .replace(/\s+/g, " ")
              .trim();
            botText += cleaned + " ";
          }
        }
      }

      const botMsg = {
        id: messages.length + 2,
        text: botText || "Bot: No response received.",
        isSender: false,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          text: "Bot: Error fetching response.",
          isSender: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full items-center">
      <div className="flex-1 w-full overflow-y-auto">
        <Messageresponse messages={messages} />
      </div>
      <div className="p-2 bg-white w-full">
        <div className="max-w-4xl mx-auto w-full">
          <Typebar onSend={handleSendMessage} isLoading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Messageinput;
