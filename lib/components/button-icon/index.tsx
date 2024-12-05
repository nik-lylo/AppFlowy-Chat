import { ComponentProps, FC, ReactNode } from "react";
import clsx from "clsx";

interface Props extends ComponentProps<"button"> {
  icon: ReactNode;
}

const ButtonIcon: FC<Props> = ({ icon, className = "", ...rest }) => {
  return (
    <button {...rest} className={clsx([className, "w-8 h-8 p-1"])}>
      {icon}
    </button>
  );
};

export default ButtonIcon;
