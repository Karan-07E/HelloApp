import useScrollToBottom from "../../hooks/useScrollToBottom";
import { formatMessageDate } from "../../lib/utils";
import { MessageBubble } from "./MessageBubble";
import { useSelectedConversation } from "../../hooks/useSelectedConversation";

export function MessageList() {
  const { activeConversation, activeConversationId } = useSelectedConversation();

  const lastMessageId = activeConversation?.messages.at(-1)?.id;
  const messagesScrollRef = useScrollToBottom(activeConversationId, lastMessageId);

  if (!activeConversation) return null;

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <div
        ref={messagesScrollRef}
        className="flex flex-1 flex-col gap-1.5 overflow-y-auto overscroll-contain bg-bg-primary px-4 py-5 sm:px-8 sm:py-6"
      >
        {activeConversation.messages.map((message, index, messages) => {
          const previousMessage = messages[index - 1];
          const messageDate = formatMessageDate(message.createdAt);
          const previousMessageDate = previousMessage
            ? formatMessageDate(previousMessage.createdAt)
            : null;

          return (
            <div key={message.id}>
              {messageDate !== previousMessageDate ? (
                <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-text-tertiary">
                  {messageDate}
                </p>
              ) : null}
              <MessageBubble message={message} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
