# Portfolio

My portfolio: a timeline of the things I have built, with screenshots.

A static site made with Vite, React and Tailwind CSS. There is no server and no
tracking; `npm run build` writes plain files to `dist/` that any static host
can serve.

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check and build to dist/
```

## Hosting

Every push to `main` is built and published to GitHub Pages by
`.github/workflows/deploy.yml`: <https://marnickvda.github.io/portfolio/>.

## Where things are

| Path | What |
| --- | --- |
| `src/projects.tsx` | The timeline: one `<Article>` per project, newest first. |
| `src/images/` | Screenshots and the photo on the badge. |
| `src/components/Intro.tsx` | The text and links in the sidebar. |
| `src/components/Gallery.tsx` | Screenshots with thumbnails and a full-screen view. |
| `src/components/ProfileLanyard.tsx` | Where the badge hangs and how long its strap is. |
| `src/components/Lanyard.tsx` | The badge itself, adapted from [React Bits](https://reactbits.dev/components/lanyard). |

The layout is based on the Tailwind UI "Commit" template; see `LICENSE.md`.
