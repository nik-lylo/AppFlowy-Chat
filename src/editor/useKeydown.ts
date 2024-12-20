import { KeyboardEvent, useCallback } from 'react';
import { useReadOnly } from 'slate-react';
import { createHotkey, HOT_KEY_NAME } from '@/lib/hotkeys';
import { Editor } from 'slate';
import { highLight, toggleMark, toggleTodoList } from '@/lib/editor';
import { InlineType } from '@/types';

export function useKeydown(editor: Editor) {
  const readOnly = useReadOnly();
  const onKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    const e = event.nativeEvent;
    const { selection } = editor;
    if (readOnly || !selection) return;
    switch (true) {
      case createHotkey(HOT_KEY_NAME.INSERT_SOFT_BREAK)(e):
        event.preventDefault();
        if (!selection) return;
        editor.insertText('\n');

        break;
      case createHotkey(HOT_KEY_NAME.TOGGLE_TODO)(e):
        event.preventDefault();
        toggleTodoList(editor);
        break;
      case createHotkey(HOT_KEY_NAME.BOLD)(e):
        event.preventDefault();
        toggleMark(editor, InlineType.Bold);
        break;
      /**
       * Italic: Mod + I
       */
      case createHotkey(HOT_KEY_NAME.ITALIC)(e):
        event.preventDefault();
        toggleMark(editor, InlineType.Italic);
        break;
      /**
       * Underline: Mod + U
       */
      case createHotkey(HOT_KEY_NAME.UNDERLINE)(e):
        event.preventDefault();
        toggleMark(editor, InlineType.Underline);
        break;
      /**
       * Strikethrough: Mod + Shift + S / Mod + Shift + X
       */
      case createHotkey(HOT_KEY_NAME.STRIKETHROUGH)(e):
        event.preventDefault();
        toggleMark(editor, InlineType.Strikethrough);
        break;
      /**
       * Highlight: Mod + Shift + H
       */
      case createHotkey(HOT_KEY_NAME.HIGH_LIGHT)(e):
        event.preventDefault();
        highLight(editor);
        break;
    }
  }, [editor, readOnly]);

  return onKeyDown;
}