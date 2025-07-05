export const sendChatMessage = async (messageText) => {
  const apiUrl = import.meta.env.VITE_CHAT_API_URL;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      "x-mastra-dev-playground": "true",
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: messageText }],
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

  return response;
};
