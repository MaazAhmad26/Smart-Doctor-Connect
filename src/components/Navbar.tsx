import { Link } from "react-router-dom";
import { Activity, User, LogIn, ChevronRight, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  return (
    <nav className="h-20 flex items-center justify-between px-8 bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm backdrop-blur-md bg-white/80">
      <Link to="/" className="flex items-center gap-4 group">
        <div className="w-10 h-10 bg-slate-900 text-indigo-500 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-6 shadow-lg shadow-indigo-900/10">
          <Activity className="w-6 h-6" />
        </div>
        <div className="flex flex-col -space-y-1">
          <span className="text-xl font-black tracking-tight text-slate-900 uppercase leading-none">Doctor.ly</span>
          <span className="text-[8px] font-black text-indigo-600 uppercase tracking-[0.4em] leading-none">System v2.0</span>
        </div>
      </Link>
      
      <div className="flex items-center gap-10">
        <div className="hidden md:flex items-center gap-10">
          <Link to="/doctors" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-600 transition-all relative group/link">
            Directory
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover/link:w-full" />
          </Link>
          <div className="h-4 w-[1.5px] bg-slate-100"></div>
          <Link to="/login" className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-all group/login">
            <div className="w-8 h-8 bg-slate-50 flex items-center justify-center rounded-lg group-hover/login:bg-indigo-50 transition-colors">
              <LogIn className="w-3.5 h-3.5 text-slate-400 group-hover/login:text-indigo-600" />
            </div>
            Sign In
          </Link>
        </div>
        
        <Link 
          to="/register" 
          className="h-12 px-8 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-600/20 hover:bg-slate-900 transition-all active:scale-95 flex items-center gap-3 group"
        >
          Initialize Account
          <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </nav>
  );
}
