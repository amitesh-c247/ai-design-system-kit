"use client";
import React, { useState } from "react";
import classNames from "classnames";
import type { AccordionItem, AccordionProps } from "./types";

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="accordion">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.id} className={classNames("accordion-item", { "border-primary": isOpen })}>
            <button
              className={classNames(
                "accordion-button",
                { "collapsed": !isOpen }
              )}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              type="button"
            >
              <span className="fw-medium">
                {item.title}
              </span>
            </button>
            {isOpen && (
              <div className="accordion-collapse collapse show">
                <div className="accordion-body">
                  {item.description}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
