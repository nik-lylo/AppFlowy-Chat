import { TextField } from "@mui/material";
import ButtonIcon from "../button-icon";
import IconArrowUp from "@appflowy-chat/assets/icons/arrow-up.svg?react";
import IconStop from "@appflowy-chat/assets/icons/stop.svg?react";
import { ChangeEvent, FormEvent, forwardRef, KeyboardEvent } from "react";
import "./index.css";
import { useTranslation } from "react-i18next";
import { ResponseFormatMode, ResponseFormatType } from "@appflowy-chat/types";
import FormatBarOptions from "../format-bar-options";
import { FormatTextButtons } from "@appflowy-chat/utils/formatTextButtons";

interface IProps {
  value: string;
  isGenerating: boolean;
  formatMode: ResponseFormatMode;
  formatType: ResponseFormatType;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeFormatMode: (value: ResponseFormatMode) => void;
  onChangeFormatType: (value: ResponseFormatType) => void;
  onSubmit: () => void;
  onStop: () => void;
}

const ChatInput = forwardRef<HTMLInputElement, IProps>(
  (
    {
      onStop,
      value,
      isGenerating,
      formatMode,
      onChange,
      onSubmit,
      onChangeFormatMode,
      onChangeFormatType,
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

    function handleClickFormatTypeOption(value: string) {
      onChangeFormatType(value as ResponseFormatType);
    }

    return (
      <form
        className="w-full border border-ch-primary-gray rounded-lg focus-within:border-ch-accent transition-colors appflowy-chat-input-wrap"
        onSubmit={handleOnSubmit}
        data-format-mode={formatMode}
      >
        {formatMode === "custom" && (
          <div className="p-1">
            <FormatBarOptions
              options={FormatTextButtons}
              onOptionChange={handleClickFormatTypeOption}
            ></FormatBarOptions>
          </div>
        )}

        {/* prettier-ignore */}
        <TextField
        id="appflowy-chat-input"
        placeholder={formatMode === 'auto'?t('chat.input.placeholder'):t('chat.input.placeholderFormat')}
        multiline
        fullWidth
        className="appflowy-chat-input-root"
        value={value}
        onChange={onChange}
        onKeyDown={handleOnKeyDown}
        inputRef={ref}
        autoFocus
        
        
      />
        <div className="flex justify-between px-2 pt-0.5">
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
                className="disabled:text-ch-primary-gray"
                classSize="w-5 h-5"
                icon={<IconStop className="w-full h-full" />}
                type="button"
                onClick={onStop}
              />
            ) : (
              <ButtonIcon
                className="disabled:text-ch-text-disabled"
                classSize="w-5 h-5"
                disabled={value.trim().length < 3}
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
