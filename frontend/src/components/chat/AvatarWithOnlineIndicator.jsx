/**
 * Custom avatar with online/offline presence indicator.
 * Replaces the HeroUI Avatar component with a simple img + fallback.
 */
export function AvatarWithOnlineIndicator({
  isOnline,
  name = "",
  avatarUrl,
  initials = "",
  size = "md",
}) {
  const sizeClasses = {
    sm: "size-8",
    md: "size-10",
    lg: "size-11",
  };

  const dotSizes = {
    sm: "size-2.5",
    md: "size-3",
    lg: "size-3",
  };

  const avatarSize = sizeClasses[size] || sizeClasses.md;
  const dotSize = dotSizes[size] || dotSizes.md;

  return (
    <div className="relative inline-flex shrink-0">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className={`${avatarSize} rounded-full object-cover`}
        />
      ) : (
        <div
          className={`${avatarSize} flex items-center justify-center rounded-full bg-bg-elevated text-xs font-medium text-text-secondary`}
        >
          {initials}
        </div>
      )}
      <span
        className={`pointer-events-none absolute bottom-0 right-0 z-10 ${dotSize} rounded-full border-2 border-bg-secondary ${
          isOnline ? "bg-success" : "bg-text-tertiary"
        }`}
        aria-hidden
      />
      <span className="sr-only">{isOnline ? "Online" : "Offline"}</span>
    </div>
  );
}
