import { cn } from '@/lib/utils';
import { ChatMessage as ChatMessageType } from '@/types/chat';
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { accessibilityStore } from '@/stores/AccessibilityStore';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = observer(({ message }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        'flex w-full gap-2 p-4',
        message.sender === 'assistant' ? 'bg-secondary' : 'bg-background',
        accessibilityStore.highContrast ? 'contrast-125' : ''
      )}
      style={{ fontSize: `${accessibilityStore.fontSize}px` }}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold">
            {message.sender === 'assistant' ? 'Assistant' : 'You'}
          </span>
          <span className="text-xs text-muted-foreground">
            {format(message.timestamp, 'HH:mm')}
          </span>
        </div>
        <p className="mt-1">{message.content}</p>
      </div>
    </div>
  );
});