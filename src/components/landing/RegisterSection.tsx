'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { Loader2, CheckCircle2, Eye, EyeOff } from 'lucide-react'

type Gender = 'Male' | 'Female' | 'Prefer not to say'

export default function RegisterSection() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2>(1)
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    phone_number: '',
    date_of_birth: '',
    gender: 'Prefer not to say' as Gender,
  })

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
    })

    if (signUpError || !data.user) {
      setError(signUpError?.message || 'Registration failed. Please try again.')
      setLoading(false)
      return
    }

    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      first_name: form.first_name,
      middle_name: form.middle_name || null,
      last_name: form.last_name,
      phone_number: form.phone_number,
      date_of_birth: form.date_of_birth,
      gender: form.gender,
    })

    if (profileError) {
      setError(profileError.message)
      setLoading(false)
      return
    }

    setSuccess(true)
    setTimeout(() => router.push('/client/dashboard'), 2500)
  }

  const inputClass = 'form-input font-[\'Lato\'] text-sm'
  const labelClass =
    "block text-xs font-semibold text-[#faf6ed]/50 uppercase tracking-widest mb-2 font-['Lato']"

  return (
    <section id="register" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[#020917]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(240,200,74,0.25)] to-transparent" />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#1a3380]/15 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#f0c84a] text-xs uppercase tracking-[0.3em] font-['Lato'] font-semibold mb-3 reveal">
            Join Air Trips
          </p>
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl font-bold text-[#faf6ed] reveal">
            Create Your Account
          </h2>
          <p className="mt-4 text-[#faf6ed]/50 font-['Lato'] text-sm reveal">
            Register to book trips, track your packages, and chat with our team.
          </p>
        </div>

        {/* Success State */}
        {success ? (
          <div className="text-center py-16 reveal">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#e8b422] to-[#f0c84a] flex items-center justify-center mx-auto mb-6 shadow-[0_4px_30px_rgba(240,200,74,0.4)]">
              <CheckCircle2 size={36} className="text-[#020917]" />
            </div>
            <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#faf6ed] mb-2">
              Welcome Aboard!
            </h3>
            <p className="text-[#faf6ed]/55 font-['Lato'] text-sm">
              Your account has been created. Redirecting to your dashboard…
            </p>
          </div>
        ) : (
          <div className="reveal rounded-2xl border border-[rgba(240,200,74,0.12)] bg-[rgba(5,15,46,0.7)] p-8 backdrop-blur-sm">
            {/* Step Indicator */}
            <div className="flex items-center gap-3 mb-8">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-3 flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold font-['Lato'] transition-all duration-300 ${
                      step >= s
                        ? 'bg-gradient-to-br from-[#e8b422] to-[#f0c84a] text-[#020917]'
                        : 'bg-[rgba(240,200,74,0.1)] text-[#faf6ed]/40 border border-[rgba(240,200,74,0.2)]'
                    }`}
                  >
                    {s}
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`text-xs font-semibold uppercase tracking-wide font-['Lato'] ${
                        step >= s ? 'text-[#f0c84a]' : 'text-[#faf6ed]/30'
                      }`}
                    >
                      {s === 1 ? 'Account' : 'Personal Info'}
                    </span>
                  </div>
                  {s === 1 && (
                    <div
                      className={`flex-1 h-px transition-all duration-500 ${
                        step === 2
                          ? 'bg-gradient-to-r from-[#e8b422] to-[rgba(240,200,74,0.2)]'
                          : 'bg-[rgba(240,200,74,0.1)]'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-['Lato']">
                {error}
              </div>
            )}

            {/* Step 1: Account Credentials */}
            {step === 1 && (
              <form onSubmit={handleStep1} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="reg-email" className={labelClass}>
                    Email Address
                  </label>
                  <input
                    id="reg-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label htmlFor="reg-password" className={labelClass}>
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="reg-password"
                      name="password"
                      type={showPass ? 'text' : 'password'}
                      placeholder="Min. 6 characters"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className={inputClass + ' pr-12'}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#faf6ed]/40 hover:text-[#f0c84a] transition-colors"
                      aria-label="Toggle password visibility"
                    >
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="reg-confirm" className={labelClass}>
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="reg-confirm"
                      name="confirmPassword"
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="Repeat your password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                      className={inputClass + ' pr-12'}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#faf6ed]/40 hover:text-[#f0c84a] transition-colors"
                      aria-label="Toggle confirm password visibility"
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-gold mt-2 text-sm"
                  id="register-step1-btn"
                >
                  Continue
                </button>
              </form>
            )}

            {/* Step 2: Personal Information */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="reg-first" className={labelClass}>
                      First Name
                    </label>
                    <input
                      id="reg-first"
                      name="first_name"
                      type="text"
                      placeholder="Juan"
                      value={form.first_name}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="reg-last" className={labelClass}>
                      Last Name
                    </label>
                    <input
                      id="reg-last"
                      name="last_name"
                      type="text"
                      placeholder="dela Cruz"
                      value={form.last_name}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="reg-middle" className={labelClass}>
                    Middle Name{' '}
                    <span className="text-[#faf6ed]/30 normal-case tracking-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    id="reg-middle"
                    name="middle_name"
                    type="text"
                    placeholder="Santos"
                    value={form.middle_name}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="reg-phone" className={labelClass}>
                      Phone Number
                    </label>
                    <input
                      id="reg-phone"
                      name="phone_number"
                      type="tel"
                      placeholder="+63 9XX XXX XXXX"
                      value={form.phone_number}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="reg-dob" className={labelClass}>
                      Date of Birth
                    </label>
                    <input
                      id="reg-dob"
                      name="date_of_birth"
                      type="date"
                      value={form.date_of_birth}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="reg-gender" className={labelClass}>
                    Gender
                  </label>
                  <select
                    id="reg-gender"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className={inputClass}
                    style={{ colorScheme: 'dark' }}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                <div className="flex gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn-outline flex-1 text-sm py-3"
                    id="register-back-btn"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gold flex-1 text-sm py-3 flex items-center justify-center gap-2"
                    id="register-submit-btn"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Creating Account…
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </div>
              </form>
            )}

            <p className="text-center mt-6 text-[#faf6ed]/35 text-xs font-['Lato']">
              Already have an account?{' '}
              <button
                onClick={() => {
                  document.getElementById('navbar-login-btn')?.click()
                }}
                className="text-[#f0c84a] hover:underline font-semibold"
              >
                Sign in here
              </button>
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
