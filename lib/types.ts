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
  | "add-to-page";
