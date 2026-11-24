// Writes the rendered page into dist/index.html, so the text is there before
// any JavaScript runs: for link previews, crawlers and a faster first paint.
import { readFile, rm, writeFile } from 'node:fs/promises'

const { render } = await import('../dist-server/entry-server.js')

const file = new URL('../dist/index.html', import.meta.url)
const empty = '<div id="root" class="contents"></div>'
const html = await readFile(file, 'utf8')

if (!html.includes(empty)) {
  throw new Error(`prerender: ${empty} not found in dist/index.html`)
}

await writeFile(file, html.replace(empty, () => `<div id="root" class="contents">${render()}</div>`))
await rm(new URL('../dist-server', import.meta.url), { recursive: true })
