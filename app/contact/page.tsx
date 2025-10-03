"use client"

import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { FAQSection } from "@/components/home/faq-section"
import "../page.css"

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [formError, setFormError] = useState("")
  const [formSuccess, setFormSuccess] = useState("")
  const { toast } = useToast()

  

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isSubmitting) return

    // Client-side validation
    setEmailError("")
    setFormError("")
    setFormSuccess("")
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(form.email)) {
      const msg = "Please enter a valid email address."
      setEmailError(msg)
      toast({ title: "Invalid email", description: msg, variant: 'destructive' })
      return
    }
    setIsSubmitting(true)
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          const msg = data?.error || 'Failed to send message.'
          if (String(msg).toLowerCase().includes('email')) {
            setEmailError(msg)
          } else {
            setFormError(msg)
          }
          throw new Error(msg)
        }
        toast({
          title: 'Sent',
          description: 'Thanks! We will get back to you shortly.',
        })
        setFormSuccess('Your message has been sent successfully.')
        setForm({ firstName: '', lastName: '', email: '', subject: '', message: '' })
        setTimeout(() => setFormSuccess(''), 5000)
      })
      .catch((err) => {
        console.error(err)
        toast({
          title: 'Failed to send',
          description: String(err?.message || 'Please try again later.'),
          variant: 'destructive',
        })
      })
      .finally(() => setIsSubmitting(false))
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#020204]">
      {/* Header with Logo */}
      <section className="w-full min-h-screen relative overflow-hidden flex flex-col pt-5">
        <div className="container mx-auto max-w-[600px] max-h-[65px] flex justify-center mb-28">
          <div className="flex items-center justify-center header-container rounded-2xl border border-gray-800 px-8 py-4 hover:border-gray-700 transition-colors">
            <img src="/ico.png" alt="THOR Signals" className="h-10 w-auto object-contain" />
          </div>
        </div>

        {/* Intro */}
        <div className="container px-4 md:px-6 mx-auto max-w-6xl relative z-10 flex flex-col items-center">
          <div className="our-tracker mb-6">
            <div className="our-tracker1">Contact Us</div>
            <span className="our-tracker1">→</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold tracking-tighter text-white text-center mb-6">
            Reach Out to Us
          </h1>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl text-center max-w-3xl mb-12 leading-relaxed">
            Join our free Discord, or fill out the form below to get in touch with one of our team members!
          </p>

          {/* Contact Card */}
          <div className="w-full max-w-3xl bg-[#070708] border border-[#0e122e] rounded-3xl p-6 md:p-10 backdrop-blur-sm mb-24">
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-6">Send Us a Message</h2>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="w-full rounded-xl bg-[#0b0b11] border border-gray-800 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-600"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                />
                <input
                  className="w-full rounded-xl bg-[#0b0b11] border border-gray-800 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-600"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                />
              </div>

              <input
                type="email"
                className="w-full rounded-xl bg-[#0b0b11] border px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-600 "
                placeholder="Email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
              {emailError && (
                <p className="text-red-400 text-sm -mt-2">{emailError}</p>
              )}

              <input
                className="w-full rounded-xl bg-[#0b0b11] border border-gray-800 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-600"
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => update("subject", e.target.value)}
              />

              <textarea
                rows={6}
                className="w-full rounded-xl bg-[#0b0b11] border border-gray-800 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-600"
                placeholder="Message"
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
              />

              {formError && (
                <div className="w-full rounded-xl border border-red-500/40 bg-red-500/10 text-red-300 text-sm px-4 py-3">
                  {formError}
                </div>
              )}

              {formSuccess && (
                <div className="w-full rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-sm px-4 py-3">
                  {formSuccess}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-[#6d3aff] hover:bg-[#5a2fff] active:bg-[#4b26d9] transition-colors text-white font-semibold py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* FAQ Section (reused from homepage for visual parity) */}
          <FAQSection />
        </div>
      </section>

      {/* Footer (same as terms) */}
      <footer className="w-full py-8 px-4 md:px-6 bg-[#020204]">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-[#1a1a2e] rounded-2xl border border-gray-800 px-6 md:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center">
                <img src="/ico.png" alt="THOR Signals" className="w-8 h-8 object-contain" />
              </div>
              <nav className="flex gap-6 items-center">
                <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">Home</Link>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</Link>
                <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms-and-conditions" className="text-sm text-gray-400 hover:text-white transition-colors">Terms</Link>
              </nav>
              <p className="text-sm text-gray-500">Copyright © 2025 THOR Signals</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


