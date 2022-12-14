const { getHighlighter, BUNDLED_LANGUAGES } = require("shiki");

const rehypePrettyCodeOptions = {
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
      ],
    });
  },
};

const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  mdxOptions: { rehypePrettyCodeOptions },
});

module.exports = withNextra();
