"use client";
import React, { useEffect, useState } from "react";
import Accordion from "../Accordion";
import { faqService, Faq } from "@/services/faq";
import FaqSkeleton from "../Accordion/FaqSkeleton";
import Banner from "../Banner/Banner";

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
      <>
        <Banner title="Frequently Asked Questions" />
        <div className="container my-4 min-vh-100vh-260">
          {[...Array(4)].map((_, i) => (
            <FaqSkeleton key={i} />
          ))}
        </div>
      </>
    );

  // Highlight the second item as in the image
  const accordionItems = faqs.map((faq, idx) => ({
    id: faq.id,
    title: faq.title,
    description: faq.description,
    highlight: idx === 1,
  }));

  return (
    <>
      <Banner title="Frequently Asked Questions" />
      <div className="container my-4">
        <Accordion items={accordionItems} />
      </div>
    </>
  );
};

export default Terms;
