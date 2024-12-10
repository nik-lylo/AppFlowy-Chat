import { AIModelName, ChatMessageAI } from "@appflowy-chat/types";
import { FC } from "react";
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
  function handleOnAIModelChange(option: AIModelName) {
    console.log(option, "option");
    onAIModelChange(option);
  }

  return (
    <div className="w-full flex group message-ai">
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
            />
          ) : (
            <div className="message-ai-bar-wrap relative invisible opacity-0 group-hover:opacity-100 hover:opacity-100 group-hover:visible hover:visible transition-opacity">
              <div className="absolute top-0 left-0 w-full h-2"></div>
              <ActionBarAI
                rootClasses="absolute top-2 left-0 p-0.5 rounded-lg border border-primary-dark2/[0.12] shadow-light-menu"
                buttons={ActionBarAIButtonsHoverRes}
                aiModel={message.aiModel}
                onAIModelChange={handleOnAIModelChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageAI;
