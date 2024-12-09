import { ChatMessageUser } from "@appflowy-chat/types";
import { FC } from "react";
import MessageCardAvatar from "../message-card-avatar";

interface IProp {
  message: ChatMessageUser;
  avatar: string | null | undefined;
}

const MessageUser: FC<IProp> = ({ message, avatar }) => {
  return (
    <div className="w-full flex justify-end">
      <div className="flex gap-3 max-w-[25rem]">
        <div className="px-4 py-2 rounded-2xl bg-[#F7F8FC] text-sm">
          {message.body}
        </div>

        <MessageCardAvatar url={avatar || ""} />
      </div>
    </div>
  );
};

export default MessageUser;
