'use client'

import { Plane, Heart } from 'lucide-react'

const footerLinks = [
  { label: 'Products & Services', href: '#services' },
  { label: 'About Us', href: '#about' },
  { label: 'Contacts', href: '#contacts' },
  { label: 'Register', href: '#register' },
]

export default function Footer() {
  const handleScrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative pt-16 pb-8 overflow-hidden">
      <div className="absolute inset-0 bg-[#020917]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(240,200,74,0.25)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-[rgba(240,200,74,0.08)]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#e8b422] to-[#f0c84a] flex items-center justify-center">
                <Plane size={18} className="text-[#020917] -rotate-45" />
              </div>
              <span className="font-['Playfair_Display'] text-lg font-bold text-[#faf6ed]">
                Air <span className="text-[#f0c84a]">Trips</span>
              </span>
            </div>
            <p className="text-[#faf6ed]/45 text-sm leading-relaxed font-['Lato'] max-w-xs">
              Your trusted partner for domestic &amp; international travel.
              Crafting extraordinary journeys since 2014.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Playfair_Display'] text-sm font-semibold text-[#faf6ed] mb-4 uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleScrollTo(link.href)}
                    className="text-[#faf6ed]/45 hover:text-[#f0c84a] text-sm font-['Lato'] transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Office Hours */}
          <div>
            <h4 className="font-['Playfair_Display'] text-sm font-semibold text-[#faf6ed] mb-4 uppercase tracking-widest">
              Office Hours
            </h4>
            <ul className="flex flex-col gap-2 text-sm font-['Lato'] text-[#faf6ed]/45">
              <li className="flex justify-between">
                <span>Monday – Friday</span>
                <span className="text-[#faf6ed]/70">8:00 AM – 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-[#faf6ed]/70">9:00 AM – 4:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-[#faf6ed]/50 italic">Closed</span>
              </li>
            </ul>
            <div className="mt-5 px-4 py-3 rounded-lg bg-[rgba(240,200,74,0.05)] border border-[rgba(240,200,74,0.12)]">
              <p className="text-[#f0c84a] text-xs font-semibold font-['Lato'] uppercase tracking-wider mb-1">
                Emergency Line
              </p>
              <p className="text-[#faf6ed]/70 text-sm font-['Lato']">
                +63 912 345 6789
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#faf6ed]/30 text-xs font-['Lato']">
            © {new Date().getFullYear()} Air Trips Travel &amp; Tours. All rights reserved.
          </p>
          <p className="text-[#faf6ed]/25 text-xs font-['Lato'] flex items-center gap-1">
            Made with <Heart size={10} className="text-[#f0c84a]" fill="#f0c84a" /> in the Philippines
          </p>
        </div>
      </div>
    </footer>
  )
}
