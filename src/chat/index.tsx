import '@/styles/index.scss';
import { initI18n, ChatI18nContext } from '@/i18n/config';
import Chat, { IProp } from './Chat';

const i18n = initI18n();

function AppFlowyChat(props: IProp) {
  return (
    <ChatI18nContext.Provider value={i18n}>
      <Chat {...props} />
    </ChatI18nContext.Provider>
  );
}

export default AppFlowyChat;