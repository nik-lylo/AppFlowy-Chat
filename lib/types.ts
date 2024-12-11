interface ChatMessageCommon {
  id: string;
  body: string;
  created_at: number;
}
export interface ChatMessageUser extends ChatMessageCommon {
  author: "user";
}
export interface ChatMessageAI extends ChatMessageCommon {
  author: "ai";
  aiModel: AIModelName;
}

export interface WSData {
  content: string;
  status: "update" | "end";
}

export type ChatMessage = ChatMessageAI | ChatMessageUser;

export type ActionBarAIButtonName =
  | "copy"
  | "try-again"
  | "change-format"
  | "switch-model"
  | "add-to-page"
  | "download";

export interface SelectOption<V = string> {
  value: V;
  name: string;
  shortName?: string;
}

export type AIModelName =
  | "default"
  | "claude_3_opus"
  | "claude_3_sonnet"
  | "gpt_4omini"
  | "gpt_4o";

export type FormatTextName =
  | "text"
  | "image_text"
  | "image_only"
  | "paragraph"
  | "number_list"
  | "table"
  | "bullet_list";
