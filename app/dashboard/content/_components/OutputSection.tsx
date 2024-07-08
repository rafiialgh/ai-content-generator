import React, { useEffect, useRef } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

interface PROPS {
  aiOutput: string;
}

function OutputSection({ aiOutput }: PROPS) {
  const editorRef: any = useRef();

  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(aiOutput);
  }, [aiOutput]);

  return (
    <div className='bg-white shadow-md border'>
      <div className='flex justify-between items-center p-5'>
        <h2 className='font-semibold text-lg'>Your result</h2>
        <Button>
          <Copy className='w-4 h-4' />
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue='Your result will appear here'
        height='600px'
        initialEditType='wysiwyg'
        useCommandShortcut={true}
        onChange={() =>
          console.log(editorRef.current.getInstance().getMarkdown())
        }
      />
    </div>
  );
}

export default OutputSection;
