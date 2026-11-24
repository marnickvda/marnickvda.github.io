# Portfolio improvements

Based on an audit of the code, the built output and the running site (desktop
1440 px and phone 375 px), plus a round of reading on what reviewers look for.
Sections A to C are implemented; D waits on facts from Marnick.

## A. Sharing and search (no input needed)

- [x] Prerender the page at build time so `dist/index.html` contains the text.
      Today `#root` is empty until 716 kB of JS runs; link previews and
      non-JS crawlers see only the title and description.
- [x] Add Open Graph and Twitter tags with a 1200x630 share image, a canonical
      URL (`https://marnickvda.github.io/`) and a favicon (none exists).
- [x] Add a JSON-LD `Person` block (name, job title, GitHub and LinkedIn as
      `sameAs`).
- [x] Add `robots.txt` and a one-entry `sitemap.xml`.

## B. Speed (no input needed)

- [x] Load the badge (three.js) with a dynamic import. One 716 kB chunk
      (198 kB gzipped) currently blocks all text; the page itself needs a
      fraction of that.
- [x] Convert screenshots to AVIF/WebP at the sizes used. They are 1.4 MB of
      PNG at 1200-1440 px wide, shown at 448 CSS px.
- [x] Give every `<img>` a width and height (none have one, so the page shifts
      as they load) and lazy-load the large ones below the first project.
- [x] Preload Mona Sans (134 kB, used for the heading) or subset it to Latin.

## C. Accessibility (no input needed)

- [x] Trap focus in the lightbox; Tab currently walks into the page behind it
      despite `aria-modal`.
- [x] Honour `prefers-reduced-motion` in the star field (the badge already
      does).
- [x] Put the intro in a `<header>` landmark and add a skip link to the
      projects.
- [x] Raise "Connect with me" from gray-500 (about 4.1:1 at 13 px) to pass AA.
- [x] Each project has three links to its own anchor (two dates and the
      title); keep one tabbable, hide the duplicates from the tab order.

## D. Content (needs Marnick's facts and choices)

- [x] Say who you are for a reader with 60 seconds: current role or what you
      are looking for, and where you are based. The heading is a tagline and
      the name only appears in body text.
- [x] Add a direct way to reach you (LinkedIn only, by choice; now beside
      GitHub in the intro). The
      only contact route is a LinkedIn link in the 13 px footer.
- [x] Give each project a scannable line: stack tags plus "Live" and "Code"
      links in one consistent place, instead of inside the last paragraph.
- [ ] (Parked by Marnick, no results for now.) Add your part and a result to the main projects: how many members use
      Bifröst, how many houses used Streepn, what was hard. The texts
      describe what each thing is, not what it took or what came of it.
- [x] LAMP Framework never says what it does; one sentence on the problem.
      (Drafted from the repository's README; Marnick to check the wording.)
- [x] Decide whether dotfiles and know-it-all carry the same weight as the
      four products. Removed: they are not products and stay visible on GitHub.

## Review

Done on 2026-11-24, verified against the production build in a browser at
1440 px and 375 px; no console or hydration errors.

- The page is prerendered: `npm run build` now also renders the app to HTML
  and writes it into `dist/index.html` (`scripts/prerender.js`), and the
  browser hydrates it. `base` went from `./` to `/` so the server render and
  the browser agree on asset URLs; the site must be served from a domain root.
- The badge loads as its own chunk. First-load JavaScript went from 198 kB to
  60 kB gzipped; three.js (140 kB) follows without blocking the text.
- Screenshots are WebP: 1417 kB became 371 kB, with width and height set and
  lazy loading below the first project. Mona Sans is preloaded.
- Share tags, `og.jpg`, favicon, canonical, JSON-LD, robots and sitemap added.
- The lightbox is a native modal `<dialog>`: Tab stays inside, Escape closes,
  focus returns to the screenshot. Checked with the keyboard.
- Skip link, `<header>` landmark, dates out of the tab order, lighter footer
  text, star field still under reduced motion.
- Each project has a stack line and Live/Code links under its title. The
  prose still mentions the same stack and links; trim it once the texts are
  rewritten with results.

Not checked: the star field under an actual reduced-motion setting, and how
LinkedIn and Slack render the share card (only possible once deployed).
