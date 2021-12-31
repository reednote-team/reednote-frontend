<script setup lang='ts'>
import { ref, watch } from "vue";
import { Editor, rootCtx, defaultValueCtx } from "@milkdown/core";
import { nord } from "@milkdown/theme-nord";
import { VueEditor, useEditor } from "@milkdown/vue";
import { commonmark } from "@milkdown/preset-commonmark";
import { history } from "@milkdown/plugin-history";
import { gfm } from "@milkdown/preset-gfm";
import { clipboard } from "@milkdown/plugin-clipboard";
import { cursor } from "@milkdown/plugin-cursor";
import { slash } from "@milkdown/plugin-slash";
import { emoji } from "@milkdown/plugin-emoji";
import { tooltip } from "@milkdown/plugin-tooltip";
import { upload } from "@milkdown/plugin-upload"
import { prism } from "@milkdown/plugin-prism"
import { indent, indentPlugin } from '@milkdown/plugin-indent';
import { listener, listenerCtx } from '@milkdown/plugin-listener';

let props = defineProps<{
  content: string,
}>()

let emit = defineEmits<{
  (e: 'update:content', content: string): void
}>()

const editor = useEditor((root) =>
  Editor.make()
    .config((ctx) => {
      ctx.set(rootCtx, root)
      ctx.set(defaultValueCtx, props.content)
      ctx.set(listenerCtx, {
        markdown: [(get) => {
          emit('update:content', get())
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
  <VueEditor :editor="editor" />
</template>

<style scoped>
</style>
