import React from "react";
import { motion } from "framer-motion";

const Messageresponse = ({ messages }) => {
  return (
    <div className="flex flex-col gap-3 w-full px-4 py-2">
      {messages.map((msg) => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`flex w-full ${
            msg.isSender ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`px-4 py-2 rounded-lg text-sm shadow-sm max-w-[75%] 
              whitespace-pre-wrap break-words 
              ${
                msg.isSender
                  ? "bg-gray-600 text-white rounded-br-none self-end"
                  : "bg-gray-100 text-gray-900 rounded-bl-none self-start"
              }`}
          >
            {msg.text}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Messageresponse;
