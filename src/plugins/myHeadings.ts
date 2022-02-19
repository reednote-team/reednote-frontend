import { css } from '@emotion/css';
import { Ctx, NodeSchema } from '@milkdown/core'
import { heading } from '@milkdown/preset-commonmark'
import { reactive } from 'vue'
import { v4 as uuid } from 'uuid'
import mitt from 'mitt'

type Events = {
  'update-toc': void
}

export const TOCEmitter = mitt<Events>()

let hids: string[] = []

interface Heading {
  text: string,
  type: number,
  hid: string
}

export const headings = reactive<Heading[]>([])

TOCEmitter.on('update-toc', () => {
  hids = hids.filter((hid) => {
    return document.querySelector(`.editor #${hid}`) instanceof HTMLElement
  })
  headings.length = 0
  hids.map((hid) => {
    const hel = document.querySelector(`.editor #${hid}`) as HTMLElement
    headings.push({
      text: hel.innerText,
      type: parseInt(hel.tagName.replace('H', '')),
      hid: hid
    })
  })
})

export const myHeading = heading.extend((original, utils, options) => {

  const headingMap: Record<number, string> = {
    1: css`
          font-size: 3rem;
          line-height: 3.5rem;
      `,
    2: css`
          font-size: 2.125rem;
          line-height: 2.25rem;
      `,
    3: css`
          font-size: 1.5rem;
          line-height: 1.5rem;
      `,
  };

  const style = (level: number) =>
    options?.headless
      ? null
      : css`
                ${headingMap[level] || ''}
                margin: 2.5rem 0 !important;
                font-weight: 400;
            `;

  const mySchema = (ctx: Ctx): NodeSchema => {
    return {
      ...original.schema(ctx),
      toDOM: (node) => {

        return [
          `h${node.attrs.level}`,
          {
            class: utils.getClassName(node.attrs, `heading h${node.attrs.level}`, style(node.attrs.level)),
            id: (() => {
              let newHid = `h${uuid().split('-')[4]}`
              while (true) {
                if (hids.indexOf(newHid) < 0) {
                  break
                }
                newHid = `h${uuid().split('-')[4]}`
              }
              hids.push(newHid)
              return newHid
            })()
          },
          0,
        ];
      },
    }
  }

  return {
    ...original,
    schema: mySchema
  }
})