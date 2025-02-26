import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
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
  primaryHue: 270,
  primarySaturation: 90,
  head: (
    <>
        <link rel="icon" type="image/svg+xml" sizes="any" href="/icon.png"/>
        <link href="https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
        <meta name="twitter:image" content="https://aiken-lang.org/open-graph.png" />
        <meta name="twitter:site:domain" content="aiken-lang.org" />
        <style>{`
        .nextra-nav-container > nav > a:nth-child(3) > span {
          background-image: linear-gradient(90deg, black 0%, black 90%, #ab31e4 86%, #620df8 92%, #ab31e4 96%);
          background-repeat: repeat;
          background-clip: text;
          -webkit-background-clip: text;
          background-size: 200% auto;
          color: transparent;
          animation: textclip 5s linear infinite;
        }
        body {
          font-family: 'Fira mono';
          letter-spacing: -0.5px;
        }
        aside.nextra-sidebar-container ul > li.nx-text-gray-900 {
          display: flex;
          gap: 0.5rem;
        }
        aside.nextra-sidebar-container ul > li.nx-text-gray-900::before {
          content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-compass"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>');
        }
        html[class~="dark"] aside.nextra-sidebar-container ul > li.nx-text-gray-900::before {
          content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-compass"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>');
        }
        aside.nextra-sidebar-container ul > li.nx-text-gray-900 ~ li.nx-text-gray-900::before {
          content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>');
        }
        html[class~="dark"] aside.nextra-sidebar-container ul > li.nx-text-gray-900 ~ li.nx-text-gray-900::before {
          content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>');
        }
        aside.nextra-sidebar-container ul > li.nx-text-gray-900 ~ li.nx-text-gray-900 ~ li.nx-text-gray-900::before {
          content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cpu"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>');
        }
        html[class~="dark"] aside.nextra-sidebar-container ul > li.nx-text-gray-900 ~ li.nx-text-gray-900 ~ li.nx-text-gray-900::before {
          content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-cpu"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>');
        }
        aside.nextra-sidebar-container ul > li.nx-text-gray-900 ~ li.nx-text-gray-900 ~ li.nx-text-gray-900 ~ li.nx-text-gray-900::before {
          content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-git-branch"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg>');
        }
        html[class~="dark"] aside.nextra-sidebar-container ul > li.nx-text-gray-900 ~ li.nx-text-gray-900 ~ li.nx-text-gray-900 ~ li.nx-text-gray-900::before {
          content: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-git-branch"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg>');
        }
        html[class~="dark"] div.nextra-callout.nx-bg-yellow-50 {
          background-color: rgba(161,98,7,.1) !important;
        }
        html[class~="dark"] .nextra-nav-container > nav > a:nth-child(3) > span {
          background-image: linear-gradient(90deg, rgba(243,244,246) 0%, rgba(243,244,246) 90%, #ab31e4 86%, #620df8 92%, #ab31e4 96%);
        }
        @keyframes textclip {
          0% { background-position: 0% center; }
          30% { background-position: 200% center; }
          100% { background-position: 200% center; }
        }`}</style>
    </>
  ),
  project: {
    link: "https://github.com/aiken-lang/aiken",
  },
  chat: {
    link: "https://discord.gg/ub6atE94v4",
  },
  toc: {
    extraContent: <></>,
  },
  i18n: [
    {
      locale: "en",
      text: "English",
    },
  ],
  docsRepositoryBase: "https://github.com/aiken-lang/site/blob/main",
  useNextSeoProps() {
    const { title } = useConfig();
    const description = "The modern smart contract platform for Cardano";
    return {
      titleTemplate: "Aiken | %s",
      description,
      canonical: "https://aiken-lang.org/",
      openGraph: {
        url: "https://aiken-lang.org/",
        description,
        images: [
          {
            url: "https://aiken-lang.org/open-graph.png",
            width: 800,
            height: 418,
            alt: "Aiken - The modern smart contract platform for Cardano",
            type: "image/png",
          },
        ],
      },
      siteName: "Aiken",
      twitter: {
        handle: "@aiken_eng",
        site: "https://aiken-lang.org",
        cardType: "summary_large_image",
      },
    };
  },
  footer: {
    component: (<>
      <footer>
        <aside>
          <img src="/typo.webp" />
          <p>The modern Cardano platform</p>
        </aside>
        <nav>
          <h2><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg> Quick Links</h2>
          <ul>
            <li><a href="https://aiken-lang.github.io/prelude">Prelude</a></li>
            <li><a href="https://aiken-lang.github.io/stdlib">Standard library</a></li>
            <li><a href="https://play.aiken-lang.org">Playground</a></li>
          </ul>
        </nav>
        <nav>
          <h2><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>Community</h2>
          <ul>
            <li><a href="https://discord.gg/ub6atE94v4">Discord</a></li>
            <li><a href="https://twitter.com/aiken_eng">Twitter</a></li>
            <li><a href="https://github.com/aiken-lang/awesome-aiken#readme">Awesome list</a></li>
          </ul>
        </nav>
        <nav>
          <h2><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>Partners</h2>
          <ul>
            <li><a href="https://pragma.io">PRAGMA</a></li>
            <li><a href="https://cardanofoundation.org">Cardano Foundation</a></li>
            <li><a href="https://txpipe.io">TxPipe</a></li>
          </ul>
        </nav>
      </footer>
      <style jsx>{`
        footer {
          background: #604185;
          color: #FFFFFF;
          display: flex;
          justify-content: space-between;
          margin: 0 auto;
          padding: 2rem 12.5vw;
        }
        footer aside {
          display: flex;
          flex-direction: column;
          font-variant: small-caps;
          font-size: 0.75em;
        }
        footer aside p {
          padding: 0 0.15rem;
        }
        footer aside img {
          width: 4rem;
          height: auto;
        }
        @media(max-width: 1000px) {
          footer {
            padding: 2rem 5%;
          }
        }
        @media(max-width: 600px) {
          footer {
            flex-direction: column;
          }
          footer aside + nav,
          footer nav + nav {
            margin-top: 1rem;
          }
        }
        footer nav {
          display: flex;
          flex-direction: column;
        }
        footer nav h2 {
          font-weight: bold;
          display: flex;
          margin-bottom: 0.35rem;
        }
        footer nav h2 > svg {
          width: 1em;
          height: auto;
          margin-right: 0.5rem;
        }
        footer nav ul {
          font-size: 0.9em;
        }
      `}</style>
    </>)
  }
};

export default config;
