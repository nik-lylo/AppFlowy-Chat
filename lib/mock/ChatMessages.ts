import { ChatMessage, ChatMessageUser } from "@appflowy-chat/types";

const MockUserData: ChatMessageUser["user"] = {
  avatar:
    "https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S-768x768.jpg",
  name: "John Smith",
};

export const MockChatMessages: ChatMessage[] = [
  {
    id: "1",
    author: "user",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    created_at: 8493849348,
    user: MockUserData,
  },
  { id: "2", author: "ai", body: "", created_at: 8493849348 },
];
