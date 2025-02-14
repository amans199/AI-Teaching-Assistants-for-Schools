import { io, Socket } from "socket.io-client";
import { chatStore } from "@/stores/ChatStore";

class SocketService {
  private socket: Socket | null = null;
  private readonly SOCKET_URL = "http://127.0.0.1:8765";

  constructor() {
    this.initializeSocket();
  }

  private initializeSocket() {
    this.socket = io(this.SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.socket) return;

    // Connection events
    this.socket.on("connect", () => {
      console.log("Connected to server");
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    this.socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    // Chat events
    this.socket.on("message", (message) => {
      chatStore.addMessage({
        id: crypto.randomUUID(),
        content: message.message,
        sender: "assistant",
        timestamp: new Date(),
      });
    });

    this.socket.on("typing", () => {
      // Handle typing indicator if needed
      console.log("Assistant is typing...");
    });
  }

  async start() {
    if (!this.socket) {
      this.initializeSocket();
    }
    this.socket?.connect();
  }

  async stop() {
    this.socket?.disconnect();
  }

  async sendMessage(content: string) {
    if (!this.socket?.connected) {
      console.error("Socket not connected");
      return;
    }

    this.socket.emit("message", { content });
  }

  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }
}

export const socketService = new SocketService();
