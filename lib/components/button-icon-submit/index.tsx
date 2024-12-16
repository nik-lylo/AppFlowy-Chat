import { ComponentProps, FC, ReactNode } from "react";
import clsx from "clsx";

interface Props extends ComponentProps<"button"> {
  icon: ReactNode;
  classSize?: string;
}

const ButtonIcon: FC<Props> = ({
  icon,
  classSize = "w-8 h-8 p-1",
  className = "",
  ...rest
}) => {
  return (
    <button className={clsx([className, classSize])} {...rest}>
      {icon}
    </button>
  );
};

export default ButtonIcon;
