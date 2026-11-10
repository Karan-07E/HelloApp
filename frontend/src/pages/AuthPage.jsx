import { useClerk } from "@clerk/react";
import { ArrowRightIcon, MessageCircleIcon, ShieldCheckIcon, ZapIcon } from "lucide-react";

const APP_NAME = "HelloApp";

function AuthPage() {
  const clerk = useClerk();

  const handleSignIn = () => {
    clerk.openSignIn({ fallbackRedirectUrl: "/", forceRedirectUrl: "/" });
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-bg-primary px-4 py-12">
      <div className="flex w-full max-w-sm flex-col items-center">
        {/* Logo + branding */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/20 bg-accent-muted">
            <MessageCircleIcon className="h-7 w-7 text-accent" strokeWidth={1.75} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">{APP_NAME}</h1>
          <p className="mt-1.5 text-sm text-text-secondary">
            Private messaging, beautifully simple.
          </p>
        </div>

        {/* Auth card */}
        <div className="w-full rounded-2xl border border-white/10 bg-bg-secondary p-7 shadow-2xl shadow-black/50">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-text-primary">Welcome back</h2>
            <p className="mt-1 text-sm text-text-secondary">
              Sign in to continue your conversations.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSignIn}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-solid px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-solid-hover focus-visible:outline-accent"
          >
            <span>Continue</span>
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Trust badges */}
        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-text-tertiary">
          <span className="flex items-center gap-1.5">
            <ShieldCheckIcon className="h-3.5 w-3.5" />
            Encrypted
          </span>
          <span className="flex items-center gap-1.5">
            <ZapIcon className="h-3.5 w-3.5" />
            Real-time
          </span>
        </div>
      </div>
    </div>
  );
}
export default AuthPage;
