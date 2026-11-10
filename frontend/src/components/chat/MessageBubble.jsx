import { useState } from "react";
import { withTransform } from "../../lib/imagekit";
import { MessageVideo } from "./MessageVideo";
import { MediaModal } from "./MediaModal";

// Compress + size images for the bubble (q-auto works for images; f-auto picks WebP/AVIF).
const IMAGE_TRANSFORM = "q-auto,w-640,f-auto";

export function MessageBubble({ message }) {
  const [previewMedia, setPreviewMedia] = useState(null);

  const isOwnMessage = message.role === "me";
  const hasImage = Boolean(message.imageUrl);
  const hasVideo = Boolean(message.videoUrl);

  return (
    <>
      <div className={`flex w-full ${isOwnMessage ? "justify-end" : "justify-start"}`}>
        <div
          className={`max-w-[min(85%,28rem)] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed ${
            isOwnMessage
              ? "rounded-br-md bg-bubble-own text-bubble-own-text"
              : "rounded-bl-md bg-bubble-peer text-bubble-peer-text"
          }`}
        >
          {hasImage ? (
            <button
              type="button"
              onClick={() => setPreviewMedia({ type: "image", url: message.imageUrl })}
              className="mb-2 block overflow-hidden rounded-lg text-left transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              title="Click to view full image"
            >
              <img
                src={withTransform(message.imageUrl, IMAGE_TRANSFORM)}
                alt="Chat attachment"
                className="max-h-52 max-w-full cursor-pointer rounded-lg object-cover"
              />
            </button>
          ) : null}

          {hasVideo ? (
            <MessageVideo
              src={message.videoUrl}
              onExpand={() => setPreviewMedia({ type: "video", url: message.videoUrl })}
            />
          ) : null}

          {message.text ? (
            <p className="whitespace-pre-wrap wrap-break-word">{message.text}</p>
          ) : null}

          <p
            className={`mt-1 text-[11px] tabular-nums ${
              isOwnMessage ? "text-white/60" : "text-text-tertiary"
            }`}
          >
            {message.time}
          </p>
        </div>
      </div>

      <MediaModal media={previewMedia} onClose={() => setPreviewMedia(null)} />
    </>
  );
}
