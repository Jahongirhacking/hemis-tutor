import '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    history: {
      undo: () => ReturnType
      redo: () => ReturnType
    }
  }
}
