import { Popover } from "@mui/material";
import React, {
  ComponentProps,
  FC,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import ButtonBarAI from "../button-bar-ai";
import { ActionBarAIButtonName } from "@appflowy-chat/types";
import IconCheck from "@appflowy-chat/assets/icons/check.svg?react";
import IconRegenerate from "@appflowy-chat/assets/icons/regenerate.svg?react";
import "./index.css";
import { ActionBarAIButtonDataPopover } from "@appflowy-chat/utils/actionBarAIButtons";
import TooltipDefault from "../tooltip-default";

interface Props extends ComponentProps<"button"> {
  icon: ReactNode;
  tooltip: string;
  optionsData: ActionBarAIButtonDataPopover["optionsData"];
  activeOption: string;
  btnName: ActionBarAIButtonName;
  onOptionChange: (value: string) => void;
  onPopoverStateChange: (value: boolean) => void;
}

const ButtonBarAIPopover: FC<Props> = ({
  icon,
  tooltip,
  optionsData,
  activeOption,
  onOptionChange,
  onPopoverStateChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [shortOptionName, setShortOptionName] = useState<string>("");

  const rootRef = useRef<HTMLDivElement>(null);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    setIsOpen(true);
    setAnchorEl(e.currentTarget);
    handlePopoverStateChange("open");
  }
  function handleClose() {
    setIsOpen(false);
    setAnchorEl(null);
    setTimeout(() => {
      handlePopoverStateChange("close");
    }, 300);
  }

  function handlePopoverStateChange(action: "open" | "close") {
    onPopoverStateChange(action === "open");
  }

  function handleOptionChange(value: string) {
    if (value === activeOption) {
      return;
    }

    onOptionChange(value);
    handleClose();
  }
  const id = isOpen ? "simple-popover" : undefined;

  useEffect(() => {
    if (optionsData.type === "text") {
      const can = optionsData.options.find(
        (option) => option.value === activeOption
      );
      if (!can) {
        setShortOptionName("");
      } else {
        setShortOptionName(can.shortName || "");
      }
    }
  }, [activeOption, optionsData]);

  return (
    <div ref={rootRef}>
      <ButtonBarAI
        icon={icon}
        aria-describedby={id}
        withDropdownIcon={true}
        tooltip={tooltip}
        btnText={shortOptionName}
        onClick={handleClick}
      />

      {optionsData.type === "text" && (
        <Popover
          id={id}
          className="bar-ai-popover-full"
          open={isOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          classes={{ paper: "-mt-2" }}
          anchorOrigin={{
            horizontal: "center",
            vertical: "top",
          }}
          transformOrigin={{
            horizontal: "center",
            vertical: "bottom",
          }}
          closeAfterTransition={true}
        >
          <div className="bg-white p-2">
            {optionsData.options.map((option) => (
              <div
                className="py-1 px-1.5 text-sm text-primary-dark tracking-wide w-full min-w-52 flex justify-between cursor-pointer"
                key={option.value}
                onClick={() => handleOptionChange(option.value)}
              >
                <div>{option.name}</div>
                {activeOption === option.value && (
                  <IconCheck className="w-4 h-4 flex-shrink-0 text-icon-blue" />
                )}
              </div>
            ))}
          </div>
        </Popover>
      )}

      {optionsData.type === "btn" && (
        <Popover
          id={id}
          className="bar-ai-popover-btns"
          open={isOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          classes={{ paper: "mt-1" }}
          anchorOrigin={{
            horizontal: "center",
            vertical: "bottom",
          }}
          transformOrigin={{
            horizontal: "center",
            vertical: "top",
          }}
          closeAfterTransition={true}
        >
          <div className="py-0.5 px-1 flex gap-1 ">
            {optionsData.options.map((option, index) => {
              return (
                <React.Fragment key={option.name}>
                  {index === 3 && (
                    <div className="h-6 flex items-center">
                      <div className="h-4 w-[1px] bg-line-divider"></div>
                    </div>
                  )}
                  <ButtonBarAI
                    icon={option.icon}
                    tooltip={option.tooltip}
                    iconMainWrapClass={
                      option.name === "image_text"
                        ? "relative w-[1.56rem] h-full [&>svg]:absolute [&>svg]:left-0 [&>svg]:top-1/2 [&>svg]:-translate-y-1/2  [&>svg]:w-[1.56rem] [&>svg]:h-[1.31rem]"
                        : undefined
                    }
                    // onClick={handleClick}
                  />
                </React.Fragment>
              );
            })}
            <TooltipDefault title="Regenerate">
              <button className="h-6 grid place-items-center flex-shrink-0">
                <div className="w-4e h-4e bg-accent rounded-full w-2.5 h-2.5 grid place-items-center">
                  <IconRegenerate className="w-3 h-3 text-white" />
                </div>
              </button>
            </TooltipDefault>
          </div>
        </Popover>
      )}
    </div>
  );
};

export default ButtonBarAIPopover;
