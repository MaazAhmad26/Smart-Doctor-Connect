import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  User, MapPin, Star, Clock, Calendar, 
  MessageSquare, Send, Bot, Loader2, 
  CheckCircle2, AlertCircle, X
} from "lucide-react";
import { Doctor, Message } from "../types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "motion/react";
import { getAIChatResponse } from "../lib/gemini";
import { db, auth } from "../lib/firebase";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";

const MOCK_DOCTORS: Record<string, Doctor> = {
  "1": {
    uid: "1",
    name: "Dr. Ahmed Raza",
    specialization: "Cardiologist",
    location: "Lahore",
    consultationType: "Both",
    experience: "12 years",
    rating: 4.9,
    available: true,
    bio: "Senior cardiologist at Mayo Hospital with over 12 years of experience in interventional cardiology. Graduated from King Edward Medical University and completed residency at Aga Khan University.",
    availableSlots: ["10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"],
    createdAt: new Date()
  },
  "2": {
    uid: "2",
    name: "Dr. Sara Khan",
    specialization: "Dermatologist",
    location: "Karachi",
    consultationType: "Online",
    experience: "8 years",
    rating: 4.7,
    available: true,
    bio: "Skin specialist with focus on laser treatment and cosmetic dermatology. Dedicated to providing personalized skin care plans for all skin types.",
    availableSlots: ["09:00 AM", "11:00 AM", "01:00 PM"],
    createdAt: new Date()
  }
};

export default function DoctorProfile() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  
  // Chat state
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "ai-agent", text: "Hello! I am Dr. Ahmed's AI assistant. How can I help you today?", timestamp: new Date(), isAI: true }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const fetchDoc = async () => {
      if (id && MOCK_DOCTORS[id]) {
        setDoctor(MOCK_DOCTORS[id]);
      }
      setLoading(false);
    };
    fetchDoc();
  }, [id]);

  const handleBooking = async () => {
    if (!selectedDate || !selectedSlot) {
      toast.error("Please select both date and time slot");
      return;
    }
    
    setIsBooking(true);
    setTimeout(() => {
      toast.success("Appointment request sent!");
      setIsBooking(false);
      setSelectedSlot("");
    }, 1500);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !doctor) return;

    const userMessage: Message = {
      sender: "patient",
      text: inputMessage,
      timestamp: new Date(),
      isAI: false
    };

    setMessages([...messages, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const responseText = await getAIChatResponse(
        doctor.name,
        doctor.specialization,
        inputMessage,
        messages.map(m => ({ sender: m.sender, text: m.text }))
      );

      const aiMessage: Message = {
        sender: "ai-agent",
        text: responseText,
        timestamp: new Date(),
        isAI: true
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Activity className="w-12 h-12 text-indigo-600 animate-pulse" />
      </div>
    );
  }

  if (!doctor) return null;

  return (
    <div className="max-w-7xl mx-auto py-12 px-8 grid grid-cols-12 gap-8">
      {/* Principal Hub - 8 Cols */}
      <div className="col-span-12 lg:col-span-8 space-y-8">
        <div className="bg-white rounded-[3rem] border border-slate-200 p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Activity className="w-80 h-80 text-indigo-600" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start">
            <div className="w-56 h-56 bg-slate-50 rounded-[2.5rem] border-4 border-white shadow-2xl flex items-center justify-center shrink-0 overflow-hidden relative">
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent" />
               <User className="w-24 h-24 text-slate-300 relative z-10" />
            </div>
            
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                    Medical Specialist Entry
                  </span>
                  <Badge className="bg-emerald-500 text-white border-none font-black text-[10px] tracking-widest px-4 py-1">OPERATIONAL</Badge>
                </div>
                <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-none uppercase">
                  {doctor.name}
                </h1>
                <p className="text-slate-500 text-xl leading-relaxed font-medium">
                  Expert {doctor.specialization} based in {doctor.location}. Validated medical credentials and high patient trust metrics.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 group hover:border-indigo-200 transition-colors">
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">Authority Level</p>
                  <p className="text-2xl font-black text-slate-900">{doctor.experience}</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 group hover:border-indigo-200 transition-colors">
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">Compliance Rating</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-black text-indigo-600">{doctor.rating}</p>
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 group hover:border-indigo-200 transition-colors">
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">Status Code</p>
                  <p className="text-2xl font-black text-emerald-500">A1-READY</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] border border-slate-200 p-12 shadow-sm space-y-10">
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
              <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
              Professional Architecture
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              {doctor.bio}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <h4 className="text-xs font-black uppercase text-indigo-600 tracking-[0.3em]">Core Competencies</h4>
              <div className="space-y-4">
                {[
                  "Advanced Diagnostic Analysis",
                  "Real-time Patient Monitoring",
                  "Precision Surgical Interventions",
                  "Pharmaceutical Optimization"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 border-l-2 border-slate-100 pl-6 py-1 hover:border-indigo-500 transition-colors group">
                    <span className="text-sm font-bold text-slate-500 group-hover:text-slate-900">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-6 opacity-10">
                 <Activity className="w-24 h-24" />
               </div>
               <h4 className="text-xs font-bold uppercase text-indigo-400 tracking-widest mb-6">Service Health</h4>
               <div className="space-y-6">
                 {[
                   { label: "Patient Satisfaction", val: "98%" },
                   { label: "Recovery Velocity", val: "92%" }
                 ].map((stat, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between items-end">
                         <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em]">{stat.label}</span>
                         <span className="text-indigo-400 font-mono font-bold">{stat.val}</span>
                       </div>
                       <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                         <div className="h-full bg-indigo-500 w-full" style={{ width: stat.val }}></div>
                       </div>
                    </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Interface - 4 Cols */}
      <div className="col-span-12 lg:col-span-4 space-y-8">
        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl shadow-indigo-900/5 sticky top-24 space-y-10">
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Access Portal</h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Reserve Medical Instance</p>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center justify-between">
                Temporal Index 
                <span className="text-indigo-600">(Date)</span>
              </label>
              <input 
                type="date" 
                className="w-full h-14 bg-slate-50 border-none rounded-2xl px-6 font-bold text-slate-800 focus:ring-2 focus:ring-indigo-600 transition-all cursor-pointer"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Available Slots</label>
              <div className="grid grid-cols-1 gap-3">
                {doctor.availableSlots.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={cn(
                      "h-14 rounded-2xl border-2 font-black uppercase text-xs tracking-widest transition-all",
                      selectedSlot === slot 
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                        : "border-slate-100 bg-slate-50 text-slate-400 hover:border-indigo-400"
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleBooking}
              disabled={isBooking || !doctor.available}
              className="w-full h-16 rounded-2xl bg-indigo-600 text-white font-black uppercase text-sm tracking-[0.15em] shadow-xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all active:scale-[0.98] flex items-center justify-center gap-4 group disabled:opacity-50"
            >
              {isBooking ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  Execute Booking
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden flex flex-col h-[500px]">
           <div className="absolute top-0 right-0 p-6 opacity-10">
              <MessageSquare className="w-32 h-32" />
           </div>
           
           <div className="relative z-10 flex flex-col h-full uppercase">
             <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                   <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                     <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                     Node Assistant
                   </h3>
                   <p className="text-slate-500 text-[10px] font-bold tracking-[0.2em]">AI Support Interface</p>
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center">
                   <Bot className="w-5 h-5 text-indigo-400" />
                </div>
             </div>

             <ScrollArea className="flex-1 pr-4 mb-6">
               <div className="space-y-6">
                 {messages.map((m, i) => (
                   <div key={i} className={cn("flex flex-col gap-2", m.sender === 'patient' ? 'items-end' : 'items-start')}>
                      <div className={cn(
                        "p-4 rounded-2xl text-[11px] font-bold tracking-wide leading-relaxed",
                        m.sender === 'patient' 
                          ? "bg-indigo-600 text-white rounded-tr-none" 
                          : "bg-slate-800 text-slate-300 rounded-tl-none border border-slate-700"
                      )}>
                        {m.text}
                      </div>
                      <span className="text-[9px] font-black text-slate-600 tracking-widest">{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                   </div>
                 ))}
                 {isTyping && (
                    <div className="p-3 bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-none w-fit flex gap-1">
                       <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce" />
                       <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                       <div className="w-1 h-1 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                 )}
               </div>
             </ScrollArea>

             <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Describe symptons..." 
                  className="flex-1 h-12 bg-slate-800 border-none rounded-xl px-4 text-[11px] font-bold text-white placeholder:text-slate-600 focus:ring-1 focus:ring-indigo-600 uppercase"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
