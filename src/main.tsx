import { createRoot, hydrateRoot } from 'react-dom/client'

import '@fontsource-variable/inter'
import '@/styles/tailwind.css'
// After the utilities, as in the original template: article text styles win
import '@/styles/typography.css'

import { App } from '@/App'

let root = document.getElementById('root')!

// The build writes the page into index.html (scripts/prerender.js), so there
// React takes over the existing markup; the dev server starts from nothing.
if (root.hasChildNodes()) {
  hydrateRoot(root, <App />)
} else {
  createRoot(root).render(<App />)
}
