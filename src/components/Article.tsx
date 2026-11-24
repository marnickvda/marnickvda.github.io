import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

import { FormattedDate } from '@/components/FormattedDate'

function ContentWrapper({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
      <div className="lg:ml-96 lg:flex lg:w-full lg:justify-end lg:pl-32">
        <div
          className={clsx(
            'mx-auto max-w-lg lg:mx-0 lg:w-0 lg:max-w-xl lg:flex-auto',
            className,
          )}
          {...props}
        />
      </div>
    </div>
  )
}

// The title links to the entry too, so the dates stay out of the tab order.
function ArticleHeader({ id, date }: { id: string; date: string }) {
  return (
    <header className="relative mb-10 xl:mb-0">
      <div className="pointer-events-none absolute left-[max(-0.5rem,calc(50%-18.625rem))] top-0 z-50 flex h-4 items-center justify-end gap-x-2 lg:left-0 lg:right-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-[32rem] xl:h-8">
        <a
          href={`#${id}`}
          tabIndex={-1}
          className="hidden xl:pointer-events-auto xl:inline-flex"
        >
          <FormattedDate
            date={date}
            className="text-2xs/4 font-medium text-white/50"
          />
        </a>
        <div className="h-[0.0625rem] w-3.5 bg-gray-400 lg:-mr-3.5 xl:mr-0 xl:bg-gray-300" />
      </div>
      <ContentWrapper>
        <div className="flex">
          <a href={`#${id}`} tabIndex={-1} className="inline-flex xl:hidden">
            <FormattedDate
              date={date}
              className="text-2xs/4 font-medium text-gray-500 dark:text-white/50"
            />
          </a>
        </div>
      </ContentWrapper>
    </header>
  )
}

export type ProjectLink = { label: string; href: string }

/** What it is made with and where to find it, readable at a glance. */
function Facts({ stack = [], links = [] }: { stack?: string[]; links?: ProjectLink[] }) {
  if (stack.length === 0 && links.length === 0) {
    return null
  }

  return (
    <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-xs/5">
      {stack.length > 0 && (
        <p className="text-gray-400">
          <span className="sr-only">Built with: </span>
          {stack.join(' · ')}
        </p>
      )}
      {links.map((link) => (
        <Out key={link.href} href={link.href}>
          {link.label}
          <span aria-hidden="true"> ↗</span>
        </Out>
      ))}
    </div>
  )
}

/** One entry on the timeline: a date in the margin, a title and its text. */
export function Article({
  id,
  date,
  title,
  stack,
  links,
  children,
}: {
  id: string
  date: string
  title: string
  stack?: string[]
  links?: ProjectLink[]
  children: React.ReactNode
}) {
  let heightRef = useRef<React.ElementRef<'div'>>(null)
  let [heightAdjustment, setHeightAdjustment] = useState(0)

  // Pads each entry to a multiple of 8px so it lines up with the timeline ticks
  useEffect(() => {
    if (!heightRef.current) {
      return
    }

    let observer = new window.ResizeObserver(() => {
      if (!heightRef.current) {
        return
      }
      let { height } = heightRef.current.getBoundingClientRect()
      let nextMultipleOf8 = 8 * Math.ceil(height / 8)
      setHeightAdjustment(nextMultipleOf8 - height)
    })

    observer.observe(heightRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <article
      id={id}
      className="scroll-mt-16"
      style={{ paddingBottom: `${heightAdjustment}px` }}
    >
      <div ref={heightRef}>
        <ArticleHeader id={id} date={date} />
        <ContentWrapper className="typography">
          <h2>
            <a href={`#${id}`}>{title}</a>
          </h2>
          <Facts stack={stack} links={links} />
          {children}
        </ContentWrapper>
      </div>
    </article>
  )
}

/** A link to another site, opened in a new tab. */
export function Out({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}
