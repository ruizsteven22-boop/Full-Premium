import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Tv, 
  Trophy, 
  Film, 
  Baby, 
  Heart, 
  Globe, 
  Lock, 
  CheckCircle2, 
  MessageCircle, 
  PlayCircle,
  PauseCircle,
  Clock,
  Zap,
  Star,
  ShieldCheck,
  CreditCard,
  Volume2,
  VolumeX,
  Send,
  AlertCircle,
  CheckCircle,
  Wallet,
  Bitcoin,
  Building2,
  Loader2,
  Bot,
  User,
  X,
  ChevronRight,
  FastForward,
  Camera,
  FileText,
  Smartphone,
  Upload,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Sun,
  Moon,
  Maximize,
  Minimize,
  Sparkles,
  Key,
  ShieldAlert,
  Info
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const WHATSAPP_NUMBER = "+56979429123";
const WHATSAPP_LINK = (msg: string) => `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(msg)}`;

// Fix: Use 'var' in declare global to extend window with aistudio, avoiding modifier conflict errors with interface merging
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
  var aistudio: AIStudio;
}

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-3 group cursor-pointer ${className}`}>
    <div className="relative">
      <div className="absolute -inset-1.5 bg-gradient-to-tr from-yellow-600 to-yellow-200 rounded-xl blur-md opacity-20 group-hover:opacity-60 transition duration-500"></div>
      <div className="relative flex items-center justify-center w-11 h-11 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/5 dark:from-white/5 to-transparent"></div>
        <Tv className="text-yellow-600 dark:text-yellow-400 w-6 h-6 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300 z-10" />
        <div className="absolute top-2 right-2 flex gap-0.5 z-20">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
        </div>
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
      </div>
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-[10px] font-black text-zinc-500 tracking-[0.25em] uppercase mb-0.5 group-hover:text-zinc-400 transition-colors">Full Premium</span>
      <div className="flex items-baseline">
        <span className="text-2xl font-black italic tracking-tighter text-zinc-900 dark:text-white">
          TV<span className="text-yellow-600 dark:text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)] group-hover:animate-pulse inline-block">GO</span>
        </span>
      </div>
    </div>
  </div>
);

const ThemeToggle = ({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) => (
  <button 
    onClick={onToggle}
    className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-yellow-400 hover:scale-110 transition-all border border-zinc-200 dark:border-white/10"
    title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
  >
    {isDark ? <Sun size={20} /> : <Moon size={20} />}
  </button>
);

const Navbar = ({ isDark, onToggleTheme }: { isDark: boolean; onToggleTheme: () => void }) => (
  <nav className="fixed w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-white/10 px-6 py-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <Logo />
      <div className="hidden md:flex gap-8 text-sm font-medium">
        <a href="#inicio" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition">Inicio</a>
        <a href="#contenido" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition">Contenido</a>
        <a href="#planes" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition">Planes</a>
        <a href="#faq" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition">FAQ</a>
        <a href="#validar" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition">Validar Pago</a>
        <a href="#contacto" className="hover:text-yellow-600 dark:hover:text-yellow-400 transition">Contacto</a>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        <a 
          href={WHATSAPP_LINK("Hola, me gustaría solicitar el demo de 3 horas gratis.")}
          className="bg-yellow-500 dark:bg-yellow-400 text-black px-5 py-2 rounded-full font-bold text-sm hover:bg-yellow-400 transition"
        >
          DEMO GRATIS
        </a>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section id="inicio" className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 dark:opacity-20"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0a0a0a] via-transparent to-white dark:to-[#0a0a0a]"></div>
    
    <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 px-4 py-1 rounded-full text-yellow-600 dark:text-yellow-400 text-sm font-bold">
          <Globe size={14} /> SERVICIO GLOBAL PARA TODO EL MUNDO
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-zinc-900 dark:text-white">
          La TV del futuro <br />
          <span className="gradient-text">en tus manos.</span>
        </h1>
        <p className="text-zinc-600 dark:text-gray-400 text-lg max-w-lg leading-relaxed">
          Accede a canales en vivo, deportes premium y estrenos VOD con la mejor estabilidad. <span className="text-zinc-900 dark:text-white font-semibold italic">Disponible en Chile y para ventas internacionales.</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <a 
            href="#planes" 
            className="bg-yellow-500 dark:bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold text-lg text-center hover:scale-105 transition shadow-lg shadow-yellow-500/20"
          >
            Ver Planes
          </a>
          <a 
            href="#experiencia"
            className="bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 px-8 py-4 rounded-xl font-bold text-lg text-center hover:bg-zinc-200 dark:hover:bg-white/10 transition flex items-center justify-center gap-2 text-zinc-900 dark:text-white"
          >
            <PlayCircle size={20} /> Ver Demo
          </a>
        </div>
        <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-gray-500">
          <div className="flex -space-x-2">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#0a0a0a] bg-zinc-200 dark:bg-gray-700 flex items-center justify-center text-[10px] font-bold">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <span>+5,000 clientes satisfechos en todo el mundo</span>
        </div>
      </div>
      
      <div className="hidden md:block relative">
        <div className="absolute -inset-4 bg-yellow-400/20 blur-3xl rounded-full animate-pulse"></div>
        <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 shadow-2xl">
           <img 
            src="https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80" 
            alt="Streaming Experience" 
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40 flex items-center justify-center group cursor-pointer" onClick={() => document.getElementById('experiencia')?.scrollIntoView()}>
             <PlayCircle className="w-20 h-20 text-yellow-500 dark:text-yellow-400 group-hover:scale-110 transition duration-300 drop-shadow-2xl" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const PromoVideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoSrc, setVideoSrc] = useState("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4");
  const [isGenerating, setIsGenerating] = useState(false);
  const [genStatus, setGenStatus] = useState("");
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [keyModalError, setKeyModalError] = useState<string | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      if (isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [videoSrc]);

  const loadingMessages = [
    "Capturando los mejores momentos deportivos...",
    "Sincronizando estrenos de cartelera...",
    "Buscando señales de canales latinos...",
    "Renderizando con Inteligencia Artificial Veo 3.1...",
    "Optimizando para Full HD...",
  ];

  const handleAiGeneration = async () => {
    if (!window.aistudio) {
        console.error("AI Studio environment not detected.");
        return;
    }

    try {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        setKeyModalError(null);
        setShowKeyModal(true);
        return;
      }

      setIsGenerating(true);
      let msgIndex = 0;
      const statusInterval = setInterval(() => {
        setGenStatus(loadingMessages[msgIndex]);
        msgIndex = (msgIndex + 1) % loadingMessages.length;
      }, 4500);

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: 'Epic 4K cinematic montage: fragments of high-budget movie premieres, exhilarating soccer goal celebrations with passionate fans, and dynamic TV studio host segments from popular Latin American networks. High saturation, professional lighting, modern editing.',
        config: {
          numberOfVideos: 1,
          resolution: '1080p',
          aspectRatio: '16:9'
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 8000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      if (operation.response?.generatedVideos?.[0]?.video?.uri) {
        const downloadLink = operation.response.generatedVideos[0].video.uri;
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        
        if (!response.ok) {
           const errText = await response.text();
           if (errText.includes("Requested entity was not found")) {
             throw new Error("Requested entity was not found.");
           }
           throw new Error("Failed to fetch video stream.");
        }
        
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setVideoSrc(url);
        setIsPlaying(true);
      } else {
        throw new Error("No video URI returned.");
      }

      clearInterval(statusInterval);
      setIsGenerating(false);
      setGenStatus("");

    } catch (error: any) {
      setIsGenerating(false);
      setGenStatus("");
      console.error("Video Generation Error:", error);
      
      const msg = error?.message || "";
      if (msg.includes("Requested entity was not found") || msg.includes("not found") || error?.status === 404) {
        setKeyModalError("La API Key seleccionada ha caducado o no se encuentra. Por favor, selecciona una nueva llave de un proyecto con facturación activa.");
        setShowKeyModal(true);
      } else if (msg.includes("Quota") || error?.status === 429) {
        alert("Se ha agotado la cuota de generación gratuita para tu cuenta. Por favor intenta más tarde.");
      } else if (msg.includes("API key not valid") || error?.status === 403) {
        setKeyModalError("La API Key actual no tiene los permisos necesarios para usar Veo 3.1. Asegúrate de tener una cuenta de pago.");
        setShowKeyModal(true);
      } else {
        alert("Ocurrió un error inesperado al conectar con la IA de Google. Por favor, inténtalo de nuevo.");
      }
    }
  };

  const handleOpenKeyPicker = async () => {
    setShowKeyModal(false);
    try {
      await window.aistudio.openSelectKey();
      handleAiGeneration();
    } catch (e) {
      console.error("Could not open key picker", e);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => setIsPlaying(false));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Fullscreen failed: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setCurrentTime(current);
      if (total > 0) {
        setProgress((current / total) * 100);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const seekTime = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = seekTime;
      setProgress(parseFloat(e.target.value));
    }
  };

  const cyclePlaybackSpeed = () => {
    const speeds = [1, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % speeds.length;
    const nextSpeed = speeds[nextIndex];
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
    setPlaybackSpeed(nextSpeed);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <section id="experiencia" className="py-24 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto px-6 text-center space-y-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 px-4 py-1.5 rounded-full text-yellow-600 dark:text-yellow-400 text-xs font-bold border border-yellow-400/20 mb-2">
            <Sparkles size={14} className="animate-pulse" /> NUEVA TECNOLOGÍA IA VEO 3.1
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">EXPERIMENTA NUESTRA <span className="text-yellow-600 dark:text-yellow-400 italic">CALIDAD</span></h2>
          <p className="text-zinc-500 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Comprueba la estabilidad de nuestra señal. Usa nuestra IA avanzada para generar un resumen personalizado de los mejores contenidos latinos y mundiales.
          </p>
        </div>

        <div ref={containerRef} className="relative group rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] border border-zinc-200 dark:border-white/10 aspect-video bg-black">
          {isGenerating && (
            <div className="absolute inset-0 z-50 bg-zinc-900/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-10 animate-in fade-in duration-500">
               <div className="relative">
                 <div className="w-32 h-32 border-[6px] border-yellow-500/20 rounded-full animate-[spin_3s_linear_infinite]"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                   <Zap className="text-yellow-400 animate-pulse" size={48} fill="currentColor" />
                 </div>
               </div>
               <div className="space-y-4 px-6 max-w-md w-full">
                 <h3 className="text-white font-black text-2xl uppercase tracking-widest text-center flex items-center justify-center gap-3">
                   GENERANDO PROMO IA
                 </h3>
                 <p className="text-zinc-400 italic text-center h-10 flex items-center justify-center font-medium leading-tight">
                   {genStatus || "Iniciando proceso de IA..."}
                 </p>
                 <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 animate-[progress_15s_ease-in-out_infinite]"></div>
                 </div>
                 <div className="flex items-center justify-center gap-2 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                   <Loader2 size={12} className="animate-spin" /> Procesando en Google Cloud
                 </div>
               </div>
            </div>
          )}

          <video 
            ref={videoRef}
            src={videoSrc}
            className="w-full h-full object-cover"
            playsInline
            muted={isMuted}
            loop
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            poster="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <button 
            onClick={handleAiGeneration}
            disabled={isGenerating}
            className="absolute top-6 right-6 z-40 bg-zinc-900/40 backdrop-blur-md border border-white/20 px-5 py-3 rounded-2xl text-white text-xs font-black flex items-center gap-3 hover:bg-yellow-500 hover:text-black hover:scale-105 active:scale-95 transition-all group/ai shadow-2xl"
          >
            <Sparkles size={18} className="group-hover/ai:animate-spin" /> 
            GENERAR RESUMEN IA
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-full group/progress">
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="0.1" 
                value={progress}
                onChange={handleSeek}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-yellow-400 hover:h-2.5 transition-all"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <button onClick={togglePlay} className="text-white hover:text-yellow-400 transition transform hover:scale-110 active:scale-95">
                  {isPlaying ? <PauseCircle size={44} /> : <PlayCircle size={44} />}
                </button>
                <div className="flex items-center gap-3 text-white/90 font-mono text-sm tracking-tighter bg-white/10 px-3 py-1 rounded-lg">
                  <span>{formatTime(currentTime)}</span>
                  <span className="text-white/30">/</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <button 
                  onClick={cyclePlaybackSpeed} 
                  className="flex items-center gap-2 text-white hover:text-yellow-400 transition bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md text-xs font-black uppercase tracking-widest"
                >
                  <FastForward size={16} /> {playbackSpeed}x
                </button>
                <button onClick={toggleMute} className="text-white hover:text-yellow-400 transition bg-white/10 p-3 rounded-xl backdrop-blur-md">
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
                <button onClick={toggleFullscreen} className="text-white hover:text-yellow-400 transition bg-white/10 p-3 rounded-xl backdrop-blur-md">
                  {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
                </button>
              </div>
            </div>
          </div>

          {!isPlaying && !isGenerating && (
            <button 
              onClick={togglePlay}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-yellow-500 dark:bg-yellow-400 rounded-full flex items-center justify-center text-black shadow-[0_0_50px_rgba(250,204,21,0.5)] hover:scale-110 transition duration-300 active:scale-95 z-10"
            >
              <PlayCircle size={60} className="ml-2" />
            </button>
          )}
        </div>

        {showKeyModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-[3rem] p-8 md:p-12 shadow-[0_0_100px_rgba(0,0,0,0.6)] border border-zinc-200 dark:border-white/10 space-y-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600"></div>
              
              <div className="flex justify-between items-start">
                <div className={`w-20 h-20 ${keyModalError ? 'bg-red-500/10' : 'bg-yellow-400/10'} rounded-[2.5rem] flex items-center justify-center ${keyModalError ? 'text-red-500' : 'text-yellow-600 dark:text-yellow-400'} ring-8 ${keyModalError ? 'ring-red-500/5' : 'ring-yellow-400/5'}`}>
                  {keyModalError ? <ShieldAlert size={40} /> : <Key size={40} />}
                </div>
                <button onClick={() => setShowKeyModal(false)} className="bg-zinc-100 dark:bg-white/5 p-3 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-white transition-all hover:rotate-90">
                  <X size={28} />
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white leading-none tracking-tight">
                  {keyModalError ? "Error de Validación" : "Acceso Premium IA"}
                </h3>
                <p className="text-zinc-500 dark:text-gray-400 text-lg leading-relaxed">
                  {keyModalError || "Para activar la tecnología de generación de video Veo 3.1, es indispensable seleccionar una API Key personal vinculada a un proyecto de Google Cloud con facturación activa."}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-5 items-start p-6 bg-zinc-50 dark:bg-white/5 rounded-[2rem] border border-zinc-200 dark:border-white/10 group cursor-help">
                   <div className="bg-yellow-500 rounded-2xl p-2.5 mt-0.5 shrink-0 shadow-lg shadow-yellow-500/20"><Info size={18} className="text-black" /></div>
                   <div className="text-sm">
                     <span className="font-bold text-zinc-900 dark:text-zinc-200 block mb-1 uppercase tracking-widest text-xs">Facturación Requerida</span>
                     <p className="text-zinc-500 dark:text-zinc-400 leading-snug">Debes tener habilitada la facturación en <a href="https://console.cloud.google.com/billing" target="_blank" className="text-yellow-600 dark:text-yellow-400 underline font-bold hover:text-yellow-500 transition-colors">Google Cloud</a> para modelos Veo.</p>
                   </div>
                </div>

                <div className="flex gap-5 items-start p-6 bg-zinc-50 dark:bg-white/5 rounded-[2rem] border border-zinc-200 dark:border-white/10">
                   <div className="bg-zinc-200 dark:bg-zinc-800 rounded-2xl p-2.5 mt-0.5 shrink-0"><CheckCircle size={18} className="text-zinc-500 dark:text-zinc-400" /></div>
                   <div className="text-sm">
                     <span className="font-bold text-zinc-900 dark:text-zinc-200 block mb-1 uppercase tracking-widest text-xs">Guía de Gemini API</span>
                     <p className="text-zinc-500 dark:text-zinc-400 leading-snug">Más información sobre límites y cobros en la <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-yellow-600 dark:text-yellow-400 underline font-bold hover:text-yellow-500 transition-colors">documentación oficial</a>.</p>
                   </div>
                </div>
              </div>

              <button 
                onClick={handleOpenKeyPicker}
                className="w-full bg-yellow-500 dark:bg-yellow-400 text-black py-6 rounded-[2rem] font-black text-xl hover:bg-yellow-400 hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-4 shadow-[0_20px_40px_-10px_rgba(234,179,8,0.4)]"
              >
                <Key size={28} /> SELECCIONAR API KEY PAGADA
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="premium-card p-6 rounded-3xl group">
             <div className="text-yellow-600 dark:text-yellow-400 font-black text-2xl group-hover:scale-110 transition-transform">4K HDR</div>
             <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Resolución Máxima</div>
          </div>
          <div className="premium-card p-6 rounded-3xl group">
             <div className="text-yellow-600 dark:text-yellow-400 font-black text-2xl group-hover:scale-110 transition-transform">0 Retraso</div>
             <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Señal Estable</div>
          </div>
          <div className="premium-card p-6 rounded-3xl group">
             <div className="text-yellow-600 dark:text-yellow-400 font-black text-2xl group-hover:scale-110 transition-transform">Global</div>
             <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Acceso Ilimitado</div>
          </div>
          <div className="premium-card p-6 rounded-3xl group">
             <div className="text-yellow-600 dark:text-yellow-400 font-black text-2xl group-hover:scale-110 transition-transform">+10k VOD</div>
             <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Cine en Casa</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, desc }: any) => (
  <div className="premium-card p-8 rounded-2xl space-y-4 group">
    <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center text-yellow-600 dark:text-yellow-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">{title}</h3>
    <p className="text-zinc-600 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

const ContentSection = () => (
  <section id="contenido" className="py-24 bg-white dark:bg-black">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl font-extrabold italic text-zinc-900 dark:text-white">TODO EN <span className="text-yellow-600 dark:text-yellow-400">UN SOLO LUGAR</span></h2>
        <p className="text-zinc-500 dark:text-gray-500 max-w-2xl mx-auto">Nuestro contenido se renueva semanalmente para ofrecerte lo último en entertainment mundial.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard icon={Trophy} title="Deportes Elite" desc="FIFA 2026, Copa Libertadores, Copa Sudamericana, Ligas Europeas y mucho más en Full HD." />
        <FeatureCard icon={Film} title="VOD Premium" desc="Miles de películas y series actualizadas cada semana. Estrenos de cine directamente en tu casa." />
        <FeatureCard icon={Baby} title="Kids & Family" desc="Los mejores canales infantiles para los más pequeños, con seguridad y diversión garantizada." />
        <FeatureCard icon={Heart} title="Novelas y Cultura" desc="Telenovelas latinoamericanas, turcas y canales culturales de todo el mundo." />
        <FeatureCard icon={Lock} title="Canales Adultos" desc="Sección exclusiva para adultos con protección por contraseña para tu tranquilidad." />
        <FeatureCard icon={Globe} title="Global & Latam TV" desc="Canales de todo el mundo y Latinoamérica. Vendemos a cualquier país con métodos de pago flexibles." />
      </div>
    </div>
  </section>
);

const PricingCard = ({ months, price, bestValue = false }: any) => (
  <div className={`relative h-full p-8 rounded-3xl border group transition-all duration-500 ${bestValue ? 'border-yellow-500 dark:border-yellow-400 bg-yellow-400/5 ring-4 ring-yellow-400/10' : 'border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-white/5'} flex flex-col items-center text-center space-y-6 premium-card`}>
    {bestValue && (
      <div className="absolute -top-4 bg-yellow-500 dark:bg-yellow-400 text-black px-4 py-1 rounded-full text-xs font-black uppercase z-10 group-hover:scale-110 transition-transform">
        Mejor Valor
      </div>
    )}
    <div className="space-y-2">
      <h3 className="text-xl font-bold text-zinc-500 dark:text-gray-400 uppercase tracking-widest group-hover:text-zinc-400 transition-colors">{months === 1 ? 'Mensual' : `${months} Meses`}</h3>
      <div className="text-4xl font-extrabold text-zinc-900 dark:text-white group-hover:animate-pulse">
        $<span className="group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">{price.toLocaleString('es-CL')}</span> 
        <span className="text-sm font-normal text-zinc-500 dark:text-gray-500 ml-1">CLP</span>
      </div>
    </div>
    <ul className="space-y-3 w-full text-sm text-zinc-600 dark:text-gray-300 text-left flex-1">
      <li className="flex items-center gap-2 group-hover:translate-x-1 transition-transform"><CheckCircle2 size={16} className="text-yellow-600 dark:text-yellow-400 shrink-0" /> +5,000 Canales En Vivo</li>
      <li className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300"><CheckCircle2 size={16} className="text-yellow-600 dark:text-yellow-400 shrink-0" /> Películas & Series (VOD)</li>
      <li className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-500"><CheckCircle2 size={16} className="text-yellow-600 dark:text-yellow-400 shrink-0" /> Deportes Premium (FIFA 2026)</li>
      <li className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-700"><CheckCircle2 size={16} className="text-yellow-600 dark:text-yellow-400 shrink-0" /> Multidispositivo</li>
      <li className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-1000"><CheckCircle2 size={16} className="text-yellow-600 dark:text-yellow-400 shrink-0" /> Soporte 24/7 Global</li>
    </ul>
    <a 
      href={WHATSAPP_LINK(`Hola, me interesa el plan de ${months === 1 ? '1 mes' : months + ' meses'} por $${price} CLP.`)}
      className={`w-full py-4 rounded-xl font-bold transition-all ${bestValue ? 'bg-yellow-500 dark:bg-yellow-400 text-black hover:bg-yellow-600 dark:hover:bg-yellow-300 shadow-xl shadow-yellow-500/20' : 'bg-zinc-200 dark:bg-white/10 hover:bg-zinc-300 dark:hover:bg-white/20 text-zinc-900 dark:text-white'}`}
    >
      CONTRATAR AHORA
    </a>
  </div>
);

const PricingSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const scrollLeft = carouselRef.current.scrollLeft;
    const width = carouselRef.current.offsetWidth;
    const index = Math.round(scrollLeft / width);
    setActiveIndex(index);
  };

  const scrollTo = (index: number) => {
    if (!carouselRef.current) return;
    const width = carouselRef.current.offsetWidth;
    carouselRef.current.scrollTo({
      left: width * index,
      behavior: 'smooth'
    });
  };

  return (
    <section id="planes" className="py-24 bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-extrabold text-zinc-900 dark:text-white uppercase tracking-tight">ELIGE TU <span className="text-yellow-600 dark:text-yellow-400 italic">PLAN</span></h2>
          <p className="text-zinc-500 dark:text-gray-500">Contratación inmediata desde cualquier país. Aceptamos pagos internacionales.</p>
        </div>

        {/* Carousel Container for mobile/tablet, Grid for Desktop */}
        <div className="relative group/carousel">
          <div 
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 -mx-6 px-6 lg:grid lg:grid-cols-4 lg:gap-8 lg:overflow-visible lg:snap-none lg:px-0 lg:mx-0 hide-scrollbar"
          >
            <div className="snap-center shrink-0 w-[290px] xs:w-[320px] sm:w-[380px] lg:w-auto h-full">
              <PricingCard months={1} price={8000} />
            </div>
            <div className="snap-center shrink-0 w-[290px] xs:w-[320px] sm:w-[380px] lg:w-auto h-full">
              <PricingCard months={3} price={22000} />
            </div>
            <div className="snap-center shrink-0 w-[290px] xs:w-[320px] sm:w-[380px] lg:w-auto h-full">
              <PricingCard months={6} price={45000} bestValue={true} />
            </div>
            <div className="snap-center shrink-0 w-[290px] xs:w-[320px] sm:w-[380px] lg:w-auto h-full">
              <PricingCard months={12} price={75000} />
            </div>
          </div>

          {/* Navigation Dots for Mobile */}
          <div className="flex justify-center gap-3 mt-4 lg:hidden">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-8 bg-yellow-500' : 'w-2.5 bg-zinc-300 dark:bg-zinc-700'}`}
                aria-label={`Ir al plan ${i + 1}`}
              />
            ))}
          </div>

          {/* Swipe Hint for Mobile */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest lg:hidden animate-bounce">
            <ChevronLeft size={10} /> Desliza para ver más <ChevronRight size={10} />
          </div>
        </div>

        <PaymentMethods />
        
        <div className="mt-16 bg-gradient-to-br from-yellow-500/10 via-transparent to-blue-500/10 p-8 md:p-12 rounded-[2.5rem] border border-zinc-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-yellow-400/10 blur-[80px] rounded-full group-hover:bg-yellow-400/20 transition-all duration-700"></div>
          <div className="flex items-center gap-6 group cursor-pointer z-10">
            <div className="w-16 h-16 bg-yellow-500 dark:bg-yellow-400 rounded-2xl flex items-center justify-center text-black group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xl shadow-yellow-500/20">
              <Clock size={32} />
            </div>
            <div>
              <h4 className="text-2xl font-black text-zinc-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors tracking-tight">¿Prefieres probar primero?</h4>
              <p className="text-zinc-600 dark:text-gray-400 font-medium">Pide tu DEMO de 03 horas totalmente GRATIS (Sin compromiso).</p>
            </div>
          </div>
          <a 
            href={WHATSAPP_LINK("Hola, quiero probar el demo de 3 horas gratis por favor.")}
            className="bg-zinc-900 dark:bg-white text-white dark:text-black px-10 py-5 rounded-2xl font-black text-lg hover:bg-zinc-800 dark:hover:bg-gray-100 transition-all whitespace-nowrap hover:scale-[1.05] active:scale-95 shadow-2xl z-10"
          >
            SOLICITAR DEMO AHORA
          </a>
        </div>
      </div>
    </section>
  );
};

const ChevronLeft = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6"/></svg>
);

const PaymentMethods = () => (
  <div className="mt-20 py-12 border-y border-zinc-200 dark:border-white/5">
    <div className="text-center mb-10">
      <h3 className="text-2xl font-bold italic mb-2 text-zinc-900 dark:text-white">MEDIOS DE <span className="text-yellow-600 dark:text-yellow-400">PAGO</span></h3>
      <p className="text-zinc-500 dark:text-gray-500 text-sm">Transacciones rápidas y 100% seguras</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
      <div className="bg-zinc-50 dark:bg-white/5 p-6 rounded-2xl border border-zinc-200 dark:border-white/10 space-y-6 group premium-card">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-yellow-400/20 rounded flex items-center justify-center text-yellow-600 dark:text-yellow-400 group-hover:scale-110 transition-transform">
            <Building2 size={20} />
          </div>
          <h4 className="font-bold text-lg uppercase tracking-wider text-zinc-900 dark:text-white">Chile (Nacional)</h4>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-gray-400 bg-white dark:bg-black/40 p-3 rounded-xl border border-zinc-200 dark:border-white/10 hover:border-yellow-400 transition-colors">
            <CreditCard className="text-yellow-600 dark:text-yellow-400" size={18} /> Webpay / Transbank
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-gray-400 bg-white dark:bg-black/40 p-3 rounded-xl border border-zinc-200 dark:border-white/10 hover:border-yellow-400 transition-colors">
            <Wallet className="text-yellow-600 dark:text-yellow-400" size={18} /> Transferencia Rut
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-gray-400 bg-white dark:bg-black/40 p-3 rounded-xl border border-zinc-200 dark:border-white/10 hover:border-yellow-400 transition-colors">Mach / Mercado Pago</div>
          <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-gray-400 bg-white dark:bg-black/40 p-3 rounded-xl border border-zinc-200 dark:border-white/10 hover:border-yellow-400 transition-colors">Sencillito / Klap</div>
        </div>
      </div>
      <div className="bg-zinc-50 dark:bg-white/5 p-6 rounded-2xl border border-zinc-200 dark:border-white/10 space-y-6 group premium-card">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-400/20 rounded flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
            <Globe size={20} />
          </div>
          <h4 className="font-bold text-lg uppercase tracking-wider text-zinc-900 dark:text-white">Internacional</h4>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-gray-400 bg-white dark:bg-black/40 p-3 rounded-xl border border-zinc-200 dark:border-white/10 hover:border-blue-400 transition-colors">
            <Bitcoin className="text-yellow-600 dark:text-yellow-400" size={18} /> Binance (USDT/BTC)
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-gray-400 bg-white dark:bg-black/40 p-3 rounded-xl border border-zinc-200 dark:border-white/10 hover:border-blue-400 transition-colors">
            <CreditCard className="text-yellow-600 dark:text-yellow-400" size={18} /> PayPal
          </div>
          <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-gray-400 bg-white dark:bg-black/40 p-3 rounded-xl border border-zinc-200 dark:border-white/10 hover:border-blue-400 transition-colors">Zelle / Western Union</div>
          <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-gray-400 bg-white dark:bg-black/40 p-3 rounded-xl border border-zinc-200 dark:border-white/10 hover:border-blue-400 transition-colors">Criptomonedas (P2P)</div>
        </div>
      </div>
    </div>
  </div>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    { q: "¿Cómo activo mi servicio después de pagar?", a: "Es muy sencillo. Una vez realizado el pago, dirígete a la sección 'Validar Pago' en esta web, completa el formulario y adjunta tu comprobante. Nuestro equipo verificará la información y te enviará las credenciales por WhatsApp en menos de 15 minutos." },
    { q: "¿Qué velocidad de internet se recomienda?", a: "Para una experiencia óptima sin cortes, recomendamos al menos 10 Mbps para contenido SD, 25 Mbps para HD y 50 Mbps o más para contenido en 4K UHD. Es preferible usar conexión por cable (Ethernet) en lugar de WiFi." },
    { q: "¿En qué dispositivos puedo ver los canales?", a: "Nuestra plataforma es compatible con casi todos los dispositivos: Smart TVs (Samsung, LG, Android TV), TV Boxes, Celulares y Tablets (Android/iOS), Computadoras (Windows/Mac) y consolas de videojuegos." },
    { q: "¿Cómo funcionan los pagos internacionales?", a: "Aceptamos pagos desde cualquier parte del mundo a través de Binance Pay (USDT), PayPal y Zelle. El proceso es igual de rápido que los pagos nacionales en Chile." },
    { q: "¿El contenido de películas y series realmente se renueva?", a: "¡Sí! Nuestra biblioteca VOD (Video on Demand) se actualiza semanalmente con los últimos estrenos de cine y las series más populares de las principales plataformas de streaming." },
    { q: "¿Qué incluye la prueba demo de 3 horas?", a: "La demo te da acceso total a todos nuestros canales en vivo, incluyendo deportes premium, canales infantiles y la biblioteca completa de películas y series, para que compruebes la estabilidad y calidad antes de contratar." }
  ];

  return (
    <section id="faq" className="py-24 bg-white dark:bg-zinc-950 border-y border-zinc-200 dark:border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block p-3 bg-yellow-400/10 rounded-2xl mb-4">
            <HelpCircle className="text-yellow-600 dark:text-yellow-400" size={32} />
          </div>
          <h2 className="text-4xl font-extrabold italic uppercase text-zinc-900 dark:text-white">Preguntas <span className="text-yellow-600 dark:text-yellow-400">Frecuentes</span></h2>
          <p className="text-zinc-500 dark:text-gray-500">Todo lo que necesitas saber sobre nuestro servicio premium.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className={`premium-card rounded-2xl overflow-hidden transition-all duration-300 group ${openIndex === idx ? 'border-yellow-500 dark:border-yellow-400/50 bg-yellow-400/5' : 'border-zinc-200 dark:border-white/5'}`}>
              <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="w-full flex items-center justify-between p-6 text-left">
                <span className={`font-bold text-lg transition-colors ${openIndex === idx ? 'text-yellow-600 dark:text-yellow-400' : 'text-zinc-900 dark:text-gray-300 group-hover:text-yellow-600 dark:group-hover:text-yellow-400'}`}>{faq.q}</span>
                {openIndex === idx ? <ChevronUp className="text-yellow-600 dark:text-yellow-400" /> : <ChevronDown className="text-zinc-400 dark:text-gray-500 group-hover:text-yellow-600 transition-colors" />}
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                  <p className="text-zinc-600 dark:text-gray-400 text-sm leading-relaxed border-t border-zinc-200 dark:border-white/5 pt-4">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PaymentValidationSection = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', plan: '1 Mes', reference: '', image: null as File | null });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.reference) {
      alert("Por favor completa los campos obligatorios.");
      return;
    }
    setStatus('loading');
    setTimeout(() => setStatus('success'), 2000);
  };

  const handleWhatsAppRedirect = () => {
    const message = `REPORTE DE PAGO:\nCliente: ${formData.name}\nWhatsApp: ${formData.phone}\nPlan: ${formData.plan}\nReferencia: ${formData.reference}\n(Adjunto comprobante en este chat)`;
    window.open(WHATSAPP_LINK(message), '_blank');
  };

  return (
    <section id="validar" className="py-24 bg-zinc-50 dark:bg-black relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-block p-3 bg-yellow-400/10 rounded-2xl mb-4 border border-yellow-400/20">
            <ShieldCheck className="text-yellow-600 dark:text-yellow-400" size={32} />
          </div>
          <h2 className="text-4xl font-extrabold italic text-zinc-900 dark:text-white">VALIDAR <span className="text-yellow-600 dark:text-yellow-400">PAGO</span></h2>
          <p className="text-zinc-500 dark:text-gray-500">¿Ya realizaste tu pago? Reporta aquí para activar tu servicio al instante.</p>
        </div>
        <div className="premium-card p-8 md:p-12 rounded-3xl relative overflow-hidden bg-white dark:bg-transparent group">
          {status === 'success' ? (
            <div className="text-center space-y-6 py-10 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/20">
                <CheckCircle size={40} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">¡Pago Reportado con Éxito!</h3>
              <p className="text-zinc-500 dark:text-gray-400 max-w-sm mx-auto">Tu información ha sido enviada a nuestro equipo de activaciones. Para mayor velocidad, confirma ahora por WhatsApp.</p>
              <button onClick={handleWhatsAppRedirect} className="bg-[#25d366] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#20bd5a] transition flex items-center justify-center gap-3 mx-auto shadow-lg hover:scale-105 active:scale-95"><MessageCircle size={24} /> Confirmar en WhatsApp</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="group/input">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 block group-focus-within/input:text-yellow-500 transition-colors">Nombre Completo</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within/input:text-yellow-500 transition-colors" size={18} />
                    <input required type="text" placeholder="Ej: Juan Pérez" className="w-full bg-zinc-100 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-xl px-12 py-3 text-zinc-900 dark:text-white focus:border-yellow-500 outline-none transition" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                </div>
                <div className="group/input">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 block group-focus-within/input:text-yellow-500 transition-colors">WhatsApp</label>
                  <div className="relative">
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within/input:text-yellow-500 transition-colors" size={18} />
                    <input required type="tel" placeholder="Ej: +569 1234 5678" className="w-full bg-zinc-100 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-xl px-12 py-3 text-zinc-900 dark:text-white focus:border-yellow-500 outline-none transition" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Plan</label>
                  <select className="w-full bg-zinc-100 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:border-yellow-500 outline-none transition appearance-none cursor-pointer" value={formData.plan} onChange={e => setFormData({...formData, plan: e.target.value})}>
                    <option value="1 Mes">1 Mes ($8.000 CLP)</option>
                    <option value="3 Meses">3 Meses ($22.000 CLP)</option>
                    <option value="6 Meses">6 Meses ($40.000 CLP)</option>
                    <option value="12 Meses">12 Meses ($75.000 CLP)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div className="group/input">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 block group-focus-within/input:text-yellow-500 transition-colors">ID / Referencia</label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within/input:text-yellow-500 transition-colors" size={18} />
                    <input required type="text" placeholder="N° Transacción / Rut" className="w-full bg-zinc-100 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-xl px-12 py-3 text-zinc-900 dark:text-white focus:border-yellow-500 outline-none transition" value={formData.reference} onChange={e => setFormData({...formData, reference: e.target.value})} />
                  </div>
                </div>
                <div className="relative group/upload">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 block group-focus-within/upload:text-yellow-500 transition-colors">Comprobante</label>
                  <div className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-all ${imagePreview ? 'border-yellow-500' : 'border-zinc-200 dark:border-white/10 hover:border-yellow-500/50 hover:bg-yellow-500/5'}`}>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                    {imagePreview ? (
                      <div className="relative w-full h-32 rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
                        <img src={imagePreview} className="w-full h-full object-cover opacity-60" alt="Preview" />
                        <div className="absolute inset-0 flex items-center justify-center"><CheckCircle className="text-yellow-600 dark:text-yellow-400 shadow-xl" size={32} /></div>
                      </div>
                    ) : (
                      <>
                        <Upload className="text-zinc-400 mb-2 group-hover/upload:text-yellow-500 group-hover/upload:scale-110 transition-all" size={24} />
                        <span className="text-xs text-zinc-400 text-center group-hover/upload:text-yellow-500 transition-colors">Toca para subir captura</span>
                      </>
                    )}
                  </div>
                </div>
                <button disabled={status === 'loading'} className="w-full bg-yellow-500 dark:bg-yellow-400 text-black py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 mt-4 hover:scale-[1.02] active:scale-95 shadow-lg shadow-yellow-500/20">
                  {status === 'loading' ? <Loader2 className="animate-spin" size={24} /> : <><Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> Enviar Comprobante</>}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const ChatBot = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: '¡Hola! Soy el asistente virtual de Full Premium TvGo. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMsg,
        config: { systemInstruction: "Eres un asistente virtual experto de Full Premium TvGo. Ofreces canales en vivo (Latam, Global), deportes (FIFA 2026, Libertadores, Sudamericana), VOD (Películas/Series que se renuevan semanalmente), contenido infantil, novelas y adultos. Planes: Mensual $8000 CLP, 3 meses $22000, 6 meses $40000 (mejor valor), Anual $75000. Ofrecemos DEMO gratis de 3 horas. Métodos de pago Chile: Webpay, Transbank, Transferencia, Cuenta Rut. Internacional: PayPal, Binance, Zelle, Western Union. Sé amable, breve y siempre motiva al usuario a contactar por WhatsApp al +56979429123." },
      });
      setMessages(prev => [...prev, { role: 'bot', text: response.text || "Contacta a soporte." }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: "Error. Escribe al +56979429123." }]);
    } finally { setIsTyping(false); }
  };

  return (
    <div className="bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl flex flex-col h-[400px] overflow-hidden group/chatbot">
      <div className="bg-yellow-500 dark:bg-yellow-400 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-black font-bold text-sm"><Bot size={18} className="group-hover/chatbot:scale-110 transition-transform" /> Asistente AI</div>
        <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></div>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-xs shadow-sm ${msg.role === 'user' ? 'bg-yellow-500 dark:bg-yellow-400 text-black font-medium rounded-tr-none' : 'bg-white dark:bg-white/10 text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/5 rounded-tl-none'}`}>{msg.text}</div>
          </div>
        ))}
        {isTyping && <div className="text-xs italic text-zinc-500 flex items-center gap-2 px-2"><Loader2 size={12} className="animate-spin" /> Escribiendo...</div>}
      </div>
      <form onSubmit={handleSend} className="p-3 border-t border-zinc-200 dark:border-white/10 flex gap-2 bg-white/50 dark:bg-black/20">
        <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Escribe..." className="flex-1 bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-lg px-3 py-2 text-xs text-zinc-900 dark:text-white outline-none focus:border-yellow-500 transition-colors" />
        <button type="submit" className="bg-yellow-500 dark:bg-yellow-400 text-black p-2 rounded-lg hover:scale-110 transition-transform"><Send size={16} /></button>
      </form>
    </div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => { setStatus('success'); setFormData({ email: '', message: '' }); setTimeout(() => setStatus('idle'), 3000); }, 1500);
  };
  return (
    <div className="space-y-4">
      <h4 className="font-bold text-zinc-900 dark:text-white mb-4">Envíanos un mensaje</h4>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="email" placeholder="Correo" required className="w-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm text-zinc-900 dark:text-white outline-none focus:border-yellow-500 transition-colors" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
        <textarea placeholder="Mensaje" required rows={3} className="w-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-lg px-4 py-2 text-sm text-zinc-900 dark:text-white outline-none resize-none focus:border-yellow-500 transition-colors" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
        <button className={`w-full py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 ${status === 'success' ? 'bg-green-500 text-white' : 'bg-yellow-500 dark:bg-yellow-400 text-black shadow-lg shadow-yellow-500/10'}`}>{status === 'loading' ? <Loader2 className="animate-spin" size={16} /> : status === 'success' ? <CheckCircle size={16}/> : 'Enviar'}</button>
      </form>
    </div>
  );
};

const Footer = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'chat'>('chat');
  return (
    <footer id="contacto" className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6"><Logo /><p className="text-zinc-500 dark:text-gray-500 text-sm">Líderes en servicios de streaming. Calidad garantizada para Chile y el mundo. Soporte real y actualización de contenido semanal.</p></div>
          <div className="space-y-4">
            <h4 className="font-bold text-zinc-900 dark:text-white">Contenido</h4>
            <ul className="text-zinc-500 dark:text-gray-500 text-sm space-y-2">
              <li className="hover:text-yellow-600 dark:hover:text-yellow-400 hover:translate-x-1 transition-all cursor-pointer">Canales Globales</li>
              <li className="hover:text-yellow-600 dark:hover:text-yellow-400 hover:translate-x-1 transition-all cursor-pointer">FIFA 2026 / Libertadores</li>
              <li className="hover:text-yellow-600 dark:hover:text-yellow-400 hover:translate-x-1 transition-all cursor-pointer">VOD Películas y Series</li>
              <li className="hover:text-yellow-600 dark:hover:text-yellow-400 hover:translate-x-1 transition-all cursor-pointer">Infantiles y Novelas</li>
              <li className="hover:text-yellow-600 dark:hover:text-yellow-400 hover:translate-x-1 transition-all cursor-pointer">Canales para Adultos</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-zinc-900 dark:text-white">Atención Inmediata</h4>
            <a href={WHATSAPP_LINK("Hola, quiero contratar el servicio.")} className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 font-bold hover:underline group"><MessageCircle size={20} className="group-hover:scale-110 transition-transform" /> +56 9 7942 9123</a>
            <div className="flex gap-3 pt-2">
               <div className="w-8 h-8 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded flex items-center justify-center hover:bg-yellow-400 dark:hover:bg-yellow-400 hover:text-black transition-colors"><Globe size={14} className="text-zinc-400 hover:text-inherit" /></div>
               <div className="w-8 h-8 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded flex items-center justify-center hover:bg-yellow-400 dark:hover:bg-yellow-400 hover:text-black transition-colors"><Bitcoin size={14} className="text-zinc-400 hover:text-inherit" /></div>
               <div className="w-8 h-8 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded flex items-center justify-center hover:bg-yellow-400 dark:hover:bg-yellow-400 hover:text-black transition-colors"><CreditCard size={14} className="text-zinc-400 hover:text-inherit" /></div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex border-b border-zinc-200 dark:border-white/10 mb-4">
              <button onClick={() => setActiveTab('chat')} className={`flex-1 py-2 text-xs font-bold transition-all ${activeTab === 'chat' ? 'text-yellow-600 dark:text-yellow-400 border-b-2 border-yellow-600 dark:border-yellow-400' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'}`}>Chat AI</button>
              <button onClick={() => setActiveTab('form')} className={`flex-1 py-2 text-xs font-bold transition-all ${activeTab === 'form' ? 'text-yellow-600 dark:text-yellow-400 border-b-2 border-yellow-600 dark:border-yellow-400' : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'}`}>Formulario</button>
            </div>
            <div className="animate-in fade-in duration-300">
              {activeTab === 'chat' ? <ChatBot /> : <ContactForm />}
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-zinc-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-400 dark:text-gray-600 text-xs">© 2024 Full Premium TvGo. Servicio disponible en todo el mundo.</p>
          <div className="flex gap-4 group">
            {[1,2,3,4,5].map(i => <Star key={i} className="text-yellow-400 w-4 h-4 fill-current group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" style={{transitionDelay: `${i * 100}ms`}} />)}
          </div>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = () => (
  <a href={WHATSAPP_LINK("Hola, vengo de la web y quiero contratar el servicio.")} className="fixed bottom-8 right-8 z-[100] bg-[#25d366] text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:-rotate-12 transition duration-300 group ring-4 ring-green-500/20">
    <div className="absolute -left-32 top-1/2 -translate-y-1/2 bg-black/80 text-white px-4 py-1 rounded-lg text-xs opacity-0 group-hover:opacity-100 transition whitespace-nowrap border border-white/10 pointer-events-none">¡Hablemos por WhatsApp!</div>
    <MessageCircle size={32} />
  </a>
);

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Navbar isDark={isDarkMode} onToggleTheme={toggleTheme} />
      <main className="animate-in fade-in duration-1000">
        <Hero />
        <PromoVideoSection />
        <ContentSection />
        <PricingSection />
        <FAQSection />
        <PaymentValidationSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);