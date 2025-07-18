import { Ref } from "react";

export interface SpaceProps {
  className?: string;
  /** Make element as wide to its parent */
  block?: boolean;
  justify?: React.CSSProperties["justifyContent"];
  size?: number | string;
  align?: React.CSSProperties["alignItems"];
  /**  Whether flex items are forced onto one line or can wrap onto multiple lines */
  wrap?: boolean;
  /** The direction of the flex container, as well as its wrapping behavior */
  flowWrap?: boolean;
  /** A component/node/text... to be inserted between 2 components.
   *
   * I.e. a `Space` component wrapping 2 divs with NEW and SPACE with `separator={<Divider type="vertical"` will be displayed as `NEW | SPACE`. */
  separator?: React.ReactNode;
  direction?: "horizontal" | "vertical";
  id?: string;
  ref?: Ref<HTMLDivElement>;
  style?: React.CSSProperties;
}
