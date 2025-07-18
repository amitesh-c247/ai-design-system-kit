export interface AccordionItem {
  id: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
}
