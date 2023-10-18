import { useEffect, useState } from 'react';
import { Callout } from "nextra-theme-docs";

const DEFAULT_VERSION = '0.19.0-alpha';

export function InstallationInstructions() {
  const [state, setState] = useState(DEFAULT_VERSION);
  const [callout, setCallout] = useState(false);

  useEffect(() => {
    fetch('https://crates.io/api/v1/crates/aiken/versions')
      .then(response => response.json())
      .then(json => json.versions[0].num)
      .then(version => setState(version))
      .then(() => setCallout(false))
      .catch(_e => setCallout(true))
    return () => {}
  }, [state, callout]);

  return (<div className="nextra-code-block nx-relative nx-mt-6 first:nx-mt-0">
      <pre className="nx-bg-primary-700/5 nx-mb-4 nx-overflow-x-auto nx-rounded-xl nx-subpixel-antialiased dark:nx-bg-primary-300/10 nx-text-[.9em] contrast-more:nx-border contrast-more:nx-border-primary-900/20 contrast-more:nx-contrast-150 contrast-more:dark:nx-border-primary-100/40 nx-py-4" data-language="text" data-theme="default">
        <code className="nx-border-black nx-border-opacity-[0.04] nx-bg-opacity-[0.03] nx-bg-black nx-break-words nx-rounded-md nx-border nx-py-0.5 nx-px-[.25em] nx-text-[.9em] dark:nx-border-white/10 dark:nx-bg-white/10" dir="ltr" data-language="text" data-theme="default">
          <span className="line">cargo install aiken --version {state}</span>
        </code>
      </pre>
      {callout
        ? <Callout type="warning">
            {DEFAULT_VERSION} may not be the <strong>latest</strong> version. To install the latest version, find the latest version number on <a target="_blank" href="https://crates.io/crates/aiken/versions">crates.io</a> and replace {DEFAULT_VERSION} with it when running the command above.
          </Callout>
        : <p></p>
      }
    </div>
  );
}
