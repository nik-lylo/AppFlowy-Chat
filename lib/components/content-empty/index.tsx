import Logo from "@appflowy-chat/assets/logo.svg?react";
import { ContentEmptyOptions } from "@appflowy-chat/utils/contentEmptyOptions";
import { FC } from "react";

interface IProps {
  handleOptionClick: (option: string) => void;
}

const ContentEmpty: FC<IProps> = ({ handleOptionClick }) => {
  return (
    <div className="h-full flex justify-center items-center appflowy-chat-content-wrap">
      <div className="max-w-[28rem] w-full text-sm">
        <div className="w-full flex justify-center mb-4">
          <Logo />
        </div>
        <div className="text-ch-text-title mb-8 text-center">
          HI Vivian! How can I help you today?
        </div>
        <div className="flex flex-col gap-4 items-center">
          {ContentEmptyOptions.map((option) => (
            <button
              className="w-fit px-4 py-2 text-sm text-ch-text-caption bg-ch-bg-base transition-colors border border-ch-line-border rounded-2xl shadow-card hover:bg-ch-fill-active"
              key={option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
          <button></button>
        </div>
      </div>
    </div>
  );
};

export default ContentEmpty;
