'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { 
  BarChart3, 
  Users, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  Ticket, 
  Globe, 
  Calendar,
  Layers,
  LayoutDashboard,
  Menu,
  X,
  Plane,
  ShieldCheck
} from 'lucide-react'

export default function AgencyDashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [adminLabel, setAdminLabel] = useState('Admin')

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/agency/access')
        return
      }

      // Double-check if admin
      const { data: admin } = await supabase
        .from('admins')
        .select('name')
        .eq('id', user.id)
        .single()

      if (!admin) {
        await supabase.auth.signOut()
        router.push('/agency/access')
        return
      }

      setAdminLabel(admin.name)
      setLoading(false)
    }
    checkUser()
  }, [router, supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/agency/access')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020917] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-t-2 border-[#f0c84a] animate-spin" />
          <p className="text-[#f0c84a] font-['Lato'] text-sm uppercase tracking-widest font-bold">
            Air Trips Admin
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020917] flex flex-col md:flex-row font-['Lato'] text-[#faf6ed]">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } fixed inset-y-0 left-0 bg-[#050f2e] border-r border-[#f0c84a]/10 transition-all duration-300 z-50 flex flex-col md:relative h-screen`}
      >
        {/* Sidebar Header */}
        <div className="p-6 flex items-center justify-between border-b border-[#f0c84a]/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#f0c84a] flex items-center justify-center flex-shrink-0">
              <Plane size={18} className="text-[#020917] -rotate-45" />
            </div>
            {isSidebarOpen && (
              <span className="font-['Playfair_Display'] text-lg font-bold">
                Air <span className="text-[#f0c84a]">Admin</span>
              </span>
            )}
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-[#f0c84a]/40 hover:text-[#f0c84a] transition-colors md:flex hidden"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 py-6 px-3 flex flex-col gap-2">
          {[
            { icon: LayoutDashboard, label: 'Dashboard', active: true },
            { icon: Ticket, label: 'Bookings', active: false },
            { icon: Globe, label: 'Destinations', active: false },
            { icon: Users, label: 'Customers', active: false },
            { icon: Layers, label: 'Tour Packages', active: false },
            { icon: Calendar, label: 'Reports', active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                item.active 
                  ? 'bg-[#f0c84a] text-[#020917] shadow-[0_8px_20px_rgba(232,180,34,0.15)]' 
                  : 'hover:bg-[#1a3380]/40 text-[#faf6ed]/50 hover:text-[#faf6ed]'
              }`}
            >
              <item.icon size={20} className={item.active ? '' : 'group-hover:scale-110 transition-transform'} />
              {isSidebarOpen && <span className="text-sm font-semibold">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#f0c84a]/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-[#faf6ed]/40 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all group overflow-hidden"
          >
            <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
            {isSidebarOpen && <span className="text-sm font-semibold">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Top Header */}
        <header className="h-16 px-6 sm:px-10 flex items-center justify-between border-b border-[#f0c84a]/5 bg-[#020917]/50 backdrop-blur-md sticky top-0 z-40">
          <h2 className="text-[#faf6ed]/70 text-sm font-semibold uppercase tracking-[0.2em] md:flex hidden">
            Command Center
          </h2>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative group md:flex hidden">
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-[rgba(10,26,74,0.4)] border border-[#f0c84a]/15 text-xs py-2 px-9 rounded-full focus:outline-none focus:border-[#f0c84a] w-48 sm:w-64 transition-all"
              />
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#faf6ed]/30" />
            </div>
            
            <button className="relative p-2 text-[#faf6ed]/40 hover:text-[#f0c84a] transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-[#f0c84a]/10">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none">{adminLabel}</p>
                <p className="text-[10px] text-[#f0c84a]/60 uppercase tracking-widest mt-1">Super Admin</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1a3380] to-[#0f2566] border border-[#f0c84a]/30" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 sm:p-10 flex flex-col gap-10">
          {/* Welcome Message */}
          <div className="flex flex-col gap-1">
            <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold">
              Good evening, <span className="text-[#f0c84a]-100 font-normal italic">{adminLabel.split(' ')[0]}</span>.
            </h1>
            <p className="text-[#faf6ed]/40 text-sm italic">
              Welcome back to the Air Trips Agency Command Center.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Active Bookings', value: '142', icon: Ticket, trend: '+12%', color: 'border-blue-500/20' },
              { label: 'Revenue (March)', value: 'P342K', icon: BarChart3, trend: '+8.4%', color: 'border-emerald-500/20' },
              { label: 'New Inquiries', value: '28', icon: Bell, trend: '-2%', color: 'border-orange-500/20' },
              { label: 'Global Reaches', value: '12', icon: Globe, trend: '+4%', color: 'border-purple-500/20' },
            ].map((stat) => (
              <div 
                key={stat.label} 
                className={`bg-[#050f2e] border ${stat.color} p-6 rounded-2xl flex flex-col gap-3 relative overflow-hidden group hover:scale-[1.02] transition-all hover:bg-[#07143e]`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 group-hover:bg-[#f0c84a]/10 group-hover:border-[#f0c84a]/30 transition-all">
                    <stat.icon size={22} className="text-[#f0c84a]" />
                  </div>
                  <span className={`text-xs font-bold font-sans ${stat.trend.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                    {stat.trend}
                  </span>
                </div>
                <div>
                  <p className="text-[#faf6ed]/40 text-xs uppercase tracking-widest leading-none font-bold">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-['Playfair_Display'] font-bold mt-2 leading-none">
                    {stat.value}
                  </p>
                </div>
                {/* Subtle back decoration */}
                <stat.icon size={60} className="absolute -bottom-4 -right-4 opacity-[0.03]" />
              </div>
            ))}
          </div>

          {/* Activity/Main Section (Placeholder placeholder) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-[#050f2e] border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h3 className="font-bold uppercase tracking-widest text-xs opacity-50">Recent Activity</h3>
                <button className="text-[#f0c84a] text-xs font-semibold hover:underline">See Al History</button>
              </div>
              <div className="p-10 text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center opacity-30">
                  <Layers size={30} />
                </div>
                <p className="text-[#faf6ed]/40 text-sm max-w-xs mx-auto">
                   Activity logs are being prepared. This area will show live updates of customer interactions and booking status changes.
                </p>
              </div>
            </div>
            
            <div className="bg-[#050f2e] border border-[#f0c84a]/15 rounded-2xl p-8 relative overflow-hidden flex flex-col items-center text-center justify-center gap-6 group">
                {/* Background glow for special card */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#f0c84a]/5 to-transparent" />
                
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#e8b422] to-[#f0c84a] flex items-center justify-center relative z-10 shadow-[0_15px_40px_rgba(232,180,34,0.3)]">
                  <ShieldCheck size={40} className="text-[#020917]" />
                </div>
                <div className="relative z-10 flex flex-col gap-2">
                    <h3 className="font-['Playfair_Display'] text-xl font-bold">Management Panel</h3>
                    <p className="text-[#faf6ed]/45 text-sm font-['Lato'] leading-relaxed">
                        Configure system settings, manage users, and update global agency travel rates.
                    </p>
                    <button className="btn-gold text-xs px-8 py-3 mt-4">Modify Settings</button>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
