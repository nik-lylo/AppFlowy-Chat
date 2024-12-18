import { Editor, NodeType } from '@appflowyinc/editor';
import { FC } from 'react';

interface IProps {
  body: string;
}

const MessageResponseContent: FC<IProps> = ({ body }) => {
  return (
    <div className='text-sm'>
      <Editor
        theme={'dark'}
        readOnly
        initialValue={[
          {
            type: NodeType.Paragraph,
            data: { level: 1 },
            delta: [
              {
                insert: body,
              },
            ],
            children: [],
          },
        ]}
      />
    </div>
  );
};

export default MessageResponseContent;
