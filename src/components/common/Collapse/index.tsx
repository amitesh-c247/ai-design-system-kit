import Typography from '@leand/Typography';
import { Collapse as AntdCollapse } from 'antd';
import type {
  CollapsePanelProps as AntdCollapsePanelProps,
  CollapseProps as AntdCollapseProps,
} from 'antd/lib/collapse';
import classnames from 'classnames';

import styles from './styles.module.less';

interface CollapseProps extends AntdCollapseProps {
  className?: string;
}

type CollapsePanelProps = AntdCollapsePanelProps & {
  children: React.ReactNode;
};

const Collapse: React.FC<React.PropsWithChildren<CollapseProps>> & {
  Panel: (props: CollapsePanelProps) => React.ReactNode;
} = ({ className, children, ...props }) => {
  return (
    <AntdCollapse className={classnames(styles.collapse, className)} {...props}>
      {children}
    </AntdCollapse>
  );
};

export default Collapse;

const Panel = ({ header, ...props }: CollapsePanelProps) =>
  AntdCollapse.Panel({
    header: (
      <Typography variant="body1" title={typeof header === 'string' ? header : undefined}>
        {header}
      </Typography>
    ),
    ...props,
  });

Collapse.Panel = Panel;
