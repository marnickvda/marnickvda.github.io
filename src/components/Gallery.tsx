import { useCallback, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

export type GalleryImage = { src: string; alt: string }

function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path
        d="M10 3 5 8l5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Lightbox({
  images,
  index,
  onSelect,
  onClose,
}: {
  images: GalleryImage[]
  index: number
  onSelect: (index: number) => void
  onClose: () => void
}) {
  let closeRef = useRef<React.ElementRef<'button'>>(null)
  let many = images.length > 1
  let step = useCallback(
    (by: number) => onSelect((index + by + images.length) % images.length),
    [index, images.length, onSelect],
  )

  useEffect(() => {
    let opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      opener?.focus()
    }
  }, [])

  useEffect(() => {
    let onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (many && event.key === 'ArrowLeft') step(-1)
      if (many && event.key === 'ArrowRight') step(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [many, onClose, step])

  let image = images[index]
  let button =
    'flex h-11 w-11 flex-none items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300'

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-0 z-[70] flex flex-col bg-gray-950/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-between p-4 text-sm text-white/70">
        <span aria-live="polite">
          {many ? `${index + 1} / ${images.length}` : ''}
        </span>
        <button
          ref={closeRef}
          type="button"
          aria-label="Close"
          className={button}
          onClick={onClose}
        >
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4">
            <path
              d="m4 4 8 8m0-8-8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      <div className="flex min-h-0 flex-1 items-center gap-2 px-2 pb-4 sm:gap-4 sm:px-4">
        {many && (
          <button
            type="button"
            aria-label="Previous screenshot"
            className={button}
            onClick={(event) => {
              event.stopPropagation()
              step(-1)
            }}
          >
            <Arrow className="h-4 w-4" />
          </button>
        )}
        <div className="relative h-full min-w-0 flex-1">
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            className="absolute inset-0 h-full w-full object-contain"
          />
        </div>
        {many && (
          <button
            type="button"
            aria-label="Next screenshot"
            className={button}
            onClick={(event) => {
              event.stopPropagation()
              step(1)
            }}
          >
            <Arrow className="h-4 w-4 rotate-180" />
          </button>
        )}
      </div>
      <p className="px-4 pb-6 text-center text-sm text-white/70">{image.alt}</p>
    </div>
  )
}

/**
 * One or more screenshots of a project: the first is shown large, the others
 * as thumbnails, and a click on any of them opens it full screen.
 */
export function Gallery({ images }: { images: GalleryImage[] }) {
  let [open, setOpen] = useState<number | null>(null)
  let close = useCallback(() => setOpen(null), [])
  let [first, ...rest] = images
  let frame =
    'group relative block w-full overflow-hidden rounded-xl bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:bg-gray-900'
  let ring = (
    <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10 dark:ring-white/10" />
  )

  return (
    <div className="mt-8 [&+*]:mt-8">
      <button
        type="button"
        className={clsx(frame, 'cursor-zoom-in')}
        aria-label={`Enlarge: ${first.alt}`}
        onClick={() => setOpen(0)}
      >
        <img src={first.src} alt={first.alt} className="block w-full" />
        {ring}
      </button>
      {rest.length > 0 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {rest.map((image, i) => (
            <div key={image.src}>
              <button
                type="button"
                className={clsx(frame, 'aspect-[4/3] cursor-zoom-in')}
                aria-label={`Enlarge: ${image.alt}`}
                onClick={() => setOpen(i + 1)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
                {ring}
              </button>
            </div>
          ))}
        </div>
      )}
      {open !== null && (
        <Lightbox images={images} index={open} onSelect={setOpen} onClose={close} />
      )}
    </div>
  )
}
