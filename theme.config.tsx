import { DocsThemeConfig } from "nextra-theme-docs";
import { useTheme } from "next-themes";

const config: DocsThemeConfig = {
  // Ideally, we'd simply use a <picture> + <source media="(prefers-color-scheme: ...)"/>,
  // but next-themes which handles theme changes isn't handling those properly.
  //
  // I have no interest in fixing next-themes right now, so going the hacky way.
  logo: () => {
    const { resolvedTheme } = useTheme();
    return (
      <>
        <img
          style={{ height: "var(--nextra-navbar-height)" }}
          src={
            resolvedTheme === "light"
              ? "https://raw.githubusercontent.com/aiken-lang/branding/main/assets/logo-dark.png"
              : "https://raw.githubusercontent.com/aiken-lang/branding/main/assets/logo-light.png"
          }
        />
      </>
    );
  },
  head: (
    <>
      <link
        rel="icon"
        type="image/svg+xml"
        sizes="any"
        href="https://raw.githubusercontent.com/aiken-lang/branding/main/assets/icon.svg"
      />
    </>
  ),
  project: {
    link: "https://github.com/aiken-lang/aiken",
  },
  chat: {
    link: "https://discord.gg/Vc3x8N9nz2",
  },
  i18n: [
    {
      locale: "en",
      text: "English",
    },
  ],
  docsRepositoryBase: "https://github.com/aiken-lang/site/blob/main",
  useNextSeoProps() {
    const description = "Cardano smart contract language and toolchain";
    return {
      titleTemplate: "Aiken | %s",
      description,
      canonical: "https://aiken-lang.org/",
      openGraph: {
        url: "https://aiken-lang.org/",
        title: "Aiken",
        description,
        images: [
          {
            url: "https://raw.githubusercontent.com/aiken-lang/branding/main/assets/icon.png",
            width: 796,
            height: 742,
            alt: "Aiken",
            type: "image/png",
          },
        ],
      },
      siteName: "Aiken",
      twitter: {
        handle: "@aiken_eng",
        site: "@aiken_eng",
        cardType: "summary",
      },
    };
  },
  footer: {
    text: "Aiken Docs",
  },
  toc: {
    extraContent: <></>,
  },
};

export default config;
