import Chat from "@appflowy-chat/components/chat/index";
const ChatTest = () => {
  return (
    <div className="w-full h-full flex">
      <div className="w-full max-w-[300px] p-4 border-r border-r-gray-500 max-h-full">
        Sidebar
      </div>
      <Chat
        userAvatar={
          "https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S-768x768.jpg"
        }
      />
    </div>
  );
};

export default ChatTest;
