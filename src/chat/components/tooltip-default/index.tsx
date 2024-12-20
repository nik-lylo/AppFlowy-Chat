import { Tooltip } from "@mui/material";
import { FC, ReactElement } from "react";
import "./index.css";

interface IProp {
  children: ReactElement;
  title: string;
}

const TooltipDefault: FC<IProp> = ({ children, title }) => {
  return (
    <Tooltip classes={{ popperInteractive: "tooltip-default" }} title={title}>
      {children}
    </Tooltip>
  );
};

export default TooltipDefault;
