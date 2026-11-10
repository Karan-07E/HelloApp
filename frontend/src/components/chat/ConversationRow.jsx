import { AvatarWithOnlineIndicator } from "./AvatarWithOnlineIndicator";

export function ConversationRow({ user, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center gap-3 border-b border-border-primary px-4 py-3.5 text-left hover:bg-bg-hover ${
        selected ? "bg-bg-active" : ""
      }`}
    >
      <AvatarWithOnlineIndicator
        isOnline={user.isOnline ?? true}
        name={user.name}
        avatarUrl={user.avatarUrl}
        initials={user.initials}
        size="lg"
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-text-primary">{user.name}</p>
      </div>
    </button>
  );
}
