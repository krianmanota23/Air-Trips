'use client'

import { useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

export default function HeroSection() {
  const planeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Reveal on mount
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.15 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Starfield Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 20% 50%, rgba(26,51,128,0.35) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(232,180,34,0.1) 0%, transparent 50%), #020917',
          }}
        />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(240,200,74,1) 1px, transparent 1px), linear-gradient(90deg, rgba(240,200,74,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1a3380]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#e8b422]/10 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* Flying Plane */}
      <div
        ref={planeRef}
        className="flying-plane absolute top-[28%] left-0 z-10 pointer-events-none select-none"
        aria-hidden="true"
      >
        <svg
          width="60"
          height="40"
          viewBox="0 0 60 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-70"
        >
          <path
            d="M0 20 L40 5 L60 15 L40 20 L60 25 L40 23 L30 35 L28 22 Z"
            fill="#f0c84a"
            fillOpacity="0.85"
          />
        </svg>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-28">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(240,200,74,0.3)] bg-[rgba(240,200,74,0.05)] mb-8 reveal"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="w-2 h-2 rounded-full bg-[#f0c84a] animate-pulse" />
          <span className="text-[#f0c84a] text-xs font-semibold uppercase tracking-[0.2em] font-['Lato']">
            Domestic &amp; International Travel Specialists
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-['Playfair_Display'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.08] mb-6 reveal"
          style={{ animationDelay: '0.2s' }}
        >
          <span className="text-[#faf6ed]">Your Journey</span>
          <br />
          <span className="shimmer-text">Awaits.</span>
        </h1>

        {/* Subheading */}
        <p
          className="text-[#faf6ed]/60 text-lg sm:text-xl max-w-2xl mx-auto font-['Lato'] font-light leading-relaxed mb-10 reveal"
          style={{ animationDelay: '0.35s' }}
        >
          Air Trips Travel &amp; Tours crafts extraordinary travel experiences
          — from island escapes to international adventures, tailored to you.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal"
          style={{ animationDelay: '0.5s' }}
        >
          <button
            onClick={() =>
              document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="btn-gold text-sm sm:text-base px-8 py-3"
            id="hero-explore-btn"
          >
            Explore Our Services
          </button>
          <button
            onClick={() =>
              document.querySelector('#register')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="btn-outline text-sm sm:text-base px-8 py-3"
            id="hero-register-btn"
          >
            Get Started Free
          </button>
        </div>

        {/* Stats Row */}
        <div
          className="mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto reveal"
          style={{ animationDelay: '0.65s' }}
        >
          {[
            { value: '5K+', label: 'Happy Travelers' },
            { value: '50+', label: 'Destinations' },
            { value: '10+', label: 'Years of Service' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-['Playfair_Display'] text-3xl font-bold text-[#f0c84a]">
                {stat.value}
              </div>
              <div className="text-[#faf6ed]/40 text-xs uppercase tracking-widest mt-1 font-['Lato']">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Cue */}
      <button
        onClick={() =>
          document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
        }
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-[#faf6ed]/30 hover:text-[#f0c84a] transition-colors group"
        aria-label="Scroll to services"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-['Lato']">Scroll</span>
        <ChevronDown
          size={20}
          className="animate-bounce group-hover:text-[#f0c84a]"
        />
      </button>
    </section>
  )
}
