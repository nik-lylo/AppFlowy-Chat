import { Editor, Range, Transforms, Element, NodeEntry } from 'slate';
import { CheckboxData, HeadingData, InlineType, NodeType, NumberedListData } from '@/types';
import { ElementData } from '@/@types/editor';
import { isMarkActive, turnToType } from '@/lib/editor';

enum SpecialSymbol {
  EM_DASH = '—',
  RIGHTWARDS_DOUBLE_ARROW = '⇒',
}

type TriggerHotKey = {
  [key in NodeType | InlineType | SpecialSymbol]?: string[];
};

const defaultTriggerChar: TriggerHotKey = {
  [NodeType.Heading]: [' '],
  [NodeType.Quote]: [' '],
  [NodeType.BulletedList]: [' '],
  [NodeType.NumberedList]: [' '],
  [NodeType.Todo]: [' '],
  [InlineType.Bold]: ['*', '_'],
  [InlineType.Italic]: ['*', '_'],
  [InlineType.Strikethrough]: ['~'],
  [InlineType.Href]: [')'],
  [SpecialSymbol.EM_DASH]: ['-'],
  [SpecialSymbol.RIGHTWARDS_DOUBLE_ARROW]: ['>'],
};

// create a set of all trigger characters
export const allTriggerChars = new Set(Object.values(defaultTriggerChar).flat());

// Define the rules for markdown shortcuts
type Rule = {
  type: 'block' | 'mark' | 'symbol';
  match: RegExp
  format: string
  transform?: (editor: Editor, match: RegExpMatchArray) => void
  filter?: (editor: Editor, match: RegExpMatchArray) => boolean
}

function deletePrefix(editor: Editor, offset: number) {
  const blockEntry = Editor.above(editor, {
    match: n => !Editor.isEditor(n) && Element.isElement(n),
  });
  if (!blockEntry) return;
  const [, path] = blockEntry;

  const { selection } = editor;

  if (!selection) return;
  editor.select({
    anchor: editor.start(path),
    focus: { path: selection.focus.path, offset: offset },
  });
  editor.delete();
}

function getNodeType(editor: Editor) {
  const blockEntry = Editor.above(editor, {
    match: n => !Editor.isEditor(n) && Element.isElement(n),
  });
  if (!blockEntry) return;
  const [node] = blockEntry as NodeEntry<Element>;

  return node.type as NodeType;
}

function getBlockData(editor: Editor) {
  const blockEntry = Editor.above(editor, {
    match: n => !Editor.isEditor(n) && Element.isElement(n),
  });
  if (!blockEntry) return;
  const [node] = blockEntry as NodeEntry<Element>;

  return node.data as ElementData;
}

function getBlockEntry(editor: Editor) {
  return Editor.above(editor, {
    match: n => !Editor.isEditor(n) && Element.isElement(n),
  });
}

const rules: Rule[] = [
  // Blocks
  {
    type: 'block',
    match: /^(#{1,6})\s/,
    format: NodeType.Heading,
    filter: (editor, match) => {
      const level = match[1].length;
      const blockType = getNodeType(editor);
      const blockData = getBlockData(editor);

      return blockType === NodeType.Heading && (blockData as HeadingData).level === level;
    },
    transform: (editor, match) => {
      const level = match[1].length;
      turnToType(editor, NodeType.Heading, { level });
      deletePrefix(editor, level);
    },
  },

  {
    type: 'block',
    match: /^"\s/,
    format: NodeType.Quote,
    filter: (editor) => {
      return getNodeType(editor) === NodeType.Quote;
    },
    transform: (editor) => {
      turnToType(editor, NodeType.Quote);
      deletePrefix(editor, 1);
    },
  },
  {
    type: 'block',
    match: /^(-)?\[(x| )?\]\s/,
    format: NodeType.Todo,
    filter: (editor, match) => {
      const checked = match[2] === 'x';
      const blockType = getNodeType(editor);
      const blockData = getBlockData(editor);

      return blockType === NodeType.Todo && (blockData as CheckboxData).checked === checked;
    },
    transform: (editor, match) => {

      const checked = match[2] === 'x';
      turnToType(editor, NodeType.Todo, { checked });

      deletePrefix(editor, match[0].length - 1);
    },
  },

  {
    type: 'block',
    match: /^(-|\*|\+)\s/,
    format: NodeType.BulletedList,
    filter: (editor) => {
      return getNodeType(editor) === NodeType.BulletedList;
    },
    transform: (editor) => {
      turnToType(editor, NodeType.BulletedList);
      deletePrefix(editor, 1);
    },
  },
  {
    type: 'block',
    match: /^(\d+)\.\s/,
    format: NodeType.NumberedList,
    filter: (editor, match) => {
      const start = parseInt(match[1]);
      const blockType = getNodeType(editor);
      const blockData = getBlockData(editor);

      return (blockData && 'level' in blockData && (blockData as HeadingData).level > 0) || (blockType === NodeType.NumberedList && (blockData as NumberedListData).number === start);
    },
    transform: (editor, match) => {
      const start = parseInt(match[1]);
      turnToType(editor, NodeType.NumberedList, { number: start });
      deletePrefix(editor, String(start).length + 1);
    },
  },

  // marks
  {
    type: 'mark',
    match: /\*\*(.*?)\*\*|__(.*?)__/,
    format: InlineType.Bold,
  },
  {
    type: 'mark',
    match: /\*(.*?)\*|_(.*?)_/,
    format: InlineType.Italic,
    filter: (_editor, match) => {
      const key = match[0];

      if (key === '**') return true;
      const text = match[1] || match[2];

      return !text || text.length === 0;
    },
  },
  {
    type: 'mark',
    match: /~~(.*?)~~/,
    format: InlineType.Strikethrough,
  },

  {
    type: 'symbol',
    match: /--/,
    format: SpecialSymbol.EM_DASH,
    transform: (editor) => {

      editor.delete({
        unit: 'character',
        reverse: true,
      });
      editor.insertText('—');
    },
  },
  {
    type: 'symbol',
    match: /=>/,
    format: SpecialSymbol.RIGHTWARDS_DOUBLE_ARROW,
    transform: (editor) => {
      editor.delete({
        unit: 'character',
        reverse: true,
      });
      editor.insertText('⇒');
    },
  },

];

export const applyMarkdown = (editor: Editor, insertText: string): boolean => {
  const { selection } = editor;

  if (!selection || !Range.isCollapsed(selection)) return false;

  const blockEntry = getBlockEntry(editor);
  if (!blockEntry) return false;

  const [, path] = blockEntry as NodeEntry<Element>;
  const start = Editor.start(editor, path);
  const text = editor.string({
    anchor: start,
    focus: selection.focus,
  }) + insertText;

  for (const rule of rules) {
    if (rule.type === 'block') {
      const match = text.match(rule.match);

      if (match && !rule.filter?.(editor, match)) {

        if (rule.transform) {
          rule.transform(editor, match);
        }

        return true;
      }
    } else if (rule.type === 'mark') {
      const path = selection.anchor.path;
      const text = editor.string({
        anchor: {
          path,
          offset: 0,
        },
        focus: selection.focus,
      }) + insertText;

      const matches = [...text.matchAll(new RegExp(rule.match, 'g'))];

      if (matches.length > 0 && matches.every((match) => !rule.filter?.(editor, match))) {
        for (const match of matches.reverse()) {
          const start = match.index!;
          const end = start + match[0].length - 1;
          const matchRange = {
            anchor: { path, offset: start },
            focus: { path, offset: end },
          };

          Transforms.select(editor, matchRange);
          editor.delete();

          if (rule.transform) {
            rule.transform(editor, match);
          } else {
            const formatText = match[1] || match[2];

            editor.insertText(formatText);
            Transforms.select(editor, {
              anchor: { path, offset: start },
              focus: { path, offset: start + formatText.length },
            });
            const isActive = isMarkActive(editor, rule.format as InlineType);
            if (!isActive) {
              editor.addMark(rule.format, true);
            } else {
              editor.removeMark(rule.format);
            }
          }

          Transforms.collapse(editor, { edge: 'end' });
        }

        return true;
      }

    } else if (rule.type === 'symbol') {
      const path = selection.anchor.path;
      const text = editor.string({
        anchor: {
          path,
          offset: 0,
        },
        focus: selection.focus,
      }) + insertText;
      const match = text.match(rule.match);

      if (match) {
        if (rule.transform) {
          rule.transform(editor, match);
        }

        return true;
      }
    }
  }

  return false;
};