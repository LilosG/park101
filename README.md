# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

## Promotion feed architecture

`PromotionModal.astro` receives a venue slug and reads only the sanitized public
promotion feed. The public API is authoritative: a `null` promotion is not
re-evaluated against dates or statuses in this repository. This site must not
query the promotion database or Supabase directly.

The feed origin and endpoint construction live in `src/config/promotion.ts` so
the manager domain can change without modifying component logic.

The API currently returns the final server-resolved CTA destination in the
legacy-named `customCtaUrl` field, including for predefined CTA types. Consumers
must use that value directly and must not map `ctaType` to restaurant-specific
URLs. A future API contract should expose the same value as `ctaUrl` and
deprecate `customCtaUrl` to make this responsibility explicit.

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
