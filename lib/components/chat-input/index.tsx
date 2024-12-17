import { TextField } from '@mui/material';
import ButtonIconSubmit from '../button-icon-submit';
import IconArrowUp from '@appflowy-chat/assets/icons/arrow-up.svg?react';
import IconStop from '@appflowy-chat/assets/icons/stop.svg?react';
import IconClip from '@appflowy-chat/assets/icons/clip.svg?react';
import { ChangeEvent, FormEvent, forwardRef, KeyboardEvent } from 'react';
import './index.css';
import { useTranslation } from 'react-i18next';
import {
  FilePreview,
  ResponseFormatMode,
  ResponseFormatType,
} from '@appflowy-chat/types';
import FormatBarOptions from '../format-bar-options';
import { FormatTextButtons } from '@appflowy-chat/utils/formatTextButtons';
import ButtonIcon from '../button-icon';
import { SupportedAttachmentExtensions } from '@appflowy-chat/utils/supportedAttachmentExtensions';
import FilesPreview from '../files-preview';
import { v4 } from 'uuid';

interface IProps {
  value: string;
  isGenerating: boolean;
  formatMode: ResponseFormatMode;
  formatType: ResponseFormatType;
  attachments: FilePreview[];
  onAttachmentsChange: (newAttach: FilePreview[]) => void;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeFormatMode: (value: ResponseFormatMode) => void;
  onChangeFormatType: (value: ResponseFormatType) => void;
  onSubmit: () => void;
  onStop: () => void;
}

const ChatInput = forwardRef<HTMLInputElement, IProps>(
  (
    {
      onStop,
      value,
      isGenerating,
      formatMode,
      formatType,
      attachments,
      onAttachmentsChange,
      onChange,
      onSubmit,
      onChangeFormatMode,
      onChangeFormatType,
    },
    ref
  ) => {
    const { t } = useTranslation();

    function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      if (isGenerating) {
        return;
      }
      onSubmit();
    }
    function handleOnKeyDown(e: KeyboardEvent<HTMLDivElement>) {
      if (e.key !== 'Enter') {
        return;
      }
      e.stopPropagation();
      e.preventDefault();

      if (isGenerating || value.trim().length < 3) {
        return;
      }

      onSubmit();
    }

    function handleClickFormatModeButton() {
      if (formatMode === 'custom') {
        onChangeFormatMode('auto');
      } else {
        onChangeFormatMode('custom');
      }

      if (typeof ref === 'object' && ref?.current) {
        ref.current.focus();
      }
    }

    function handleClickFormatTypeOption(value: string) {
      onChangeFormatType(value as ResponseFormatType);
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
      const files = e.target.files;

      if (files) {
        const newFiles: FilePreview[] = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const reader = new FileReader();

          reader.onload = (e) => {
            const url = e.target?.result as string;
            const ext = file.name.split('.').pop() as FilePreview['ext'];
            let preview: FilePreview['preview'] = 'image';
            if (ext === 'pdf') {
              preview = 'pdf';
            }

            newFiles.push({ file, url, id: v4(), preview, ext });

            onAttachmentsChange([...attachments, ...newFiles]);
          };

          reader.readAsDataURL(file);
        }
      }
    }

    function handleAttachmentRemoveClick(id: string) {
      const updData = attachments.filter((fileItem) => fileItem.id !== id);
      onAttachmentsChange(updData);
    }
    return (
      <form
        className='appflowy-chat-input-wrap w-full rounded-lg border border-ch-primary-gray transition-colors focus-within:border-ch-accent'
        onSubmit={handleOnSubmit}
        data-format-mode={formatMode}
      >
        {formatMode === 'custom' && (
          <div className='p-1'>
            <FormatBarOptions
              activeOption={formatType}
              options={FormatTextButtons}
              onOptionChange={handleClickFormatTypeOption}
            ></FormatBarOptions>
          </div>
        )}

        {attachments.length > 0 && (
          <FilesPreview
            files={attachments}
            onRemoveClick={handleAttachmentRemoveClick}
          />
        )}

        {/* prettier-ignore */}
        <TextField
        id="appflowy-chat-input"
        placeholder={formatMode === 'auto'?t('chat.input.placeholder'):t('chat.input.placeholderFormat')}
        multiline
        fullWidth
        className="appflowy-chat-input-root"
        value={value}
        onChange={onChange}
        onKeyDown={handleOnKeyDown}
        inputRef={ref}
        autoFocus
        
        
      />
        <div className='flex justify-between px-2'>
          <div className='flex items-end py-0.5'>
            <button
              className='flex h-fit rounded bg-transparent p-1 text-xs text-ch-text-caption transition-colors hover:bg-ch-fill-hover'
              type='button'
              onClick={handleClickFormatModeButton}
            >
              {formatMode === 'auto'
                ? t('chat.input.button.format')
                : t('chat.input.button.auto')}
            </button>
          </div>
          <div className='flex items-start gap-2'>
            <ButtonIcon
              className='relative'
              icon={<IconClip />}
              tooltip='chat.input.button.attach'
              disabled={isGenerating}
              colorClass='text-ch-icon'
            >
              <input
                type='file'
                tabIndex={-1}
                multiple
                accept={SupportedAttachmentExtensions}
                className='absolute inset-0 cursor-pointer bg-red-600 opacity-0 disabled:cursor-default'
                style={{ fontSize: '0' }}
                onChange={handleFileChange}
                disabled={isGenerating}
              />
            </ButtonIcon>
            {isGenerating ? (
              <ButtonIconSubmit
                className='text-ch-accent disabled:text-ch-primary-gray'
                classSize='w-6 h-6'
                icon={<IconStop className='h-5 w-5' />}
                type='button'
                onClick={onStop}
              />
            ) : (
              <ButtonIconSubmit
                className='text-ch-accent disabled:text-ch-text-disabled'
                classSize='w-6 h-6'
                disabled={value.trim().length < 3}
                icon={<IconArrowUp className='h-5 w-5' />}
                type='submit'
              />
            )}
          </div>
        </div>
      </form>
    );
  }
);

export default ChatInput;
