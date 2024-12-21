import React from 'react';
import '@/styles/index.scss';
import { initI18n, ChatI18nContext } from '@/i18n/config';
import Chat from './Chat.tsx';

const i18n = initI18n();

function AppFlowyChat() {
  return (
    <ChatI18nContext.Provider value={i18n}>
      <Chat />
    </ChatI18nContext.Provider>
  );
}

export default AppFlowyChat;