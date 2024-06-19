import { ChatCompletionMessage } from "./chat-completion-message.interface";

export default async function createChatCompletion(
  messages: ChatCompletionMessage[]
) {
  const response = await fetch(`${process.env.API_URL}/openai/chatCompletion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages,
      prompt: prompt,
      max_tokens: 150,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }),
  });
  return response.json();
}
