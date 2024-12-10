import { ChatMessageAI } from "@appflowy-chat/types";
import { FC } from "react";
import MessageResponseContent from "../message-response-content";
import AvatarAI from "../avatar-ai";
import ActionBarAI from "../action-bar-ai";

interface IProp {
  message: ChatMessageAI;
  isGenerating?: boolean;
  isLastResponse: boolean;
}

const MessageAI: FC<IProp> = ({ message, isLastResponse }) => {
  return (
    <div className="w-full flex">
      <div className="flex gap-3 ">
        <AvatarAI />

        <div className="flex flex-col">
          <div className="pt-2">
            <MessageResponseContent body={message.body} />
          </div>
          {isLastResponse && <ActionBarAI />}
        </div>
      </div>
    </div>
  );
};

export default MessageAI;
