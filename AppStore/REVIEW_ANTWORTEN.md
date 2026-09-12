# Antworten an App Review

Was hier steht, geht als Antwort im Resolution Center von App Store Connect raus — auf
Englisch, weil dort auf Englisch geprüft wird. Jede Ablehnung bekommt einen eigenen
Abschnitt mit der Beanstandung, der Änderung und dem Text zum Kopieren. Wer eine Ablehnung
nachlesen will, findet hier, was geantwortet wurde und warum.

---

## 3.6.0 · abgelehnt 2026-09-09 · Richtlinie 5.1.1(iv)

**Submission ID:** c4bb3a99-b517-4e8e-b61c-3254960ae22a
**Geprüfte Fassung:** 3.6.0 (3.6.0) · **Antwort mit Build:** 3.6.1

### Was beanstandet wurde

> The app encourages or directs users to allow the app to access the screen recording.
> Specifically: A custom message appears before the permission request, and to proceed
> users press a "Grant Access" button. Use words like "Continue" or "Next" on the button
> instead.

### Was geändert wurde

- Die Schaltfläche vor dem Systemdialog heißt **„Continue"** statt „Grant Access"
  (`Sources/Onboarding/PermissionScreen.swift`).
- Nach einer abschlägigen Antwort öffnet die Anwendung die Systemeinstellung **nicht mehr
  von sich aus**. Sie stellt sachlich fest, was ohne die Berechtigung nicht geht, und bietet
  *Open System Settings* an — nehmen muss den Weg der Nutzer. Das selbsttätige Öffnen war
  der zweite Angriffspunkt unter derselben Richtlinie; Apples eigener Vorschlag im Bescheid
  ist ein Hinweis mit Link, kein erzwungener Sprung.
- Der Erklärtext bleibt: Er nennt den Zweck und sagt zu, dass nichts den Rechner verlässt.
  Ein Bildschirm, der erklärt, ist zulässig — einer, der wirbt, nicht.
- `StoreAssetTests.testThePermissionScreenDoesNotCampaignForTheAnswer` hält die neutrale
  Beschriftung fest, damit sie nicht zurückkommt.
- `CFBundleVersion` auf `3.6.1`, Marketing-Version bleibt 3.6.0. **Nicht `3.6.0.1`** —
  der Upload wies das mit Fehler 90257 ab: Beide Versionsschlüssel nehmen höchstens drei
  punktgetrennte ganze Zahlen. Die Build-Nummer darf von der Marketing-Version abweichen,
  sie muss nur höher sein als jede zuvor hochgeladene. Nächste Runde also 3.6.2.
  `StoreAssetTests.testBothVersionKeysHaveAShapeAppStoreConnectAccepts` hält die Form fest.

### Antworttext

```text
Thank you for the review.

In build 3.6.1 the button shown before the Screen Recording prompt is labelled
"Continue". The screen only explains what the permission is used for and states that
captures never leave the user's Mac.

If the user declines, the app no longer opens System Settings by itself. It states that
capturing is unavailable and offers an optional "Open System Settings" button, and setup
continues either way.

The app remains usable without the permission: the menu bar shows a persistent note that
Screen Recording has not been granted, and the capture commands are disabled rather than
failing silently.
```

---

## 3.6.0 (3.6.1) · Rückfrage 2026-09-12 · Richtlinie 2.1

**Submission ID:** c4bb3a99-b517-4e8e-b61c-3254960ae22a
**Geprüfte Fassung:** 3.6.0 (3.6.1) · Gerät: MacBook Pro 14" (Nov 2024)

### Was verlangt wurde

Keine Ablehnung, sondern *Information Needed*: sieben Fragen zur Bildschirmaufnahme —
welche Funktionen sie nutzen, welche Daten anfallen, zu welchem Zweck, ob sie an Dritte
gehen, wo sie liegen, welche Abschnitte der Datenschutzerklärung das regeln und deren
Wortlaut.

### Was geändert wurde

Am Programm nichts — die Rückfrage betrifft keinen Mangel im Code. Geändert wurde die
Datenschutzerklärung (`web/app/privacy/page.tsx`), weil zwei der sieben Fragen sich mit
dem alten Text nicht belegen ließen:

- Der Abschnitt *Your screenshots* heißt jetzt ***Screen recording data*** und beantwortet
  Erhebung, Zweck, Weitergabe, Speicherort und **Aufbewahrung** je unter eigener
  Überschrift. Die Aufbewahrung fehlte bisher ganz, und Frage 6 verlangt sie ausdrücklich.
- Der Begriff *screen recording* stand nirgends wörtlich auf der Seite. Ein Prüfer, der
  danach sucht, fand nichts.
- *Permissions the app asks for* sagt jetzt, dass trotz des Namens der Berechtigung weder
  Ton noch Video aufgezeichnet wird, und nennt die Berechtigungen, die die Anwendung
  **nicht** verlangt.

**Die Antwort darf erst raus, wenn die Seite live ist.** Sie zitiert die Erklärung
wörtlich; ein Zitat, das unter der angegebenen URL nicht steht, ist schlimmer als keins.

### Belege im Code (falls nachgefragt wird)

| Behauptung | Fundstelle |
|---|---|
| Nur Einzelbilder, kein Stream | `SCScreenshotManager.captureImage` in `CaptureEngine.swift:136`, `ColorPickerEngine.swift:94` — kein `SCStream` im Projekt |
| Kein Ton | `capturesAudio` kommt nirgends vor |
| Keine Netzverbindung im Store-Bau | `Package.swift:9` (`MIKA_APPSTORE=1` lässt Sparkle weg), kein `URLSession` in `Sources/` |
| Sandbox ohne Netzrecht | `Resources/MikaScreenSnap-AppStore.entitlements` — kein `com.apple.security.network.client` |
| Speicherorte | `SaveLocationStore.swift` (Nutzerordner per Bookmark), `PinnedScreenshotManager.swift:19` (Container) |
| Löschen | `ScreenshotHistoryManager.deleteItem/clearAll`, `PinnedScreenshotManager.deletePersistedImage` |

### Antworttext

```text
Thank you for the review. Answers to the seven questions, in order.

1. APP FEATURES THAT USE SCREEN RECORDING

Mika+ScreenSnap is a screenshot utility. The permission is used only to take still
screenshots the user explicitly asks for, each triggered by a keyboard shortcut or a
menu bar command:

- Capture full screen (default ⌃⇧⌘3): one still image of the display the pointer is on.
- Capture area (⌃⇧⌘4): one still image of a rectangle the user drags.
- Capture window (⌃⇧⌘5): one still image of a window the user clicks.
- Capture text / OCR (⇧⌘6): one still image of a selected area, from which text is
  recognised on device with Apple's Vision framework.
- Colour picker (⇧⌘7): the colour of the pixel under the pointer, read from one still
  image per display taken when the picker opens.

Every other feature (annotation editor, redaction, pinning, history, ruler, preferences)
operates on an image one of the above already produced and requests no further screen
data.

Implementation detail that may help: all of these call SCScreenshotManager.captureImage
from ScreenCaptureKit, which returns a single frame. The app never opens an SCStream,
never records video and never captures audio — macOS simply files still screen capture
under the "Screen & System Audio Recording" permission. There is no timed, scheduled or
background capture: nothing is captured unless the user triggers it.

2. WHAT DATA THE APP COLLECTS VIA SCREEN RECORDING

Only the pixels of the region the user selected, at the moment they triggered the
capture. Nothing else: no window titles, no list of running applications, no keystrokes,
no audio, no device or user identifiers, no metadata beyond the image itself. Windows
belonging to applications the user has added to the exclusion list are filtered out
before the capture is taken, so they do not appear in the image.

The app "collects" this only in the sense that it produces the picture the user asked
for. None of it is collected by us: no screen data reaches the developer, and there is
nowhere for it to go.

3. PURPOSES

A single purpose: giving the user the screenshot they asked for — showing it, letting
them annotate or redact it, and saving it to their disk or clipboard. OCR turns the
captured pixels into text on the user's own Mac and places it on the clipboard; the
colour picker turns a pixel into a colour value and places that on the clipboard.

There are no further uses. Screen data is not used for analytics, advertising,
profiling, personalisation, machine learning, or any developer-side purpose.

4. SHARING WITH THIRD PARTIES

No. The data is shared with no one.

The App Store build contains no analytics SDK, no crash reporting SDK, no advertising
SDK and no third-party framework of any kind. It has no backend, and the developer
operates no service that could receive a screenshot. The build is sandboxed and does not
request the com.apple.security.network.client entitlement, so it cannot open an outbound
connection at all. (The Sparkle updater used by the direct download from our website is
excluded from the App Store build at compile time; it only ever fetched a release feed
and never transmitted image data.)

A screenshot leaves the user's Mac only if the user saves it and sends it somewhere
themselves.

5. WHERE THE INFORMATION IS STORED

On the user's own Mac, and nowhere else:

- Saved captures: the folder the user picks during first run, accessed through a
  security-scoped bookmark (com.apple.security.files.user-selected.read-write), together
  with a 200 px preview in a ".thumbnails" subfolder of that same folder.
- Pinned screenshots: the app's own container, at
  ~/Library/Containers/lu.daumedia.screensnap/Data/Library/Application Support/
  MikaScreenSnap/PinnedScreenshots. Closing a pin deletes its file immediately.
- Copied images, recognised text and colour values: the system clipboard.
- Captures the user does not save: held in memory only, discarded when the editor closes.

Retention: files remain until the user deletes them, and no longer. The history window
is a view of the user's save folder rather than a second copy; the app expires nothing
on its own and keeps no separate database of captures. "Delete all" in the history
window removes the images and their thumbnails from disk.

The complete source code is public at https://github.com/daumedia/MikaScreenSnap, so
every statement above can be verified directly.

6. RELEVANT SECTIONS OF THE PRIVACY POLICY

Privacy policy: https://screensnap.daumedia.lu/privacy

- "Screen recording data" — collection, use, disclosure and sharing, storage location
  and retention, under the paragraph headings "What is captured", "What it is used for",
  "Who it is shared with", "Where it is stored" and "How long it is kept".
- "Analytics" — that the app itself collects none.
- "The one network connection" — that the App Store version makes no network connection
  of its own.
- "Permissions the app asks for" — the permission, its sole use, and the permissions the
  app does not request.

7. SPECIFIC LANGUAGE CONCERNING SCREEN RECORDING DATA

Quoted verbatim from the "Screen recording data" section:

"macOS calls the permission Screen & System Audio Recording, and asks for it before any
app may read what is on your display. Mika+ScreenSnap needs it for one thing: to take
the screenshot you asked for. It records no video and no audio. Every capture is a
single still image, taken at the moment you press a shortcut or choose a command in the
menu bar — never in the background, never on a timer."

"What is captured. The pixels of the region you chose: the whole display, an area you
drag, or a window you click. Nothing else is read, and nothing about your other apps is
recorded. Windows belonging to apps on your exclusion list are removed from the picture
before the app ever sees it."

"What it is used for. Showing you the capture, letting you annotate it, and saving or
copying it — that is the whole purpose. Text recognition (OCR) and the colour picker
work on those same pixels, on your Mac, using Apple's Vision framework. Screen data is
never used for analytics, advertising, profiling, or training any model."

"Who it is shared with. Nobody. There is no server, no third-party SDK and no analytics
provider to share it with. Captures leave your Mac only if you send them somewhere
yourself. Nothing is uploaded, and the app has no code that would be able to do so — you
can verify this in the source."

"Where it is stored. On your own Mac, in the folder you pick during setup, with a small
preview image beside it in a .thumbnails subfolder so the history window has something
to show. Pinned screenshots are held in the app's own Application Support folder until
you close the pin. Recognised text and sampled colours go to your clipboard and are
never written to disk. Your settings live in the app's preferences; they contain no
image data."

"How long it is kept. For as long as you keep the files, and no longer. The app expires
nothing behind your back and keeps no second copy: the history window is a view of your
save folder, so a screenshot exists until you delete it — in that window, or in the
Finder. Delete all there removes every image in the folder along with the thumbnails.
Closing a pinned screenshot deletes its stored image immediately. Captures you never
save are held in memory only and are gone when you close the editor."

And from "Permissions the app asks for":

"Only Screen & System Audio Recording, which macOS requires before any app may read the
contents of your display. It is used solely to take the screenshot you asked for.
Despite the name of the permission, the app captures no audio and no video — it has no
code for either."

Please let us know if anything further would help.
```
