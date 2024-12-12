import { TextField } from "@mui/material";
import ButtonIcon from "../button-icon";
import IconArrowUp from "@appflowy-chat/assets/icons/arrow-up.svg?react";
import IconStop from "@appflowy-chat/assets/icons/stop.svg?react";
import "./index.css";
import { ChangeEvent, FormEvent, forwardRef, KeyboardEvent } from "react";

interface IProps {
  value: string;
  isGenerating: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  onStop: () => void;
}

const ChatInput = forwardRef<HTMLInputElement, IProps>(
  ({ onChange, onSubmit, onStop, value, isGenerating }, ref) => {
    function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      if (isGenerating) {
        return;
      }
      onSubmit();
    }
    function handleOnKeyDown(e: KeyboardEvent<HTMLDivElement>) {
      if (e.key !== "Enter") {
        return;
      }
      e.stopPropagation();
      e.preventDefault();

      if (isGenerating || value.trim().length < 3) {
        return;
      }

      onSubmit();
    }
    return (
      <form
        className="w-full border border-ch-primary-gray rounded-lg focus-within:border-ch-accent transition-colors"
        onSubmit={handleOnSubmit}
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
        onKeyDown={handleOnKeyDown}
        inputRef={ref}
        autoFocus
        
        
      />
        <div className="flex justify-between px-2">
          <button className="text-ch-text-caption p-1 text-xs" type="button">
            Format response
          </button>
          <div className="text-ch-accent">
            {isGenerating ? (
              <ButtonIcon
                className=" disabled:text-ch-primary-gray"
                icon={<IconStop className="w-full h-full" />}
                type="button"
                onClick={onStop}
              />
            ) : (
              <ButtonIcon
                disabled={value.trim().length < 3}
                className="disabled:text-ch-text-disabled"
                icon={<IconArrowUp className="w-full h-full" />}
                type="submit"
              />
            )}
          </div>
        </div>
      </form>
    );
  }
);

export default ChatInput;
