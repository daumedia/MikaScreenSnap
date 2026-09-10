# Antworten an App Review

Was hier steht, geht als Antwort im Resolution Center von App Store Connect raus — auf
Englisch, weil dort auf Englisch geprüft wird. Jede Ablehnung bekommt einen eigenen
Abschnitt mit der Beanstandung, der Änderung und dem Text zum Kopieren. Wer eine Ablehnung
nachlesen will, findet hier, was geantwortet wurde und warum.

---

## 3.6.0 · abgelehnt 2026-09-09 · Richtlinie 5.1.1(iv)

**Submission ID:** c4bb3a99-b517-4e8e-b61c-3254960ae22a
**Geprüfte Fassung:** 3.6.0 (3.6.0) · **Antwort mit Build:** 3.6.0.1

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
- `CFBundleVersion` auf `3.6.0.1`, Marketing-Version bleibt 3.6.0.

### Antworttext

```text
Thank you for the review.

In build 3.6.0.1 the button shown before the Screen Recording prompt is labelled
"Continue". The screen only explains what the permission is used for and states that
captures never leave the user's Mac.

If the user declines, the app no longer opens System Settings by itself. It states that
capturing is unavailable and offers an optional "Open System Settings" button, and setup
continues either way.

The app remains usable without the permission: the menu bar shows a persistent note that
Screen Recording has not been granted, and the capture commands are disabled rather than
failing silently.
```
