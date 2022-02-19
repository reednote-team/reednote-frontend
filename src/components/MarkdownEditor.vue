<script setup lang='ts'>
import { Editor, rootCtx, defaultValueCtx, editorViewOptionsCtx } from "@milkdown/core"
import { nord, nordLight } from "@milkdown/theme-nord"
import { VueEditor, useEditor } from "@milkdown/vue"
import { commonmark } from "@milkdown/preset-commonmark"
import { history } from "@milkdown/plugin-history"
import { gfm } from "@milkdown/preset-gfm"
import { clipboard } from "@milkdown/plugin-clipboard"
import { cursor } from "@milkdown/plugin-cursor"
import { slash } from "@milkdown/plugin-slash"
import { emoji } from "@milkdown/plugin-emoji"
import { tooltip } from "@milkdown/plugin-tooltip"
import { upload } from "@milkdown/plugin-upload"
import { prism } from "@milkdown/plugin-prism"
import { indent, indentPlugin } from '@milkdown/plugin-indent'
import { listener, listenerCtx } from '@milkdown/plugin-listener'
import { myHeading } from "../plugins/myHeadings"
import { computed } from "vue"
import { useUserStore } from "../stores/useUserStore"
import { useNoteStore } from "../stores/useNoteStore"

const userStore = useUserStore()
const noteStore = useNoteStore()

const editable = () => {
  return userStore.isSignedIn
}

const editor = useEditor((root) =>
  Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root)
      ctx.set(editorViewOptionsCtx, { editable })
      ctx.set(defaultValueCtx, noteStore.currentNote.content)
      ctx.set(listenerCtx, {
        markdown: [(get) => {
          noteStore.currentNote.content = get()
        }]
      });
    })
    .use(nordLight)
    .use(commonmark)
    .use(history)
    .use(listener)
    .use(gfm)
    .use(clipboard)
    .use(cursor)
    .use(slash)
    .use(emoji)
    .use(tooltip)
    .use(upload)
    .use(prism)
    .use(
      indent.configure(indentPlugin, {
        type: 'space',
        size: 4,
      }),
    )
    .use(myHeading())
);
</script>

<template>
  <div class="mx-auto">
    <VueEditor id="editor" :editor="editor" class="unreset" />
  </div>
</template>

<style>
.milkdown .editor {
  max-width: none !important;
  padding: 3% 6% !important;
}

.milkdown .editor p {
  text-align: justify;
}

.milkdown .editor .code-fence_value {
  border: none;
  height: 0.8cm;
  width: 3.2cm;
  margin: 0px 5px 15px 20px;
  @apply bg-stone-700 text-stone-100;
}

.milkdown .editor .code-fence_value span {
  text-align: center;
  padding: 0px;
}

.milkdown .editor .code-fence_select {
  width: 3.2cm;
  padding: 0px;
  margin: 0px;
  @apply bg-stone-700 text-stone-100 scrollbar scrollbar-none !important;
}

.milkdown .editor a {
  @apply text-lime-700 no-underline font-bold;
}

.milkdown .editor .code-inline {
  @apply my-0 mx-1 py-0 px-1 bg-slate-100 text-stone-900 text-center text-lg font-mono;
}

.milkdown .editor .code-fence {
  @apply bg-stone-800 text-white font-bold;
}
</style>