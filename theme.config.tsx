import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>Aiken</span>,
  project: {
    link: "https://github.com/aiken-lang/aiken",
  },
  chat: {
    link: "https://discord.gg/Vc3x8N9nz2",
  },
  docsRepositoryBase: "https://github.com/aiken-lang/site/blob/main",
  useNextSeoProps() {
    return {
      titleTemplate: "%s – Aiken",
    };
  },
  footer: {
    text: "Aiken Docs",
  },
};

export default config;
