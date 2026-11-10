import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useSelectedConversation } from "../hooks/useSelectedConversation";
import { useEffect } from "react";
import ChatSidebar from "../components/chat/ChatSidebar";
import { ChatHeader } from "../components/chat/ChatHeader";
import { MessageList } from "../components/chat/MessageList";
import { ChatComposer } from "../components/chat/ChatComposer";
import { NoConversationPlaceholder } from "../components/chat/NoConversationPlaceholder";

function ChatPage() {
  const getConversations = useChatStore((state) => state.getConversations);
  const getMessages = useChatStore((state) => state.getMessages);
  const getUsers = useChatStore((state) => state.getUsers);
  const subscribeToMessages = useChatStore((state) => state.subscribeToMessages);
  const unsubscribeFromMessages = useChatStore((state) => state.unsubscribeFromMessages);

  const authUser = useAuthStore((state) => state.authUser);
  const { activeConversation, activeConversationId, isLargeScreen } = useSelectedConversation();

  useEffect(() => {
    if (!authUser) return;
    getUsers();
    getConversations();
  }, [authUser, getConversations, getUsers]);

  useEffect(() => {
    if (!activeConversationId) return;

    getMessages(activeConversationId);
    subscribeToMessages(activeConversationId);

    // cleanup
    return () => unsubscribeFromMessages();
  }, [getMessages, activeConversationId, subscribeToMessages, unsubscribeFromMessages]);

  return (
    <div className="flex h-dvh overflow-hidden bg-bg-primary">
      {/* Sidebar */}
      <ChatSidebar />

      {/* Main content */}
      <div
        className={`flex-1 flex-col overflow-hidden bg-bg-primary ${
          !isLargeScreen && !activeConversationId ? "hidden lg:flex" : "flex"
        }`}
      >
        {activeConversation ? (
          <>
            <ChatHeader />
            <MessageList />
            <ChatComposer />
          </>
        ) : (
          <NoConversationPlaceholder />
        )}
      </div>
    </div>
  );
}
export default ChatPage;
