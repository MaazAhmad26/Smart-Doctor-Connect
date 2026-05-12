import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity, Mail, Lock, User, MapPin, Loader2, Phone, ChevronRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("patient");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    specialization: "",
    phone: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      toast.success("Identity Verified. Portal Entry Initialized.");
      navigate(userType === 'doctor' ? '/dashboard/doctor' : '/dashboard/patient');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none select-none overflow-hidden">
         <Activity className="w-[1200px] h-[1200px] absolute -bottom-1/4 -right-1/4 -rotate-12" />
      </div>

      <div className="w-full max-w-xl space-y-10 relative z-10">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-slate-900 text-indigo-500 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl transform rotate-6 border border-slate-800">
            <Activity className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">Registry Hub</h1>
            <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              Secure Decentralized Medical Network
            </p>
          </div>
        </div>

        <Card className="border-slate-200 shadow-2xl shadow-indigo-900/5 rounded-[3.5rem] overflow-hidden p-2 bg-white">
          <CardContent className="p-10 space-y-12">
            <Tabs defaultValue="patient" onValueChange={setUserType} className="grid w-full grid-cols-2 bg-slate-50 p-2 rounded-[2rem] h-16">
              <TabsList className="bg-transparent h-full">
                <TabsTrigger value="patient" className="rounded-[1.5rem] h-full font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all">
                  Patient Entry
                </TabsTrigger>
                <TabsTrigger value="doctor" className="rounded-[1.5rem] h-full font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all">
                  Provider Node
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <form onSubmit={handleRegister} className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Full Identity</label>
                  <div className="relative">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 pointer-events-none" />
                    <input 
                      name="name"
                      placeholder="ALI KHAN" 
                      className="w-full h-16 bg-slate-50 border-none rounded-2xl pl-16 pr-6 font-bold text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-600 transition-all uppercase text-sm"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Comm Link</label>
                  <div className="relative">
                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 pointer-events-none" />
                    <input 
                      name="phone"
                      placeholder="03XX XXXXXXX" 
                      className="w-full h-16 bg-slate-50 border-none rounded-2xl pl-16 pr-6 font-bold text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-600 transition-all uppercase text-sm"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Registry Email</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 pointer-events-none" />
                  <input 
                    name="email"
                    type="email" 
                    placeholder="ID@STATION.COM" 
                    className="w-full h-16 bg-slate-50 border-none rounded-2xl pl-16 pr-6 font-bold text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-600 transition-all uppercase text-sm"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {userType === 'doctor' && (
                <div className="grid sm:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Spec Core</label>
                    <input 
                      name="specialization"
                      placeholder="CARDIOLOGY" 
                      className="w-full h-16 bg-slate-50 border-none rounded-2xl px-6 font-bold text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-600 transition-all uppercase text-sm"
                      required
                      value={formData.specialization}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Sector Pin</label>
                    <div className="relative">
                      <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 pointer-events-none" />
                      <input 
                        name="location"
                        placeholder="CITY" 
                        className="w-full h-16 bg-slate-50 border-none rounded-2xl pl-16 pr-6 font-bold text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-600 transition-all uppercase text-sm"
                        required
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Access-Code</label>
                <div className="relative">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 pointer-events-none" />
                  <input 
                    name="password"
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full h-16 bg-slate-50 border-none rounded-2xl pl-16 pr-6 font-bold text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-600 transition-all text-sm"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="px-4">
                 <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest leading-relaxed">
                   By initializing this node, you agree to the <span className="text-indigo-600 cursor-pointer">Network Operations Manual</span> and <span className="text-indigo-600 cursor-pointer">Data Privacy Protocols</span>.
                 </p>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full h-16 rounded-[1.5rem] bg-indigo-600 text-white font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center justify-center gap-4 group"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    Initialize Entry
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </CardContent>
          <CardFooter className="pb-10 flex justify-center text-center border-t border-slate-50 pt-8">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Existing Node?{" "}
              <Link to="/login" className="font-black text-indigo-600 hover:underline">
                Sign In
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
