import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { socketService } from "@/services/SocketService";
import { accessibilityStore } from "@/stores/AccessibilityStore";
import { cn } from "@/lib/utils";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { chatStore } from "@/stores/ChatStore";

export const ChatInput = () => {
  const [message, setMessage] = useState("");
  const [height, setHeight] = useState(60);
  const [isSending, setIsSending] = useState(false);
  // Approximate token count (rough estimation)
  const estimateTokens = (text: string) => {
    if (!text.trim()?.length) return 0;
    return Math.ceil(text.trim().split(/\s+/).length * 1.3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setIsSending(true);

    // const newMessage = {
    //   id: crypto.randomUUID(),
    //   content: message,
    //   sender: "user" as const,
    //   timestamp: new Date(),
    // };

    // chatStore.addMessage(newMessage);
    await socketService.sendMessage(message);
    setMessage("");
    setHeight(60); // Reset height after sending

    setIsSending(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto w-full p-4">
      <div className="flex flex-col gap-2">
        <ResizablePanelGroup direction="vertical" className="min-h-[60px]">
          <ResizablePanel defaultSize={100}>
            <div className="flex gap-2 items-start">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className={cn(
                  "bg-transparent transition-all",
                  accessibilityStore.highContrast && "contrast-125"
                )}
                disabled={isSending || chatStore.loadingMessageId !== null}
                style={{
                  fontSize: `${accessibilityStore.fontSize}px`,
                  minHeight: `${height}px`,
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <Button
                type="submit"
                disabled={!message.trim() || isSending}
                className={cn(
                  "h-[60px] w-auto flex flex-col",
                  accessibilityStore.highContrast && "contrast-125"
                )}
              >
                <Send className="h-5 w-5" />
                <p>Send</p>
              </Button>
            </div>
          </ResizablePanel>
          {/* <ResizableHandle>
            <div className="flex items-center justify-center h-4 w-full cursor-row-resize bg-muted/50 hover:bg-accent/50 transition-colors">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>
          </ResizableHandle> */}
        </ResizablePanelGroup>
        {/* <div className="flex gap-2 items-center px-2 py-1 bg-muted/50 rounded-md">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-[60px] w-[60px]"
          >
            <Upload className="h-6 w-6 text-muted-foreground" />
            <span className="sr-only">Upload document</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-[60px] w-[60px]"
          >
            <Search className="h-6 w-6 text-muted-foreground" />
            <span className="sr-only">Search</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-[60px] w-[60px]"
          >
            <BrainCircuit className="h-6 w-6 text-muted-foreground" />
            <span className="sr-only">Reasoning mode</span>
          </Button>
        </div> */}
        <div className="flex justify-end text-sm text-muted-foreground space-x-4">
          <span>Characters: {message.length}</span>
          <span>~{estimateTokens(message)} tokens</span>
        </div>
      </div>
    </form>
  );
};
