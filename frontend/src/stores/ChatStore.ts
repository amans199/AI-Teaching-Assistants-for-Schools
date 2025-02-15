import { makeAutoObservable } from "mobx";
import { ChatMessage } from "@/types/chat";

export class ChatStore {
  messages: ChatMessage[] = [];
  isLoading = false;
  loadingMessageId: string | null = null;
  timeoutError = false;
  threadId: string;
  isConnected = false;

  constructor() {
    makeAutoObservable(this);
    this.threadId = crypto.randomUUID();
  }

  addMessage = (message: ChatMessage) => {
    // If there's a loading message, replace it
    if (this.loadingMessageId) {
      this.messages = this.messages.filter(
        (m) => m.id !== this.loadingMessageId
      );
      this.loadingMessageId = null;
    }
    this.messages.push(message);
  };

  addLoadingMessage = () => {
    const loadingMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content: "",
      sender: "assistant",
      timestamp: new Date(),
      isLoading: true,
    };
    this.loadingMessageId = loadingMessage.id;
    this.messages.push(loadingMessage);
    this.isLoading = true;
    this.timeoutError = false;
  };

  setTimeoutError = (error: boolean) => {
    this.timeoutError = error;
    if (error && this.loadingMessageId) {
      // Remove the loading message when timeout occurs
      this.messages = this.messages.filter(
        (m) => m.id !== this.loadingMessageId
      );
      this.loadingMessageId = null;
    }
    this.isLoading = !error;
  };

  clearMessages = () => {
    this.messages = [];
    this.loadingMessageId = null;
    this.isLoading = false;
    this.timeoutError = false;
    // Generate new threadId when clearing messages
    this.threadId = crypto.randomUUID();
  };
}

export const chatStore = new ChatStore();
