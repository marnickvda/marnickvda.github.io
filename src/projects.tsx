import { Article, Out } from '@/components/Article'
import { Gallery } from '@/components/Gallery'
import bifrost from '@/images/bifrost.webp'
import bifrostEvent from '@/images/bifrost-event.webp'
import bifrostMembers from '@/images/bifrost-members.webp'
import bifrostSignIn from '@/images/bifrost-sign-in.webp'
import muziekQuiz from '@/images/muziek-quiz.webp'
import muziekQuizLobby from '@/images/muziek-quiz-lobby.webp'
import muziekQuizTurn from '@/images/muziek-quiz-turn.webp'
import postcodejager from '@/images/postcodejager.webp'
import streepn from '@/images/streepn.webp'
import streepnTransactions from '@/images/streepn-transactions.webp'

/**
 * The timeline, newest first. To add a project: copy an <Article>, give it a
 * unique id and a date, and import its screenshots above. `stack` and `links`
 * are the line under the title that a reader scans first.
 */
export function Projects() {
  return (
    <>
      <Article
        id="de-grote-muziek-quiz"
        date="2026-11-23T00:00Z"
        title="De Grote Muziek Quiz"
        stack={['TypeScript', 'React', 'Express', 'Socket.IO']}
        links={[{ label: 'Live', href: 'https://muziek-quiz.nl' }]}
      >
        <Gallery
          eager
          images={[
            { src: muziekQuiz, width: 1280, height: 800, alt: 'The home screen of De Grote Muziek Quiz' },
            {
              src: muziekQuizTurn,
              width: 1280,
              height: 800,
              alt: 'A player on turn, placing the song that is playing in their timeline',
            },
            {
              src: muziekQuizLobby,
              width: 1280,
              height: 800,
              alt: 'The lobby with the game code, a QR code to join and four players',
            },
          ]}
        />
        <p>
          A party game you play in the browser on your phones. One phone hangs on the speaker and plays a song, and the player or team on turn places it in their timeline by its rank in the NPO Radio 2 Top 2000. Whoever fills their timeline first wins. My friends and I first played it in 2025, which is where the idea came from; the game as it looks now was built in 2026.
        </p>
        <p>
          It is built with TypeScript on both sides: a React frontend and an Express and Socket.IO server that keeps every game in memory, running on a single small Hetzner server behind Caddy. You can play it at <Out href="https://muziek-quiz.nl">muziek-quiz.nl</Out>.
        </p>
        <p>
          That one server, with 2 vCPUs and 4 GB of memory, goes further than you would expect. In a load test with bots that create games, join and play real turns, it ran 1,200 games with 6,000 players at the same time without a single error; memory ran out before the CPU did.
        </p>
      </Article>
      <Article
        id="web-app-for-dispuut-thoridor"
        date="2026-11-01T00:00Z"
        title="Web app for Dispuut Thoridor"
        stack={['Next.js', 'React', 'Tailwind CSS', 'Postgres', 'Drizzle', 'Auth.js', 'Vercel']}
      >
        <Gallery
          images={[
            {
              src: bifrost,
              width: 1440,
              height: 760,
              alt: 'The Bifröst dashboard with upcoming events and member numbers',
            },
            {
              src: bifrostMembers,
              width: 1440,
              height: 800,
              alt: 'The member list of Bifröst as a grid of cards',
            },
            {
              src: bifrostEvent,
              width: 1440,
              height: 800,
              alt: 'An event in Bifröst with paid extras, sign-up and who is going',
            },
            {
              src: bifrostSignIn,
              width: 1280,
              height: 800,
              alt: 'The sign-in page of Bifröst, with lightning behind it',
            },
          ]}
        />
        <p>
          I started in the first weeks of 2024 and have kept working on it since; it is now in a state worth showing. It is the members platform of my fraternity, Dispuut Thoridor. Since our fraternity is based on Norse mythology, the portal is called <Out href="https://en.wikipedia.org/wiki/Bifr%C3%B6st">Bifröst</Out>, after the bridge between Earth and Asgard.
        </p>
        <p>
          What began as a list of contact details has grown into the place where the fraternity organises itself. Members sign up for events, with paid extras such as bringing a guest, get a confirmation by mail and can add the event to their calendar. Organisers see who is coming, send updates to the participants and can share an event with a link.
        </p>
        <p>
          Members look each other up in the member list, as a table or as a grid of photos, and save each other to their phone&apos;s contacts. They see who has a birthday coming and find everyone on a map: each time a member changes their address, the <Out href="https://developers.google.com/maps/documentation/geocoding">Google Geocoding API</Out> turns it into a marker. Boards and committees are kept per academic year, so a profile shows which groups someone has been part of and who they sat with. On a phone it installs to the home screen like an app.
        </p>
        <p>
          It is built with <Out href="https://nextjs.org/">Next.js</Out>, React and <Out href="https://tailwindcss.com/">Tailwind CSS</Out> on <Out href="https://vercel.com/">Vercel</Out>, with Postgres on <Out href="https://neon.com/">Neon</Out> through <Out href="https://orm.drizzle.team/">Drizzle</Out>. Signing in works through <Out href="https://authjs.dev/">Auth.js</Out> with a link by mail or a passkey, so nobody has a password to forget. The mails are written with <Out href="https://jsx.email/">jsx-email</Out>, profile photos sit in a private Vercel Blob store and <Out href="https://sentry.io/">Sentry</Out> reports errors. Everything specific to Thoridor, from the name and logo to which features are on, lives in one configuration, so another fraternity could run it too.
        </p>
      </Article>
      <Article
        id="postcodejager"
        date="2026-06-21T00:00Z"
        title="Postcodejager"
        stack={['Python', 'Strava API', 'Local-first']}
        links={[{ label: 'Code', href: 'https://github.com/marnickvda/postcodejager' }]}
      >
        <Gallery
          images={[
            {
              src: postcodejager,
              width: 1440,
              height: 900,
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
        id="lamp-framework"
        date="2023-03-16T00:00Z"
        title="LAMP Framework"
        stack={['Kotlin']}
        links={[
          { label: 'Thesis', href: 'https://essay.utwente.nl/94619/' },
          { label: 'Code', href: 'https://github.com/marnickvda/LAMP-Framework' },
        ]}
      >
        <p>
          A language-agnostic, multi-paradigm framework for code quality assurance: it turns a project&apos;s code into a common model and computes metrics such as coupling, cohesion and inheritance depth from it. I built the prototype in Kotlin for my Master&apos;s thesis at the University of Twente. The thesis is <Out href="https://essay.utwente.nl/94619/">published by the university</Out> and the code is on <Out href="https://github.com/marnickvda/LAMP-Framework">GitHub</Out>.
        </p>
      </Article>
      <Article
        id="streepn"
        date="2020-12-16T00:00Z"
        title="Streepn"
        stack={['Ionic', 'Angular', 'Firebase']}
        links={[
          { label: 'App', href: 'https://github.com/marnickvda/streepn-app' },
          { label: 'Backend', href: 'https://github.com/marnickvda/streepn-serverless' },
          { label: 'Website', href: 'https://github.com/marnickvda/streepn-website' },
        ]}
      >
        <Gallery
          images={[
            { src: streepn, width: 1200, height: 899, alt: 'The Streepn app showing transactions and products' },
            { src: streepnTransactions, width: 1000, height: 1000, alt: 'The list of transactions in Streepn' },
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
