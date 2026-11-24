import { StrictMode } from 'react'

import { Layout } from '@/components/Layout'
import { Projects } from '@/projects'

/** The whole page; rendered in the browser and, at build time, to HTML. */
export function App() {
  return (
    <StrictMode>
      <Layout>
        <Projects />
      </Layout>
    </StrictMode>
  )
}
