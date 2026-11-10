import { MessageCircleIcon } from "lucide-react";

export function NoConversationPlaceholder() {
  return (
    <div className="flex min-h-48 flex-1 flex-col items-center justify-center gap-5 bg-bg-primary px-4 py-16 text-center">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/20 bg-accent-muted"
        aria-hidden
      >
        <MessageCircleIcon className="h-8 w-8 text-accent" strokeWidth={1.75} />
      </div>
      <div className="max-w-xs space-y-2">
        <h2 className="text-base font-semibold tracking-tight text-text-primary">
          Select a chat to start
        </h2>
        <p className="text-sm leading-relaxed text-text-tertiary">
          Pick a conversation from the sidebar to read messages and reply.
        </p>
      </div>
    </div>
  );
}
