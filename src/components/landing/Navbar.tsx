'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Plane } from 'lucide-react'
import LoginModal from './LoginModal'

const navLinks = [
  { label: 'Products & Services', href: '#services' },
  { label: 'About Us', href: '#about' },
  { label: 'Contacts', href: '#contacts' },
  { label: 'Register', href: '#register' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'nav-glass py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 group"
              aria-label="Air Trips home"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#e8b422] to-[#f0c84a] flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(240,200,74,0.4)] transition-shadow duration-300">
                <Plane size={18} className="text-[#020917] -rotate-45" />
              </div>
              <span className="font-['Playfair_Display'] text-lg font-bold text-[#faf6ed] leading-tight hidden sm:block">
                Air <span className="text-[#f0c84a]">Trips</span>
              </span>
            </button>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2 text-sm font-medium text-[#faf6ed]/80 hover:text-[#f0c84a] transition-colors duration-200 rounded-md hover:bg-white/5 tracking-wide font-['Lato']"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLoginOpen(true)}
                className="btn-outline text-xs sm:text-sm px-4 sm:px-6 py-2"
                id="navbar-login-btn"
              >
                Login
              </button>
              {/* Mobile Menu Toggle */}
              <button
                className="md:hidden p-2 text-[#faf6ed]/80 hover:text-[#f0c84a] transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="nav-glass mt-2 mx-4 rounded-xl p-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left px-4 py-3 text-sm font-medium text-[#faf6ed]/80 hover:text-[#f0c84a] hover:bg-white/5 rounded-lg transition-colors duration-200 font-['Lato'] tracking-wide"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  )
}
