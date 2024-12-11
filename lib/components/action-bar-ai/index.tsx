import { ActionBarAIButtonData } from "@appflowy-chat/utils/actionBarAIButtons";
import ButtonBarAI from "../button-bar-ai";
import { FC } from "react";
import clsx from "clsx";
import ButtonBarAIPopover from "../button-bar-ai-popover";
import { AIModelName } from "@appflowy-chat/types";

interface IProp {
  rootClasses?: string;
  buttons: ActionBarAIButtonData[];
  aiModel: AIModelName;
  onAIModelChange?: (option: AIModelName) => void;
  onPopoverStateChange: (value: boolean) => void;
}

const ActionBarAI: FC<IProp> = ({
  rootClasses,
  buttons,
  aiModel,
  onAIModelChange,
  onPopoverStateChange,
}) => {
  function handleOnOptionChange(value: string) {
    if (onAIModelChange) {
      onAIModelChange(value as AIModelName);
    }
  }

  return (
    <div className={clsx([rootClasses, "flex gap-2"])}>
      {buttons.map((btn) => {
        if (btn.type === "btn-popover") {
          let activeOption = "";

          if (btn.name == "switch-model") {
            activeOption = aiModel;
          }
          return (
            <ButtonBarAIPopover
              icon={btn.icon}
              key={btn.name}
              tooltip={btn.tooltip}
              optionsData={btn.optionsData}
              activeOption={activeOption}
              btnName={btn.name}
              onOptionChange={handleOnOptionChange}
              onPopoverStateChange={onPopoverStateChange}
            />
          );
        } else {
          return (
            <ButtonBarAI icon={btn.icon} key={btn.name} tooltip={btn.tooltip} />
          );
        }
      })}
    </div>
  );
};

export default ActionBarAI;
