import { FormatTextName } from "@appflowy-chat/types";
import { ActionBarAIButtonDataBtn } from "./actionBarAIButtons";
import IconText from "@appflowy-chat/assets/icons/text.svg?react";
import IconImage from "@appflowy-chat/assets/icons/image.svg?react";
import IconImageText from "@appflowy-chat/assets/icons/image-text.svg?react";
import IconParagraph from "@appflowy-chat/assets/icons/paragraph.svg?react";
import IconBulletList from "@appflowy-chat/assets/icons/bullet-list.svg?react";
import IconNumList from "@appflowy-chat/assets/icons/num-list.svg?react";
import IconTable from "@appflowy-chat/assets/icons/table.svg?react";

export const FormatTextButtons: ActionBarAIButtonDataBtn<FormatTextName>[] = [
  { icon: <IconText />, name: "text", tooltip: "Text", type: "btn" },
  {
    icon: <IconImage />,
    name: "image_only",
    tooltip: "chat.tooltip.imageOnly",
    type: "btn",
  },
  {
    icon: <IconImageText />,
    name: "image_text",
    tooltip: "chat.tooltip.imageText",
    type: "btn",
  },
  {
    icon: <IconParagraph />,
    name: "paragraph",
    tooltip: "chat.tooltip.paragraph",
    type: "btn",
  },
  {
    icon: <IconBulletList />,
    name: "bullet_list",
    tooltip: "chat.tooltip.bulletList",
    type: "btn",
  },
  {
    icon: <IconNumList />,
    name: "number_list",
    tooltip: "chat.tooltip.numList",
    type: "btn",
  },
  {
    icon: <IconTable />,
    name: "table",
    tooltip: "chat.tooltip.table",
    type: "btn",
  },
];
