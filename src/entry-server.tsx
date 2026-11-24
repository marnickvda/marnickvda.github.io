import { renderToString } from 'react-dom/server'

import { App } from '@/App'

/** Used by scripts/prerender.js to write the page into dist/index.html. */
export function render() {
  return renderToString(<App />)
}
