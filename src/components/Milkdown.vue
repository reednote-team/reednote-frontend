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
    );
    return {
      editor,
    };
  },
});
</script>

<style scoped>
</style>