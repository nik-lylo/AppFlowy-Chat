import { ChangeEvent, FC, FormEvent, useRef, useState } from "react";
import ChatInput from "../chat-input/index";
import ContentEmpty from "../content-empty";
import { ChatMessage, WSData } from "@appflowy-chat/types";
import { MockChatMessages } from "@appflowy-chat/mock/ChatMessages";
import MessageUser from "../message-user";
import { wait } from "@appflowy-chat/utils/common";
import MessageLoading from "../message-loading";
import { simulateWSResponse } from "@appflowy-chat/utils/simulateWSResponse";
import { MockResponseText } from "@appflowy-chat/mock/ResponseText";
import MessageAI from "../message-ai";

interface IProp {
  userAvatar: string | null | undefined;
}

const Chat: FC<IProp> = ({ userAvatar }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    ...MockChatMessages.slice(0, 2),
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingBody, setGeneratingBody] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

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
          body: inputValue,
          author: "user",
          created_at: Date.now(),
          id: Date.now().toString(),
        },
      ];
    });

    setInputValue("");

    generateResponse(inputValue);
  }

  async function generateResponse(inputVal: string) {
    let generatingBodyLocal = "";
    function handleWSResponse(data: WSData) {
      if (data.status === "update") {
        setGeneratingBody((prev) => prev + data.content);
        generatingBodyLocal = generatingBodyLocal + data.content;
      }
      scrollToContainerBottom();
    }
    setIsGenerating(true);
    console.log(inputVal);
    await wait(500);

    await simulateWSResponse(handleWSResponse, MockResponseText.slice(0, 300));

    setMessages((prev) => [
      ...prev,

      {
        author: "ai",
        body: generatingBodyLocal,
        created_at: Date.now(),
        id: Date.now().toString(),
      },
    ]);
    setGeneratingBody("");
    setIsGenerating(false);
  }

  function scrollToContainerBottom() {
    if (!chatContainerRef.current) {
      return;
    }

    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
    });
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
        <div
          className="flex-auto w-full overflow-auto relative"
          ref={chatContainerRef}
        >
          {messages.length > 0 ? (
            <div className="appflowy-chat-content-wrap h-full flex flex-col gap-4">
              {messages.map((message) => {
                if (message.author === "user") {
                  return (
                    <MessageUser
                      avatar={userAvatar}
                      message={message}
                      key={message.id}
                    />
                  );
                } else {
                  return <MessageAI message={message} key={message.id} />;
                }
              })}

              {isGenerating && <MessageLoading body={generatingBody} />}
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
              isGenerating={isGenerating}
              value={inputValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
