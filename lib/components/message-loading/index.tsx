import { FC } from "react";
import LoaderDots from "../loader-dots";
import MessageResponseContent from "../message-response-content";
import AvatarAI from "../avatar-ai";
import { useTranslation } from "react-i18next";

interface IProp {
  body: string;
}

const MessageLoading: FC<IProp> = ({ body }) => {
  const { t } = useTranslation();
  return (
    <div className="w-full flex ">
      <div className="flex gap-3">
        <AvatarAI />

        <div className="pt-2">
          {body ? (
            <MessageResponseContent body={body} />
          ) : (
            <div className="text-ch-primary-gray2 flex gap-2 items-center text-sm">
              <div>{t("chat.loading.generate")}</div>
              <LoaderDots />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageLoading;
