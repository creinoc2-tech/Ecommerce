import { EditorContent, useEditor } from '@tiptap/react';
import type { JSONContent } from '@tiptap/core';
 import StarterKit from '@tiptap/starter-kit';
import type { Json } from '../../../supabase/supabase';

interface Props {
	content?: JSONContent | Json;
}

export const ProductDescription = ({ content }: Props) => {
    console.log("Contenido de la descripción:", content);

    const editor = useEditor({
		extensions: [StarterKit],
		content: content as JSONContent,
		editable: false,
		editorProps: {
			attributes: {
				class: 'prose prose-sm sm:prose-base max-w-none',
			},
		},
	});

  return (
    <div className='mt-12'>
			<h2 className='text-2xl font-bold text-center mb-8 underline text-white'>
				Descripción
			</h2>
			<EditorContent className="prose prose-sm sm:prose-base 
            max-w-none text-white" editor={editor} />
		</div>
  )
}

