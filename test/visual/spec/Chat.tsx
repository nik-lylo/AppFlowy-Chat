import Chat from "@appflowy-chat/components/chat/index";
const ChatTest = () => {
  return (
    <div className="w-full h-full flex">
      <div className="w-full max-w-[300px] p-4 border-r border-r-gray-500 max-h-full">
        Sidebar
      </div>
      <Chat />
    </div>
  );
};

export default ChatTest;
