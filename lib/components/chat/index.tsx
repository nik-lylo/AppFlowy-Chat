import { ChangeEvent, useState } from "react";
import ChatInput from "../chat-input/index";
import ContentEmpty from "../content-empty";

const Chat = () => {
  const [messages] = useState<{ text: string }[]>([]);
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(e.target.value);
  }

  return (
    <div className="flex-auto flex flex-col overflow-auto h-full relative ">
      <div className="absolute top-0 left-0 h-full max-h-full flex flex-col w-full ">
        <header className="w-full flex-none px-4 py-3 flex items-center justify-between">
          <div className=" text-primary-dark  text-sm">Space Name... </div>
          <div>
            <button className="py-1.5 px-3 rounded-lg text-sm text-white font-medium bg-accent">
              Share
            </button>
          </div>
        </header>
        <div className="flex-auto w-full overflow-auto relative">
          {messages.length > 0 ? (
            <div className="appflowy-chat-content-wrap h-full">Messages</div>
          ) : (
            <ContentEmpty />
          )}
        </div>
        <div className="w-full ">
          <div className="appflowy-chat-content-wrap pb-4 pt-2">
            <ChatInput onChange={handleInputChange} value={inputValue} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
