import { MessageCircleIcon } from "lucide-react";

const APP_NAME = "HelloApp";

const PageLoader = () => {
  return (
    <div className="flex h-dvh items-center justify-center bg-bg-primary">
      <div className="flex flex-col items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-accent-muted">
          <MessageCircleIcon className="size-6 text-accent" strokeWidth={1.5} />
        </div>
        <p className="text-sm font-medium text-text-tertiary">
          Loading {APP_NAME}...
        </p>
      </div>
    </div>
  );
};

export default PageLoader;
