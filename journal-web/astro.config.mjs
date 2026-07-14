// @ts-check
import { defineConfig } from 'astro/config';

// Journal entries live outside the app so a separate skill can write them.
// Point the renderer wherever your entries land via JOURNAL_CONTENT_DIR.
// Default resolves to ../context-journal/out relative to this project.
export default defineConfig({
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: false,
    },
  },
});
