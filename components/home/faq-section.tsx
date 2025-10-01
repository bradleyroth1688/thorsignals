'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const leftColumnFAQs: FAQItem[] = [
  {
    question: "What is TradingView?",
    answer: "TradingView is the world's largest charting platform and site. All the elite traders in our network use it. Our suite integrates seamlessly."
  },
  {
    question: "Do I need to pay for TradingView?",
    answer: "Not needed. We aim to minimize costs for our clients. Besides our one time setup fee, there aren't any recurring costs."
  },
  {
    question: "Who is the indicator suite built for?",
    answer: "Our suite is suitable for both beginners and experts, who want to take their trading to the next level. Get instant access to the toolkits we personally use."
  },
  {
    question: "Any requirements to get started?",
    answer: "Anyone from any country can use our indicator suite. It works on any device. Not much capital, experience, or time is required (to start trading) either."
  }
]

const rightColumnFAQs: FAQItem[] = [
  {
    question: "How to set this up on TradingView?",
    answer: "Immediately after paying, you'll get a detailed email with easy step by step instructions. Our team will also be in direct contact with you, available for a call if you need a live walkthrough."
  },
  {
    question: "What markets are supported?",
    answer: "Our indicator suite works for any symbol, on any market, globally. This includes cryptocurrency, stocks, and forex."
  },
  {
    question: "Will I be getting on-going updates?",
    answer: "Of course. We'll update your indicator suite in a fully automated manner. Updates are sent directly via TradingView and installed automatically."
  },
  {
    question: "What payment methods do you take?",
    answer: "We accept credit cards, debit cards, PayPal."
  }
]

export function FAQSection() {
  const [openLeftIndex, setOpenLeftIndex] = useState<number | null>(null)
  const [openRightIndex, setOpenRightIndex] = useState<number | null>(null)

  const toggleLeftFAQ = (index: number) => {
    setOpenLeftIndex(openLeftIndex === index ? null : index)
  }

  const toggleRightFAQ = (index: number) => {
    setOpenRightIndex(openRightIndex === index ? null : index)
  }

  return (
    <section className="w-full pt-20">
      <div className="container px-4 md:px-6 mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center mb-12 space-y-4">
          <div className="our-tracker">
            <div className="our-tracker1">
              We're Here to Help
            </div>
            <span className="our-tracker1">→</span>
          </div>
          <h2 className="text-[42px] font-bold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="max-w-xl text-gray-400 text-base md:text-lg">
            Don't see your question? Don't worry. Join our free Discord community below and one of our team members can assist you immediately!
          </p>
        </div>

        {/* FAQ Grid - Two Independent Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12 items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {leftColumnFAQs.map((faq, index) => (
              <div
                key={`left-${index}`}
                className="bg-gradient-to-b from-gray-900/50 to-black/50 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-colors"
              >
                <button
                  onClick={() => toggleLeftFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <h3 className="text-base md:text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    {openLeftIndex === index ? (
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18 12H6"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    )}
                  </div>
                </button>
                {openLeftIndex === index && (
                  <div className="px-6 pb-5">
                    <div className="border-t border-gray-800 border-dashed pt-4">
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {rightColumnFAQs.map((faq, index) => (
              <div
                key={`right-${index}`}
                className="bg-gradient-to-b from-gray-900/50 to-black/50 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-colors"
              >
                <button
                  onClick={() => toggleRightFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <h3 className="text-base md:text-lg font-semibold text-white pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    {openRightIndex === index ? (
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18 12H6"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    )}
                  </div>
                </button>
                {openRightIndex === index && (
                  <div className="px-6 pb-5">
                    <div className="border-t border-gray-800 border-dashed pt-4">
                      <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Discord CTA */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-white">
            <MessageCircle className="h-5 w-5" />
            <span className="text-base md:text-lg">Have More Questions?</span>
          </div>
          <Link href="https://discord.gg/your-discord-link" target="_blank">
            <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300">
              Join Our Free Discord
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
