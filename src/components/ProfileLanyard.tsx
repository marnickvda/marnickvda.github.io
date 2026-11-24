import { Suspense, lazy, useEffect, useState } from 'react'

import photo from '@/images/marnick.jpg'

// three.js is most of the site's JavaScript; loading it apart from the page
// lets the text appear without waiting for it.
const Lanyard = lazy(() => import('@/components/Lanyard'))

/**
 * The badge with the profile photo. Its canvas covers the whole viewport so
 * the card can swing over everything else; it hangs above the element with id
 * `lanyard-anchor`, which keeps room free for it in the sidebar.
 */
export function ProfileLanyard() {
  let [anchor, setAnchor] = useState<number | null>(null)

  useEffect(() => {
    let found = document.getElementById('lanyard-anchor')
    if (!found) {
      return
    }
    let spot: HTMLElement = found

    let measure = () => {
      let { left, width } = spot.getBoundingClientRect()
      // Beside the timeline the card lines up with the left edge of the intro
      // text; on small screens it hangs in the middle.
      let wide = window.matchMedia('(min-width: 1024px)').matches
      setAnchor((left + (wide ? 96 : width / 2)) / window.innerWidth)
    }

    measure()
    let observer = new ResizeObserver(measure)
    observer.observe(spot)
    window.addEventListener('resize', measure)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  if (anchor === null) {
    return null
  }

  // Scrolls away with the intro on small screens, stays put beside the
  // timeline on large ones, like the sidebar itself.
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[60] h-screen lg:fixed lg:inset-0 lg:h-auto">
      <Suspense fallback={null}>
        <Lanyard
          frontImage={photo}
          anchor={anchor}
          size={0.28}
          strapLength={0.12}
        />
      </Suspense>
    </div>
  )
}
