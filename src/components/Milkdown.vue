<template>
  <VueEditor :editor="editor" />
</template>

<script>
import { defineComponent } from "vue";
import { Editor, rootCtx, defaultValueCtx } from "@milkdown/core";
import { nord } from "@milkdown/theme-nord";
import { VueEditor, useEditor } from "@milkdown/vue";
import { commonmark } from "@milkdown/preset-commonmark";
import { history } from "@milkdown/plugin-history";
import { gfm } from '@milkdown/preset-gfm';
import { clipboard } from "@milkdown/plugin-clipboard";


export default defineComponent({
  name: "Milkdown",
  components: {
    VueEditor,
  },
  setup: () => {
    const editor = useEditor((root) =>
        Editor.make()
            .config((ctx) => {
              ctx.set(rootCtx, root);
              ctx.set(defaultValueCtx, "");
            })
            .use(nord)
            .use(commonmark)
            .use(history)
            .use(gfm)
            .use(clipboard)
    );
    return {
      editor,
    };
  },
});
</script>

<style scoped>
</style>