import { MessageCircleIcon } from "lucide-react";

const APP_NAME = "ChatSphere";

export { APP_NAME };

export function AppLogo({ className = "", size = 32 }) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl bg-accent-muted ${className}`}
      style={{ width: size, height: size }}
    >
      <MessageCircleIcon
        className="text-accent"
        style={{ width: size * 0.55, height: size * 0.55 }}
        strokeWidth={1.5}
      />
    </div>
  );
}
