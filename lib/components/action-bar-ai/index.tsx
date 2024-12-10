import { ActionBarAIButtons } from "@appflowy-chat/utils/actionBarAIButtons";
import ButtonBarAI from "../button-bar-ai";

const ActionBarAI = () => {
  return (
    <div className="pt-4 pb-8 flex gap-2">
      {ActionBarAIButtons.map((btn) => (
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
