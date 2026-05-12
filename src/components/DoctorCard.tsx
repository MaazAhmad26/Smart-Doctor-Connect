import { MapPin, Star, User, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Doctor } from "../types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "../lib/utils";

interface DoctorCardProps {
  doctor: Doctor;
  className?: string;
}

export default function DoctorCard({ doctor, className }: DoctorCardProps) {
  const doctorId = doctor.uid || doctor.id;
  
  return (
    <Link to={`/doctors/${doctorId}`} className={cn("group block", className)}>
      <Card className="rounded-[2.5rem] border-slate-200 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group-hover:-translate-y-2 bg-white duration-300">
        <CardHeader className="h-56 p-0 relative bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent group-hover:from-indigo-500/20 transition-colors" />
          
          {doctor.profilePicUrl ? (
            <img 
              src={doctor.profilePicUrl} 
              alt={doctor.name} 
              className="w-full h-full object-cover relative z-10 transition-transform group-hover:scale-105 duration-500"
              referrerPolicy="no-referrer"
            />
          ) : (
            <User className="w-20 h-20 text-slate-300 relative z-10 transition-transform group-hover:scale-110" />
          )}

          <div className="absolute top-6 left-6 z-20">
            <Badge className={cn(
              "backdrop-blur-md text-[10px] font-bold uppercase tracking-widest px-3 py-1 shadow-sm border",
              doctor.available 
                ? "bg-emerald-500/90 text-white border-emerald-400" 
                : "bg-slate-500/90 text-white border-slate-400"
            )}>
              {doctor.available ? "NODE ONLINE" : "NODE OFFLINE"}
            </Badge>
          </div>
          
          <div className="absolute top-6 right-6 z-20">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-amber-100">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="text-[11px] font-black text-amber-600 tracking-tight">{doctor.rating}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8 space-y-6">
          <div className="space-y-1.5">
            <p className="text-indigo-600 font-bold text-xs uppercase tracking-[0.2em]">{doctor.specialization}</p>
            <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight leading-tight">
              {doctor.name}
            </h3>
          </div>
          
          <div className="grid grid-cols-2 gap-6 pt-2">
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sector</p>
              <div className="flex items-center gap-2 text-slate-600 font-semibold text-xs transition-colors group-hover:text-indigo-600">
                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                {doctor.location}
              </div>
            </div>
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Integrity</p>
              <div className="flex items-center gap-2 text-slate-600 font-semibold text-xs">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                {doctor.experience} Exp
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-8 pb-8 pt-0">
          <div className="w-full h-14 bg-slate-900 rounded-2xl flex items-center justify-between px-6 group-hover:bg-indigo-600 transition-all duration-300 shadow-lg shadow-slate-900/10 group-hover:shadow-indigo-600/20">
            <span className="text-xs font-black text-white uppercase tracking-[0.15em]">Access Profile</span>
            <ChevronRight className="w-5 h-5 text-indigo-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
