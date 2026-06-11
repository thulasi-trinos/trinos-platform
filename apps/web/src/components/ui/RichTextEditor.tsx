'use client';

import Link from '@tiptap/extension-link';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, Link2, List, ListOrdered } from 'lucide-react';
import { useEffect } from 'react';
import type { ReactNode } from 'react';

import { Toolbar, ToolbarButton } from './Toolbar';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  error?: boolean;
}

/**
 * Tiptap-backed editor for the 4 report fields (FR-REP-02). Emits HTML so the
 * API can store rich content; the toolbar mirrors the style guide §4.7 layout.
 */
export function RichTextEditor({ value, onChange, placeholder, error }: RichTextEditorProps): ReactNode {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: 'noopener noreferrer' } }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'prose-trinos outline-none min-h-[88px] px-[14px] py-[10px] text-[15px] leading-[1.6]',
        'aria-label': placeholder ?? 'Rich text editor',
      },
    },
    onUpdate: ({ editor: e }) => onChange(e.getHTML()),
  });

  // Keep the editor in sync when the form resets the field externally.
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  if (!editor) return null;

  const addLink = (): void => {
    const url = window.prompt('Link URL');
    if (url) editor.chain().focus().setLink({ href: url }).run();
    else editor.chain().focus().unsetLink().run();
  };

  return (
    <div>
      <Toolbar className="mb-2">
        <ToolbarButton label="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold size={15} />
        </ToolbarButton>
        <ToolbarButton label="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic size={15} />
        </ToolbarButton>
        <ToolbarButton label="Bullet list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List size={15} />
        </ToolbarButton>
        <ToolbarButton label="Numbered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered size={15} />
        </ToolbarButton>
        <ToolbarButton label="Link" active={editor.isActive('link')} onClick={addLink}>
          <Link2 size={15} />
        </ToolbarButton>
      </Toolbar>
      <div
        className={`bg-paper rounded-md border-[1.5px] transition-[.15s] focus-within:shadow-[0_0_0_4px_var(--blue-50)] ${
          error ? 'border-danger' : 'border-line2 focus-within:border-blue400'
        }`}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
