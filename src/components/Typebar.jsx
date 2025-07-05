import React, { useState } from "react";
import { Send } from "lucide-react"; // optional

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  return (
    <div className="fixed bottom-6 left-64 w-[calc(100%-16rem)] px-4 pointer-events-none z-10">
      <div className="max-w-4xl mx-auto flex items-center bg-white rounded-xl shadow-md px-4 py-2 pointer-events-auto">
        <textarea
          rows={4}
          placeholder="Ask Anything"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 text-sm bg-transparent outline-none resize-none max-h-80 overflow-y-auto px-2 py-1"
        />
        <button onClick={handleSend}>
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
