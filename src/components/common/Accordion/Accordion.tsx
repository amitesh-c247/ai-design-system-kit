'use client'
import React, { useState } from 'react'
import styles from './accordion.module.scss'

interface AccordionItem {
  id: string
  title: string
  description: string
  highlight?: boolean
}

interface AccordionProps {
  items: AccordionItem[]
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className={styles['faq-accordion-root']}>
      {items.map((item, idx) => {
        const isOpen = openIndex === idx
        const itemClass = [
          styles['faq-accordion-item'],
          isOpen ? styles.open : '',
          isOpen ? styles.highlight : '',
        ]
          .filter(Boolean)
          .join(' ')
        return (
          <div key={item.id} className={itemClass}>
            <button
              className={`${styles['faq-accordion-title']} ${
                isOpen ? styles['active'] : ''
              } `}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              type="button"
            >
              <span className={styles['faq-accordion-title-text']}>
                {item.title}
              </span>
              <span className={styles['faq-accordion-icon']}>
                {isOpen ? (
                  <span>
                    -
                  </span>
                ) : (
                  <span>
                    +
                  </span>
                )}
              </span>
            </button>
            {isOpen && (
              <div className={styles['faq-accordion-desc']}>
                <span> {item.description}</span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Accordion
