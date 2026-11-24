import { useCallback, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

export type GalleryImage = {
  src: string
  alt: string
  width: number
  height: number
}

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
  let dialogRef = useRef<React.ElementRef<'dialog'>>(null)
  let many = images.length > 1
  let step = useCallback(
    (by: number) => onSelect((index + by + images.length) % images.length),
    [index, images.length, onSelect],
  )

  // A modal <dialog> keeps focus inside it and makes the page behind it inert.
  // It is removed from the page as it closes, so focus goes back by hand.
  useEffect(() => {
    let dialog = dialogRef.current
    if (!dialog) {
      return
    }
    let opener = document.activeElement as HTMLElement | null
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      dialog.close()
      opener?.focus()
    }
  }, [])

  let image = images[index]
  let button =
    'flex h-11 w-11 flex-none items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300'

  return (
    <dialog
      ref={dialogRef}
      aria-label={image.alt}
      className="fixed inset-0 z-[70] m-0 flex h-full max-h-none w-full max-w-none flex-col bg-gray-950/90 p-0 backdrop-blur-sm backdrop:bg-transparent"
      onClick={onClose}
      onCancel={onClose}
      onKeyDown={(event) => {
        if (many && event.key === 'ArrowLeft') step(-1)
        if (many && event.key === 'ArrowRight') step(1)
      }}
    >
      <div className="flex items-center justify-between p-4 text-sm text-white/70">
        <span aria-live="polite">
          {many ? `${index + 1} / ${images.length}` : ''}
        </span>
        <button
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
    </dialog>
  )
}

/**
 * One or more screenshots of a project: the first is shown large, the others
 * as thumbnails, and a click on any of them opens it full screen.
 */
export function Gallery({
  images,
  eager = false,
}: {
  images: GalleryImage[]
  /** For the first screenshot on the page; the others load as they come near. */
  eager?: boolean
}) {
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
        <img
          src={first.src}
          alt={first.alt}
          width={first.width}
          height={first.height}
          loading={eager ? 'eager' : 'lazy'}
          className="block h-auto w-full"
        />
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
