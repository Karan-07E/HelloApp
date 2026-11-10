import { getInitials, useSelectedConversation } from "../../hooks/useSelectedConversation";
import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";
import { UserButton } from "@clerk/react";
import { MessageCircleIcon, SearchIcon, UsersIcon, XIcon } from "lucide-react";
import { ConversationRow } from "./ConversationRow";

const APP_NAME = "HelloApp";

function mapUserForList(user, onlineUsers) {
  return {
    conversationId: user._id,
    id: user._id,
    name: user.fullName,
    avatarUrl: user.profilePic,
    initials: getInitials(user.fullName),
    isOnline: onlineUsers.includes(user._id),
    peer: {
      name: user.fullName,
      avatarUrl: user.profilePic,
      initials: getInitials(user.fullName),
      isOnline: onlineUsers.includes(user._id),
    },
  };
}

function ChatSidebar() {
  const conversations = useChatStore((state) => state.conversations);
  const users = useChatStore((state) => state.users);

  const searchQuery = useChatStore((state) => state.searchQuery);
  const setSearchQuery = useChatStore((state) => state.setSearchQuery);

  const sidebarTab = useChatStore((state) => state.sidebarTab);
  const setSidebarTab = useChatStore((state) => state.setSidebarTab);

  const setActiveConversationId = useChatStore((state) => state.setActiveConversationId);

  const onlineUsers = useAuthStore((state) => state.onlineUsers);

  const { activeConversationId, isLargeScreen } = useSelectedConversation();

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  const conversationUsers = conversations.map((user) => mapUserForList(user, onlineUsers));
  const allUsers = users.map((user) => mapUserForList(user, onlineUsers));

  const filteredConversations = normalizedSearchQuery
    ? conversationUsers.filter((conversation) =>
        conversation.peer.name.toLowerCase().includes(normalizedSearchQuery),
      )
    : conversationUsers;

  const filteredUsers = normalizedSearchQuery
    ? allUsers.filter((user) => user.name.toLowerCase().includes(normalizedSearchQuery))
    : allUsers;

  const activeList = sidebarTab === "chats" ? filteredConversations : filteredUsers;
  const emptyMessage =
    sidebarTab === "chats"
      ? "No conversations yet"
      : "No people found";

  return (
    <aside
      className={`w-full shrink-0 flex-col overflow-hidden border-r border-border-primary bg-bg-secondary lg:w-80 ${
        !isLargeScreen && activeConversationId ? "hidden lg:flex" : "flex"
      }`}
    >
      {/* Header */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-border-primary bg-bg-secondary px-4 sm:px-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent/20 bg-accent-muted">
            <MessageCircleIcon className="h-5 w-5 text-accent" strokeWidth={1.75} />
          </div>
          <span className="text-base font-bold tracking-tight text-text-primary">
            {APP_NAME}
          </span>
        </div>
        <div className="flex items-center">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-8 w-8 rounded-full border border-white/10",
              },
            }}
          />
        </div>
      </div>

      {/* Search */}
      <div className="shrink-0 border-b border-border-primary p-3">
        <div className="flex items-center gap-2.5 rounded-lg border border-border-primary bg-bg-tertiary px-3 py-2 transition-colors focus-within:border-accent/40">
          <SearchIcon className="h-4 w-4 shrink-0 text-text-tertiary" strokeWidth={2} />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-tertiary outline-none"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="shrink-0 rounded p-0.5 text-text-tertiary transition-colors hover:text-text-secondary"
              aria-label="Clear search"
            >
              <XIcon className="h-3.5 w-3.5" strokeWidth={2.5} />
            </button>
          ) : null}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex shrink-0 border-b border-border-primary bg-bg-secondary">
        <button
          type="button"
          onClick={() => setSidebarTab("chats")}
          className={`relative flex flex-1 items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${
            sidebarTab === "chats"
              ? "font-semibold text-accent"
              : "text-text-tertiary hover:text-text-secondary"
          }`}
        >
          <MessageCircleIcon className="h-4 w-4" strokeWidth={2} />
          <span>Chats</span>
          {sidebarTab === "chats" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
          )}
        </button>
        <button
          type="button"
          onClick={() => setSidebarTab("users")}
          className={`relative flex flex-1 items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${
            sidebarTab === "users"
              ? "font-semibold text-accent"
              : "text-text-tertiary hover:text-text-secondary"
          }`}
        >
          <UsersIcon className="h-4 w-4" strokeWidth={2} />
          <span>People</span>
          {sidebarTab === "users" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
          )}
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {activeList.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
            <p className="text-sm text-text-tertiary">{emptyMessage}</p>
          </div>
        ) : (
          activeList.map((item) => (
            <ConversationRow
              key={item.conversationId}
              user={item}
              selected={item.conversationId === activeConversationId}
              onSelect={() => setActiveConversationId(item.conversationId)}
            />
          ))
        )}
      </div>
    </aside>
  );
}
export default ChatSidebar;
