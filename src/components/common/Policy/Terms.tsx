"use client";
import React, { useEffect, useState } from "react";
import Accordion from "../Accordion";
import { faqService, Faq } from "@/services/faq";
import FaqSkeleton from '../Accordion/FaqSkeleton';

const Terms = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    faqService.getFaqs().then((data) => {
      setFaqs(data);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <div className="container my-4 min-vh-100vh-260">
        <h2 className="mb-4 fw-semibold">Frequently Asked Questions</h2>
        {[...Array(4)].map((_, i) => (
          <FaqSkeleton key={i} />
        ))}
      </div>
    )


  // Highlight the second item as in the image
  const accordionItems = faqs.map((faq, idx) => ({
    id: faq.id,
    title: faq.title,
    description: faq.description,
    highlight: idx === 1,
  }));

  return (
    <div className="container my-4">
      <h2 className="mb-4 fw-semibold">Frequently Asked Questions</h2>
      <Accordion items={accordionItems} />
    </div>
  )
};

export default Terms;
