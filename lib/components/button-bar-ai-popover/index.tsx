import { Popover } from "@mui/material";
import {
  ComponentProps,
  FC,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import ButtonBarAI from "../button-bar-ai";
import { SelectOption } from "@appflowy-chat/types";
import IconCheck from "@appflowy-chat/assets/icons/check.svg?react";
import "./index.css";

interface Props extends ComponentProps<"button"> {
  icon: ReactNode;
  tooltip: string;
  options: SelectOption[];
  activeOption: string;
  onOptionChange: (value: string) => void;
}

const ButtonBarAIPopover: FC<Props> = ({
  icon,
  tooltip,
  options,
  activeOption,
  onOptionChange,
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
    const messageCard =
      rootRef?.current?.closest<HTMLDivElement>(".message-ai");
    if (!messageCard) {
      return;
    }

    messageCard.dataset.popoverOpen = `${action === "open"}`;
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
    const can = options.find((option) => option.value === activeOption);
    if (!can) {
      setShortOptionName("");
    } else {
      setShortOptionName(can.shortName || "");
    }
  }, [activeOption, options]);

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
      <Popover
        id={id}
        className="bar-ai-popover"
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
          {options.map((option) => (
            <div
              className="py-1 px-1.5 text-sm text-primary-dark tracking-wide w-full min-w-52 flex justify-between cursor-pointer"
              key={option.value}
              onClick={() => handleOptionChange(option.value)}
            >
              <div>{option.name}</div>
              {activeOption === option.value && (
                <IconCheck className="w-4 h-4 flex-shrink-0 text-[#00A1CE]" />
              )}
            </div>
          ))}
        </div>
      </Popover>
    </div>
  );
};

export default ButtonBarAIPopover;
