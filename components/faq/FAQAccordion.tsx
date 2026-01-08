'use client'


import { useState } from 'react'


interface FAQAccordionProps {
  question: string
  children: React.ReactNode
}


export default function FAQAccordion({ question, children }: FAQAccordionProps) {
  const [open, setOpen] = useState(false)
  const questionId = `faq-question-${question.replace(/\s+/g, '-').toLowerCase()}`
  const answerId = `${questionId}-answer`

  // Keyboard accessibility: toggle on Enter/Space
  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur transition">
      <h3 className="m-0">
        <button
          onClick={() => setOpen(!open)}
          onKeyDown={handleKeyDown}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
          aria-expanded={open}
          aria-controls={answerId}
          id={questionId}
          type="button"
        >
          <span className="text-base md:text-lg font-medium text-gray-900">
            {question}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-5 w-5 text-[var(--color-primary)] transition-transform ${open ? 'rotate-180' : ''}`}
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </h3>

      <div
        id={answerId}
        role="region"
        aria-labelledby={questionId}
        hidden={!open}
        className={open ? "px-6 pb-6 text-gray-600 leading-relaxed" : "px-6 pb-6 text-gray-600 leading-relaxed hidden"}
      >
        {children}
      </div>
    </div>
  )
}