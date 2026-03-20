'use client'

import { MapPin, Phone, Mail, Facebook, Instagram, Send } from 'lucide-react'

const contactItems = [
  {
    icon: MapPin,
    label: 'Address',
    value: '2nd Floor, Rizal Avenue, Davao City, Philippines',
    href: 'https://maps.google.com',
  },
  {
    icon: Phone,
    label: 'Phone / Viber',
    value: '+63 912 345 6789',
    href: 'tel:+639123456789',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'inquiries@airtrips.ph',
    href: 'mailto:inquiries@airtrips.ph',
  },
  {
    icon: Facebook,
    label: 'Facebook',
    value: 'Air Trips Travel & Tours',
    href: 'https://facebook.com',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@airtrips.ph',
    href: 'https://instagram.com',
  },
]

export default function ContactsSection() {
  return (
    <section id="contacts" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020917] via-[#050f2e] to-[#020917]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(240,200,74,0.25)] to-transparent" />
      {/* Left glow */}
      <div className="absolute left-0 top-1/3 w-[400px] h-[400px] rounded-full bg-[#e8b422]/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <div>
            <p className="text-[#f0c84a] text-xs uppercase tracking-[0.3em] font-['Lato'] font-semibold mb-3 reveal">
              Get In Touch
            </p>
            <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#faf6ed] leading-tight mb-6 reveal">
              Contact <span className="italic text-[#f0c84a]">Us</span>
            </h2>
            <div className="gold-divider mb-6 reveal" />
            <p className="text-[#faf6ed]/55 text-base leading-relaxed font-['Lato'] mb-10 reveal">
              Ready to plan your next adventure? Our travel consultants are on
              standby to help you craft the perfect itinerary. Reach out through
              any of the channels below.
            </p>

            <div className="flex flex-col gap-5">
              {contactItems.map((item, i) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="reveal group flex items-start gap-4 text-decoration-none"
                    style={{ transitionDelay: `${i * 0.07}s` }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[rgba(232,180,34,0.15)] to-[rgba(232,180,34,0.04)] border border-[rgba(240,200,74,0.15)] flex items-center justify-center flex-shrink-0 group-hover:border-[rgba(240,200,74,0.5)] group-hover:bg-gradient-to-br group-hover:from-[rgba(232,180,34,0.25)] transition-all duration-300">
                      <Icon size={18} className="text-[#f0c84a]" />
                    </div>
                    <div>
                      <p className="text-[#faf6ed]/40 text-xs uppercase tracking-widest font-['Lato'] mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-[#faf6ed]/80 text-sm font-['Lato'] group-hover:text-[#f0c84a] transition-colors duration-200">
                        {item.value}
                      </p>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Right: Quick Message Form */}
          <div className="reveal">
            <div className="rounded-2xl border border-[rgba(240,200,74,0.12)] bg-[rgba(5,15,46,0.7)] p-8 backdrop-blur-sm">
              <h3 className="font-['Playfair_Display'] text-2xl font-semibold text-[#faf6ed] mb-6">
                Send a Quick Message
              </h3>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  // Placeholder submit
                }}
                className="flex flex-col gap-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[#faf6ed]/50 uppercase tracking-widest mb-2 font-['Lato']"
                    >
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Juan dela Cruz"
                      required
                      className="form-input font-['Lato'] text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[#faf6ed]/50 uppercase tracking-widest mb-2 font-['Lato']"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="you@email.com"
                      required
                      className="form-input font-['Lato'] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-semibold text-[#faf6ed]/50 uppercase tracking-widest mb-2 font-['Lato']"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="Tour package inquiry..."
                    className="form-input font-['Lato'] text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[#faf6ed]/50 uppercase tracking-widest mb-2 font-['Lato']"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    placeholder="Tell us about your travel plans..."
                    required
                    className="form-input font-['Lato'] text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gold flex items-center justify-center gap-2 text-sm mt-2"
                  id="contact-submit-btn"
                >
                  <Send size={15} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
