'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { Plane, Lock, Eye, EyeOff, Loader2, ShieldCheck, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AgencyAccessPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // 1. Authenticate with Supabase
    const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError || !user) {
      setError(authError?.message || 'Invalid credentials.')
      setLoading(false)
      return
    }

    // 2. Check if the user is in the 'admins' table
    const { data: admin, error: adminError } = await supabase
      .from('admins')
      .select('*')
      .eq('id', user.id)
      .single()

    if (adminError || !admin) {
      // If not an admin, sign them out and show error
      await supabase.auth.signOut()
      setError('Access Denied. You do not have agency-level permissions.')
      setLoading(false)
      return
    }

    // 3. Success, go to dashboard
    router.push('/agency/dashboard')
  }

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background with darker, more serious navy */}
      <div className="absolute inset-0 bg-[#010613]" />
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(240,200,74,1) 1px, transparent 1px), linear-gradient(90deg, rgba(240,200,74,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1a3380]/15 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#e8b422]/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      {/* Back to Home Link */}
      <Link 
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-[#faf6ed]/40 hover:text-[#f0c84a] transition-colors group z-20"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-['Lato'] tracking-wide">Back to Public Site</span>
      </Link>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md animate-[fadeUp_0.5s_ease_both]">
        {/* Luxury top bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#e8b422] via-[#f0c84a] to-[#e8b422] rounded-t-2xl shadow-[0_0_15px_rgba(240,200,74,0.3)]" />
        
        <div className="bg-[rgba(5,15,46,0.85)] border-x border-b border-[rgba(240,200,74,0.15)] rounded-b-2xl p-10 backdrop-blur-xl">
          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a3380] to-[#0f2566] border border-[#f0c84a]/30 flex items-center justify-center mb-5 rotate-12 shadow-2xl">
              <ShieldCheck size={32} className="text-[#f0c84a] -rotate-12" />
            </div>
            <h1 className="font-['Playfair_Display'] text-3xl font-bold text-[#faf6ed] text-center">
              Agency <span className="text-[#f0c84a]">Portal</span>
            </h1>
            <p className="text-[#faf6ed]/40 text-xs mt-2 uppercase tracking-[0.25em] font-['Lato'] font-semibold">
              Restricted Staff Access
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-3 items-start">
              <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold font-sans">!</span>
              </div>
              <p className="text-red-400 text-sm font-['Lato'] leading-tight">
                {error}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label 
                htmlFor="agency-email"
                className="block text-xs font-semibold text-[#faf6ed]/50 uppercase tracking-widest mb-2 font-['Lato']"
              >
                Staff Email
              </label>
              <div className="relative group">
                <input
                  id="agency-email"
                  type="email"
                  placeholder="name@airtrips.ph"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input font-['Lato'] text-sm py-3.5 pl-4 focus:ring-1 focus:ring-[#f0c84a]/30"
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor="agency-pass"
                className="block text-xs font-semibold text-[#faf6ed]/50 uppercase tracking-widest mb-2 font-['Lato']"
              >
                Security Key
              </label>
              <div className="relative group">
                <input
                  id="agency-pass"
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input font-['Lato'] text-sm py-3.5 pl-4 pr-12 focus:ring-1 focus:ring-[#f0c84a]/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#faf6ed]/30 hover:text-[#f0c84a] transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full mt-4 flex items-center justify-center gap-3 py-4 text-sm font-bold shadow-[0_10px_30px_rgba(232,180,34,0.15)] group"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Lock size={16} className="group-hover:scale-110 transition-transform" />
                  Grant Access
                </>
              )}
            </button>
          </form>

          {/* Help hint */}
          <div className="mt-10 pt-8 border-t border-[#faf6ed]/5 text-center">
            <p className="text-[#faf6ed]/25 text-[10px] sm:text-xs font-['Lato'] leading-relaxed">
              This system is for authorized Air Trips personnel only.
              Unauthorized access attempts are logged and monitored.
            </p>
          </div>
        </div>
        
        {/* Decorative corner footer in card */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[#faf6ed]/10 pointer-events-none select-none">
          <Plane size={40} className="rotate-45" />
        </div>
      </div>
    </main>
  )
}
