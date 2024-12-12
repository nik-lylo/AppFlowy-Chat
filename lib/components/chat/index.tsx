import { ChangeEvent, FC, useRef, useState } from "react";
import ChatInput from "../chat-input/index";
import ContentEmpty from "../content-empty";
import { ChatMessage, ChatMessageAI, WSData } from "@appflowy-chat/types";
import MessageUser from "../message-user";
import { wait } from "@appflowy-chat/utils/common";
import MessageLoading from "../message-loading";
import { simulateWSResponse } from "@appflowy-chat/utils/simulateWSResponse";
import { MockResponseText } from "@appflowy-chat/mock/ResponseText";
import MessageAI from "../message-ai";
import { DefaultAIModelName } from "@appflowy-chat/utils/defaultAIModelName";

interface IProp {
  userAvatar: string | null | undefined;
}

const Chat: FC<IProp> = ({ userAvatar }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    // ...MockChatMessages.slice(0, 4),
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingBody, setGeneratingBody] = useState("");

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  function handleInputChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(e.target.value);
  }
  function handleEmptyScreenOptionClick(option: string) {
    setInputValue(option);
  }
  function handleSubmit() {
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

  function handleStop() {
    console.log("STOP GENERATE");
  }

  function handleMessageAIChange(data: {
    updValue: Pick<ChatMessageAI, "aiModel">;
    index: number;
  }) {
    setMessages((prevMessages) => {
      const updMessage = prevMessages[data.index];

      prevMessages[data.index] = { ...updMessage, ...data.updValue };
      return [...prevMessages];
    });
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
    scrollToContainerBottomWithDelay();

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
        aiModel: DefaultAIModelName,
      },
    ]);
    scrollToContainerBottomWithDelay();
    setGeneratingBody("");
    setIsGenerating(false);
    chatInputRef.current?.focus();
  }

  function scrollToContainerBottom() {
    if (!chatContainerRef.current) {
      return;
    }

    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
    });
  }

  function scrollToContainerBottomWithDelay() {
    setTimeout(() => {
      scrollToContainerBottom();
    }, 10);
  }
  return (
    <div className="flex-auto flex flex-col overflow-auto h-full relative bg-ch-bg-base">
      <div className="absolute top-0 left-0 h-full max-h-full flex flex-col w-full ">
        <header className="w-full flex-none px-4 py-3 flex items-center justify-between">
          <div className=" text-ch-primary-dark  text-sm">
            <div>Space Name...</div>{" "}
          </div>
          <div>
            <button className="py-1.5 px-3 rounded-lg text-sm text-white font-medium bg-ch-accent">
              Share
            </button>
          </div>
        </header>
        <div
          className="flex-auto w-full overflow-auto relative"
          ref={chatContainerRef}
        >
          {messages.length > 0 ? (
            <div className="appflowy-chat-content-wrap min-h-full flex flex-col gap-4">
              {messages.map((message, index, messages) => {
                if (message.author === "user") {
                  return (
                    <MessageUser
                      avatar={userAvatar}
                      message={message}
                      key={message.id}
                    />
                  );
                } else {
                  return (
                    <MessageAI
                      message={message}
                      key={message.id}
                      isLastResponse={index === messages.length - 1}
                      onAIModelChange={(option) =>
                        handleMessageAIChange({
                          index,
                          updValue: { aiModel: option },
                        })
                      }
                    />
                  );
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
              onStop={handleStop}
              isGenerating={isGenerating}
              value={inputValue}
              ref={chatInputRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
