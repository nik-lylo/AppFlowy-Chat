import { ChatMessageAI } from "@appflowy-chat/types";
import { FC } from "react";
import MessageResponseContent from "../message-response-content";
import AvatarAI from "../avatar-ai";
import ActionBarAI from "../action-bar-ai";
import {
  ActionBarAIButtonsHoverRes,
  ActionBarAIButtonsLastRes,
} from "@appflowy-chat/utils/actionBarAIButtons";

interface IProp {
  message: ChatMessageAI;
  isGenerating?: boolean;
  isLastResponse: boolean;
}

const MessageAI: FC<IProp> = ({ message, isLastResponse }) => {
  return (
    <div className="w-full flex group">
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
            />
          ) : (
            <div className="relative invisible opacity-0 group-hover:opacity-100 hover:opacity-100 group-hover:visible hover:visible transition-opacity">
              <div className="absolute top-0 left-0 w-full h-2"></div>
              <ActionBarAI
                rootClasses="absolute top-2 left-0 p-0.5 rounded-lg border border-primary-dark2/[0.12]"
                buttons={ActionBarAIButtonsHoverRes}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageAI;
