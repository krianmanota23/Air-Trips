'use client'

import { useState } from 'react'
import { X, Eye, EyeOff, Loader2, Plane } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

interface LoginModalProps {
  open: boolean
  onClose: () => void
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  if (!open) return null

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/client/dashboard')
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#020917]/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-[fadeUp_0.35s_ease_both]">
        {/* Top gradient bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#e8b422] via-[#f0c84a] to-[#e8b422]" />

        <div className="bg-[#050f2e] border border-[rgba(240,200,74,0.15)] rounded-b-2xl p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[#faf6ed]/40 hover:text-[#f0c84a] transition-colors"
            aria-label="Close login modal"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#e8b422] to-[#f0c84a] flex items-center justify-center mb-4 shadow-[0_4px_20px_rgba(240,200,74,0.3)]">
              <Plane size={24} className="text-[#020917] -rotate-45" />
            </div>
            <h2
              id="login-modal-title"
              className="font-['Playfair_Display'] text-2xl font-bold text-[#faf6ed]"
            >
              Welcome Back
            </h2>
            <p className="text-[#faf6ed]/50 text-sm mt-1 font-['Lato']">
              Sign in to your Air Trips account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-['Lato']">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-semibold text-[#faf6ed]/60 uppercase tracking-widest mb-2 font-['Lato']"
              >
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input font-['Lato'] text-sm"
                autoComplete="email"
              />
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="block text-xs font-semibold text-[#faf6ed]/60 uppercase tracking-widest mb-2 font-['Lato']"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input font-['Lato'] text-sm pr-12"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#faf6ed]/40 hover:text-[#f0c84a] transition-colors"
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full mt-2 flex items-center justify-center gap-2"
              id="login-submit-btn"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing In…
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-[#faf6ed]/40 text-xs font-['Lato']">
            Don&apos;t have an account?{' '}
            <button
              onClick={() => {
                onClose()
                document.querySelector('#register')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-[#f0c84a] hover:underline font-semibold"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
