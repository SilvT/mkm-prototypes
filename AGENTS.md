# MkM prototypes

Coded, desktop-first prototypes of the MkM web app flows (Figma file `1Y7TegkMY7wZtv8AzDxXNS`, "MkM_WIP--protoype"). Build order: Create Campaign, then Filtering, then messages → tagging. Login is optional.
The design system lives in `/Users/silvia/Developer/ds_POC` (GitHub `SilvT/DS_POC`, private). Its rules apply here too (`ds_POC/AGENTS.md`).

## Run
```bash
npm install
npm run dev
npx tsc --noEmit
npm run build
```

## Layout
- `src/app/`: the prototype itself (shell, screens, fake data). Own code.
- `src/ui/index.ts`: the ONLY place screens import UI from (`@/ui`).
- `src/components/ui`, `src/components/atoms`, `src/lib`, `src/styles`, `src/ds.css`: **synced from ds_POC, never edit.** Run `npm run ds:sync` (`-- --ref <sha>` to pin). `ds-sync.json` records the commit.
- `src/placeholders/`: stock shadcn stand-ins for components not yet built in the design system. Each starts with a `PLACEHOLDER:` header. `npm run ds:placeholders` lists them: that is the to-build list.

## Rules
- Screens have no CSS of their own and no inline style; tokens only (`var(--token)`), no raw hex/px, no default Tailwind scale classes.
- Icons only through `<Icon name=...>`; never lucide or inline SVG.
- Missing component: use a placeholder (add with `npx shadcn@latest add <name>`, then add the PLACEHOLDER header, swap `cn` import to `@/lib/utils`, swap icons to `Icon`, export it in `src/ui/index.ts`) and list it under Gaps in the report. Never invent props or variants.
- When a real component lands in ds_POC: `npm run ds:sync`, point its line in `src/ui/index.ts` at it, delete the placeholder.
- Fake data lives in `src/app/data/`; no backend.
