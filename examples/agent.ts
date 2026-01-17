import { defineAgent } from "openai-agents";

export default defineAgent({
  name: "hello-agent",
  description: "Simple demo agent that greets users.",
  tools: {
    greet: {
      description: "Says hello to someone",
      parameters: {
        type: "object",
        properties: { name: { type: "string" } },
        required: ["name"],
      },
      execute: async ({ name }) => `Hello, ${name}! Welcome to the new world.`,
    },
  },
});

