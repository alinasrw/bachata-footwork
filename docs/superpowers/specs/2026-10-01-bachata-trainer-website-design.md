# Bachata Footwork Trainer – Website Design

**Datum:** 2026-10-01
**Status:** Approved (pending final spec review)

## Ziel

Die bestehende Step-Sammlung (`BACHATA_STEPS.md`) als kostenlose, einfach wartbare Website bereitstellen. Zwei Ansichten:

1. **Liste** – die komplette Step-Referenz, durchsuchbar.
2. **Trainer** – ein Zufallsgenerator, der beim Üben automatisch (BPM-getaktet) Figuren vorgibt, mit konfigurierbaren Einstellungen.

Alle Steps sind Solo-Footwork (kein Paartanz).

## Architektur

Statische Website ohne Build-Tool und ohne Framework (Vanilla HTML/CSS/JS), gehostet auf **GitHub Pages**. Dateien liegen im Repo-Root:

- `index.html` – Grundgerüst mit zwei Tabs: "Liste" und "Trainer"
- `steps.js` – alle Steps als strukturierte Daten (einzige Quelle der Wahrheit)
- `app.js` – Rendering der Liste, Trainer-Logik, Timer
- `style.css` – einfaches, mobilfreundliches Layout

Keine Server, keine Datenbank, keine Build-Pipeline. Deployment = `git push` + GitHub Pages aktiviert (Branch `main`, Root-Ordner).

URL-Form: `https://<github-username>.github.io/footwork/`

## Datenmodell (`steps.js`)

```js
{
  name: "Madrid",
  category: "Rompe & Madrid Familie",
  countLength: 4,              // 4 oder 8 Counts
  countingDisplay: "1-2-3-4",  // Anzeige-String für die Liste
  description: "Kreuzschritt vorne/hinten ...",
  doubleForEight: true         // true = wird im 8-Count-Modus auf beide Seiten verdoppelt
}
```

Kategorien entsprechen den Abschnitten aus `BACHATA_STEPS.md`:
Grundlagen, Rompe & Madrid Familie, Sin Copa & Syncopation, Hüfte & Körperbewegung, Tap-/Heel-/Toe-Varianten, Kreuz- & Gleitschritte, Tiki Taka & Kicks, Drehungen & Übergänge, Fusion-Elemente.

Regeln:
- Steps mit `countLength: 8` (z. B. Basic, Quadrat, Open/Close) werden direkt als volle Figur gezogen.
- Steps mit `countLength: 4` und `doubleForEight: true` (z. B. Madrid, Rompe adelante, Caballito, Contra Cadero, Puñaito) werden im 8-Count-Modus als **"\<Name\> (beide Seiten)"** gezogen, Anzeige `1-2-3-4 / 5-6-7-8`.
- Fusion-Elemente ohne festen Count (Chest Roll, Fusion Wave, Shoulder Fusion) bekommen `countLength: 8` als Näherung, da sie meist über eine volle Phrase laufen.

## Tab 1: Liste

- Rendert alle Steps gruppiert nach Kategorie, als Tabelle (Name, Counting, Beschreibung) — identisch zur Struktur in `BACHATA_STEPS.md`.
- Einfaches Textfeld zum Filtern/Suchen nach Namen (clientseitig, kein Backend).

## Tab 2: Trainer

### Einstellungen (Panel oben)

- **Count-Modus**: Radio-Buttons `4 Counts` / `8 Counts`
- **Basic dazwischen**: Toggle (an = nach jeder Zufallsfigur wird ein Basic-Block eingeschoben, bevor die nächste Zufallsfigur kommt; aus = Zufallsfiguren direkt hintereinander)
- **BPM**: Zahlenfeld, Standardwert 130
- **Kategorie-Filter**: Checkbox pro Kategorie (alle standardmäßig aktiv); nur Steps aus aktivierten Kategorien werden gezogen

### Ablauf

Start-Button:
1. Figur zufällig aus den Steps ziehen, die zum aktiven Count-Modus passen und deren Kategorie aktiviert ist.
2. Anzeige: großer Name der Figur + Counting-String (z. B. `1 2 3 4`).
3. Visueller Count-Hochzähler läuft synchron zum BPM-Takt (1 Count = `60000 / BPM` ms), keine Audio-Ausgabe.
4. Nach Ablauf des Blocks: wenn "Basic dazwischen" aktiv, wird ein Basic-Block (passend zum Count-Modus) eingeschoben, danach erst die nächste Zufallsfigur; wenn inaktiv, direkt die nächste Zufallsfigur.
5. Loop läuft bis "Stop" gedrückt wird.

Stop-Button pausiert den Loop sofort (auch mitten im Count).

### Nicht enthalten (bewusst out of scope für v1)

- Kein Audio-Metronom/Klick – nur visuelle Zahlenanzeige.
- Keine Gewichtung/Wahrscheinlichkeitssteuerung einzelner Steps.
- Keine Speicherung von Trainingshistorie oder Statistiken.
- Kein Nutzer-Login, keine Synchronisation zwischen Geräten.

## Tab 3: Impressum & Datenschutz

Da die Seite öffentlich für andere bereitgestellt wird (nicht nur privater/familiärer Gebrauch), gibt es eine dritte, einfache Seite/Tab:

- **Impressum**: Platzhalter für Name und Kontakt-E-Mail, vom Betreiber selbst auszufüllen (`index.html`-Kommentar markiert die Stelle `<!-- TODO: Name & Kontakt eintragen -->`).
- **Datenschutzhinweis** (kurzer Absatz): Die Seite selbst sammelt, speichert oder verarbeitet keine Nutzerdaten (kein Login, keine Cookies, keine Formulare). Hosting erfolgt über GitHub Pages; GitHub protokolliert dabei serverseitig technische Zugriffsdaten (z. B. IP-Adressen) gemäß der [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).

Kein Tracking, keine Analytics, keine Drittanbieter-Skripte.

## Deployment-Schritte

1. Dateien (`index.html`, `steps.js`, `app.js`, `style.css`) im Repo-Root committen.
2. In den GitHub-Repo-Settings unter "Pages" den Branch `main` und Root-Ordner `/` als Quelle aktivieren.
3. Website ist danach unter `https://<github-username>.github.io/footwork/` erreichbar.
4. Künftige Änderungen: Dateien bearbeiten, committen, pushen — GitHub Pages deployed automatisch neu.
