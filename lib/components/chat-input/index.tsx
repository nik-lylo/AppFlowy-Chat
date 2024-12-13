import { TextField } from "@mui/material";
import ButtonIcon from "../button-icon";
import IconArrowUp from "@appflowy-chat/assets/icons/arrow-up.svg?react";
import IconStop from "@appflowy-chat/assets/icons/stop.svg?react";
import { ChangeEvent, FormEvent, forwardRef, KeyboardEvent } from "react";
import "./index.css";
import { useTranslation } from "react-i18next";
import { ResponseFormatMode } from "@appflowy-chat/types";

interface IProps {
  value: string;
  formatMode: ResponseFormatMode;
  isGenerating: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeFormatMode: (value: ResponseFormatMode) => void;
  onSubmit: () => void;
  onStop: () => void;
}

const ChatInput = forwardRef<HTMLInputElement, IProps>(
  (
    {
      onChange,
      onSubmit,
      onStop,
      value,
      isGenerating,
      formatMode,
      onChangeFormatMode,
    },
    ref
  ) => {
    const { t } = useTranslation();

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

    function handleClickFormatModeButton() {
      if (formatMode === "custom") {
        onChangeFormatMode("auto");
      } else {
        onChangeFormatMode("custom");
      }
    }
    return (
      <form
        className="w-full border border-ch-primary-gray rounded-lg focus-within:border-ch-accent transition-colors"
        onSubmit={handleOnSubmit}
      >
        {/* prettier-ignore */}
        <TextField
        id="appflowy-chat-input"
        placeholder={t('chat.input.placeholder')}
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
          <div className="flex items-end pb-0.5">
            <button
              className="rounded text-ch-text-caption h-fit p-1 text-xs transition-colors bg-transparent hover:bg-ch-fill-hover flex"
              type="button"
              onClick={handleClickFormatModeButton}
            >
              {formatMode === "auto"
                ? t("chat.input.button.format")
                : t("chat.input.button.auto")}
            </button>
          </div>
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
