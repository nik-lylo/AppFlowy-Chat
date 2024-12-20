import { createContext } from 'react';
import { ReactEditor } from 'slate-react';
import { AppFlowyEditor } from '@/types';

export const EditorContext = createContext<{
  editor: ReactEditor;
  appflowyEditor: AppFlowyEditor;
} | null>(null);
