import { FC } from "react";
import Logo from "@appflowy-chat/assets/logo.svg?react";
import LoaderDots from "../loader-dots";

interface IProp {
  body: string;
}

const MessageLoading: FC<IProp> = ({ body }) => {
  return (
    <div className="w-full flex ">
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full overflow-hidden border border-primary-dark2/10 flex-shrink-0 flex justify-center items-center">
          <Logo className="w-4 h-4" />
        </div>

        <div className="rounded-2xl text-sm pt-2">
          {body ? (
            <div>{body}</div>
          ) : (
            <div className="text-primary-gray2 flex gap-2 items-center">
              <div>Working on it</div>
              <LoaderDots />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageLoading;
