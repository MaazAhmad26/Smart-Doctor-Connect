import { useState } from "react";
import { 
  Users, Calendar, MessageSquare, 
  Settings, Clock, Check, X,
  ExternalLink, UserPen, LogOut,
  Activity, TrendingUp, ShieldCheck, ChevronRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MOCK_APPOINTMENTS = [
  { id: '1', patient: 'Ali Khan', type: 'Online', time: '10:00 AM', date: 'Today', status: 'pending' },
  { id: '2', patient: 'Sara Malik', type: 'Physical', time: '11:15 AM', date: 'Today', status: 'confirmed' },
  { id: '3', patient: 'Usman Ali', type: 'Online', time: '02:00 PM', date: 'Tomorrow', status: 'pending' },
];

export default function DashboardDoctor() {
  return (
    <div className="max-w-7xl mx-auto space-y-12 py-8 px-4 sm:px-6 lg:px-8">
      {/* Structural Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 bg-slate-900 p-12 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Activity className="w-64 h-64" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center font-black text-3xl shadow-xl shadow-indigo-600/30 transform -rotate-6">
            AR
          </div>
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
               <h1 className="text-4xl font-black tracking-tight uppercase leading-none">Dr. Ahmed Raza</h1>
               <ShieldCheck className="w-6 h-6 text-indigo-400" />
            </div>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-[0.2em] flex items-center gap-4 justify-center md:justify-start">
              Senior Cardiologist 
              <span className="w-1.5 h-1.5 bg-slate-700 rounded-full" />
              Sector: Lahore
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none h-14 px-8 bg-slate-800 text-slate-300 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-700 transition-all border border-slate-700 flex items-center justify-center gap-2">
            <UserPen className="w-4 h-4" />
            Edit Protocol
          </button>
          <button className="flex-1 lg:flex-none h-14 px-10 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-12">
        {/* Statistics Sidebar - 3 Cols */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          <h4 className="text-[10px] font-black uppercase text-indigo-600 tracking-[0.3em] px-4">Core Metrics</h4>
          <div className="space-y-6">
            {[
              { label: "Patient Load", value: "8", icon: <Users className="w-5 h-5 text-indigo-600" />, delta: "+12%" },
              { label: "Rate per Cycle", value: "2.5K", icon: <TrendingUp className="w-5 h-5 text-emerald-600" />, delta: "+5%" },
              { label: "Compliance", value: "4.9", icon: <ShieldCheck className="w-5 h-5 text-indigo-600" />, delta: "0.2" }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-5 transition-opacity">
                   {stat.icon}
                </div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                    {stat.icon}
                  </div>
                  <span className="text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg uppercase tracking-widest">{stat.delta}</span>
                </div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}<span className="text-xs text-slate-300 ml-1">v4</span></p>
              </div>
            ))}
          </div>
        </div>

        {/* Control Center - 9 Cols */}
        <div className="col-span-12 lg:col-span-9 space-y-10">
          <Tabs defaultValue="appointments" className="space-y-10">
            <TabsList className="bg-white p-2 rounded-[2rem] border border-slate-200 h-16 shadow-sm">
              <TabsTrigger value="appointments" className="rounded-2xl px-10 h-full font-black text-xs uppercase tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-indigo-600/20 transition-all">
                Queue Management
              </TabsTrigger>
              <TabsTrigger value="messages" className="rounded-2xl px-10 h-full font-black text-xs uppercase tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-indigo-600/20 transition-all">
                AI Intercepts
              </TabsTrigger>
              <TabsTrigger value="availability" className="rounded-2xl px-10 h-full font-black text-xs uppercase tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-indigo-600/20 transition-all">
                Temporal Config
              </TabsTrigger>
            </TabsList>

            <TabsContent value="appointments" className="space-y-6 outline-none">
              {MOCK_APPOINTMENTS.map((app) => (
                <div key={app.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-8 group hover:border-indigo-400 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-indigo-900/5">
                  <div className="flex items-center gap-8">
                    <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center font-black text-lg border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
                      {app.patient[0]}
                    </div>
                    <div className="space-y-2">
                       <div className="flex items-center gap-3">
                          <h3 className="text-2xl font-black uppercase tracking-tight text-slate-800">{app.patient}</h3>
                          <Badge className="bg-slate-50 text-slate-400 font-bold text-[10px] border-none uppercase tracking-widest">{app.type}</Badge>
                       </div>
                       <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <Clock className="w-4 h-4 text-indigo-500" />
                          {app.date} // {app.time}
                       </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {app.status === 'pending' ? (
                      <>
                        <button className="h-12 px-8 bg-indigo-600 text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20">Grant Access</button>
                        <button className="h-12 px-8 bg-white text-slate-400 border border-slate-200 rounded-xl font-black uppercase text-[10px] tracking-widest hover:text-rose-500 hover:border-rose-200 transition-all">Decline</button>
                      </>
                    ) : (
                      <div className="flex items-center gap-4">
                        <Badge className="bg-emerald-50 text-emerald-600 border-none font-black uppercase tracking-widest text-[10px] px-6 py-2">Validated</Badge>
                        <button className="w-12 h-12 bg-slate-50 text-slate-400 hover:bg-indigo-600 hover:text-white rounded-xl transition-all flex items-center justify-center border border-slate-100 shadow-sm">
                          <ExternalLink className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="messages" className="text-center py-40 bg-white rounded-[3.5rem] border-2 border-dashed border-slate-100 flex flex-col items-center outline-none">
              <div className="w-20 h-20 bg-slate-50 rounded-[1.5rem] flex items-center justify-center mb-6">
                <MessageSquare className="w-10 h-10 text-slate-200" />
              </div>
              <h3 className="text-2xl font-black uppercase text-slate-300 tracking-tight mb-2">Neutral Signal</h3>
              <p className="text-slate-400 font-medium max-w-xs uppercase text-[10px] tracking-widest">Awaiting neural requests from the patient interface.</p>
            </TabsContent>

            <TabsContent value="availability" className="bg-white p-12 rounded-[3.5rem] border border-slate-200 space-y-10 outline-none">
              <div className="space-y-4">
                <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900">Temporal Grid Protocol</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xl">Initialize your availability cycles. Selected temporal nodes will be projected to the patient-facing directory for booking synchronization.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"].map(slot => (
                  <label key={slot} className="relative cursor-pointer group">
                    <input type="checkbox" className="peer sr-only" defaultChecked={slot === "10:00 AM"} />
                    <div className="h-16 flex items-center justify-center rounded-2xl border-2 border-slate-100 font-black text-xs uppercase tracking-[0.2em] text-slate-400 peer-checked:bg-slate-900 peer-checked:text-indigo-400 peer-checked:border-slate-900 transition-all hover:border-indigo-400">
                      {slot}
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex justify-start">
                <button className="h-16 px-12 bg-indigo-600 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/30">Commit Changes</button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
