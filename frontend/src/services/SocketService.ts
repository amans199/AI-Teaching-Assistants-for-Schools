import { io, Socket } from "socket.io-client";
import { chatStore } from "@/stores/ChatStore";

class SocketService {
  private socket: Socket | null = null;
  private readonly SOCKET_URL = "http://127.0.0.1:8765";
  private currentTimeout: NodeJS.Timeout | null = null;
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
    this.socket.on("message", (data) => {
      // Clear any existing timeout
      if (this.currentTimeout) {
        clearTimeout(this.currentTimeout);
        this.currentTimeout = null;
      }

      if (data.message.startsWith("Connected to")) {
        return;
      }

      chatStore.addMessage({
        id: crypto.randomUUID(),
        content: data.message,
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
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
    this.socket?.disconnect();
  }

  async sendMessage(content: string, isRetry: boolean = false) {
    if (!this.socket?.connected) {
      console.error("Socket not connected");
      return;
    }

    // Don't add user message again if it's a retry
    if (!isRetry) {
      chatStore.addMessage({
        id: crypto.randomUUID(),
        content,
        sender: "user",
        timestamp: new Date(),
      });
    }

    // Add loading message
    chatStore.addLoadingMessage();

    // Set timeout for 2 minutes
    this.currentTimeout = setTimeout(() => {
      chatStore.setTimeoutError(true);
    }, 120000);

    this.socket.emit("message", { content, threadId: chatStore.threadId });
  }

  async retry(content: string) {
    chatStore.setTimeoutError(false);
    await this.sendMessage(content, true);
  }
}

export const socketService = new SocketService();
