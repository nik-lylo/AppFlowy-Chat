import { ReactNode } from 'react';
import IconCopy from '@/assets/icons/copy.svg?react';
import IconUndo from '@/assets/icons/undo.svg?react';
import IconChangeFont from '@/assets/icons/change-font.svg?react';
import IconAI from '@/assets/icons/ai.svg?react';
import IconDocForward from '@/assets/icons/doc-forward.svg?react';
import IconDownload from '@/assets/icons/download.svg?react';
import { ActionBarAIButtonName, SelectOption } from '@/types';
import { AIModelOptions } from './aiModelOptions';
import { FormatTextButtons } from './formatTextButtons';
import { getI18n } from '@/i18n/config';
const i18n = getI18n();

export interface ActionBarAIButtonDataDefault<N = string> {
  icon: ReactNode;
  name: N;
  tooltip: string;
}
export interface ActionBarAIButtonDataBtn<N = string>
  extends ActionBarAIButtonDataDefault<N> {
  type: 'btn';
}
export interface ActionBarAIButtonDataPopover
  extends ActionBarAIButtonDataDefault<ActionBarAIButtonName> {
  type: 'btn-popover';
  withDropdownIcon: boolean;
  optionsData:
    | {
        type: 'text';
        options: SelectOption[];
      }
    | {
        type: 'btn';
        options: ActionBarAIButtonDataBtn[];
      };
}

export type ActionBarAIButtonData =
  | ActionBarAIButtonDataBtn
  | ActionBarAIButtonDataPopover;

const ActionBarAIButtonsCommon: ActionBarAIButtonData[] = [
  {
    icon: <IconCopy />,
    name: 'copy',
    tooltip: i18n?.t('tooltip.copy') || '',
    type: 'btn',
  },
  {
    icon: <IconUndo />,
    name: 'try-again',
    tooltip: i18n?.t('tooltip.tryAgain') || '',
    type: 'btn',
  },
  {
    icon: <IconChangeFont />,
    type: 'btn-popover',
    name: 'change-format',
    tooltip: i18n?.t('tooltip.changeFormat') || '',
    withDropdownIcon: true,
    optionsData: {
      options: FormatTextButtons,
      type: 'btn',
    },
  },
  {
    type: 'btn-popover',
    icon: <IconAI />,
    name: 'switch-model',
    tooltip: i18n?.t('tooltip.switchModel') || '',
    withDropdownIcon: true,
    optionsData: {
      options: AIModelOptions,
      type: 'text',
    },
  },
];
export const ActionBarAIButtonsLastRes: ActionBarAIButtonData[] =
  ActionBarAIButtonsCommon.concat([
    {
      icon: <IconDocForward />,
      name: 'add-to-page',
      tooltip: i18n?.t('tooltip.addToPage') || '',
      type: 'btn',
    },
  ]);
export const ActionBarAIButtonsHoverRes: ActionBarAIButtonData[] =
  ActionBarAIButtonsCommon.concat([
    {
      type: 'btn',
      icon: <IconDownload />,
      name: 'download',
      tooltip: i18n?.t('tooltip.download') || '',
    },
  ]);
