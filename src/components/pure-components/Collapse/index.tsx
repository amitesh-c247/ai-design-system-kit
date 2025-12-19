import Typography from "@/components/pure-components/Typography";
import { Collapse as AntdCollapse } from "antd";
import type {
  CollapsePanelProps as AntdCollapsePanelProps,
  CollapseProps as AntdCollapseProps,
} from "antd/lib/collapse";
import classnames from "classnames";


interface CollapseProps extends AntdCollapseProps {
  className?: string;
}

type CollapsePanelProps = AntdCollapsePanelProps & React.PropsWithChildren<{}>;

const Collapse: React.FC<React.PropsWithChildren<CollapseProps>> & {
  Panel: React.FC<CollapsePanelProps>;
} = ({ className, children, ...props }) => {
  return (
    <AntdCollapse className={className} {...props}>
      {children}
    </AntdCollapse>
  );
};

export default Collapse;

const Panel: React.FC<CollapsePanelProps> = ({ header, ...props }) => (
  <AntdCollapse.Panel
    header={
      <Typography
        variant={undefined}
        className={typeof header === "string" ? header : undefined}
      >
        {header}
      </Typography>
    }
    {...props}
  />
);

Collapse.Panel = Panel;
