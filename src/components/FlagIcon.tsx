interface FlagIconProps {
  code: string;
  className?: string;
}

export const FlagIcon = ({ code, className = "w-6 h-4" }: FlagIconProps) => {
  try {
    const FlagSvg = require(
      `@/public/assets/icons/flags/${code.toLowerCase()}.svg`
    ).default;

    return (
      <FlagSvg
        aria-label={`${code} flag`}
        className={`${className} inline-block`}
      />
    );
  } catch (error) {
    const emojiFlags: Record<string, string> = {
      NG: "🇳🇬",
      GH: "🇬🇭",
      ZA: "🇿🇦",
      KE: "🇰🇪",
      EG: "🇪🇬",
      CI: "🇨🇮",
      RW: "🇷🇼",
    };

    return <span className={className}>{emojiFlags[code] || "🏳️"}</span>;
  }
};
