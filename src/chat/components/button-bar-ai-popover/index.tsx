import { Popover } from '@mui/material';
import {
  ComponentProps,
  FC,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import ButtonBarAI from '../button-bar-ai';
import { ActionBarAIButtonName } from '@/types';
import IconCheck from '@/assets/icons/check.svg?react';
import IconRegenerate from '@/assets/icons/regenerate.svg?react';
import './index.css';
import { ActionBarAIButtonDataPopover } from '@appflowy-chat/utils/actionBarAIButtons';
import TooltipDefault from '../tooltip-default';
import { useTranslation } from '@/i18n';
import FormatBarOptions from '../format-bar-options';

interface Props extends ComponentProps<'button'> {
  icon: ReactNode;
  tooltip: string;
  optionsData: ActionBarAIButtonDataPopover['optionsData'];
  activeOption: string;
  btnName: ActionBarAIButtonName;
  onOptionChange: (value: string) => void;
  onPopoverStateChange: (value: boolean) => void;
}

const ButtonBarAIPopover: FC<Props> = ({
  icon,
  tooltip,
  optionsData,
  activeOption,
  onOptionChange,
  onPopoverStateChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [shortOptionName, setShortOptionName] = useState<string>('');

  const rootRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    setIsOpen(true);
    setAnchorEl(e.currentTarget);
    handlePopoverStateChange('open');
  }
  function handleClose() {
    setIsOpen(false);
    setAnchorEl(null);
    setTimeout(() => {
      handlePopoverStateChange('close');
    }, 300);
  }

  function handlePopoverStateChange(action: 'open' | 'close') {
    onPopoverStateChange(action === 'open');
  }

  function handleOptionChange(value: string) {
    if (value === activeOption) {
      return;
    }

    onOptionChange(value);
    handleClose();
  }
  const id = isOpen ? 'simple-popover' : undefined;

  useEffect(() => {
    if (optionsData.type === 'text') {
      const can = optionsData.options.find(
        (option) => option.value === activeOption
      );
      if (!can) {
        setShortOptionName('');
      } else {
        setShortOptionName(can.shortName || '');
      }
    }
  }, [activeOption, optionsData]);

  return (
    <div ref={rootRef}>
      <ButtonBarAI
        icon={icon}
        aria-describedby={id}
        withDropdownIcon={true}
        tooltip={tooltip}
        btnText={shortOptionName}
        onClick={handleClick}
      />

      {optionsData.type === 'text' && (
        <Popover
          id={id}
          className='bar-ai-popover-full'
          open={isOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          classes={{ paper: '-mt-2' }}
          anchorOrigin={{
            horizontal: 'center',
            vertical: 'top',
          }}
          transformOrigin={{
            horizontal: 'center',
            vertical: 'bottom',
          }}
          closeAfterTransition={true}
        >
          <div className='bg-white p-2'>
            {optionsData.options.map((option) => (
              <div
                className='text-ch-text-content flex w-full min-w-52 cursor-pointer justify-between px-1.5 py-1 text-sm tracking-wide'
                key={option.value}
                onClick={() => handleOptionChange(option.value)}
              >
                <div>{option.name}</div>
                {activeOption === option.value && (
                  <IconCheck className='text-ch-icon-blue h-4 w-4 flex-shrink-0' />
                )}
              </div>
            ))}
          </div>
        </Popover>
      )}

      {optionsData.type === 'btn' && (
        <Popover
          id={id}
          className='bar-ai-popover-btns'
          open={isOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          classes={{ paper: 'mt-1' }}
          anchorOrigin={{
            horizontal: 'center',
            vertical: 'bottom',
          }}
          transformOrigin={{
            horizontal: 'center',
            vertical: 'top',
          }}
          closeAfterTransition={true}
        >
          <FormatBarOptions
            options={optionsData.options}
            className='px-1 py-0.5'
            activeOption={activeOption}
          >
            <TooltipDefault title={t('chat.tooltip.regenerate')}>
              <button className='ml-1 grid h-6 flex-shrink-0 place-items-center'>
                <div className='w-4e h-4e bg-ch-accent grid h-2.5 w-2.5 place-items-center rounded-full'>
                  <IconRegenerate className='h-3 w-3 text-white' />
                </div>
              </button>
            </TooltipDefault>
          </FormatBarOptions>
        </Popover>
      )}
    </div>
  );
};

export default ButtonBarAIPopover;
