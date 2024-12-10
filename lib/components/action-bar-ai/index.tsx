import { ActionBarAIButtonData } from "@appflowy-chat/utils/actionBarAIButtons";
import ButtonBarAI from "../button-bar-ai";
import { FC } from "react";
import clsx from "clsx";

interface IProp {
  rootClasses?: string;
  buttons: ActionBarAIButtonData[];
}

const ActionBarAI: FC<IProp> = ({ rootClasses, buttons }) => {
  return (
    <div className={clsx([rootClasses, "flex gap-2"])}>
      {buttons.map((btn) => (
        <ButtonBarAI
          withDropdownIcon={btn.withDropdownIcon}
          icon={btn.icon}
          key={btn.name}
        />
      ))}
    </div>
  );
};

export default ActionBarAI;
