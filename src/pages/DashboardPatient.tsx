import { useState } from "react";
import { Calendar, MessageSquare, Clock, MapPin, User, ChevronRight, Activity, Settings, ClipboardList, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const MOCK_APPOINTMENTS = [
  { id: '1', doctor: 'Dr. Ahmed Raza', type: 'Physical', date: '2026-05-20', time: '10:00 AM', status: 'confirmed' },
  { id: '2', doctor: 'Dr. Sara Khan', type: 'Online', date: '2026-05-22', time: '02:00 PM', status: 'pending' },
];

export default function DashboardPatient() {
  return (
    <div className="max-w-7xl mx-auto space-y-12 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Grid */}
      <div className="grid grid-cols-12 gap-8 items-end">
        <div className="col-span-12 lg:col-span-8 space-y-4">
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.3em] rounded-full">
            Active Session
          </span>
          <h1 className="text-5xl font-black tracking-tight text-slate-900 leading-none lg:text-6xl uppercase">
            Patient Hub
          </h1>
          <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">
            Monitor medical lifecycle, manage active appointments, and analyze health metrics via decentralized medical nodes.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-4 hidden lg:flex justify-end">
          <div className="flex -space-x-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-16 h-16 rounded-full border-4 border-slate-50 bg-slate-200 flex items-center justify-center text-slate-400 font-black shadow-sm ring-1 ring-slate-200">
                <User className="w-8 h-8" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-12">
        {/* Navigation - 3 Cols */}
        <div className="col-span-12 lg:col-span-3 space-y-8">
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm space-y-10">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-slate-900 text-indigo-400 rounded-3xl flex items-center justify-center shadow-lg transform rotate-3">
                <User className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="font-black text-xl text-slate-900 uppercase tracking-tight">Ali Khan</p>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none">Tier 1 Patient</p>
              </div>
            </div>
            
            <div className="h-[1px] bg-slate-100" />
            
            <div className="space-y-3">
              {[
                { icon: <TrendingUp className="w-4 h-4" />, label: "Health Overview", active: true },
                { icon: <Calendar className="w-4 h-4" />, label: "Appointments" },
                { icon: <ClipboardList className="w-4 h-4" />, label: "Medical Logs" },
                { icon: <Settings className="w-4 h-4" />, label: "Node Config" }
              ].map((link, i) => (
                <button 
                  key={i} 
                  className={cn(
                    "w-full flex items-center justify-between p-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all group",
                    link.active 
                      ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <span className="flex items-center gap-4">
                    {link.icon}
                    {link.label}
                  </span>
                  <ChevronRight className={cn("w-4 h-4 group-hover:translate-x-1 transition-transform", link.active ? "text-indigo-200" : "text-slate-300")} />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2rem] text-white overflow-hidden relative group cursor-pointer shadow-xl">
             <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
               <Activity className="w-20 h-20" />
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-2">Emergency Hub</p>
             <h4 className="text-xl font-black uppercase tracking-tight mb-4 leading-none">Immediate Assistance</h4>
             <button className="text-[10px] font-black uppercase tracking-widest px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/10">
                Activate Alert
             </button>
          </div>
        </div>

        {/* Content - 9 Cols */}
        <div className="col-span-12 lg:col-span-9 space-y-10">
          <Tabs defaultValue="appointments" className="space-y-10">
            <TabsList className="bg-white p-2 rounded-[2rem] border border-slate-200 h-16 shadow-sm">
              <TabsTrigger value="appointments" className="rounded-2xl px-10 h-full font-black text-xs uppercase tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-indigo-600/20 transition-all">
                Upcoming Nodes
              </TabsTrigger>
              <TabsTrigger value="history" className="rounded-2xl px-10 h-full font-black text-xs uppercase tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-indigo-600/20 transition-all">
                Historical Log
              </TabsTrigger>
              <TabsTrigger value="messages" className="rounded-2xl px-10 h-full font-black text-xs uppercase tracking-widest data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-indigo-600/20 transition-all">
                Interface Feed
              </TabsTrigger>
            </TabsList>

            <TabsContent value="appointments" className="space-y-6 outline-none">
              {MOCK_APPOINTMENTS.map((app) => (
                <div key={app.id} className="bg-white border border-slate-200 hover:border-indigo-400 transition-all duration-300 rounded-[2.5rem] overflow-hidden group shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 hover:-translate-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center p-8 gap-8">
                    <div className="w-20 h-20 bg-slate-50 text-indigo-600 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-inner group-hover:bg-indigo-50 transition-colors">
                      <Calendar className="w-10 h-10 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-black uppercase tracking-tight text-slate-800">{app.doctor}</h3>
                        <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                        <span className="text-indigo-600 text-xs font-black uppercase tracking-widest">Medical Agent</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-indigo-500" />
                          {app.date} // {app.time}
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-indigo-500" />
                          {app.type} Link
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <Badge className={cn(
                        "px-6 py-2 rounded-full font-black uppercase text-[10px] tracking-widest border-none shadow-sm",
                        app.status === 'confirmed' ? 'bg-emerald-500 text-white' : 'bg-amber-400 text-white'
                      )}>
                        {app.status}
                      </Badge>
                      <button className="w-12 h-12 bg-slate-50 hover:bg-indigo-600 hover:text-white rounded-2xl transition-all flex items-center justify-center border border-slate-100 group/btn shadow-sm">
                        <MessageSquare className="w-5 h-5 text-slate-400 group-hover/btn:text-white transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="history" className="text-center py-40 bg-white rounded-[3rem] border-2 border-dashed border-slate-100 flex flex-col items-center outline-none">
              <div className="w-20 h-20 bg-slate-50 rounded-[1.5rem] flex items-center justify-center mb-6">
                <Clock className="w-10 h-10 text-slate-200" />
              </div>
              <h4 className="text-2xl font-black uppercase text-slate-300 tracking-tight mb-2">Null Archive</h4>
              <p className="text-slate-400 font-medium max-w-xs uppercase text-[10px] tracking-widest">No historical data found in the current sector.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
