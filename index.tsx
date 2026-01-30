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
  Info,
  Banknote,
  SmartphoneNfc,
  Coins,
  ChevronLeft,
  Settings,
  CreditCard as CardIcon,
  QrCode,
  ArrowRight,
  ShieldEllipsis
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const WHATSAPP_NUMBER = "+56979429123";
const WHATSAPP_LINK = (msg: string) => `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(msg)}`;

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
  var aistudio: AIStudio;
}

// --- Components ---

const Logo = ({ className = "" }: { className?: string }) => (
  <div 
    className={`flex items-center gap-3 group cursor-pointer select-none transition-all duration-300 active:scale-95 ${className}`}
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  >
    <div className="relative">
      {/* Efecto de resplandor dinámico */}
      <div className="absolute -inset-1.5 bg-gradient-to-tr from-yellow-600 via-yellow-400 to-yellow-200 rounded-xl blur-md opacity-0 group-hover:opacity-60 transition-all duration-500"></div>
      
      {/* Contenedor del icono */}
      <div className="relative flex items-center justify-center w-11 h-11 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden group-hover:border-yellow-500/50 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] dark:from-white/[0.02] to-transparent"></div>
        <Tv className="text-yellow-600 dark:text-yellow-400 w-6 h-6 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300 z-10" />
      </div>
    </div>
    
    <div className="flex flex-col leading-none">
      <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 tracking-[0.25em] uppercase mb-1 transition-colors duration-300 group-hover:text-yellow-600 dark:group-hover:text-yellow-400">
        Full Premium
      </span>
      <div className="flex items-baseline">
        <span className="text-2xl font-black italic tracking-tighter text-zinc-900 dark:text-white transition-all duration-300 group-hover:tracking-normal">
          TV<span className="text-yellow-600 dark:text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)] group-hover:drop-shadow-[0_0_12px_rgba(250,204,21,0.6)]">GO</span>
        </span>
      </div>
    </div>
  </div>
);

// --- Payment Modal Component ---

const CheckoutModal = ({ isOpen, onClose, plan }: { isOpen: boolean; onClose: () => void; plan: any }) => {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState<'card' | 'crypto' | 'paypal' | 'transfer' | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      setSuccess(true);
    }, 2500);
  };

  const steps = [
    { id: 1, name: 'Método' },
    { id: 2, name: 'Pago' },
    { id: 3, name: 'Listo' }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl border border-zinc-200 dark:border-white/10 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-100 dark:border-white/5 flex justify-between items-center bg-zinc-50 dark:bg-zinc-800/50">
          <div>
            <h3 className="font-black text-xl text-zinc-900 dark:text-white uppercase tracking-tighter">Checkout Seguro</h3>
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">{plan.months === 1 ? 'Plan Mensual' : `Plan ${plan.months} Meses`}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors text-zinc-400">
            <X size={24} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex px-8 py-4 bg-zinc-50 dark:bg-zinc-800/30 gap-4">
          {steps.map((s) => (
            <div key={s.id} className="flex-1 flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${step >= s.id ? 'bg-yellow-500 text-black' : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-400'}`}>
                {s.id}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= s.id ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'}`}>{s.name}</span>
              {s.id < 3 && <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700"></div>}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <h4 className="font-bold text-zinc-900 dark:text-white">Selecciona tu medio de pago:</h4>
              <div className="grid grid-cols-1 gap-3">
                <button onClick={() => { setMethod('card'); setStep(2); }} className="flex items-center justify-between p-4 rounded-2xl border border-zinc-200 dark:border-white/10 hover:border-yellow-500 hover:bg-yellow-500/5 transition-all group text-left">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform"><CardIcon size={20} /></div>
                    <div>
                      <span className="block font-bold text-sm text-zinc-900 dark:text-white">Webpay / Tarjetas</span>
                      <span className="text-[10px] text-zinc-500">Débito, Crédito, Prepago</span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-zinc-300 group-hover:text-yellow-500" />
                </button>
                <button onClick={() => { setMethod('paypal'); setStep(2); }} className="flex items-center justify-between p-4 rounded-2xl border border-zinc-200 dark:border-white/10 hover:border-blue-500 hover:bg-blue-500/5 transition-all group text-left">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-700 group-hover:scale-110 transition-transform"><Globe size={20} /></div>
                    <div>
                      <span className="block font-bold text-sm text-zinc-900 dark:text-white">PayPal</span>
                      <span className="text-[10px] text-zinc-500">Saldo o Tarjeta Internacional</span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-zinc-300 group-hover:text-blue-500" />
                </button>
                <button onClick={() => { setMethod('crypto'); setStep(2); }} className="flex items-center justify-between p-4 rounded-2xl border border-zinc-200 dark:border-white/10 hover:border-orange-500 hover:bg-orange-500/5 transition-all group text-left">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform"><Bitcoin size={20} /></div>
                    <div>
                      <span className="block font-bold text-sm text-zinc-900 dark:text-white">Binance Pay / USDT</span>
                      <span className="text-[10px] text-zinc-500">Criptomonedas (Sin comisión)</span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-zinc-300 group-hover:text-orange-500" />
                </button>
                <button onClick={() => { setMethod('transfer'); setStep(2); }} className="flex items-center justify-between p-4 rounded-2xl border border-zinc-200 dark:border-white/10 hover:border-zinc-400 hover:bg-zinc-400/5 transition-all group text-left">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-zinc-500/10 rounded-xl flex items-center justify-center text-zinc-600 group-hover:scale-110 transition-transform"><Banknote size={20} /></div>
                    <div>
                      <span className="block font-bold text-sm text-zinc-900 dark:text-white">Transferencia Directa</span>
                      <span className="text-[10px] text-zinc-500">Cuentas RUT / Bancarias</span>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-zinc-300 group-hover:text-zinc-500" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && !loading && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <button onClick={() => setStep(1)} className="text-xs font-bold text-yellow-600 flex items-center gap-1 hover:underline">
                <ChevronLeft size={14} /> Volver a métodos
              </button>
              
              <div className="bg-zinc-100 dark:bg-white/5 p-6 rounded-2xl border border-zinc-200 dark:border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-black uppercase text-zinc-400 tracking-widest">Resumen</span>
                  <span className="bg-yellow-500/10 text-yellow-600 text-[10px] font-black px-2 py-0.5 rounded-full">PLAN SEGURO</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <h5 className="font-bold text-zinc-900 dark:text-white">Acceso Full Premium ({plan.months} meses)</h5>
                  <span className="text-xl font-black text-zinc-900 dark:text-white">${plan.price.toLocaleString('es-CL')}</span>
                </div>
              </div>

              {method === 'card' && (
                <div className="space-y-4">
                  <div className="relative">
                    <CardIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <input type="text" placeholder="Número de Tarjeta" className="w-full bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-xl px-12 py-4 text-sm outline-none focus:border-yellow-500 transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="MM/YY" className="bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-4 text-sm outline-none focus:border-yellow-500 transition-colors" />
                    <input type="text" placeholder="CVC" className="bg-zinc-50 dark:bg-black/40 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-4 text-sm outline-none focus:border-yellow-500 transition-colors" />
                  </div>
                  <button onClick={handlePayment} className="w-full bg-yellow-500 text-black py-4 rounded-xl font-black text-lg hover:scale-[1.02] transition shadow-lg shadow-yellow-500/20">PAGAR AHORA</button>
                </div>
              )}

              {method === 'crypto' && (
                <div className="space-y-6 text-center">
                  <div className="bg-white p-4 rounded-2xl border border-zinc-200 inline-block mx-auto">
                    <QrCode size={160} className="text-black" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Dirección USDT (BEP20)</p>
                    <div className="flex items-center gap-2 bg-zinc-100 dark:bg-black/40 p-3 rounded-xl border border-zinc-200 dark:border-white/10">
                      <code className="text-[10px] flex-1 text-zinc-600 dark:text-zinc-300 break-all">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</code>
                      <button onClick={() => alert("Copiado!")} className="text-yellow-600"><Settings size={14} /></button>
                    </div>
                  </div>
                  <button onClick={handlePayment} className="w-full bg-orange-500 text-white py-4 rounded-xl font-black text-lg hover:scale-[1.02] transition">YA HE ENVIADO EL PAGO</button>
                </div>
              )}

              {method === 'paypal' && (
                <div className="space-y-6 text-center py-4">
                  <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center text-blue-600 mx-auto">
                    <Globe size={40} />
                  </div>
                  <p className="text-sm text-zinc-500">Serás redirigido de forma segura a la plataforma oficial de PayPal para completar tu transacción internacional.</p>
                  <button onClick={handlePayment} className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-lg hover:scale-[1.02] transition">PAGAR CON PAYPAL</button>
                </div>
              )}

              {method === 'transfer' && (
                <div className="space-y-4">
                  <div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-xl space-y-2">
                    <p className="text-xs font-black text-blue-600 uppercase tracking-widest">Datos de Transferencia:</p>
                    <div className="text-sm space-y-1">
                      <p className="text-zinc-600 dark:text-zinc-300"><strong>Banco:</strong> Banco Estado (Cuenta Rut)</p>
                      <p className="text-zinc-600 dark:text-zinc-300"><strong>Titular:</strong> Steven Ruiz</p>
                      <p className="text-zinc-600 dark:text-zinc-300"><strong>RUT:</strong> 25.613.997-9</p>
                      <p className="text-zinc-600 dark:text-zinc-300"><strong>Email:</strong> pagos@fullpremiumtvgo.cl</p>
                    </div>
                  </div>
                  <button onClick={() => { setStep(3); setSuccess(true); }} className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black py-4 rounded-xl font-black text-lg hover:scale-[1.02] transition">REPORTAR TRANSFERENCIA</button>
                </div>
              )}
            </div>
          )}

          {loading && (
            <div className="py-16 flex flex-col items-center justify-center space-y-6 animate-in fade-in duration-500">
              <div className="relative">
                <Loader2 className="w-16 h-16 text-yellow-500 animate-spin" />
                <ShieldCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-500" size={24} />
              </div>
              <div className="text-center space-y-2">
                <h4 className="font-black text-zinc-900 dark:text-white uppercase tracking-tighter">Procesando Pago...</h4>
                <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Encriptación SSL de 256 bits activa</p>
              </div>
            </div>
          )}

          {step === 3 && success && (
            <div className="py-8 flex flex-col items-center justify-center space-y-8 animate-in zoom-in duration-500">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-xl shadow-green-500/20 text-white animate-bounce">
                <CheckCircle size={50} />
              </div>
              <div className="text-center space-y-3">
                <h3 className="text-3xl font-black text-zinc-900 dark:text-white italic tracking-tighter">¡PAGO EXITOSO!</h3>
                <p className="text-zinc-500 dark:text-gray-400 text-sm max-w-xs">Tu transacción ha sido verificada. Aquí tienes tu código de activación temporal:</p>
                <div className="bg-zinc-100 dark:bg-white/5 border border-dashed border-zinc-300 dark:border-white/20 p-4 rounded-xl">
                  <code className="text-xl font-black text-yellow-600 tracking-[0.2em]">TVGO-{Math.random().toString(36).substr(2, 6).toUpperCase()}</code>
                </div>
              </div>
              <div className="w-full space-y-3">
                <a href={WHATSAPP_LINK(`¡Hola! He completado mi pago por el plan de ${plan.months} meses. Mi código es TVGO-XXXXXX.`)} className="w-full bg-[#25d366] text-white py-4 rounded-xl font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.02] transition shadow-lg shadow-green-500/20">
                  <MessageCircle size={24} /> ACTIVAR POR WHATSAPP
                </a>
                <p className="text-[10px] text-zinc-400 text-center font-bold uppercase tracking-widest">También recibirás los datos en tu correo en unos minutos.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        {step < 3 && (
          <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 flex items-center justify-center gap-4 border-t border-zinc-100 dark:border-white/5">
            <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              <ShieldCheck size={14} /> Pago Protegido
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              <Zap size={14} /> Activación Inmediata
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main Components ---

const Hero = () => (
  <section id="inicio" className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden scroll-mt-24">
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
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4">
          <a 
            href="#planes" 
            className="bg-yellow-500 dark:bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold text-lg text-center hover:scale-105 transition shadow-lg shadow-yellow-500/20 min-w-[160px]"
          >
            Ver Planes
          </a>
          <a 
            href={WHATSAPP_LINK("Hola, quiero una demo gratis")}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-zinc-100 dark:bg-white/5 border border-green-500/50 text-zinc-900 dark:text-white px-8 py-4 rounded-xl font-bold text-lg text-center hover:bg-green-500/10 transition flex items-center justify-center gap-2 min-w-[160px]"
          >
            <Zap size={20} className="text-green-500" /> Demo Gratis
          </a>
          <a 
            href="#experiencia"
            className="bg-zinc-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl font-bold text-lg text-center hover:scale-105 transition flex items-center justify-center gap-2 min-w-[160px]"
          >
            <PlayCircle size={20} /> Ver Demo
          </a>
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Iniciando renderizado con Veo 3.1...");

  const LOADING_MESSAGES = [
    "Iniciando renderizado con Veo 3.1...",
    "Analizando prompt cinematográfico...",
    "Generando fotogramas en alta resolución...",
    "Optimizando fluidez de movimiento...",
    "Aplicando corrección de color HDR...",
    "Finalizando montaje de video..."
  ];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleAiGeneration = async (skipCheck = false) => {
    if (!window.aistudio) return;
    try {
      if (!skipCheck) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey) { setShowKeyModal(true); return; }
      }
      
      setIsGenerating(true);
      setGenProgress(5);
      setLoadingMessage(LOADING_MESSAGES[0]);
      
      // Create new GoogleGenAI instance right before API call
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: 'Epic cinematic 4K montage: fragments of high-budget movie premieres, exhilarating soccer goal celebrations, and dynamic TV segments.',
        config: { numberOfVideos: 1, resolution: '1080p', aspectRatio: '16:9' }
      });

      let currentSec = 0;
      const progressInt = setInterval(() => {
        currentSec += 1;
        const newProgress = Math.min(95, Math.floor((currentSec / 45) * 100));
        setGenProgress(newProgress);
        
        // Update reassuring messages
        const msgIndex = Math.min(LOADING_MESSAGES.length - 1, Math.floor(currentSec / 8));
        setLoadingMessage(LOADING_MESSAGES[msgIndex]);
      }, 1000);

      while (!operation.done) {
        await new Promise(r => setTimeout(r, 8000));
        operation = await ai.operations.getVideosOperation({ operation });
      }

      clearInterval(progressInt);
      setGenProgress(100);
      
      if (operation.response?.generatedVideos?.[0]?.video?.uri) {
        const downloadLink = operation.response.generatedVideos[0].video.uri;
        const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        if (videoRef.current) {
          videoRef.current.src = url;
          videoRef.current.play();
          setIsPlaying(true);
        }
      }

      setTimeout(() => {
        setIsGenerating(false);
        setGenProgress(0);
      }, 1000);

    } catch (e: any) {
      setIsGenerating(false);
      setGenProgress(0);
      const isKeyError = e.status === 404 || e.status === 403 || (e.message && e.message.includes("Requested entity was not found"));
      if (isKeyError) setShowKeyModal(true);
    }
  };

  const handleKeySelection = async () => {
    await window.aistudio.openSelectKey();
    setShowKeyModal(false);
    // Mitigate race condition: proceed immediately after triggering select key
    handleAiGeneration(true);
  };

  return (
    <section id="experiencia" className="py-24 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6 text-center space-y-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 px-4 py-1.5 rounded-full text-yellow-600 dark:text-yellow-400 text-xs font-bold border border-yellow-400/20 mb-2">
            <Sparkles size={14} className="animate-pulse" /> IA VEO 3.1 ACTIVADA
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">CALIDAD <span className="text-yellow-600 dark:text-yellow-400 italic">PREMIUM</span></h2>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto font-medium">Genera una promo exclusiva de nuestra señal usando el modelo Veo 3.1 de Google. Tiempo estimado de renderizado: 45 segundos.</p>
        </div>

        <div ref={containerRef} className="relative group rounded-[2.5rem] overflow-hidden shadow-2xl border border-zinc-200 dark:border-white/10 aspect-video bg-black">
          {isGenerating && (
            <div className="absolute inset-0 z-50 bg-zinc-900/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-10 p-12">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="64" cy="64" r="60" className="stroke-white/10 fill-none" strokeWidth="6" />
                  <circle cx="64" cy="64" r="60" className="stroke-yellow-500 fill-none transition-all duration-1000 ease-linear" strokeWidth="6" strokeDasharray={`${Math.PI * 120}`} strokeDashoffset={`${Math.PI * 120 * (1 - genProgress / 100)}`} strokeLinecap="round" />
                </svg>
                <div className="text-center">
                  <span className="text-3xl font-black text-white">{genProgress}%</span>
                </div>
              </div>
              <div className="space-y-3 w-full max-w-xs text-center">
                <p className="text-white font-black uppercase tracking-[0.2em] text-sm animate-pulse">{loadingMessage}</p>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                  <Clock size={12} /> Tiempo restante estimado: {Math.max(0, 40 - Math.floor(genProgress * 0.4))}s
                </p>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden mt-4">
                  <div className="h-full bg-yellow-500 transition-all duration-500" style={{ width: `${genProgress}%` }}></div>
                </div>
              </div>
            </div>
          )}
          <video 
            ref={videoRef}
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            className="w-full h-full object-cover"
            playsInline
            muted={isMuted}
            loop
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          
          {/* Controles del Video */}
          <div className="absolute bottom-6 left-6 right-6 z-40 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <div className="flex gap-4">
               <button 
                onClick={togglePlay} 
                className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-yellow-500 hover:text-black transition"
               >
                {isPlaying ? <PauseCircle size={24} /> : <PlayCircle size={24} />}
               </button>
               <button 
                onClick={() => setIsMuted(!isMuted)} 
                className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-yellow-500 hover:text-black transition"
               >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
               </button>
             </div>
             <button 
                onClick={() => handleAiGeneration(false)}
                disabled={isGenerating}
                className={`bg-zinc-900/60 backdrop-blur-md border border-white/20 px-5 py-3 rounded-2xl text-white text-xs font-black flex items-center gap-3 hover:bg-yellow-500 hover:text-black transition-all ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Sparkles size={18} /> {isGenerating ? 'PROCESANDO...' : 'GENERAR PROMO IA'}
              </button>
          </div>

          {!isGenerating && !isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 bg-yellow-500/80 backdrop-blur-sm rounded-full flex items-center justify-center text-black shadow-2xl animate-pulse cursor-pointer pointer-events-auto" onClick={togglePlay}>
                <PlayCircle size={60} />
              </div>
            </div>
          )}
        </div>
      </div>

      {showKeyModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-[3rem] p-12 border border-white/10 text-center space-y-8">
            <Key size={48} className="text-yellow-500 mx-auto" />
            <h3 className="text-3xl font-black text-white">Configuración IA</h3>
            <p className="text-zinc-400">
              Para usar Veo 3.1, selecciona una API Key con facturación activa en Google AI Studio. 
              Consulta la <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-yellow-500 hover:underline">documentación de facturación</a> para más detalles.
            </p>
            <button onClick={handleKeySelection} className="w-full bg-yellow-500 text-black py-5 rounded-2xl font-black text-xl hover:scale-105 transition shadow-xl">SELECCIONAR API KEY</button>
            <button onClick={() => setShowKeyModal(false)} className="text-zinc-500 font-bold hover:underline">Omitir por ahora</button>
          </div>
        </div>
      )}
    </section>
  );
};

const ContentSection = () => (
  <section id="contenido" className="py-24 bg-white dark:bg-black scroll-mt-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl font-extrabold italic text-zinc-900 dark:text-white uppercase tracking-tighter">EL MEJOR <span className="text-yellow-600 dark:text-yellow-400">CONTENIDO</span></h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Trophy, title: "Deportes Elite", desc: "FIFA 2026, Libertadores y Ligas Europeas." },
          { icon: Film, title: "VOD Premium", desc: "Miles de estrenos actualizados semanalmente." },
          { icon: Globe, title: "Canales Latam", desc: "La mejor selección de señales en vivo." }
        ].map((f, i) => (
          <div key={i} className="premium-card p-10 rounded-[2.5rem] space-y-6 group">
            <div className="w-16 h-16 bg-yellow-400/20 rounded-2xl flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform"><f.icon size={32} /></div>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white">{f.title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PricingSection = () => {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const plans = [
    { months: 1, price: 8000, bestValue: false },
    { months: 3, price: 22000, bestValue: false },
    { months: 6, price: 45000, bestValue: true },
    { months: 12, price: 75000, bestValue: false }
  ];

  return (
    <section id="planes" className="py-24 bg-zinc-50 dark:bg-zinc-950 overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">ELIGE TU <span className="text-yellow-600 dark:text-yellow-400 italic">PLAN</span></h2>
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">Pago Online con Activación Inmediata</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {plans.map((p, i) => (
            <div key={i} className={`relative p-8 rounded-[2.5rem] border group transition-all duration-500 flex flex-col items-center text-center space-y-6 premium-card ${p.bestValue ? 'border-yellow-500 bg-yellow-400/5 ring-4 ring-yellow-400/10' : 'border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5'}`}>
              {p.bestValue && <div className="absolute -top-4 bg-yellow-500 text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest z-10">MEJOR VALOR</div>}
              <div className="space-y-2">
                <h3 className="text-sm font-black text-zinc-400 uppercase tracking-[0.2em]">{p.months === 1 ? 'Mensual' : `${p.months} Meses`}</h3>
                <div className="text-4xl font-black text-zinc-900 dark:text-white">${p.price.toLocaleString('es-CL')}</div>
              </div>
              <ul className="text-xs text-left w-full space-y-3 flex-1 text-zinc-500 dark:text-zinc-400">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-yellow-500" /> +5k Canales En Vivo</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-yellow-500" /> VOD Actualizado</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-yellow-500" /> Soporte VIP</li>
              </ul>
              <button onClick={() => setSelectedPlan(p)} className={`w-full py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 ${p.bestValue ? 'bg-yellow-500 text-black shadow-xl' : 'bg-zinc-900 dark:bg-white text-white dark:text-black hover:scale-105'}`}>
                CONTRATAR AHORA <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        <CheckoutModal isOpen={!!selectedPlan} onClose={() => setSelectedPlan(null)} plan={selectedPlan || {}} />
      </div>
    </section>
  );
};

// Componente FAQItem refinado para animaciones fluidas
// Added key to props to resolve TS error in FAQSection map
const FAQItem = ({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void; key?: React.Key }) => {
  return (
    <div className={`premium-card rounded-3xl border transition-all duration-500 overflow-hidden ${isOpen ? 'border-yellow-500/50 bg-yellow-500/[0.03] shadow-lg shadow-yellow-500/5' : 'border-zinc-100 dark:border-white/5'}`}>
      <button 
        onClick={onClick} 
        className="w-full flex justify-between items-center p-6 text-left focus:outline-none group/btn"
      >
        <span className={`font-black uppercase tracking-tight text-sm md:text-base transition-colors duration-500 ${isOpen ? 'text-yellow-600 dark:text-yellow-400' : 'text-zinc-900 dark:text-white group-hover/btn:text-yellow-500'}`}>
          {question}
        </span>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-yellow-500 text-black rotate-180 shadow-lg shadow-yellow-500/30' : 'bg-zinc-100 dark:bg-white/5 text-zinc-400'}`}>
          <ChevronDown size={20} className={`transition-transform duration-500 ${isOpen ? 'scale-110' : ''}`} />
        </div>
      </button>
      
      {/* Contenedor con técnica CSS Grid para animar altura auto */}
      <div 
        className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 py-6 pt-0' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="px-6 space-y-4">
            <div className="h-px bg-zinc-100 dark:bg-white/5 w-full"></div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  // Estado para controlar cuál ítem está abierto. null significa todos cerrados.
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    { 
      q: "¿Cómo activo mi servicio?", 
      a: "Tras completar tu pago online, recibirás un código de transacción único de forma inmediata. Solo debes enviar ese código a nuestro equipo de soporte vía WhatsApp y procederemos con la activación total de tus credenciales en menos de 10 minutos. Atendemos 24/7." 
    },
    { 
      q: "¿Es seguro el pago online?", 
      a: "Totalmente. Nuestra plataforma utiliza encriptación SSL de nivel bancario (AES-256) y se integra exclusivamente con pasarelas de pago oficiales como Webpay Plus, PayPal y Mercado Pago. Jamás almacenamos los datos de tus tarjetas en nuestros servidores." 
    },
    { 
      q: "¿En qué dispositivos puedo ver TVGO?", 
      a: "TVGO es multiplataforma. Puedes disfrutarlo en Smart TVs (Samsung, LG, Android TV), Smartphones (iOS/Android), Tablets, Computadores (Web Player) y dispositivos de streaming como Chromecast, Amazon Firestick, Xiaomi Mi Box y Roku (vía casting)." 
    },
    { 
      q: "¿Qué velocidad de internet necesito?", 
      a: "Para disfrutar de contenido en Full HD (1080p) recomendamos una conexión de al menos 10 Mbps. Para contenido 4K Ultra HD y HDR, se recomienda un mínimo de 30 Mbps estables para evitar cualquier tipo de buffering." 
    },
    { 
      q: "¿Ofrecen devoluciones?", 
      a: "Para garantizar tu satisfacción, ofrecemos un demo gratuito de 3 horas antes de realizar cualquier compra. Debido a que es un servicio digital de acceso inmediato, las devoluciones se analizan individualmente en caso de fallas técnicas persistentes en el servidor." 
    }
  ];

  const handleItemClick = (index: number) => {
    // Si se hace clic en el que ya está abierto, se cierra (null), sino se abre el nuevo índice
    setOpenIndex(prevIndex => prevIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white dark:bg-zinc-950 scroll-mt-24">
      <div className="max-w-3xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-block p-4 bg-yellow-400/10 rounded-3xl mb-2 animate-bounce-slow">
            <HelpCircle className="text-yellow-600 dark:text-yellow-400" size={36} />
          </div>
          <h2 className="text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter italic">
            Centro de <span className="text-yellow-600 dark:text-yellow-400 underline decoration-yellow-500/30 underline-offset-8">Ayuda</span>
          </h2>
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest opacity-70">Respuestas rápidas para usuarios exigentes</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem 
              key={i}
              question={faq.q}
              answer={faq.a}
              isOpen={openIndex === i}
              onClick={() => handleItemClick(i)}
            />
          ))}
        </div>
        
        <div className="text-center pt-8">
          <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest mb-4">¿Aún tienes dudas?</p>
          <a href={WHATSAPP_LINK("Hola, tengo una duda que no aparece en el FAQ.")} className="inline-flex items-center gap-2 text-yellow-600 dark:text-yellow-400 font-black text-sm hover:underline transition-all">
            Hablar con un consultor <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

const ChatBot = () => {
  const [messages, setMessages] = useState<any[]>([{ role: 'bot', text: '¡Hola! ¿Necesitas ayuda con tu pago o tienes dudas sobre los planes?' }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);

  const handleSend = async (e: any) => {
    e.preventDefault();
    if (!input.trim() || typing) return;
    const msg = input; setInput('');
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setTyping(true);
    try {
      // Create new GoogleGenAI instance right before API call
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: msg,
        config: { systemInstruction: "Eres un asistente de ventas de Full Premium TVGO. Ayuda a los usuarios con los planes ($8000 mensual, $45000 semestral) y métodos de pago (Webpay, PayPal, Binance). Motiva la compra online. Sé breve y profesional." }
      });
      setMessages(prev => [...prev, { role: 'bot', text: response.text || "Contacta al +56979429123." }]);
    } catch { 
      setMessages(prev => [...prev, { role: 'bot', text: "Hubo un error. Contáctanos por WhatsApp." }]);
    } finally { setTyping(false); }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-3xl overflow-hidden flex flex-col h-[450px] shadow-2xl animate-in slide-in-from-bottom-8 duration-500">
      <div className="bg-yellow-500 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-black font-black uppercase tracking-widest text-xs"><Bot size={18} /> Smart Assistant</div>
        <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-[11px] font-medium leading-relaxed ${m.role === 'user' ? 'bg-yellow-500 text-black' : 'bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white'}`}>{m.text}</div>
          </div>
        ))}
        {typing && <div className="text-[10px] text-zinc-500 italic animate-pulse">Escribiendo...</div>}
      </div>
      <form onSubmit={handleSend} className="p-3 bg-zinc-50 dark:bg-black/20 flex gap-2">
        <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="¿Dudas con el pago?" className="flex-1 bg-white dark:bg-zinc-800 border dark:border-white/5 rounded-xl px-4 py-2 text-xs outline-none focus:border-yellow-500 transition-colors text-zinc-900 dark:text-white" />
        <button type="submit" className="bg-yellow-500 text-black p-2 rounded-xl"><Send size={18} /></button>
      </form>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-white/5 py-24">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
      <div className="space-y-6">
        <Logo />
        <p className="text-sm text-zinc-500 leading-relaxed">Streaming de alta gama con servidores optimizados para Latam. Calidad 4K HDR garantizada.</p>
        <div className="flex flex-col gap-6">
          <div className="flex gap-4">
            <ShieldCheck size={24} title="Pago Seguro" className="text-yellow-500 cursor-help" />
            <Lock size={24} title="Privacidad SSL" className="text-blue-500 cursor-help" />
            <Globe size={24} title="Cobertura Global" className="text-green-500 cursor-help" />
          </div>
          <a href="#" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-yellow-500 transition-all group">
            <FileText size={14} className="group-hover:scale-110 transition-transform" /> 
            <span>Términos y Condiciones</span>
          </a>
        </div>
      </div>
      <div className="space-y-8">
        <h4 className="font-black text-zinc-900 dark:text-white uppercase tracking-widest text-sm">Atención al Cliente</h4>
        <ChatBot />
      </div>
      <div className="space-y-6">
        <h4 className="font-black text-zinc-900 dark:text-white uppercase tracking-widest text-sm">Soporte Express</h4>
        <a href={WHATSAPP_LINK("Hola, necesito ayuda.")} className="flex items-center gap-3 p-4 bg-zinc-50 dark:bg-white/5 rounded-2xl border border-zinc-100 dark:border-white/10 hover:border-yellow-500 transition-all group">
          <div className="w-10 h-10 bg-green-500 text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"><MessageCircle size={20} /></div>
          <div>
            <span className="block font-bold text-sm text-zinc-900 dark:text-white">+56 9 7942 9123</span>
            <span className="text-[10px] text-zinc-400 uppercase font-black">Online ahora</span>
          </div>
        </a>
      </div>
    </div>
  </footer>
);

const App = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-500">
      <nav className="fixed w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-zinc-200 dark:border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-6">
            <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-500 dark:text-yellow-400 transition-all">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a href="#planes" className="bg-yellow-500 text-black px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition">Contratar</a>
          </div>
        </div>
      </nav>
      
      <main>
        <Hero />
        <PromoVideoSection />
        <ContentSection />
        <PricingSection />
        <FAQSection />
      </main>

      <Footer />
      
      <a href={WHATSAPP_LINK("Hola, quiero información.")} className="fixed bottom-8 right-8 z-[90] bg-[#25d366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition duration-300">
        <MessageCircle size={32} />
      </a>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);