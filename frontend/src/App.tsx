import { observer } from "mobx-react-lite";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { Toolbar } from "@/components/Toolbar";
import { chatStore } from "@/stores/ChatStore";
import { useEffect, useRef } from "react";
import { signalRService } from "@/services/signalRService";
import { accessibilityStore } from "@/stores/AccessibilityStore";
import { MessageSquare } from "lucide-react";

const App = observer(() => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    signalRService.start();
  }, []);

  useEffect(() => {
    if (accessibilityStore.autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatStore.messages.length]);

  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="flex-1 flex flex-col">
        <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
          <div className="max-w-4xl mx-auto w-full px-4 py-2 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">Chat Assistant</h1>
          </div>
        </header>
        <main
          className="flex-1 flex flex-col max-w-4xl mx-auto w-full"
          style={{ height: "94vh" }}
        >
          <div className="flex-1 overflow-y-auto">
            {chatStore.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="border-t">
            <ChatInput />
          </div>
        </main>
      </div>
      <Toolbar />
    </div>
  );
});

export default App;
