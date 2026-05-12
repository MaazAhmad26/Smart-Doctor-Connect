import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity, Mail, Lock, Loader2, ChevronRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("patient");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login
    setTimeout(() => {
      toast.success("Identity Verified. Portal Access Granted.");
      navigate(userType === 'doctor' ? '/dashboard/doctor' : '/dashboard/patient');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none select-none">
         <Activity className="w-[1000px] h-[1000px] absolute -top-1/4 -left-1/4 rotate-12" />
      </div>

      <div className="w-full max-w-lg space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-slate-900 text-indigo-500 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl transform -rotate-12 border border-slate-800">
            <Activity className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 uppercase">System Login</h1>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              Secure Medical Auth Protocol
            </p>
          </div>
        </div>

        <Card className="border-slate-200 shadow-2xl shadow-indigo-900/5 rounded-[3rem] overflow-hidden p-2 bg-white">
          <CardContent className="p-8 space-y-10">
            <Tabs defaultValue="patient" onValueChange={setUserType} className="grid w-full grid-cols-2 bg-slate-50 p-2 rounded-[2rem] h-16">
              <TabsList className="bg-transparent h-full">
                <TabsTrigger value="patient" className="rounded-[1.5rem] h-full font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all">
                  Patient Node
                </TabsTrigger>
                <TabsTrigger value="doctor" className="rounded-[1.5rem] h-full font-black text-[10px] uppercase tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all">
                  Doctor Node
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Registry Email</label>
                  <div className="relative">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 pointer-events-none" />
                    <input 
                      type="email" 
                      placeholder="IDENTIFIER@DOMAIN.COM" 
                      className="w-full h-16 bg-slate-50 border-none rounded-[1.5rem] pl-16 pr-6 font-bold text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-600 transition-all uppercase tracking-wide text-sm"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">Pass-Code</label>
                  <div className="relative">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 pointer-events-none" />
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      className="w-full h-16 bg-slate-50 border-none rounded-[1.5rem] pl-16 pr-6 font-bold text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-indigo-600 transition-all text-sm"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full h-16 rounded-[1.5rem] bg-indigo-600 text-white font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center justify-center gap-4 group"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    Initialize Connection
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </CardContent>
          <CardFooter className="pb-10 flex flex-col gap-6 text-center border-t border-slate-50 pt-8">
            <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">
              Reset Security Protocol
            </button>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Unregistered Node?{" "}
              <Link to="/register" className="font-black text-indigo-600 hover:underline">
                Create Entry
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
