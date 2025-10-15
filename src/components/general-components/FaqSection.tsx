"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function FaqSection() {
  const faqs = [
    {
      question: "What kind of products can I order from Go-Vigi?",
      answer:
        "You can order fresh vegetables, fruits, and grocery essentials tailored for your needs.",
    },
    {
      question: "Is there a minimum order value?",
      answer:
        "Yes, the minimum order value is ₹200 to ensure efficient delivery logistics.",
    },
    {
      question: "Can I reorder items from past purchases?",
      answer:
        "Absolutely! You can easily reorder from your order history in your account.",
    },
    {
      question: "Can I schedule delivery for a specific time?",
      answer: "Yes, you can select preferred delivery slots during checkout.",
    },
    {
      question: "I received a damaged product. What should I do?",
      answer:
        "Please contact our support team within 24 hours for a replacement or refund.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">FAQ’s</h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl shadow-sm"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full text-left px-5 py-4 flex justify-between items-center"
            >
              <span className="font-medium">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            {openIndex === index && (
              <div className="px-5 pb-4 text-gray-600 text-sm">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
