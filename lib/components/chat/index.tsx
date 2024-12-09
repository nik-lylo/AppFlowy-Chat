import { ChangeEvent, FormEvent, useState } from "react";
import ChatInput from "../chat-input/index";
import ContentEmpty from "../content-empty";
import { ChatMessage } from "@appflowy-chat/types";
import { MockChatMessages } from "@appflowy-chat/mock/ChatMessages";
import MessageUser from "../message-user";

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(e.target.value);
  }
  function handleEmptyScreenOptionClick(option: string) {
    setInputValue(option);
  }
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessages((prev) => {
      return [
        ...prev,
        {
          ...MockChatMessages[0],
          body: inputValue,
        },
      ];
    });
    setInputValue("");
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
            <div className="appflowy-chat-content-wrap h-full flex flex-col gap-4">
              {messages.map((message) => {
                if (message.author === "user") {
                  return <MessageUser message={message} key={message.id} />;
                } else {
                  return null;
                }
              })}
            </div>
          ) : (
            <ContentEmpty handleOptionClick={handleEmptyScreenOptionClick} />
          )}
        </div>
        <div className="w-full ">
          <div className="appflowy-chat-content-wrap pb-4 pt-2">
            <ChatInput
              onChange={handleInputChange}
              onSubmit={handleSubmit}
              value={inputValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
