import { cn } from "@/lib/utils";
import { ChatMessage as ChatMessageType } from "@/types/chat";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { accessibilityStore } from "@/stores/AccessibilityStore";
import { chatStore } from "@/stores/ChatStore";
import { socketService } from "@/services/SocketService";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import Markdown from "react-markdown";
import "./ChatMessage.css";

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = observer(({ message }: ChatMessageProps) => {
  const handleRetry = () => {
    if (chatStore.timeoutError) {
      // Find the last user message
      const lastUserMessage = [...chatStore.messages]
        .reverse()
        .find((m) => m.sender === "user");

      if (lastUserMessage) {
        socketService.retry(lastUserMessage.content);
      }
    }
  };

  return (
    <div
      className={cn(
        "w-full py-6 px-4",
        message.sender === "assistant" ? "bg-secondary/50" : "bg-background",
        accessibilityStore.highContrast && "contrast-125"
      )}
    >
      <div className="max-w-3xl mx-auto">
        <div
          className="prose prose-neutral dark:prose-invert max-w-none"
          style={{
            fontSize: `${accessibilityStore.fontSize}px`,
            lineHeight: accessibilityStore.fontSize > 18 ? "1.8" : "1.5",
          }}
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span className="font-medium">
              {message.sender === "assistant" ? "Assistant" : "You"}
            </span>
            <span className="text-xs">
              {format(message.timestamp, "HH:mm")}
            </span>
          </div>
          {message.isLoading ? (
            <div className="flex items-center gap-2">
              <div className="typing-animation">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          ) : chatStore.timeoutError && message.sender === "assistant" ? (
            <div className="flex items-center gap-4 text-destructive">
              <p className="m-0">Response timeout. Please try again.</p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRetry}
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            </div>
          ) : (
            <p className="mt-1 leading-relaxed">
              <Markdown>{message.content}</Markdown>
            </p>
          )}
        </div>
      </div>
    </div>
  );
});
