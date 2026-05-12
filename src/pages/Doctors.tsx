import { useState, useEffect } from "react";
import { Search, MapPin, Sparkles, Filter, Loader2, User } from "lucide-react";
import DoctorCard from "../components/DoctorCard";
import { Doctor } from "../types";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { suggestSpecialization } from "../lib/gemini";
import { motion, AnimatePresence } from "motion/react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

// Mock data as fallback
const MOCK_DOCTORS: Doctor[] = [
  {
    uid: "1",
    name: "Dr. Ahmed Raza",
    specialization: "Cardiologist",
    location: "Lahore",
    consultationType: "Both",
    experience: "12 years",
    rating: 4.9,
    available: true,
    bio: "Senior cardiologist at Mayo Hospital.",
    availableSlots: ["10:00 AM", "02:00 PM"],
    createdAt: new Date()
  },
  {
    uid: "2",
    name: "Dr. Sara Khan",
    specialization: "Dermatologist",
    location: "Karachi",
    consultationType: "Online",
    experience: "8 years",
    rating: 4.7,
    available: true,
    bio: "Skin specialist with focus on laser treatment.",
    availableSlots: ["09:00 AM", "11:00 AM"],
    createdAt: new Date()
  },
  {
    uid: "3",
    name: "Dr. Usman Malik",
    specialization: "Pediatrician",
    location: "Islamabad",
    consultationType: "Physical",
    experience: "15 years",
    rating: 5.0,
    available: false,
    bio: "Expert in child healthcare and nutrition.",
    availableSlots: [],
    createdAt: new Date()
  }
];

export default function Doctors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>(MOCK_DOCTORS);
  const [loading, setLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<{ specialization: string, reason: string } | null>(null);
  const [isSuggesting, setIsSuggesting] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      if (!db) return;
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "doctors"));
        const docsData = querySnapshot.docs.map(doc => ({ ...doc.data(), uid: doc.id }) as Doctor);
        if (docsData.length > 0) setDoctors(docsData);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    const filtered = MOCK_DOCTORS.filter(doc => 
      (doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       doc.specialization.toLowerCase().includes(searchTerm.toLowerCase())) &&
      doc.location.toLowerCase().includes(location.toLowerCase())
    );
    setDoctors(filtered);
    setLoading(false);

    if (searchTerm.length > 3) {
      setIsSuggesting(true);
      const suggestion = await suggestSpecialization(searchTerm);
      if (suggestion) setAiSuggestion(suggestion);
      setIsSuggesting(false);
    } else {
      setAiSuggestion(null);
    }
  };

  return (
    <div className="space-y-12 py-8 max-w-7xl mx-auto">
      {/* Dynamic Search Header */}
      <section className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Activity className="w-64 h-64" />
        </div>
        
        <div className="relative z-10 space-y-10">
          <div className="space-y-4 max-w-2xl">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-full">
              Protocol Search
            </span>
            <h1 className="text-5xl font-black tracking-tight leading-none uppercase">Medical Node Directory</h1>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              Query the global medical network for verified specialists using precision symptom filtering or AI-assisted node matching.
            </p>
          </div>

          <div className="bg-slate-800/50 p-2 rounded-[2.5rem] border border-slate-700/50 flex flex-col lg:flex-row gap-3 backdrop-blur-md">
            <div className="flex-1 flex items-center gap-4 px-6 py-5 bg-slate-800 rounded-3xl border border-slate-700 group focus-within:border-indigo-500 transition-colors">
              <Search className="text-slate-500 w-5 h-5 group-hover:text-indigo-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Symptoms or specialization..." 
                className="bg-transparent border-none focus:ring-0 w-full text-white placeholder:text-slate-600 font-bold text-sm uppercase tracking-wider"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            
            <div className="flex-1 flex items-center gap-4 px-6 py-5 bg-slate-800 rounded-3xl border border-slate-700 group focus-within:border-indigo-500 transition-colors">
              <MapPin className="text-slate-500 w-5 h-5 group-hover:text-indigo-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Regional Sector..." 
                className="bg-transparent border-none focus:ring-0 w-full text-white placeholder:text-slate-600 font-bold text-sm uppercase tracking-wider"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>

            <button 
              onClick={handleSearch}
              disabled={loading || isSuggesting}
              className="h-16 px-12 bg-indigo-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/30 active:scale-95 flex items-center justify-center gap-3"
            >
              {(loading || isSuggesting) && <Loader2 className="w-4 h-4 animate-spin" />}
              EXECUTE QUERY
            </button>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {aiSuggestion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-indigo-600 p-10 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl shadow-indigo-600/20"
          >
            <div className="absolute top-0 right-0 p-10 opacity-20">
              <Sparkles className="w-48 h-48" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest bg-white/10 w-fit px-4 py-2 rounded-full border border-white/20">
                  <Sparkles className="w-3 h-3 text-indigo-300" />
                  AI Neural Matching
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black uppercase tracking-tight">
                    Recommended: <span className="text-indigo-200">{aiSuggestion.specialization}</span>
                  </h3>
                  <p className="text-indigo-100/80 text-lg max-w-2xl font-medium italic underline underline-offset-8 decoration-indigo-400">
                    "{aiSuggestion.reason}"
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setSearchTerm(aiSuggestion.specialization);
                  handleSearch();
                  setAiSuggestion(null);
                }}
                className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-50 transition-all active:scale-95 shadow-xl shadow-white/10"
              >
                Scan {aiSuggestion.specialization}s
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between px-2">
           <div className="flex items-center gap-4">
              <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 leading-none">Valid Nodes</h2>
              <Badge className="bg-indigo-50 text-indigo-600 border-indigo-100 font-black tracking-widest uppercase text-[10px] px-3 py-1">
                {doctors.length} Records Found
              </Badge>
           </div>
           <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500 bg-white border border-slate-200 px-6 py-3 rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
              <Filter className="w-3 h-3 text-indigo-600" />
              Structural Filters
           </button>
        </div>

        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center gap-6 text-slate-400">
            <Activity className="w-16 h-16 animate-pulse text-indigo-600" />
            <p className="font-black uppercase text-xs tracking-[0.3em]">Synching Neural Data...</p>
          </div>
        ) : doctors.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {doctors.map(doc => (
              <DoctorCard key={doc.uid} doctor={doc} />
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-white rounded-[3rem] border-2 border-dashed border-slate-100 space-y-8 flex flex-col items-center">
            <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center">
              <User className="w-10 h-10 text-slate-200" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black uppercase text-slate-400">Zero Node Matches</h3>
              <p className="text-slate-400 max-w-xs mx-auto font-medium">Reset protocol filters to expand scanning area.</p>
            </div>
            <button 
              onClick={() => { setSearchTerm(""); setLocation(""); setDoctors(MOCK_DOCTORS); }}
              className="text-indigo-600 font-black uppercase text-xs tracking-widest hover:underline px-8 py-4 bg-indigo-50 rounded-2xl"
            >
              Reset Protocol
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
