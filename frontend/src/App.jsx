import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/ChatPage";
import AuthPage from "./pages/AuthPage";
import { useAuth } from "@clerk/react";
import PageLoader from "./components/PageLoader";
import { useAuthStore } from "./store/useAuthStore";
import { useChatStore } from "./store/useChatStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { setAuthTokenGetter } from "./lib/axios";

function App() {
  const { isSignedIn, isLoaded, getToken } = useAuth();

  const clearAuth = useAuthStore((state) => state.clearAuth);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);
  const resetChatState = useChatStore((state) => state.resetChatState);

  useEffect(() => {
    if (getToken) {
      setAuthTokenGetter(getToken);
    }
  }, [getToken]);

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      checkAuth();
    } else {
      clearAuth();
      resetChatState();
    }
  }, [checkAuth, clearAuth, isLoaded, isSignedIn, resetChatState]);

  if (!isLoaded || (isSignedIn && isCheckingAuth)) return <PageLoader />;

  return (
    <>
      <Routes>
        <Route path="/" element={isSignedIn ? <ChatPage /> : <Navigate to={"/auth"} replace />} />
        <Route
          path="/auth"
          element={!isSignedIn ? <AuthPage /> : <Navigate to={"/"} replace />}
        />
      </Routes>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1e1e28",
            color: "#f0f0f5",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "10px",
            fontSize: "14px",
          },
        }}
      />
    </>
  );
}

export default App;
