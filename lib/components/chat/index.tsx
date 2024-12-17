import { ChangeEvent, FC, useRef, useState } from 'react';
import ChatInput from '../chat-input/index';
import ContentEmpty from '../content-empty';
import {
  ChatMessage,
  ChatMessageAI,
  FilePreview,
  ResponseFormatMode,
  ResponseFormatType,
  WSData,
} from '@appflowy-chat/types';
import MessageUser from '../message-user';
import { wait } from '@appflowy-chat/utils/common';
import MessageLoading from '../message-loading';
import { simulateWSResponse } from '@appflowy-chat/utils/simulateWSResponse';
import { MockResponseText } from '@appflowy-chat/mock/ResponseText';
import MessageAI from '../message-ai';
import { DefaultAIModelName } from '@appflowy-chat/utils/defaultAIModelName';
import { MockChatMessages } from '@appflowy-chat/mock/ChatMessages';

interface IProp {
  userAvatar: string | null | undefined;
}

const Chat: FC<IProp> = ({ userAvatar }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    ...MockChatMessages.slice(0, 0),
  ]);
  const [inputValue, setInputValue] = useState('');
  const [responseFormatMode, setResponseFormatMode] =
    useState<ResponseFormatMode>('auto');
  const [responseFormatType, setResponseFormatType] =
    useState<ResponseFormatType>('text');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingBody, setGeneratingBody] = useState('');
  const [attachments, setAttachments] = useState<FilePreview[]>([]);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  function handleInputChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(e.target.value);
  }
  function handleEmptyScreenOptionClick(option: string) {
    setInputValue(option);
  }
  function handleSubmit() {
    setMessages((prev) => {
      return [
        ...prev,
        {
          body: inputValue,
          author: 'user',
          created_at: Date.now(),
          id: Date.now().toString(),
        },
      ];
    });

    setInputValue('');

    generateResponse(inputValue);
  }

  function handleStop() {
    console.log('STOP GENERATE');
  }
  function handleChangeFormatMode(value: ResponseFormatMode) {
    setResponseFormatMode(value);
  }
  function handleChangeFormatType(value: ResponseFormatType) {
    setResponseFormatType(value);
  }

  function handleMessageAIChange(data: {
    updValue: Pick<ChatMessageAI, 'aiModel'>;
    index: number;
  }) {
    setMessages((prevMessages) => {
      const updMessage = prevMessages[data.index];

      prevMessages[data.index] = { ...updMessage, ...data.updValue };
      return [...prevMessages];
    });
  }
  function handleAttachmentsChange(data: FilePreview[]) {
    setAttachments(data);
  }

  async function generateResponse(inputVal: string) {
    let generatingBodyLocal = '';
    function handleWSResponse(data: WSData) {
      if (data.status === 'update') {
        setGeneratingBody((prev) => prev + data.content);
        generatingBodyLocal = generatingBodyLocal + data.content;
      }
      scrollToContainerBottom();
    }
    setIsGenerating(true);
    scrollToContainerBottomWithDelay();

    console.log(inputVal);
    await wait(500);

    await simulateWSResponse(handleWSResponse, MockResponseText.slice(0, 300));

    const responseFormatTypeLocal: ChatMessageAI['formatType'] =
      responseFormatMode === 'auto' ? 'auto' : responseFormatType;

    setMessages((prev) => [
      ...prev,

      {
        author: 'ai',
        body: generatingBodyLocal,
        created_at: Date.now(),
        id: Date.now().toString(),
        aiModel: DefaultAIModelName,
        formatType: responseFormatTypeLocal,
      },
    ]);
    scrollToContainerBottomWithDelay();
    setGeneratingBody('');
    setIsGenerating(false);
    chatInputRef.current?.focus();
  }

  function scrollToContainerBottom() {
    if (!chatContainerRef.current) {
      return;
    }

    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
    });
  }

  function scrollToContainerBottomWithDelay() {
    setTimeout(() => {
      scrollToContainerBottom();
    }, 10);
  }
  return (
    <div className='relative flex h-full flex-auto flex-col overflow-auto bg-ch-bg-base'>
      <div className='absolute left-0 top-0 flex h-full max-h-full w-full flex-col'>
        <header className='flex w-full flex-none items-center justify-between px-4 py-3'>
          <div className='text-sm text-ch-text-content'>
            <div>Space Name...</div>{' '}
          </div>
          <div>
            <button className='rounded-lg bg-ch-accent px-3 py-1.5 text-sm font-medium text-white'>
              Share
            </button>
          </div>
        </header>
        <div
          className='relative w-full flex-auto overflow-auto text-ch-text-content'
          ref={chatContainerRef}
        >
          {messages.length > 0 ? (
            <div className='appflowy-chat-content-wrap flex min-h-full flex-col gap-4'>
              {messages.map((message, index, messages) => {
                if (message.author === 'user') {
                  return (
                    <MessageUser
                      avatar={userAvatar}
                      message={message}
                      key={message.id}
                    />
                  );
                } else {
                  return (
                    <MessageAI
                      message={message}
                      key={message.id}
                      isLastResponse={index === messages.length - 1}
                      onAIModelChange={(option) =>
                        handleMessageAIChange({
                          index,
                          updValue: { aiModel: option },
                        })
                      }
                    />
                  );
                }
              })}

              {isGenerating && <MessageLoading body={generatingBody} />}
            </div>
          ) : (
            <ContentEmpty handleOptionClick={handleEmptyScreenOptionClick} />
          )}
        </div>
        <div className='w-full'>
          <div className='appflowy-chat-content-wrap pb-4 pt-2'>
            <ChatInput
              value={inputValue}
              formatMode={responseFormatMode}
              formatType={responseFormatType}
              isGenerating={isGenerating}
              attachments={attachments}
              onAttachmentsChange={handleAttachmentsChange}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
              onStop={handleStop}
              onChangeFormatMode={handleChangeFormatMode}
              onChangeFormatType={handleChangeFormatType}
              ref={chatInputRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
