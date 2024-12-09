interface ChatMessageCommon {
  id: string;
  body: string;
  created_at: number;
}
export interface ChatMessageUser extends ChatMessageCommon {
  author: "user";
  user: {
    name: string;
    avatar: string;
  };
}
export interface ChatMessageAI extends ChatMessageCommon {
  author: "ai";
}

export type ChatMessage = ChatMessageAI | ChatMessageUser;
