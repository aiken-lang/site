import { useTheme } from 'next-themes';

export function LightDarkIframe(baseProps) {
  const { resolvedTheme } = useTheme();
  const props = { ...baseProps, src: baseProps.src[resolvedTheme] };
  return (
    <iframe { ...props }></iframe>
  );
};
