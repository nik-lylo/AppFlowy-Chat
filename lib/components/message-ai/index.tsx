import { ChatMessageAI } from "@appflowy-chat/types";
import { FC } from "react";
import MessageResponseContent from "../message-response-content";
import AvatarAI from "../avatar-ai";

interface IProp {
  message: ChatMessageAI;
  isGenerating?: boolean;
}

const MessageAI: FC<IProp> = ({ message }) => {
  return (
    <div className="w-full flex">
      <div className="flex gap-3 ">
        <AvatarAI />

        <div className="pt-2">
          <MessageResponseContent body={message.body} />
        </div>
      </div>
    </div>
  );
};

export default MessageAI;
