import { FC } from "react";

interface IProps {
  body: string;
}

const MessageResponseContent: FC<IProps> = ({ body }) => {
  return <div className="text-sm">{body}</div>;
};

export default MessageResponseContent;
