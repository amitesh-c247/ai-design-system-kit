export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  variant?: "tertiary" | "standalone" | "inline" | "inlineIcon" | "button";
  emphasized?: boolean;
  icon?: React.ReactElement;
  iconPosition?: "start" | "end";
  openExternalLinkInNewTab?: boolean;
  isDisabled?: boolean;
}
