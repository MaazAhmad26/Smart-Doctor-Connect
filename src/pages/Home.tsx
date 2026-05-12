import { Search, MapPin, Activity, Star, User, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const featuredDoctors = [
  { id: '1', name: 'Dr. Ahmed Raza', specialization: 'Cardiologist', location: 'Lahore', rating: 4.8 },
  { id: '2', name: 'Dr. Sara Khan', specialization: 'Dermatologist', location: 'Karachi', rating: 4.6 },
  { id: '3', name: 'Dr. Usman Malik', specialization: 'Pediatrician', location: 'Islamabad', rating: 4.9 },
];

export default function Home() {
  return (
    <div className="space-y-24 py-12">
      {/* Hero Section */}
      <section className="bg-white rounded-[2.5rem] border border-slate-200 p-12 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Activity className="w-96 h-96 text-indigo-600" />
        </div>
        
        <div className="relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
              Healthcare Evolution
            </span>
            <h1 className="text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.05]">
              Decentralized <br />
              <span className="text-indigo-600">Patient Care.</span>
            </h1>
            <p className="text-slate-500 text-xl leading-relaxed max-w-xl">
              NEXUS: Eliminating healthcare fragmentation in Pakistan through real-time AI routing and verified medical expertise.
            </p>
          </motion.div>

          <div className="mt-12 bg-slate-50 p-2 rounded-[2rem] border border-slate-200 flex flex-col md:flex-row gap-2 shadow-sm focus-within:ring-2 focus-within:ring-indigo-600/20 transition-all">
            <div className="flex-1 flex items-center gap-3 px-6 py-4 bg-white rounded-2xl border border-slate-100">
              <Search className="text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Symptoms or Specialization..." 
                className="bg-transparent border-none focus:ring-0 w-full text-slate-800 placeholder:text-slate-400 font-medium text-sm"
              />
            </div>
            <div className="flex-1 flex items-center gap-3 px-6 py-4 bg-white rounded-2xl border border-slate-100">
              <MapPin className="text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Location (City)..." 
                className="bg-transparent border-none focus:ring-0 w-full text-slate-800 placeholder:text-slate-400 font-medium text-sm"
              />
            </div>
            <button className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-extrabold text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 whitespace-nowrap active:scale-95">
              Execute Search
            </button>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Active Nodes", value: "248+", sub: "Verified specialists in network" },
          { label: "Diagnosis Speed", value: "4.2s", sub: "Avg. AI analysis latency" },
          { label: "Market Reach", value: "98%", sub: "Connectivity in urban centers" },
          { label: "Trust Score", value: "A+", sub: "Medical verification status" }
        ].map((m, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm group hover:border-indigo-200 transition-colors">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">{m.label}</p>
            <p className="text-3xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tighter">{m.value}</p>
            <p className="text-[11px] text-slate-500 font-medium mt-2">{m.sub}</p>
          </div>
        ))}
      </section>

      {/* Featured Doctors */}
      <section className="space-y-12">
        <div className="flex items-end justify-between px-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              Verified Core Nodes
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Top Specialists</h2>
          </div>
          <Link to="/doctors" className="text-slate-500 text-sm font-bold uppercase tracking-widest hover:text-indigo-600 transition-colors flex items-center gap-2">
            View All Data
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {featuredDoctors.map((doc) => (
            <Link to={`/doctors/${doc.id}`} key={doc.id} className="group">
              <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 transition-all group-hover:-translate-y-2">
                <div className="h-56 bg-slate-100 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent"></div>
                  <User className="w-20 h-20 text-slate-300 relative z-10" />
                  <div className="absolute top-6 right-6">
                    <Badge className="bg-indigo-600 text-[10px] font-bold tracking-widest rounded-lg">PRIMARY NODE</Badge>
                  </div>
                </div>
                <div className="p-8 space-y-6">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{doc.name}</h3>
                    <p className="text-indigo-600 font-bold text-xs uppercase tracking-widest">{doc.specialization}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                    <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest">
                      <MapPin className="w-4 h-4 text-indigo-600" />
                      {doc.location}
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[11px] font-black tracking-widest">
                      <Star className="w-3 h-3 fill-amber-600" />
                      {doc.rating}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tech Stack CTA */}
      <section className="bg-slate-900 rounded-[3rem] p-16 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute bottom-0 right-0 p-12 opacity-10">
          <Activity className="w-64 h-64" />
        </div>
        <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="w-2 h-2 bg-indigo-500 rounded-full inline-block mr-2 animate-pulse"></span>
              <span className="text-indigo-400 font-bold text-xs uppercase tracking-[0.2em]">Architecture Status</span>
              <h2 className="text-4xl font-extrabold tracking-tight">Full-Stack Medical Intelligence</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Powered by Gemini 1.5 Flash for symptom analysis and Firebase for real-time relational data sync. Built with extreme mobile responsiveness and high uptime stability.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="border-l-2 border-indigo-500 pl-6 py-2">
                <h4 className="text-xs font-bold uppercase text-indigo-400 tracking-widest">Database</h4>
                <p className="text-sm text-slate-300 font-mono">Firestore v2.4</p>
              </div>
              <div className="border-l-2 border-slate-700 pl-6 py-2">
                <h4 className="text-xs font-bold uppercase text-slate-500 tracking-widest">Engine</h4>
                <p className="text-sm text-slate-300 font-mono">Generative AI</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <Link 
              to="/register" 
              className="px-12 py-6 bg-indigo-600 text-white rounded-3xl font-black uppercase text-sm tracking-[0.1em] shadow-2xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95 flex items-center gap-4 group"
            >
              Initialize Onboarding
              <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center group-hover:translate-x-2 transition-transform">
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );
}
