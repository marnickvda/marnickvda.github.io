import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource-variable/inter'
import '@/styles/tailwind.css'
// After the utilities, as in the original template: article text styles win
import '@/styles/typography.css'

import { Layout } from '@/components/Layout'
import { Projects } from '@/projects'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout>
      <Projects />
    </Layout>
  </StrictMode>,
)
