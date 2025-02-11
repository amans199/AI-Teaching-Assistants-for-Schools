import * as signalR from "@microsoft/signalr";
import { chatStore } from "@/stores/ChatStore";

class SignalRService {
  private connection: signalR.HubConnection;

  constructor() {
    // Initialize but don't connect
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("/chat")
      .withAutomaticReconnect()
      .build();
  }

  // Mock start method - no actual connection
  async start() {
    console.log("Mock SignalR Service Ready");
    return Promise.resolve();
  }

  // Mock send method with dummy responses
  async sendMessage(message: string) {
    // Simulate a delay before response
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate a dummy response
    const dummyResponse = {
      id: crypto.randomUUID(),
      content: this.generateDummyResponse(message),
      sender: "assistant" as const,
      timestamp: new Date(),
    };

    chatStore.addMessage(dummyResponse);
  }

  private generateDummyResponse(message: string): string {
    const responses = [
      "I understand what you're saying. Could you tell me more about that?",
      "That's an interesting point. Let me think about it...",
      "I see what you mean. Here's what I think...",
      `Thanks for sharing that. Based on "${message.slice(
        0,
        30
      )}...", I would suggest...`,
      "That's a great question. Let me explain...",
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }
}

export const signalRService = new SignalRService();
