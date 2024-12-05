import Logo from "@appflowy-chat/assets/logo.svg?react";
import { ContentEmptyOptions } from "@appflowy-chat/utils/contentEmptyOptions";

const ContentEmpty = () => {
  return (
    <div className="h-full flex justify-center items-center appflowy-chat-content-wrap">
      <div className="max-w-[28rem] w-full text-sm">
        <div className="w-full flex justify-center mb-4">
          <Logo />
        </div>
        <div className="text-dark2 mb-8 text-center">
          HI Vivian! How can I help you today?
        </div>
        <div className="flex flex-col gap-4 items-center">
          {ContentEmptyOptions.map((option) => (
            <button
              className="w-fit px-4 py-2 text-sm text-gray2 bg-white transition-colors border border-primary-dark2/10 rounded-2xl shadow-light-card hover:bg-[#F9FAFD]"
              key={option}
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
