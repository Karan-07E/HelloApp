import { ChevronLeftIcon, XIcon } from "lucide-react";
import { AvatarWithOnlineIndicator } from "./AvatarWithOnlineIndicator";
import { useChatStore } from "../../store/useChatStore";
import { useSelectedConversation } from "../../hooks/useSelectedConversation";

export function ChatHeader() {
  const setActiveConversationId = useChatStore((state) => state.setActiveConversationId);

  const { activeConversation, isLargeScreen } = useSelectedConversation();

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-border-primary bg-bg-secondary px-4 sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        {/* Back button on mobile */}
        {!isLargeScreen ? (
          <button
            type="button"
            onClick={() => setActiveConversationId(null)}
            className="flex shrink-0 items-center justify-center rounded-lg p-1.5 text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary"
            aria-label="Back to conversations"
          >
            <ChevronLeftIcon className="h-5 w-5" strokeWidth={2} />
          </button>
        ) : null}

        {activeConversation && (
          <>
            <AvatarWithOnlineIndicator
              isOnline={activeConversation.peer.isOnline ?? true}
              name={activeConversation.peer.name}
              avatarUrl={activeConversation.peer.avatarUrl}
              initials={activeConversation.peer.initials}
              size="md"
            />

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-text-primary">
                {activeConversation.peer.name}
              </p>
              <p className="flex items-center gap-1.5 truncate text-xs text-text-tertiary">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    activeConversation.peer.isOnline ? "bg-success" : "bg-text-tertiary"
                  }`}
                />
                {activeConversation.peer.isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveConversationId(null)}
          className="hidden shrink-0 items-center justify-center rounded-lg p-1.5 text-text-tertiary transition-colors hover:bg-bg-hover hover:text-text-primary lg:flex"
          aria-label="Close conversation"
        >
          <XIcon className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
    </header>
  );
}
