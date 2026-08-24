# Jason's Personal Website

## Website

See My Website: [https://jason-young.me/](https://jason-young.me/)

### Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Environment

`jason-young.me` fetches publications and projects from `yangs.ai` at build time.

1. Copy `.env.example` to `.env`.
2. Set `PUBLIC_YANGSAI_RESEARCH_API` to your reachable endpoint.

Example:

```bash
PUBLIC_YANGSAI_RESEARCH_API=https://yangs.ai/api/research.json
```

If not provided, the project defaults to `https://yangs.ai/api/research.json`.

## Sources

This repository is adapted from [Astro Sphere](https://github.com/markhorn-dev/astro-sphere)
