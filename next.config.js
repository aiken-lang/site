/** @type { import("nextra").Nextra } */
const nextra = require("nextra");
const { getHighlighter, BUNDLED_LANGUAGES } = require("shiki");

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  defaultShowCopyCode: true,
  readingTime: true,
  mdxOptions: {
    rehypePrettyCodeOptions: {
      getHighlighter: (options) => {
        return getHighlighter({
          ...options,
          langs: [
            ...BUNDLED_LANGUAGES,
            {
              id: "aiken",
              scopeName: "source.aiken",
              grammar: require("./aiken.tmLanguage.json"),
              aliases: ["ak", "aiken"],
            },
            {
              id: "uplc",
              scopeName: "source.uplc",
              grammar: require("./uplc.tmLanguage.json"),
              aliases: ["uplc"],
            },
          ],
        });
      },
    },
  },
});

module.exports = {
  async redirects() {
    return [
      {
        source: "/example--hello-world",
        destination: "/example--hello-world/basics",
        permanent: true,
      },
    ];
  },
  ...withNextra({
    images: { unoptimized: true },
  }),
};
