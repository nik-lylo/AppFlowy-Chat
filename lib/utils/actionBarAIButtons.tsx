import { ReactNode } from "react";
import IconCopy from "@appflowy-chat/assets/icons/copy.svg?react";
import IconUndo from "@appflowy-chat/assets/icons/undo.svg?react";
import IconChangeFont from "@appflowy-chat/assets/icons/change-font.svg?react";
import IconAI from "@appflowy-chat/assets/icons/ai.svg?react";
import IconDocForward from "@appflowy-chat/assets/icons/doc-forward.svg?react";
import IconDownload from "@appflowy-chat/assets/icons/download.svg?react";
import { ActionBarAIButtonName, SelectOption } from "@appflowy-chat/types";
import { AIModelOptions } from "./aiModelOptions";
import { FormatTextButtons } from "./formatTextButtons";

export interface ActionBarAIButtonDataDefault<N = string> {
  icon: ReactNode;
  name: N;
  tooltip: string;
}
export interface ActionBarAIButtonDataBtn<N = string>
  extends ActionBarAIButtonDataDefault<N> {
  type: "btn";
}
export interface ActionBarAIButtonDataPopover
  extends ActionBarAIButtonDataDefault<ActionBarAIButtonName> {
  type: "btn-popover";
  withDropdownIcon: boolean;
  optionsData:
    | {
        type: "text";
        options: SelectOption[];
      }
    | {
        type: "btn";
        options: ActionBarAIButtonDataBtn[];
      };
}

export type ActionBarAIButtonData =
  | ActionBarAIButtonDataBtn
  | ActionBarAIButtonDataPopover;

const ActionBarAIButtonsCommon: ActionBarAIButtonData[] = [
  { icon: <IconCopy />, name: "copy", tooltip: "Copy", type: "btn" },
  {
    icon: <IconUndo />,
    name: "try-again",
    tooltip: "Try again",
    type: "btn",
  },
  {
    icon: <IconChangeFont />,
    type: "btn-popover",
    name: "change-format",
    tooltip: "Change format",
    withDropdownIcon: true,
    optionsData: {
      options: FormatTextButtons,
      type: "btn",
    },
  },
  {
    type: "btn-popover",
    icon: <IconAI />,
    name: "switch-model",
    tooltip: "Switch model",
    withDropdownIcon: true,
    optionsData: {
      options: AIModelOptions,
      type: "text",
    },
  },
];
export const ActionBarAIButtonsLastRes: ActionBarAIButtonData[] =
  ActionBarAIButtonsCommon.concat([
    {
      icon: <IconDocForward />,
      name: "add-to-page",
      tooltip: "Add to page",
      type: "btn",
    },
  ]);
export const ActionBarAIButtonsHoverRes: ActionBarAIButtonData[] =
  ActionBarAIButtonsCommon.concat([
    {
      type: "btn",
      icon: <IconDownload />,
      name: "download",
      tooltip: "Download",
    },
  ]);
