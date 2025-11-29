import { useCallback, useEffect, useState } from 'react'

// => Tiptap packages
import Bold from '@tiptap/extension-bold'
import Code from '@tiptap/extension-code'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import History from '@tiptap/extension-history'
import Image from '@tiptap/extension-image'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import Strike from '@tiptap/extension-strike'
import { Table, TableCell, TableHeader, TableRow } from '@tiptap/extension-table'
import Text from '@tiptap/extension-text'
import Underline from '@tiptap/extension-underline'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import classNames from 'classnames'
// Custom
import { Columns2Icon, ImageIcon, Rows2Icon, TableIcon } from 'lucide-react'

import * as Icons from './Icons'
import { LinkModal } from './LinkModal'
import './styles.scss'

export const SimpleEditor = ({
  initialValue = '',
  placeholder = 'Matn kiriting...',
  onChange
}: {
  initialValue?: string
  onChange: (val: string) => void
  placeholder?: string
}) => {
  const editor = useEditor({
    extensions: [
      Document,
      History,
      Paragraph,
      Text,
      Link.configure({
        openOnClick: false
      }),
      Bold,
      Underline,
      Italic,
      Strike,
      Code,
      Heading.configure({ levels: [1, 2, 3] }),
      Placeholder.configure({
        placeholder
      }),
      // ✅ Table
      Table.configure({
        resizable: true
      }),
      TableRow,
      TableHeader,
      TableCell,
      // ✅ Image
      Image.configure({
        inline: false,
        allowBase64: true // optional
      })
    ],
    content: initialValue,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange?.(html || '') // pass updated HTML
    }
  }) as Editor
  const [modalIsOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState<string>('')

  // ✅ Sync editor when initialValue changes
  useEffect(() => {
    if (editor && initialValue !== editor.getHTML()) {
      editor.commands.setContent(initialValue, { emitUpdate: false })
      // "false" prevents creating a history step
    }
  }, [initialValue, editor])

  const openModal = useCallback(() => {
    setUrl(editor.getAttributes('link').href)
    setIsOpen(true)
  }, [editor])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setUrl('')
  }, [])

  const saveLink = useCallback(() => {
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url, target: '_blank' }).run()
    } else {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
    }
    closeModal()
  }, [editor, url, closeModal])

  const removeLink = useCallback(() => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    closeModal()
  }, [editor, closeModal])

  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run()
  }, [editor])

  const toggleUnderline = useCallback(() => {
    editor.chain().focus().toggleUnderline().run()
  }, [editor])

  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run()
  }, [editor])

  const toggleStrike = useCallback(() => {
    editor.chain().focus().toggleStrike().run()
  }, [editor])

  const toggleCode = useCallback(() => {
    editor.chain().focus().toggleCode().run()
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className="editor">
      <div className="menu">
        <button
          className="menu-button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Orqaga"
        >
          <Icons.RotateLeft />
        </button>
        <button
          className="menu-button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Oldinga"
        >
          <Icons.RotateRight />
        </button>
        <button
          className={classNames('menu-button', {
            'is-active': editor.isActive('link')
          })}
          onClick={openModal}
          title="Link qo'shish"
        >
          <Icons.Link />
        </button>
        <button
          className={classNames('menu-button', {
            'is-active': editor.isActive('bold')
          })}
          onClick={toggleBold}
          title="Qalin shrift"
        >
          <Icons.Bold />
        </button>
        <button
          className={classNames('menu-button', {
            'is-active': editor.isActive('underline')
          })}
          onClick={toggleUnderline}
          title="Tagchiziq"
        >
          <Icons.Underline />
        </button>
        <button
          className={classNames('menu-button', {
            'is-active': editor.isActive('intalic')
          })}
          onClick={toggleItalic}
          title="Og'ma shrift"
        >
          <Icons.Italic />
        </button>
        <button
          className={classNames('menu-button', {
            'is-active': editor.isActive('strike')
          })}
          onClick={toggleStrike}
          title="Chiziqli"
        >
          <Icons.Strikethrough />
        </button>
        <button
          className={classNames('menu-button', {
            'is-active': editor.isActive('code')
          })}
          onClick={toggleCode}
          title="Kod qo'shish"
        >
          <Icons.Code />
        </button>

        <button
          className={classNames('menu-button', {
            'is-active': editor.isActive('heading', { level: 1 })
          })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          title="Sarlavha qo'shish"
        >
          H1
        </button>

        <button
          className={classNames('menu-button', {
            'is-active': editor.isActive('heading', { level: 2 })
          })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          title="Sarlavha qo'shish"
        >
          H2
        </button>

        <button
          className={classNames('menu-button', {
            'is-active': editor.isActive('heading', { level: 3 })
          })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          title="Sarlavha qo'shish"
        >
          H3
        </button>

        {/* Insert Table */}
        <button
          className="menu-button"
          onClick={() =>
            editor.chain().focus().insertTable({ rows: 2, cols: 1, withHeaderRow: true }).run()
          }
          title="Jadval qo'shish"
        >
          <TableIcon />
        </button>

        {/* Add Row */}
        <button
          className="menu-button"
          onClick={() => editor.chain().focus().addRowAfter().run()}
          title="Qator qo'shish"
        >
          <Rows2Icon />
        </button>

        {/* Add Column */}
        <button
          className="menu-button"
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          title="Ustun qo'shish"
        >
          <Columns2Icon />
        </button>

        {/* Insert Image */}
        <button
          className="menu-button"
          onClick={() => {
            const url = window.prompt('Rasm linki')
            if (url) {
              editor.chain().focus().setImage({ src: url }).run()
            }
          }}
          title="Rasm qo'shish"
        >
          <ImageIcon />
        </button>
      </div>

      <EditorContent editor={editor} />

      <LinkModal
        url={url}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Link tahrirlash"
        closeModal={closeModal}
        onChangeUrl={(e) => setUrl(e.target.value)}
        onSaveLink={saveLink}
        onRemoveLink={removeLink}
      />
    </div>
  )
}
