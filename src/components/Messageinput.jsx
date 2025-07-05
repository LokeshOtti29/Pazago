import React, { useState } from "react";
import Typebar from "./Typebar";
import Messageresponse from "./Messageresponse";
import { sendChatMessage } from "../utils/chatApi";

const Messageinput = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (newMessage) => {
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      isSender: true,
    };

    setMessages((prev) => [...prev, userMessage]);

    const botMessageId = messages.length + 2;
    setMessages((prev) => [
      ...prev,
      { id: botMessageId, text: "...", isSender: false },
    ]);

    try {
      setLoading(true);

      const response = await sendChatMessage(newMessage);

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let fullText = "";
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("0:")) {
            const raw = line.slice(2).trim();

            const cleaned = raw
              .replace(/""/g, "")
              .replace(/\\n/g, "\n")
              .replace(/^[*"“”\s]+|[*"“”\s]+$/g, "")
              .replace(/\s+/g, " ")
              .trim();

            if (cleaned) {
              fullText += cleaned + " ";

              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === botMessageId ? { ...msg, text: fullText } : msg
                )
              );
            }
          }
        }
      }
    } catch (error) {
      console.error("Streaming failed:", error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? { ...msg, text: "Bot: Something went wrong." }
            : msg
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full items-center">
      <div className="flex-1 w-full overflow-y-auto">
        {messages.length === 0 ? (
          <span className="font-semibold text-gray-500">
            What's on your mind today?
          </span>
        ) : (
          <Messageresponse messages={messages} />
        )}
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
