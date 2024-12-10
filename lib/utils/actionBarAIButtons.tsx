import { ReactNode } from "react";
import IconCopy from "@appflowy-chat/assets/icons/copy.svg?react";
import IconUndo from "@appflowy-chat/assets/icons/undo.svg?react";
import IconChangeFont from "@appflowy-chat/assets/icons/change-font.svg?react";
import IconAI from "@appflowy-chat/assets/icons/ai.svg?react";
import IconDocForward from "@appflowy-chat/assets/icons/doc-forward.svg?react";
import IconDownload from "@appflowy-chat/assets/icons/download.svg?react";
import { ActionBarAIButtonName } from "@appflowy-chat/types";

export interface ActionBarAIButtonData {
  icon: ReactNode;
  name: ActionBarAIButtonName;
  tooltip: string;
  withDropdownIcon?: boolean;
}
const ActionBarAIButtonsCommon: ActionBarAIButtonData[] = [
  { icon: <IconCopy />, name: "copy", tooltip: "Copy" },
  {
    icon: <IconUndo />,
    name: "try-again",
    tooltip: "Try again",
  },
  {
    icon: <IconChangeFont />,
    name: "change-format",
    tooltip: "Change format",
    withDropdownIcon: true,
  },
  {
    icon: <IconAI />,
    name: "switch-model",
    tooltip: "Switch model",
    withDropdownIcon: true,
  },
];
export const ActionBarAIButtonsLastRes: ActionBarAIButtonData[] =
  ActionBarAIButtonsCommon.concat([
    { icon: <IconDocForward />, name: "add-to-page", tooltip: "Add to page" },
  ]);
export const ActionBarAIButtonsHoverRes: ActionBarAIButtonData[] =
  ActionBarAIButtonsCommon.concat([
    { icon: <IconDownload />, name: "download", tooltip: "Download" },
  ]);
