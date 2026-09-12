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

**Das Feld im Resolution Center nimmt höchstens 4000 Zeichen.** Die erste Fassung hatte
gut 8000 und wurde abgewiesen; die folgende hat 3970. Gekürzt wurden die Erläuterungen,
nicht die Antworten: alle sieben Fragen sind weiterhin einzeln beantwortet, und die vier
Zitate sind wörtlich — Auslassungen stehen als `[...]`, geprüft gegen die Live-Seite.

```text
Thank you for the review. Answers in order.

1. FEATURES USING SCREEN RECORDING

Mika+ScreenSnap is a screenshot utility. Every use is a still image the user explicitly asks for, by keyboard shortcut or menu bar command: capture full screen, capture a dragged area, capture a clicked window, capture text (OCR on a selected area, recognised on device with Apple's Vision framework), and the colour picker (the colour of the pixel under the pointer). Annotation, redaction, pinning, history and the ruler work on an image already captured and request no further screen data.

All of these call SCScreenshotManager.captureImage, which returns a single frame. The app never opens an SCStream, never records video and never captures audio; macOS simply files still capture under the "Screen & System Audio Recording" permission. There is no timed or background capture.

2. DATA COLLECTED

Only the pixels of the region the user selected, at the moment they triggered the capture. No window titles, no list of running apps, no keystrokes, no audio, no identifiers. Windows of apps on the user's exclusion list are filtered out before capture. None of this reaches the developer.

3. PURPOSES

One: giving the user the screenshot they asked for - showing it, letting them annotate or redact it, saving it to their disk or clipboard. OCR and the colour picker convert those same pixels to text or a colour value on the user's Mac. Screen data is never used for analytics, advertising, profiling or model training.

4. SHARING WITH THIRD PARTIES

None. No analytics, crash reporting or advertising SDK, no third-party framework, no backend. The App Store build is sandboxed and does not request com.apple.security.network.client, so it cannot open an outbound connection at all. (The Sparkle updater used by the direct download from our website is excluded from this build at compile time and never transmitted image data.) A capture leaves the Mac only if the user sends it somewhere themselves.

5. STORAGE AND RETENTION

On the user's own Mac only:
- Saved captures: the folder chosen during first run, reached via a security-scoped bookmark, plus a preview in a ".thumbnails" subfolder there.
- Pinned screenshots: the app container (Application Support/MikaScreenSnap/PinnedScreenshots); closing a pin deletes the file at once.
- Copied images, recognised text, colour values: the system clipboard.
- Unsaved captures: memory only.

Files remain until the user deletes them. The history window is a view of that folder, not a second copy; the app expires nothing on its own. Source code: github.com/daumedia/MikaScreenSnap

6. RELEVANT PRIVACY POLICY SECTIONS

https://screensnap.daumedia.lu/privacy - "Screen recording data" (collection, use, sharing, storage and retention, under the headings "What is captured", "What it is used for", "Who it is shared with", "Where it is stored", "How long it is kept"), "Analytics", "The one network connection", "Permissions the app asks for".

7. SPECIFIC LANGUAGE

"Mika+ScreenSnap needs it for one thing: to take the screenshot you asked for. It records no video and no audio. Every capture is a single still image, taken at the moment you press a shortcut or choose a command in the menu bar — never in the background, never on a timer."

"Who it is shared with. Nobody. There is no server, no third-party SDK and no analytics provider to share it with. Captures leave your Mac only if you send them somewhere yourself. Nothing is uploaded, and the app has no code that would be able to do so [...]"

"Where it is stored. On your own Mac, in the folder you pick during setup [...] Recognised text and sampled colours go to your clipboard and are never written to disk."

"How long it is kept. For as long as you keep the files, and no longer. The app expires nothing behind your back and keeps no second copy [...] a screenshot exists until you delete it — in that window, or in the Finder."

Happy to provide anything further.
```
