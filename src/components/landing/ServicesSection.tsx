'use client'

import { useEffect } from 'react'
import {
  Plane,
  Globe,
  Ship,
  Hotel,
  FileText,
  Compass,
  ArrowRight,
} from 'lucide-react'

const services = [
  {
    icon: Plane,
    title: 'Airline Ticketing',
    description:
      'Domestic and international airline bookings at competitive rates — economy, business, and first class.',
    color: 'from-[#1a3380] to-[#0f2566]',
  },
  {
    icon: Globe,
    title: 'Tour Packages',
    description:
      'Curated group and private tours across Southeast Asia, Europe, and beyond. All-inclusive itineraries.',
    color: 'from-[#1a3380] to-[#0f2566]',
  },
  {
    icon: Ship,
    title: 'Cruise Holidays',
    description:
      'Luxury cruise packages with top cruise lines. Mediterranean, Caribbean, and Asia-Pacific routes.',
    color: 'from-[#1a3380] to-[#0f2566]',
  },
  {
    icon: Hotel,
    title: 'Hotel Reservations',
    description:
      'Hand-picked accommodations from boutique hideaways to luxury resorts, negotiated at exclusive rates.',
    color: 'from-[#1a3380] to-[#0f2566]',
  },
  {
    icon: FileText,
    title: 'Visa Assistance',
    description:
      'Expert guidance on visa requirements, documentation, and application processing for any destination.',
    color: 'from-[#1a3380] to-[#0f2566]',
  },
  {
    icon: Compass,
    title: 'Travel Insurance',
    description:
      'Comprehensive travel protection plans covering medical emergencies, cancellations, and lost baggage.',
    color: 'from-[#1a3380] to-[#0f2566]',
  },
]

export default function ServicesSection() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020917] via-[#050f2e] to-[#020917]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(240,200,74,0.3)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 reveal">
            <div className="gold-divider mx-auto" />
          </div>
          <p className="text-[#f0c84a] text-xs uppercase tracking-[0.3em] font-['Lato'] font-semibold mb-3 reveal">
            What We Offer
          </p>
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#faf6ed] reveal">
            Products &amp; Services
          </h2>
          <p className="mt-4 text-[#faf6ed]/50 max-w-xl mx-auto font-['Lato'] text-base leading-relaxed reveal">
            Everything you need for a seamless travel experience, expertly
            handled by our team of passionate travel consultants.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="reveal card-hover group relative rounded-2xl border border-[rgba(240,200,74,0.08)] bg-gradient-to-br from-[rgba(10,26,74,0.5)] to-[rgba(2,9,23,0.8)] p-7 flex flex-col gap-4 cursor-default overflow-hidden"
                style={{ transitionDelay: `${index * 0.06}s` }}
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[rgba(240,200,74,0.04)] to-transparent rounded-2xl pointer-events-none" />
                {/* Top border line effect */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[rgba(240,200,74,0.4)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[rgba(232,180,34,0.15)] to-[rgba(232,180,34,0.05)] border border-[rgba(240,200,74,0.2)] flex items-center justify-center group-hover:border-[rgba(240,200,74,0.5)] group-hover:bg-gradient-to-br group-hover:from-[rgba(232,180,34,0.25)] group-hover:to-[rgba(232,180,34,0.08)] transition-all duration-300">
                  <Icon size={22} className="text-[#f0c84a]" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-['Playfair_Display'] text-xl font-semibold text-[#faf6ed] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-[#faf6ed]/50 text-sm leading-relaxed font-['Lato']">
                    {service.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-auto flex items-center gap-2 text-[#f0c84a] text-sm font-semibold font-['Lato'] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  Learn more <ArrowRight size={14} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
