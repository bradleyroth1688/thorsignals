import { MobileNav } from "@/components/mobile-nav"
import Link from "next/link"
import { Clock } from "lucide-react"
import "../page.css"
import { TermsContent } from "./TermsContent"

export default function TermsAndConditionsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#020204]">
            {/* Header with Logo */}
            <section className="w-full min-h-screen relative overflow-hidden flex flex-col pt-5">
                <div className="container mx-auto max-w-[600px] max-h-[65px] flex justify-center mb-28  ">
                    <div className="flex items-center justify-center header-container rounded-2xl border border-gray-800 px-8 py-4 hover:border-gray-700 transition-colors">
                        <img src="/ico.png" alt="THOR Signals" className="h-10 w-auto object-contain" />
                    </div>
                </div>

                {/* Content Section */}
                <div className="container px-4 md:px-6 mx-auto max-w-6xl relative z-10 flex flex-col items-center">
                    {/* Badge */}
                    <div className="our-tracker mb-6">
                        <div className="our-tracker1">
                            Terms & Conditions
                        </div>
                        <span className="our-tracker1">→</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-5xl font-bold tracking-tighter text-white text-center mb-6">
                        Our Terms and Conditions
                    </h1>

                    {/* Welcome Text */}
                    <p className="text-gray-400 text-base sm:text-lg md:text-xl text-center max-w-3xl mb-8 leading-relaxed">
                        Welcome to THOR Signal. This Agreement sets forth Your rights and obligations as a THOR Signal User. By clicking "I Agree," You indicate that You have read and understood this Agreement and You will be bound by its Terms.
                    </p>

                    {/* Last Updated Badge */}
                    <div className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-800 bg-black/30 backdrop-blur-sm mb-24">
                        <Clock className="h-5 w-10 text-gray-400" />
                        <span className="text-sm text-gray-400">Last Updated on April, 24, 2025</span>
                    </div>

                    {/* Terms Content Card */}
                    <div className="w-full pt-[50px] border-t border-t-white">
                        <div className="w-full max-w-6xl bg-[#070708] border border-[#0e122e] rounded-3xl p-8 md:p-12 backdrop-blur-sm mb-16">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                                TERMS AND CONDITIONS
                            </h2>

                            {/* Complete Terms Content - All 31 Sections from terms-and-conditions.txt */}
                            <TermsContent />
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="w-full py-8 px-4 md:px-6 bg-[#020204]">
                <div className="container mx-auto max-w-7xl">
                    <div className="bg-[#1a1a2e] rounded-2xl border border-gray-800 px-6 md:px-8 py-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            {/* Logo */}
                            <div className="flex items-center">
                                <img src="/ico.png" alt="THOR Signals" className="w-8 h-8 object-contain" />
                            </div>

                            {/* Navigation Links */}
                            <nav className="flex flex-wrap justify-center gap-4 md:gap-6 items-center">
                                <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                                    Home
                                </Link>
                                <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                                    Contact
                                </Link>
                                <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                                <Link href="/terms-and-conditions" className="text-sm text-gray-400 hover:text-white transition-colors">
                                    Terms
                                </Link>
                            </nav>
          <div className="md:hidden"><MobileNav /></div>

                            {/* Copyright */}
                            <p className="text-sm text-gray-500">
                                Copyright © 2025 THOR Signals
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
