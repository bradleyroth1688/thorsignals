"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden text-white hover:text-purple-400 hover:bg-gray-800">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-black text-white border-gray-800">
        <div className="flex flex-col space-y-4 mt-8">
          <Link
            href="/"
            className="text-lg font-medium hover:text-purple-400 transition-colors py-2"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-lg font-medium hover:text-purple-400 transition-colors py-2"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            href="/results"
            className="text-lg font-medium hover:text-purple-400 transition-colors py-2"
            onClick={() => setOpen(false)}
          >
            Results
          </Link>
          <Link
            href="/how-it-works"
            className="text-lg font-medium hover:text-purple-400 transition-colors py-2"
            onClick={() => setOpen(false)}
          >
            How It Works
          </Link>
          <Link
            href="/signal-101"
            className="text-lg font-medium text-purple-400 hover:text-purple-300 transition-colors py-2"
            onClick={() => setOpen(false)}
          >
            Free Guide
          </Link>
          <Link
            href="/pricing"
            className="text-lg font-medium hover:text-purple-400 transition-colors py-2"
            onClick={() => setOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            className="text-lg font-medium hover:text-purple-400 transition-colors py-2"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
          <Link
            href="/login"
            className="text-lg font-medium hover:text-purple-400 transition-colors py-2"
            onClick={() => setOpen(false)}
          >
            Login
          </Link>
          <div className="pt-4">
            <Link href="/signup" onClick={() => setOpen(false)}>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 border border-purple-400/20">Get Started</Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
