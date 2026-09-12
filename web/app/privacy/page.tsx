import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { product } from "@/lib/content";

export const metadata: Metadata = {
  title: `Privacy — ${product.name}`,
  description:
    "Mika+ScreenSnap collects nothing itself. Screenshots stay on your Mac and the app has no backend.",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted">
        {children}
      </div>
    </section>
  );
}

export default function Privacy() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
            Privacy
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">
            What the app knows about you
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Nothing. {product.name} has no account system, no analytics and no
            backend to send anything to. This page explains exactly what that
            means.
          </p>

          <Section title="Screen recording data">
            <p>
              macOS calls the permission{" "}
              <em>Screen &amp; System Audio Recording</em>, and asks for it before any
              app may read what is on your display. {product.name} needs it for one
              thing: to take the screenshot you asked for. It records no video and no
              audio. Every capture is a single still image, taken at the moment you
              press a shortcut or choose a command in the menu bar — never in the
              background, never on a timer.
            </p>
            <p>
              <strong className="font-semibold text-foreground">
                What is captured.
              </strong>{" "}
              The pixels of the region you chose: the whole display, an area you drag,
              or a window you click. Nothing else is read, and nothing about your other
              apps is recorded. Windows belonging to apps on your exclusion list are
              removed from the picture before the app ever sees it.
            </p>
            <p>
              <strong className="font-semibold text-foreground">
                What it is used for.
              </strong>{" "}
              Showing you the capture, letting you annotate it, and saving or copying
              it — that is the whole purpose. Text recognition (OCR) and the colour
              picker work on those same pixels, on your Mac, using Apple&apos;s Vision
              framework. Screen data is never used for analytics, advertising,
              profiling, or training any model.
            </p>
            <p>
              <strong className="font-semibold text-foreground">
                Who it is shared with.
              </strong>{" "}
              Nobody. There is no server, no third-party SDK and no analytics provider
              to share it with. Captures leave your Mac only if you send them somewhere
              yourself. Nothing is uploaded, and the app has no code that would be able
              to do so — you can verify this in the{" "}
              <a
                href={product.repo}
                className="text-teal-light underline underline-offset-4 hover:text-teal-lightest"
              >
                source
              </a>
              .
            </p>
            <p>
              <strong className="font-semibold text-foreground">
                Where it is stored.
              </strong>{" "}
              On your own Mac, in the folder you pick during setup, with a small preview
              image beside it in a <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px] text-teal-lightest">.thumbnails</code>{" "}
              subfolder so the history window has something to show. Pinned screenshots
              are held in the app&apos;s own Application Support folder until you close
              the pin. Recognised text and sampled colours go to your clipboard and are
              never written to disk. Your settings live in the app&apos;s preferences;
              they contain no image data.
            </p>
            <p>
              <strong className="font-semibold text-foreground">
                How long it is kept.
              </strong>{" "}
              For as long as you keep the files, and no longer. The app expires nothing
              behind your back and keeps no second copy: the history window is a view of
              your save folder, so a screenshot exists until you delete it — in that
              window, or in the Finder. <em>Delete all</em> there removes every image in
              the folder along with the thumbnails. Closing a pinned screenshot deletes
              its stored image immediately. Captures you never save are held in memory
              only and are gone when you close the editor.
            </p>
          </Section>

          <Section title="Analytics">
            <p>
              The app collects none. No usage statistics, no crash reporting, no
              identifiers, no cookies inside the app — whichever way you
              installed it.
            </p>
            <p>
              One thing changes if you install from the{" "}
              <strong className="font-semibold text-foreground">
                Mac App Store
              </strong>
              : Apple then collects its own crash reports and usage figures for
              this app and shows them to the developer in aggregate. That
              happens only if you have allowed it under{" "}
              <em>System Settings &rsaquo; Privacy &amp; Security &rsaquo;
              Analytics &amp; Improvements</em>, it is Apple&apos;s collection
              rather than the app&apos;s, and the developer never sees anything
              that identifies you. The direct download has no equivalent. We
              mention it because &ldquo;collects nothing&rdquo; would otherwise
              be quietly untrue for App Store users.
            </p>
          </Section>

          <Section title="The one network connection">
            <p>
              To check for updates, the app asks GitHub for a small release feed
              at{" "}
              <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[13px] text-teal-lightest">
                raw.githubusercontent.com
              </code>
              . That request tells GitHub your IP address and the app version,
              in the same way visiting any web page would. Sparkle&apos;s
              optional system profiling is not enabled, so no hardware or usage
              details are attached. Downloading an update fetches a file from
              GitHub Releases.
            </p>
            <p>
              The App Store version does not do this at all: it contains no
              updater, and makes no network connection of its own. Updates
              arrive through the App Store.
            </p>
          </Section>

          <Section title="Permissions the app asks for">
            <p>
              Only Screen &amp; System Audio Recording, which macOS requires
              before any app may read the contents of your display. It is used
              solely to take the screenshot you asked for. Despite the name of
              the permission, the app captures no audio and no video — it has no
              code for either.
            </p>
            <p>
              It asks for nothing else: no camera, no microphone, no location, no
              contacts, no accessibility access, and no account of any kind.
            </p>
          </Section>

          <Section title="This website">
            <p>
              The site is a set of static pages hosted on Vercel. It sets no
              cookies and runs no analytics or tracking scripts. Vercel records
              standard server request logs, which include IP addresses, as part
              of operating the hosting service.
            </p>
          </Section>

          <Section title="Changes">
            <p>
              If any of this ever changes, it will change here first, and the
              commit history of the repository will show exactly when and why.
            </p>
          </Section>

          <p className="mt-12 border-t border-line/70 pt-6 text-sm text-faint">
            Questions? Open an issue on{" "}
            <a
              href={product.repo}
              className="text-teal-light underline underline-offset-4 hover:text-teal-lightest"
            >
              GitHub
            </a>{" "}
            or head{" "}
            <Link
              href="/"
              className="text-teal-light underline underline-offset-4 hover:text-teal-lightest"
            >
              back to the overview
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
