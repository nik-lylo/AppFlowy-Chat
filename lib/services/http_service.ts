import { ChatSettings, CreateChatParams, UpdateChatParams, CreateChatMessageParams, ChatMessage, QuestionStream, RelatedQuestion, MessageCursor, RepeatedChatMessage } from "@appflowy-chat/types/ai";
import { Response } from "@appflowy-chat/types/response";



export abstract class ChatHttpService {
  abstract createChat(workspace_id: string, params: CreateChatParams): Promise<Response<void>>;
  abstract deleteChat(workspace_id: string, chat_id: string): Promise<Response<void>>;

  // Settings
  abstract updateChatSettings(workspace_id: string, params: UpdateChatParams): Promise<Response<void>>;
  abstract getChatSettings(workspace_id: string, chat_id: string): Promise<Response<ChatSettings>>;

  // Messages
  abstract getChatMessages(workspace_id: string, chat_id: string, offset: MessageCursor, limit: number): Promise<Response<RepeatedChatMessage>>;
  abstract sendMessage(workspace_id: string, chat_id: string, params: CreateChatMessageParams): Promise<Response<ChatMessage>>;
  abstract streamMessageResponse(workspace_id: string, chat_id: string, message_id: number): Promise<Response<QuestionStream>>;

  // Related Questions
  abstract getRelatedQuestions(workspace_id: string, chat_id: string, message_id: number): Promise<Response<RelatedQuestion[]>>;
}
