import { FilePreview } from '@appflowy-chat/types';
import { FC } from 'react';
import IconDoc from '@appflowy-chat/assets/icons/doc.svg?react';
import TooltipDefault from '../tooltip-default';
import IconCloseFilled from '../icons/IconCloseFilled';

interface IProp {
  files: FilePreview[];
  onRemoveClick: (id: string) => void;
}

const FilesPreview: FC<IProp> = ({ files, onRemoveClick }) => {
  function handleClickClose(id: string) {
    onRemoveClick(id);
  }

  return (
    <div className='flex max-w-full gap-3 overflow-x-auto px-2 pt-2'>
      {files.map((fileItem) => (
        <div
          className='group relative w-fit max-w-60 flex-shrink-0 cursor-pointer'
          key={fileItem.id}
        >
          <TooltipDefault title='Remove'>
            <button
              className='z-2 invisible absolute right-0 top-0 h-4 w-4 -translate-y-1/2 translate-x-1/2 rounded-full border-none opacity-0 transition-opacity group-hover:visible group-hover:opacity-100'
              onClick={() => {
                handleClickClose(fileItem.id);
              }}
              type='button'
            >
              <IconCloseFilled
                className='h-full w-full text-ch-icon-secondary'
                id={fileItem.id}
              />
            </button>
          </TooltipDefault>
          <TooltipDefault title={`${fileItem.file.name} ∙ Uploaded`}>
            <div className='h-12 overflow-auto rounded-lg border border-ch-line-border'>
              {fileItem.preview === 'image' && fileItem.url && (
                <img
                  src={fileItem.url}
                  alt={fileItem.file.name}
                  className='aspect-square h-full object-cover'
                />
              )}
              {fileItem.preview === 'pdf' && (
                <div className='flex h-full gap-2 p-2'>
                  <div className='bg-ch-purple-100 flex aspect-square h-full flex-shrink-0 items-center justify-center rounded-lg'>
                    <IconDoc className='text-ch-icon-n2 h-4 w-4' />
                  </div>
                  <div className='flex-auto overflow-hidden text-xs'>
                    <div className='w-full overflow-hidden text-ellipsis text-nowrap font-semibold'>
                      {fileItem.file.name}
                    </div>
                    <div className='text-ch-text-caption'> PDF</div>
                  </div>
                </div>
              )}
            </div>
          </TooltipDefault>
        </div>
      ))}
    </div>
  );
};

export default FilesPreview;
