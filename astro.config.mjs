// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://patterns.mkbrechtel.dev",
  integrations: [
    starlight({
      title: "Cute Patterns! 💠",
      social: {
        github: "https://github.com/mkbrechtel/patterns",
      },
      sidebar: [
        {
          label: "Cute Patterns! 💠",
          link: "/",
        },
        {
          label: "Deployment",
          autogenerate: { directory: "deployment" },
        },
      ],
    }),
  ],
});
