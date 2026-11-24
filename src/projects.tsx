import { Article, Out } from '@/components/Article'
import { Gallery } from '@/components/Gallery'
import bifrost from '@/images/bifrost.png'
import bifrostSignIn from '@/images/bifrost-sign-in.png'
import muziekQuiz from '@/images/muziek-quiz.png'
import postcodejager from '@/images/postcodejager.png'
import streepn from '@/images/streepn.png'
import streepnTransactions from '@/images/streepn-transactions.png'

/**
 * The timeline, newest first. To add a project: copy an <Article>, give it a
 * unique id and a date, and import its screenshots above.
 */
export function Projects() {
  return (
    <>
      <Article
        id="de-grote-muziek-quiz"
        date="2026-11-23T00:00Z"
        title="De Grote Muziek Quiz"
      >
        <Gallery
          images={[
            { src: muziekQuiz, alt: 'The home screen of De Grote Muziek Quiz' },
          ]}
        />
        <p>
          A party game you play in the browser on your phones. One phone hangs on the speaker and plays a song, and the player or team on turn places it in their timeline by its rank in the NPO Radio 2 Top 2000. Whoever fills their timeline first wins. We first played it in 2025, which is where the idea came from; the game as it looks now was built in 2026.
        </p>
        <p>
          It is built with TypeScript on both sides: a React frontend and an Express and Socket.IO server that keeps every game in memory, running on a single small Hetzner server behind Caddy. You can play it at <Out href="https://muziek-quiz.nl">muziek-quiz.nl</Out>.
        </p>
      </Article>
      <Article
        id="web-app-for-dispuut-thoridor"
        date="2026-11-01T00:00Z"
        title="Web app for Dispuut Thoridor"
      >
        <Gallery
          images={[
            {
              src: bifrost,
              alt: 'The Bifröst dashboard with upcoming events and member numbers',
            },
            { src: bifrostSignIn, alt: 'The sign-in page of Bifröst' },
          ]}
        />
        <p>
          I started in the first weeks of 2024 and have kept working on it since; it is now in a state worth showing. It is the members platform of my fraternity, Dispuut Thoridor. Since our fraternity is based on Norse mythology, the portal is called <Out href="https://en.wikipedia.org/wiki/Bifr%C3%B6st">Bifröst</Out>, after the bridge between Earth and Asgard.
        </p>
        <p>
          What began as a list of contact details has grown into the place where the fraternity organises itself. Members sign up for events, with paid extras such as bringing a guest, get a confirmation by mail and can add the event to their calendar. They can look each other up in the member list, see who has a birthday coming and find everyone on a map: each time a member changes their address, the <Out href="https://developers.google.com/maps/documentation/geocoding">Google Geocoding API</Out> turns it into a marker. A profile also shows which groups someone has been part of over the years.
        </p>
        <p>
          It is built with <Out href="https://nextjs.org/">Next.js</Out> and <Out href="https://tailwindcss.com/">Tailwind CSS</Out> on <Out href="https://vercel.com/">Vercel</Out>, with Postgres through <Out href="https://orm.drizzle.team/">Drizzle</Out>. Signing in works with a link by mail or a passkey, so nobody has a password to forget, and the mails are written with <Out href="https://jsx.email/">jsx-email</Out>.
        </p>
      </Article>
      <Article
        id="postcodejager"
        date="2026-06-21T00:00Z"
        title="Postcodejager"
      >
        <Gallery
          images={[
            {
              src: postcodejager,
              alt: 'Postcodejager showing visited postcode areas and a selection on the map of the Netherlands',
            },
          ]}
        />
        <p>
          A tool to tick off the PostNL Postcode Challenge on a road bike. It reads your Strava rides to see which of the roughly 4,000 Dutch postcode areas you have already visited, shows them on a map and plans a route over paved roads that collects as many new ones as possible, which you then export as GPX for your bike computer.
        </p>
        <p>
          It is local-first: your Strava token, visited postcodes and selection live in the browser, and the Python backend is stateless and only does the matching and routing. The code is on <Out href="https://github.com/marnickvda/postcodejager">GitHub</Out>.
        </p>
      </Article>
      <Article
        id="know-it-all"
        date="2026-06-18T00:00Z"
        title="know-it-all"
      >
        <p>
          A set of agent skills for understanding a code change before you approve it. <code>walkthrough</code> explains the change in the order it runs, <code>quiz-me</code> tests you on it (mostly &quot;why X over Y?&quot;) and <code>design-review</code> turns what stayed unclear into design-level PR comments.
        </p>
        <p>
          It is open source on <Out href="https://github.com/marnickvda/know-it-all">GitHub</Out> and I still maintain it.
        </p>
      </Article>
      <Article
        id="dotfiles"
        date="2025-03-14T00:00Z"
        title="dotfiles"
      >
        <p>
          My development setup, built around vim motions: Neovim as editor, zsh with starship, tmux as terminal multiplexer and catppuccin as color scheme everywhere. One install script sets up a new machine.
        </p>
        <p>
          It is public on <Out href="https://github.com/marnickvda/dotfiles">GitHub</Out> and changes whenever my workflow does.
        </p>
      </Article>
      <Article
        id="abitofsoftware-com-launch"
        date="2023-11-12T00:00Z"
        title="abitofsoftware.com launch"
      >
        <p>
          I&apos;ve put together this space to share techie updates, spill my thoughts in blog posts, and just geek out about software development.
        </p>
        <p>
          Whether you&apos;re a professional or just starting, we&apos;ve got a bit about software for you. I&apos;m all about sharing what I know in a way that&apos;s easy to understand. Get in the loop with the latest tech buzz and explore the world of full-stack development together!
        </p>
      </Article>
      <Article
        id="lamp-framework"
        date="2023-03-16T00:00Z"
        title="LAMP Framework"
      >
        <p>
          The prototype framework I built in Kotlin for my Master&apos;s thesis at the University of Twente. The thesis is <Out href="https://essay.utwente.nl/94619/">published by the university</Out> and the code is on <Out href="https://github.com/marnickvda/LAMP-Framework">GitHub</Out>.
        </p>
      </Article>
      <Article
        id="streepn"
        date="2020-12-16T00:00Z"
        title="Streepn"
      >
        <Gallery
          images={[
            { src: streepn, alt: 'The Streepn app showing transactions and products' },
            { src: streepnTransactions, alt: 'The list of transactions in Streepn' },
          ]}
        />
        <p>
          An iOS and Android app for students in student houses to manage their shared expenses: who took which beer or coffee, what is in stock and who owes what. I worked on it from 2020 to 2022.
        </p>
        <p>
          It consists of an Ionic and Angular <Out href="https://github.com/marnickvda/streepn-app">mobile app</Out>, a <Out href="https://github.com/marnickvda/streepn-serverless">serverless backend</Out> on Firebase and a <Out href="https://github.com/marnickvda/streepn-website">website</Out>, all open source.
        </p>
      </Article>
    </>
  )
}
