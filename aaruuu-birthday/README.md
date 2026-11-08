# A tiny universe for Aaruuu ♥️

A mobile-first, interactive birthday website built with React + Vite.

## Run locally

1. Install Node.js (LTS).
2. Open this folder in a terminal.
3. Run `npm install`.
4. Run `npm run dev` and open the local URL shown in the terminal.

## Build for deployment

Run `npm run build`. The production site is generated in `dist/`.

### Deploy on Vercel

Import this folder/repository into Vercel. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.

## Personalise

Edit `src/content.js`:
- `recipient` is currently set to **Aaruuu ♥️**.
- Replace `sender` and `birthdayDate`.
- `finalLetter` is a placeholder for your final secret letter.
- `archivePhotos` contains eight replaceable photo slots. Add images under `public/photos/` and set each `src` to `/photos/your-image.jpg`.

Your four supplied room messages and the birthday opening message are already included. The museum remembers completed rooms in the browser using localStorage. The music button is a visual control placeholder; no copyrighted music is bundled.
