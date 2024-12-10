import { ReactNode } from "react";
import IconCopy from "@appflowy-chat/assets/icons/copy.svg?react";
import IconUndo from "@appflowy-chat/assets/icons/undo.svg?react";
import IconChangeFont from "@appflowy-chat/assets/icons/change-font.svg?react";
import IconAI from "@appflowy-chat/assets/icons/ai.svg?react";
import IconDocForward from "@appflowy-chat/assets/icons/doc-forward.svg?react";
import { ActionBarAIButtonName } from "@appflowy-chat/types";

export const ActionBarAIButtons: {
  icon: ReactNode;
  name: ActionBarAIButtonName;
  tooltip: string;
  withDropdownIcon?: boolean;
}[] = [
  { icon: <IconCopy />, name: "copy", tooltip: "Copy" },
  {
    icon: <IconUndo />,
    name: "try-again",
    tooltip: "Try again",
    withDropdownIcon: true,
  },
  {
    icon: <IconChangeFont />,
    name: "change-format",
    tooltip: "Change format",
    withDropdownIcon: true,
  },
  { icon: <IconAI />, name: "switch-model", tooltip: "Switch model" },
  { icon: <IconDocForward />, name: "add-to-page", tooltip: "Add to page" },
];
