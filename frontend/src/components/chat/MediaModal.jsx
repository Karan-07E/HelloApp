import { useEffect } from "react";
import { DownloadIcon, ExternalLinkIcon, XIcon } from "lucide-react";

export function MediaModal({ media, onClose }) {
  useEffect(() => {
    if (!media) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [media, onClose]);

  if (!media) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-md"
    >
      {/* Top action bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-4 right-4 flex items-center gap-2 z-10"
      >
        <a
          href={media.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
          title="Open original in new tab"
        >
          <ExternalLinkIcon className="h-5 w-5" />
        </a>

        <a
          href={media.url}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
          title="Download"
        >
          <DownloadIcon className="h-5 w-5" />
        </a>

        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
          title="Close (Esc)"
        >
          <XIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Media content */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[85vh] max-w-[90vw] items-center justify-center"
      >
        {media.type === "video" ? (
          <video
            src={media.url}
            controls
            autoPlay
            playsInline
            className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
          />
        ) : (
          <img
            src={media.url}
            alt=""
            className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
          />
        )}
      </div>
    </div>
  );
}
