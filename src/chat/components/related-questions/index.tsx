import { useTranslation } from '@/i18n';
import IconChat from '@/assets/icons/chat-outlined.svg?react';
import { FC } from 'react';
import { RelatedQuestion } from '@/types/ai';

interface IProps {
  relatedQuestions: RelatedQuestion[];
  onQuestionClick: (question: RelatedQuestion) => void;
}

const RelatedQuestions: FC<IProps> = ({
  relatedQuestions,
  onQuestionClick,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {relatedQuestions.length > 0 && (
        <div className='-mt-4 mb-2'>
          <div className='text-ch-text-secondary mb-2 text-sm font-semibold'>
            {t('chat.suggestion.title')}
          </div>
          <div className='flex flex-col gap-1'>
            {relatedQuestions.map((question) => (
              <button
                className='hover:bg-ch-fill-hover flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-transparent p-2 transition-colors'
                key={question.content}
                onClick={() => onQuestionClick(question)}
              >
                <IconChat className='text-ch-icon-blue h-4 w-4' />
                <div className='text-ch-text-title text-sm'>
                  {question.content}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RelatedQuestions;
