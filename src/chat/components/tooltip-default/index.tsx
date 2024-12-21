import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { FC, ReactElement } from "react";
import "./index.css";

interface IProp {
  children: ReactElement;
  title: string;
}

const TooltipDefault: FC<IProp> = ({ children, title }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipContent>{title}</TooltipContent>
        <TooltipTrigger>{children}</TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipDefault;
