'use client'

import { Shield, Award, Users, Clock } from 'lucide-react'

const values = [
  {
    icon: Shield,
    title: 'Trusted & Accredited',
    description: 'DOT-accredited travel agency with over a decade of committed service to Filipino travelers.',
  },
  {
    icon: Award,
    title: 'Award-Winning Service',
    description: 'Recognized by international travel associations for excellence in customer experience and satisfaction.',
  },
  {
    icon: Users,
    title: 'Personal Approach',
    description: 'Every itinerary is crafted personally by our expert consultants — no cookie-cutter packages.',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Travel with peace of mind knowing our team is always reachable to assist you, wherever you are.',
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[#020917]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(240,200,74,0.2)] to-transparent" />

      {/* Decorative circle */}
      <div className="absolute right-0 top-1/4 w-[500px] h-[500px] rounded-full bg-[#1a3380]/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <p className="text-[#f0c84a] text-xs uppercase tracking-[0.3em] font-['Lato'] font-semibold mb-3 reveal">
              Our Story
            </p>
            <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#faf6ed] leading-tight mb-6 reveal">
              About{' '}
              <span className="italic text-[#f0c84a]">Air Trips</span>
              <br />
              Travel &amp; Tours
            </h2>
            <div className="gold-divider mb-6 reveal" />
            <p className="text-[#faf6ed]/60 text-base leading-relaxed font-['Lato'] mb-5 reveal">
              Founded with a passion for making travel accessible and extraordinary,
              Air Trips Travel &amp; Tours has grown into one of the most trusted travel
              agencies in the region. We specialize in transforming travel dreams into
              unforgettable memories.
            </p>
            <p className="text-[#faf6ed]/60 text-base leading-relaxed font-['Lato'] mb-8 reveal">
              Our team of seasoned travel consultants brings firsthand knowledge of
              destinations worldwide, ensuring every trip we plan exceeds expectations.
              From a spontaneous weekend getaway to a meticulously planned international
              expedition — we handle every detail with care.
            </p>
            <button
              onClick={() =>
                document.querySelector('#contacts')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="btn-gold text-sm reveal"
              id="about-contact-btn"
            >
              Get In Touch
            </button>
          </div>

          {/* Right: Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <div
                  key={v.title}
                  className="reveal group p-6 rounded-2xl border border-[rgba(240,200,74,0.1)] bg-[rgba(10,26,74,0.25)] hover:border-[rgba(240,200,74,0.3)] hover:bg-[rgba(10,26,74,0.4)] transition-all duration-300"
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[rgba(232,180,34,0.2)] to-[rgba(232,180,34,0.05)] flex items-center justify-center mb-4 group-hover:from-[rgba(232,180,34,0.3)] transition-all duration-300">
                    <Icon size={20} className="text-[#f0c84a]" />
                  </div>
                  <h3 className="font-['Playfair_Display'] text-base font-semibold text-[#faf6ed] mb-2">
                    {v.title}
                  </h3>
                  <p className="text-[#faf6ed]/45 text-sm leading-relaxed font-['Lato']">
                    {v.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
