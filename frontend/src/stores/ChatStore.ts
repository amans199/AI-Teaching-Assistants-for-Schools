import { makeAutoObservable } from 'mobx';
import { ChatMessage } from '@/types/chat';

export class ChatStore {
  messages: ChatMessage[] = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  addMessage = (message: ChatMessage) => {
    this.messages.push(message);
  };

  setLoading = (loading: boolean) => {
    this.isLoading = loading;
  };

  clearMessages = () => {
    this.messages = [];
  };
}

export const chatStore = new ChatStore();