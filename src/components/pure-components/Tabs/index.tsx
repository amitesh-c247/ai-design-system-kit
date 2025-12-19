import React from "react";
import { Tabs as BootstrapTabs, Tab } from "react-bootstrap";
import classNames from "classnames";

export interface TabPaneProps {
  eventKey: string;
  title: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  className?: string;
  defaultActiveKey?: string;
  onSelect?: (key: string | null) => void;
}

const Tabs: React.FC<React.PropsWithChildren<TabsProps>> & {
  Pane: React.FC<React.PropsWithChildren<TabPaneProps>>;
} = ({ className, defaultActiveKey, onSelect, children }) => (
  <BootstrapTabs
    className={className}
    defaultActiveKey={defaultActiveKey}
    onSelect={onSelect}
    mountOnEnter
    unmountOnExit
  >
    {React.Children.map(children, (child) =>
      React.isValidElement(child) ? (
        <Tab
          eventKey={child.props.eventKey}
          title={child.props.title}
          disabled={child.props.disabled}
        >
          {child.props.children}
        </Tab>
      ) : null
    )}
  </BootstrapTabs>
);

const Pane: React.FC<React.PropsWithChildren<TabPaneProps>> = ({
  children,
}) => <>{children}</>;
Tabs.Pane = Pane;

export default Tabs;
