import { AIModelName, ChatMessageAI } from "@appflowy-chat/types";
import { FC, useState } from "react";
import MessageResponseContent from "../message-response-content";
import AvatarAI from "../avatar-ai";
import ActionBarAI from "../action-bar-ai";
import {
  ActionBarAIButtonsHoverRes,
  ActionBarAIButtonsLastRes,
} from "@appflowy-chat/utils/actionBarAIButtons";
import "./index.css";

interface IProp {
  message: ChatMessageAI;
  isGenerating?: boolean;
  isLastResponse: boolean;
  onAIModelChange: (option: AIModelName) => void;
}

const MessageAI: FC<IProp> = ({ message, isLastResponse, onAIModelChange }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  function handleOnAIModelChange(option: AIModelName) {
    console.log(option, "option");
    onAIModelChange(option);
  }

  function handleOnPopoverStateChange(isOpen: boolean) {
    setIsPopoverOpen(isOpen);
  }

  return (
    <div
      className="w-full flex group message-ai"
      data-popover-open={isPopoverOpen}
    >
      <div className="flex gap-3 ">
        <AvatarAI />

        <div className="flex flex-col">
          <div className="pt-2">
            <MessageResponseContent body={message.body} />
          </div>
          {isLastResponse ? (
            <ActionBarAI
              rootClasses="pt-4 pb-8"
              buttons={ActionBarAIButtonsLastRes}
              aiModel={message.aiModel}
              onAIModelChange={handleOnAIModelChange}
              onPopoverStateChange={handleOnPopoverStateChange}
            />
          ) : (
            <div className="message-ai-bar-wrap relative invisible opacity-0 group-hover:opacity-100 hover:opacity-100 group-hover:visible hover:visible transition-opacity">
              <div className="absolute top-0 left-0 w-full h-2"></div>
              <ActionBarAI
                rootClasses="absolute top-2 left-0 p-0.5 rounded-lg border border-ch-line-border shadow-light-menu"
                buttons={ActionBarAIButtonsHoverRes}
                aiModel={message.aiModel}
                onAIModelChange={handleOnAIModelChange}
                onPopoverStateChange={handleOnPopoverStateChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageAI;
