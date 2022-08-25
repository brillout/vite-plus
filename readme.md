# `@brillout/vite-plus`

Vite Utilities.

> **DO NOT** use. Reach out on GitHub or Discord, if you want to use this. (For now, these utilities are meant to be used only by [vite-plugin-ssr](https://vite-plugin-ssr.com/) and [Telefunc](https://telefunc.com/).)

## `@brillout/vite-plus/plugins/importBuild`

Automatically import the server-side build files living at `dist/server/`.

- In a way that is statically analyzable. So that bundlers are able to discover the entire dependency tree. (Which is needed for serverless services such as Cloudflare Workers, Vercel, etc.)
- Supports Yarn PnP.
