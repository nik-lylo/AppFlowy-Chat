import { allTriggerChars, applyMarkdown } from '@/lib/markdown';
import { ReactEditor } from 'slate-react';
import { TextInsertTextOptions } from 'slate/dist/interfaces/transforms/text';

export const withMarkdown = (editor: ReactEditor) => {
  const { insertText } = editor;

  editor.insertText = (text: string, options?: TextInsertTextOptions) => {

    if (allTriggerChars.has(text) && applyMarkdown(editor as ReactEditor, text)) {
      return;
    }

    insertText(text, options);
  };

  return editor;
};