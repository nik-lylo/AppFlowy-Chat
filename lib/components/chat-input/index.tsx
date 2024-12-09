import { TextField } from "@mui/material";
import ButtonIcon from "../button-icon";
import IconArrowUp from "@appflowy-chat/assets/icons/arrow-up.svg?react";
import IconStop from "@appflowy-chat/assets/icons/stop.svg?react";
import "./index.css";
import { ChangeEvent, FC, FormEvent } from "react";

interface IProps {
  value: string;
  isGenerating: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const ChatInput: FC<IProps> = ({ onChange, onSubmit, value, isGenerating }) => {
  return (
    <form
      className="w-full border border-primary-gray rounded-lg focus-within:border-accent transition-colors"
      onSubmit={onSubmit}
    >
      {/* prettier-ignore */}
      <TextField
        id="appflowy-chat-input"
        placeholder="Ask AppFlowy AI"
        multiline
        fullWidth
        className="appflowy-chat-input-root"
        value={value}
        onChange={onChange}
        
      />
      <div className="flex justify-between px-2">
        <button className="text-primary-gray2 p-1 text-xs" type="button">
          Format response
        </button>
        <div>
          <ButtonIcon
            disabled={value.trim().length < 3}
            className="text-accent disabled:text-primary-gray"
            icon={
              !isGenerating ? (
                <IconArrowUp className="w-full h-full" />
              ) : (
                <IconStop className="w-full h-full" />
              )
            }
            type="submit"
          />
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
