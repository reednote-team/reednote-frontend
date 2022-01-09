<script setup lang='ts'>
import { Editor, rootCtx, defaultValueCtx } from "@milkdown/core"
import { nord } from "@milkdown/theme-nord"
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
import { useStore } from 'vuex'
import { IState } from '../store'
import { computed } from "vue";

const store = useStore<IState>()
const content = computed(() => {
  return store.state.currentNote.content
})

const editor = useEditor((root) =>
  Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root)
      ctx.set(defaultValueCtx, content.value)
      ctx.set(listenerCtx, {
        markdown: [(get) => {
          store.commit('updateCurrentNoteContent', get())
        }]
      });
    })
    .use(nord)
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
);
</script>

<template>
  <div class="mx-auto">
    <VueEditor :editor="editor" class="unreset" />
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
}

.milkdown .editor .code-fence_value span {
  text-align: center;
  padding: 0px;
}

.milkdown .editor .code-fence_select {
  width: 3.2cm;
  padding: 0px;
  margin: 0px;
}

.milkdown .editor a {
  @apply text-cyan-500 dark:text-yellow-300 no-underline font-bold;
}

.milkdown .editor .code-inline {
  @apply my-0 mx-1 py-0 px-1 bg-gray-200 text-black dark:bg-gray-600 dark:text-white text-center text-lg font-mono;
}

.milkdown .editor .code-fence {
  @apply bg-gray-50 dark:bg-zinc-900;
}
</style>