# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Zorlex Blog & CMS Integration

This project uses **Sanity.io** as a headless CMS.

### Blog Setup
- **Frontend**: Components are located in `src/components/BlogList.jsx` and `src/components/BlogPost.jsx`.
- **Environment**: Requires `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, and `VITE_SANITY_API_TOKEN` in `.env`.

### Sanity Studio
The content editor is located in the `studio/` directory.
1. `cd studio`
2. `npm install`
3. `npm run dev` (to run locally)
4. `npx sanity deploy` (to host it on a .sanity.studio URL)

### RSS Feed
The RSS feed is automatically generated during the build process:
`npm run build` will output `public/rss.xml`.

---

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
