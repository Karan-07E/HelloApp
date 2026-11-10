import { ImageIcon, Loader2Icon, SendIcon } from "lucide-react";
import { useRef } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useSelectedConversation } from "../../hooks/useSelectedConversation";

export function ChatComposer() {
  const composerText = useChatStore((state) => state.composerText);
  const sendMediaMessage = useChatStore((state) => state.sendMediaMessage);
  const isSendingMedia = useChatStore((state) => state.isSendingMedia);
  const sendTextMessage = useChatStore((state) => state.sendTextMessage);
  const setComposerText = useChatStore((state) => state.setComposerText);
  const { activeConversationId } = useSelectedConversation();
  const mediaInputRef = useRef(null);

  const handleSend = async () => {
    await sendTextMessage(activeConversationId);
  };

  const handleMediaPick = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    await sendMediaMessage({
      conversationId: activeConversationId,
      file,
    });
  };

  const canSend = composerText.trim().length > 0;

  return (
    <footer className="shrink-0 border-t border-border-primary bg-bg-secondary px-4 py-3 sm:px-5">
      {isSendingMedia ? (
        <div className="mb-3 flex items-center gap-2 rounded-xl bg-bg-tertiary px-3 py-2 text-sm text-text-secondary">
          <Loader2Icon className="size-4 shrink-0 text-accent" strokeWidth={2} />
          <span className="truncate">Uploading media...</span>
        </div>
      ) : null}

      <div className="flex items-end gap-2">
        <input
          ref={mediaInputRef}
          type="file"
          accept="image/*,video/*"
          className="sr-only"
          disabled={isSendingMedia}
          tabIndex={-1}
          aria-hidden
          onChange={handleMediaPick}
        />

        <button
          type="button"
          disabled={isSendingMedia}
          onClick={() => mediaInputRef.current?.click()}
          className="flex shrink-0 items-center justify-center rounded-xl p-2.5 text-text-tertiary hover:bg-bg-hover hover:text-accent disabled:opacity-40"
        >
          <ImageIcon className="size-5" strokeWidth={2} />
        </button>

        <div className="flex min-h-[44px] flex-1 items-center rounded-xl bg-bg-tertiary px-4">
          <textarea
            placeholder="Type a message..."
            rows={1}
            value={composerText}
            onChange={(e) => setComposerText(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSend();
              }
            }}
            className="max-h-32 min-h-[24px] flex-1 bg-transparent py-2.5 text-sm text-text-primary placeholder:text-text-tertiary outline-none"
          />
        </div>

        <button
          type="button"
          disabled={!canSend}
          onClick={handleSend}
          className="flex shrink-0 items-center justify-center rounded-xl bg-accent-solid p-2.5 text-white hover:bg-accent-solid-hover disabled:opacity-30"
        >
          <SendIcon className="size-5" strokeWidth={2} />
        </button>
      </div>
    </footer>
  );
}
