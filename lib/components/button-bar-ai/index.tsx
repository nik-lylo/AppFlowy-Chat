import { ComponentProps, FC, ReactNode } from "react";
import clsx from "clsx";
import IconChevron from "@appflowy-chat/assets/icons/chevron.svg?react";
import TooltipDefault from "../tooltip-default";

interface Props extends ComponentProps<"button"> {
  icon: ReactNode;
  tooltip: string;
  withDropdownIcon?: boolean;
}

const ButtonBarAI: FC<Props> = ({
  icon,
  withDropdownIcon,
  className = "",
  tooltip,
  ...rest
}) => {
  return (
    <TooltipDefault title={tooltip}>
      <button
        className={clsx([
          className,
          "flex gap-[1px] h-6 p-1 text-primary-gray2 rounded-lg hover:bg-primary-dark2/[.06] transition-colors",
        ])}
        data-tooltip-id="base-tooltip"
        data-tooltip-content="Hello world!"
        {...rest}
      >
        <div className="w-full h-full [&>svg]:w-4 [&>svg]:h-4">{icon}</div>

        {withDropdownIcon && (
          <div className="h-full [&>svg]:w-2.5 [&>svg]:h-2.5 text-[#8F959E] flex items-center justify-center flex-shrink-0">
            <IconChevron className="w-2.5 h-2.5" />
          </div>
        )}
      </button>
    </TooltipDefault>
  );
};

export default ButtonBarAI;
