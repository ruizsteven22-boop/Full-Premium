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
  ShieldEllipsis,
  ExternalLink
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
      <div className="absolute -inset-1.5 bg-gradient-to-tr from-yellow-600 via-yellow-400 to-yellow-200 rounded-xl blur-md opacity-0 group-hover:opacity-60 transition-all duration-500"></div>
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
  const [redirecting, setRedirecting] = useState(false);

  // Form states for validation
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvc: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Reset modal state on close
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep(1);
        setMethod(null);
        setLoading(false);
        setSuccess(false);
        setRedirecting(false);
        setCardData({ number: '', expiry: '', cvc: '' });
        setErrors({});
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validateCard = () => {
    const newErrors: { [key: string]: string } = {};
    const rawNumber = cardData.number.replace(/\s/g, '');
    if (rawNumber.length < 16) newErrors.number = 'Número de tarjeta inválido (16 dígitos)';
    if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) newErrors.expiry = 'Formato MM/YY requerido';
    if (cardData.cvc.length < 3) newErrors.cvc = 'CVC inválido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    // Add space every 4 digits
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardData({ ...cardData, number: formatted });
    if (errors.number) setErrors({ ...errors, number: '' });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    let formatted = value;
    if (value.length > 2) {
      formatted = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setCardData({ ...cardData, expiry: formatted });
    if (errors.expiry) setErrors({ ...errors, expiry: '' });
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCardData({ ...cardData, cvc: value });
    if (errors.cvc) setErrors({ ...errors, cvc: '' });
  };

  const handlePayment = () => {
    if (method === 'card' && !validateCard()) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      setSuccess(true);
    }, 2800);
  };

  const handlePaypalRedirect = () => {
    setRedirecting(true);
    // Simulamos la latencia de conexión con PayPal API
    setTimeout(() => {
      setRedirecting(false);
      setStep(3);
      setSuccess(true);
    }, 4000);
  };

  const steps = [
    { id: 1, name: 'Método' },
    { id: 2, name: 'Pago' },
    { id: 3, name: 'Listo' }
  ];

  const generatedCode = useRef(`TVGO-${Math.random().toString(36).substr(2, 6).toUpperCase()}`);

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
        {!redirecting && step < 3 && (
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
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {redirecting ? (
            <div className="py-16 flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in duration-500">
              <div className="relative">
                <div className="w-24 h-24 bg-blue-600/10 rounded-3xl flex items-center justify-center text-blue-600">
                  <Globe size={48} className="animate-spin-slow" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg">
                  <Lock size={16} />
                </div>
              </div>
              <div className="text-center space-y-4">
                <h4 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">Conectando con PayPal</h4>
                <p className="text-zinc-500 text-sm max-w-xs mx-auto">Preparando sesión de pago segura. Serás redirigido para completar la transacción internacional.</p>
                <div className="flex justify-center gap-2">
                  <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          ) : step === 1 ? (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <h4 className="font-bold text-zinc-900 dark:text-white">Selecciona tu medio de pago:</h4>
              <div className="grid grid-cols-1 gap-3">
                <button onClick={() => { setMethod('card'); setStep(2); }} className="flex items-center justify-between p-5 rounded-2xl border border-zinc-200 dark:border-white/10 hover:border-yellow-500 hover:bg-yellow-500/5 transition-all group text-left shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform"><CardIcon size={24} /></div>
                    <div>
                      <span className="block font-bold text-sm text-zinc-900 dark:text-white uppercase tracking-tight">Webpay / Tarjetas</span>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Débito, Crédito, Prepago</span>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-zinc-300 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" />
                </button>
                <button onClick={() => { setMethod('paypal'); setStep(2); }} className="flex items-center justify-between p-5 rounded-2xl border border-zinc-200 dark:border-white/10 hover:border-blue-500 hover:bg-blue-500/5 transition-all group text-left shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-700 group-hover:scale-110 transition-transform"><Globe size={24} /></div>
                    <div>
                      <span className="block font-bold text-sm text-zinc-900 dark:text-white uppercase tracking-tight">PayPal Checkout</span>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Global & Instantáneo</span>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-zinc-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </button>
                <button onClick={() => { setMethod('crypto'); setStep(2); }} className="flex items-center justify-between p-5 rounded-2xl border border-zinc-200 dark:border-white/10 hover:border-orange-500 hover:bg-orange-500/5 transition-all group text-left shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform"><Bitcoin size={24} /></div>
                    <div>
                      <span className="block font-bold text-sm text-zinc-900 dark:text-white uppercase tracking-tight">Binance Pay / USDT</span>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Cripto (BEP20 / TRC20)</span>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-zinc-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                </button>
                <button onClick={() => { setMethod('transfer'); setStep(2); }} className="flex items-center justify-between p-5 rounded-2xl border border-zinc-200 dark:border-white/10 hover:border-zinc-400 hover:bg-zinc-400/5 transition-all group text-left shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-zinc-500/10 rounded-xl flex items-center justify-center text-zinc-600 group-hover:scale-110 transition-transform"><Banknote size={24} /></div>
                    <div>
                      <span className="block font-bold text-sm text-zinc-900 dark:text-white uppercase tracking-tight">Transferencia</span>
                      <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Bancos Nacionales (Chile)</span>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-zinc-300 group-hover:text-zinc-500 group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </div>
          ) : step === 2 && !loading ? (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <button onClick={() => setStep(1)} className="text-xs font-bold text-yellow-600 flex items-center gap-1 hover:underline group">
                <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Volver a métodos
              </button>
              
              <div className="bg-zinc-100 dark:bg-white/5 p-6 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-inner">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-black uppercase text-zinc-400 tracking-widest">Resumen de Orden</span>
                  <div className="flex items-center gap-1.5 bg-green-500/10 text-green-600 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter border border-green-500/20">
                    <ShieldCheck size={10} /> Canal Seguro
                  </div>
                </div>
                <div className="flex justify-between items-baseline">
                  <h5 className="font-bold text-zinc-900 dark:text-white uppercase text-xs tracking-tight">Suscripción TVGO {plan.months} meses</h5>
                  <span className="text-2xl font-black text-zinc-900 dark:text-white">${plan.price.toLocaleString('es-CL')}</span>
                </div>
              </div>

              {method === 'card' && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Número de Tarjeta</label>
                    <div className="relative">
                      <CardIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="0000 0000 0000 0000" 
                        value={cardData.number}
                        onChange={handleCardNumberChange}
                        className={`w-full bg-zinc-50 dark:bg-black/40 border ${errors.number ? 'border-red-500 animate-shake' : 'border-zinc-200 dark:border-white/10'} rounded-xl px-12 py-4 text-sm outline-none focus:border-yellow-500 transition-all tracking-widest font-mono`} 
                      />
                    </div>
                    {errors.number && <p className="text-[10px] text-red-500 font-bold uppercase ml-1">{errors.number}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Expiración</label>
                      <input 
                        type="text" 
                        placeholder="MM/YY" 
                        value={cardData.expiry}
                        onChange={handleExpiryChange}
                        className={`w-full bg-zinc-50 dark:bg-black/40 border ${errors.expiry ? 'border-red-500 animate-shake' : 'border-zinc-200 dark:border-white/10'} rounded-xl px-4 py-4 text-sm outline-none focus:border-yellow-500 transition-all text-center font-mono tracking-widest`} 
                      />
                      {errors.expiry && <p className="text-[10px] text-red-500 font-bold uppercase ml-1">{errors.expiry}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Seguridad (CVC)</label>
                      <input 
                        type="password" 
                        placeholder="***" 
                        value={cardData.cvc}
                        onChange={handleCvcChange}
                        className={`w-full bg-zinc-50 dark:bg-black/40 border ${errors.cvc ? 'border-red-500 animate-shake' : 'border-zinc-200 dark:border-white/10'} rounded-xl px-4 py-4 text-sm outline-none focus:border-yellow-500 transition-all text-center font-mono tracking-widest`} 
                      />
                      {errors.cvc && <p className="text-[10px] text-red-500 font-bold uppercase ml-1">{errors.cvc}</p>}
                    </div>
                  </div>
                  <button onClick={handlePayment} className="w-full bg-yellow-500 text-black py-4 rounded-xl font-black text-lg hover:scale-[1.02] transition shadow-lg shadow-yellow-500/20 active:scale-95 uppercase tracking-tighter">EFECTUAR PAGO SEGURO</button>
                  <p className="text-[9px] text-center text-zinc-400 font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 pt-2">
                    <Lock size={10} /> Transacción protegida por cifrado AES-256 bits
                  </p>
                </div>
              )}

              {method === 'crypto' && (
                <div className="space-y-6 text-center animate-in fade-in duration-500">
                  <div className="bg-white p-5 rounded-3xl border border-zinc-200 inline-block mx-auto shadow-xl">
                    <QrCode size={180} className="text-black" />
                    <div className="mt-3 bg-orange-500 text-white text-[8px] font-black py-1 rounded-full uppercase">Escanea con Binance App</div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.15em]">Wallet USDT (Red: Binance Smart Chain BEP20)</p>
                    <div className="flex items-center gap-2 bg-zinc-100 dark:bg-black/40 p-4 rounded-2xl border border-zinc-200 dark:border-white/10 group">
                      <code className="text-[10px] flex-1 text-zinc-600 dark:text-zinc-300 break-all text-left font-mono">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</code>
                      <button onClick={() => { navigator.clipboard.writeText("0x71C7656EC7ab88b098defB751B7401B5f6d8976F"); alert("¡Dirección copiada!"); }} className="text-yellow-600 hover:scale-125 active:scale-90 transition p-1.5 bg-white dark:bg-white/5 rounded-lg shadow-sm">
                        <Settings size={18} />
                      </button>
                    </div>
                  </div>
                  <button onClick={handlePayment} className="w-full bg-orange-500 text-white py-4 rounded-xl font-black text-lg hover:scale-[1.02] transition active:scale-95 uppercase tracking-tighter shadow-lg shadow-orange-500/20">YA HE REALIZADO EL ENVÍO</button>
                </div>
              )}

              {method === 'paypal' && (
                <div className="space-y-8 text-center py-6 animate-in fade-in duration-500">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 bg-blue-600/10 rounded-[2rem] flex items-center justify-center text-blue-600 border border-blue-600/20 shadow-lg">
                      <Globe size={48} />
                    </div>
                    <div className="absolute -top-3 -right-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-[9px] font-black uppercase shadow-lg">Checkout</div>
                  </div>
                  <div className="space-y-3">
                    <h5 className="font-black text-zinc-900 dark:text-white uppercase tracking-tighter text-xl">PayPal Express</h5>
                    <p className="text-sm text-zinc-500 px-6 leading-relaxed font-medium">Accede a la plataforma oficial de PayPal para procesar tu pago internacional con saldo o tarjeta de crédito.</p>
                  </div>
                  <button onClick={handlePaypalRedirect} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:scale-[1.02] transition active:scale-95 flex items-center justify-center gap-4 uppercase tracking-tighter shadow-xl shadow-blue-600/20">
                    CONTINUAR A PAYPAL <ExternalLink size={20} />
                  </button>
                </div>
              )}

              {method === 'transfer' && (
                <div className="space-y-4 animate-in fade-in duration-500">
                  <div className="bg-blue-500/5 border border-blue-500/10 p-6 rounded-2xl space-y-4 shadow-inner">
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.25em] border-b border-blue-500/10 pb-2">Cuentas Nacionales (Chile):</p>
                    <div className="text-[11px] space-y-3">
                      <div className="flex justify-between items-center group">
                        <span className="text-zinc-400 uppercase font-bold tracking-tight">Banco:</span>
                        <span className="text-zinc-900 dark:text-zinc-100 font-black tracking-tight group-hover:text-blue-500 transition-colors">BANCO ESTADO (RUT)</span>
                      </div>
                      <div className="flex justify-between items-center group">
                        <span className="text-zinc-400 uppercase font-bold tracking-tight">Titular:</span>
                        <span className="text-zinc-900 dark:text-zinc-100 font-black tracking-tight group-hover:text-blue-500 transition-colors">STEVEN RUIZ</span>
                      </div>
                      <div className="flex justify-between items-center group">
                        <span className="text-zinc-400 uppercase font-bold tracking-tight">RUT:</span>
                        <span className="text-zinc-900 dark:text-zinc-100 font-black tracking-tight group-hover:text-blue-500 transition-colors font-mono">25.613.997-9</span>
                      </div>
                      <div className="flex justify-between items-center group">
                        <span className="text-zinc-400 uppercase font-bold tracking-tight">E-mail:</span>
                        <span className="text-zinc-900 dark:text-zinc-100 font-black tracking-tight group-hover:text-blue-500 transition-colors">pagos@tvgo.cl</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => { setStep(3); setSuccess(true); }} className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black py-4 rounded-xl font-black text-lg hover:scale-[1.02] transition active:scale-95 uppercase tracking-tighter shadow-xl">ADJUNTAR COMPROBANTE</button>
                  <p className="text-[10px] text-center text-zinc-400 font-bold uppercase tracking-widest italic pt-2">Activación tras validación de depósito</p>
                </div>
              )}
            </div>
          ) : loading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-500">
              <div className="relative">
                <Loader2 className="w-20 h-20 text-yellow-500 animate-spin" />
                <ShieldCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-500" size={32} />
              </div>
              <div className="text-center space-y-3">
                <h4 className="font-black text-zinc-900 dark:text-white uppercase tracking-tighter text-xl">Validando Operación</h4>
                <p className="text-xs text-zinc-400 font-bold uppercase tracking-[0.2em] animate-pulse">Consultando pasarela de pago bancaria...</p>
                <div className="max-w-[200px] h-1 bg-zinc-100 dark:bg-white/5 rounded-full overflow-hidden mx-auto mt-4">
                  <div className="h-full bg-yellow-500 animate-[progress_3s_ease-in-out_infinite]"></div>
                </div>
              </div>
            </div>
          ) : success ? (
            <div className="py-8 flex flex-col items-center justify-center space-y-8 animate-in zoom-in duration-500">
              <div className="w-28 h-28 bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30 text-white animate-bounce">
                <CheckCircle size={64} />
              </div>
              <div className="text-center space-y-4">
                <h3 className="text-4xl font-black text-zinc-900 dark:text-white italic tracking-tighter uppercase">¡EXITO TOTAL!</h3>
                <p className="text-zinc-500 dark:text-gray-400 text-sm max-w-xs mx-auto font-medium">Suscripción Premium activada. Tu código de identificación de orden es:</p>
                <div 
                  className="bg-zinc-100 dark:bg-white/5 border border-dashed border-zinc-300 dark:border-white/20 p-5 rounded-2xl group relative cursor-pointer active:scale-95 transition-all hover:bg-yellow-500/5 hover:border-yellow-500/40" 
                  onClick={() => { 
                    navigator.clipboard.writeText(generatedCode.current); 
                    alert("¡Código de activación copiado!"); 
                  }}
                >
                  <code className="text-2xl font-black text-yellow-600 tracking-[0.35em] uppercase font-mono">{generatedCode.current}</code>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-[8px] font-black px-2 py-0.5 rounded-full uppercase">Copiar Código</div>
                </div>
              </div>
              <div className="w-full space-y-4">
                <a 
                  href={WHATSAPP_LINK(`¡Hola TVGO! He completado mi pago por el plan de ${plan.months} meses. Mi código de orden es: ${generatedCode.current}. Solicito mis credenciales de acceso.`)} 
                  className="w-full bg-[#25d366] text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-4 hover:scale-[1.02] transition shadow-xl shadow-green-500/20 active:scale-95 uppercase tracking-tighter"
                >
                  <MessageCircle size={28} /> ACTIVAR POR WHATSAPP
                </a>
                <p className="text-[10px] text-zinc-400 text-center font-bold uppercase tracking-widest opacity-80">Nuestro soporte VIP te responderá en menos de 5 minutos.</p>
              </div>
            </div>
          ) : null}
        </div>

        {/* Modal Footer Info Bar */}
        {step < 3 && !redirecting && (
          <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 flex items-center justify-center gap-6 border-t border-zinc-100 dark:border-white/5">
            <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
              <ShieldCheck size={14} className="text-yellow-600" /> PCI Compliance
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
              <Zap size={14} className="text-yellow-500" /> Activación Instantánea
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
        <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 px-4 py-1 rounded-full text-yellow-600 dark:text-yellow-400 text-sm font-bold animate-fade-in-down">
          <Globe size={14} /> SERVICIO GLOBAL PARA TODO EL MUNDO
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-zinc-900 dark:text-white">
          La TV del futuro <br />
          <span className="gradient-text italic">en tus manos.</span>
        </h1>
        <p className="text-zinc-600 dark:text-gray-400 text-lg max-w-lg leading-relaxed font-medium">
          Accede a canales en vivo, deportes premium y estrenos VOD con la mejor estabilidad. <span className="text-zinc-900 dark:text-white font-bold italic underline decoration-yellow-500/30">Disponible en Chile y para ventas internacionales.</span>
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4">
          <a 
            href="#planes" 
            className="bg-yellow-500 dark:bg-yellow-400 text-black px-8 py-4 rounded-xl font-black text-lg text-center hover:scale-105 transition shadow-xl shadow-yellow-500/20 min-w-[180px] uppercase tracking-tighter"
          >
            Explorar Planes
          </a>
          <a 
            href={WHATSAPP_LINK("Hola, quiero una demo gratis")}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-zinc-100 dark:bg-white/5 border border-green-500/50 text-zinc-900 dark:text-white px-8 py-4 rounded-xl font-black text-lg text-center hover:bg-green-500/10 transition flex items-center justify-center gap-2 min-w-[180px] uppercase tracking-tighter"
          >
            <Zap size={20} className="text-green-500" /> Demo Gratis
          </a>
          <a 
            href="#experiencia"
            className="bg-zinc-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl font-black text-lg text-center hover:scale-105 transition flex items-center justify-center gap-2 min-w-[180px] uppercase tracking-tighter"
          >
            <PlayCircle size={20} /> Ver Demo
          </a>
        </div>
      </div>
      
      <div className="hidden md:block relative animate-fade-in-right">
        <div className="absolute -inset-4 bg-yellow-400/20 blur-3xl rounded-full animate-pulse"></div>
        <div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
           <img 
            src="https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80" 
            alt="Streaming Experience" 
            className="w-full h-auto scale-105"
          />
        </div>
        <div className="absolute -bottom-6 -left-6 bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-2xl border border-zinc-100 dark:border-white/5 flex items-center gap-4 animate-bounce-slow">
           <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center text-black font-black">4K</div>
           <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Ultra HD Streaming <br /><span className="text-green-500">Activo ahora</span></div>
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
    "Finalizando montaje de video premium..."
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
    handleAiGeneration(true);
  };

  return (
    <section id="experiencia" className="py-24 bg-zinc-50 dark:bg-zinc-950 relative overflow-hidden scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6 text-center space-y-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 px-4 py-1.5 rounded-full text-yellow-600 dark:text-yellow-400 text-xs font-bold border border-yellow-400/20 mb-2">
            <Sparkles size={14} className="animate-pulse" /> IA VEO 3.1 ACTIVADA
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">CALIDAD <span className="text-yellow-600 dark:text-yellow-400 italic">SUPREMA</span></h2>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto font-bold uppercase tracking-widest opacity-70">Genera un avance cinematográfico exclusivo usando el motor VEO de Google AI.</p>
        </div>

        <div ref={containerRef} className="relative group rounded-[3rem] overflow-hidden shadow-2xl border border-zinc-200 dark:border-white/10 aspect-video bg-black">
          {isGenerating && (
            <div className="absolute inset-0 z-50 bg-zinc-900/98 backdrop-blur-2xl flex flex-col items-center justify-center space-y-10 p-12">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="80" cy="80" r="75" className="stroke-white/5 fill-none" strokeWidth="8" />
                  <circle cx="80" cy="80" r="75" className="stroke-yellow-500 fill-none transition-all duration-1000 ease-linear" strokeWidth="8" strokeDasharray={`${Math.PI * 150}`} strokeDashoffset={`${Math.PI * 150 * (1 - genProgress / 100)}`} strokeLinecap="round" />
                </svg>
                <div className="text-center">
                  <span className="text-4xl font-black text-white">{genProgress}%</span>
                </div>
              </div>
              <div className="space-y-4 w-full max-w-xs text-center">
                <p className="text-white font-black uppercase tracking-[0.25em] text-sm animate-pulse">{loadingMessage}</p>
                <div className="flex items-center justify-center gap-4 text-zinc-500 text-[10px] font-bold uppercase tracking-[0.1em]">
                   <span className="flex items-center gap-1.5"><Clock size={12} /> T-minus: {Math.max(0, 45 - Math.floor(genProgress * 0.45))}s</span>
                   <span className="w-1 h-1 bg-zinc-700 rounded-full"></span>
                   <span className="flex items-center gap-1.5"><Info size={12} /> Render 1080p</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden mt-6 shadow-inner">
                  <div className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 transition-all duration-500" style={{ width: `${genProgress}%` }}></div>
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
          
          <div className="absolute bottom-8 left-8 right-8 z-40 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
             <div className="flex gap-4">
               <button 
                onClick={togglePlay} 
                className="bg-black/40 backdrop-blur-xl p-4 rounded-full text-white hover:bg-yellow-500 hover:text-black transition-all shadow-xl active:scale-90"
               >
                {isPlaying ? <PauseCircle size={28} /> : <PlayCircle size={28} />}
               </button>
               <button 
                onClick={() => setIsMuted(!isMuted)} 
                className="bg-black/40 backdrop-blur-xl p-4 rounded-full text-white hover:bg-yellow-500 hover:text-black transition-all shadow-xl active:scale-90"
               >
                {isMuted ? <VolumeX size={28} /> : <Volume2 size={28} />}
               </button>
             </div>
             <button 
                onClick={() => handleAiGeneration(false)}
                disabled={isGenerating}
                className={`bg-yellow-500 backdrop-blur-md border border-yellow-400/20 px-7 py-4 rounded-2xl text-black text-xs font-black flex items-center gap-3 hover:scale-105 transition-all shadow-2xl active:scale-95 ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Sparkles size={20} /> {isGenerating ? 'RENDERIZANDO...' : 'RE-GENERAR CON IA'}
              </button>
          </div>

          {!isGenerating && !isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-28 h-28 bg-yellow-500/90 backdrop-blur-md rounded-full flex items-center justify-center text-black shadow-[0_0_50px_rgba(250,204,21,0.4)] animate-pulse cursor-pointer pointer-events-auto" onClick={togglePlay}>
                <PlayCircle size={64} />
              </div>
            </div>
          )}
        </div>
      </div>

      {showKeyModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-[3rem] p-12 border border-white/10 text-center space-y-8 shadow-2xl">
            <div className="w-20 h-20 bg-yellow-500/10 rounded-3xl flex items-center justify-center text-yellow-500 mx-auto">
              <Key size={40} />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">Configurar Llave</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Para generar video con Veo 3.1, necesitas una API Key de Google AI Studio vinculada a un proyecto de pago.
              </p>
              <div className="bg-zinc-100 dark:bg-white/5 p-4 rounded-2xl border border-zinc-200 dark:border-white/10 flex items-center gap-3 text-left">
                <Info size={20} className="text-yellow-600 shrink-0" />
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-normal">
                  Consulta la <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-yellow-500 hover:underline">documentación de facturación de Google</a> antes de continuar.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <button onClick={handleKeySelection} className="w-full bg-yellow-500 text-black py-5 rounded-2xl font-black text-xl hover:scale-105 transition shadow-2xl uppercase tracking-tighter">Configurar API Key</button>
              <button onClick={() => setShowKeyModal(false)} className="text-zinc-500 text-xs font-black uppercase tracking-widest hover:text-white transition">Omitir vista previa IA</button>
            </div>
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
        <h2 className="text-4xl font-extrabold italic text-zinc-900 dark:text-white uppercase tracking-tighter">CATÁLOGO <span className="text-yellow-600 dark:text-yellow-400">SIN LÍMITES</span></h2>
        <p className="text-zinc-500 text-sm font-bold uppercase tracking-[0.2em] opacity-60">La mayor colección de señales en alta definición</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Trophy, title: "Deportes Elite", desc: "FIFA 2026, Champions League, Libertadores y Ligas Europeas completas." },
          { icon: Film, title: "VOD Premium", desc: "Miles de películas de estreno y series actualizadas semanalmente en 4K." },
          { icon: Globe, title: "Canales Latam", desc: "La mejor selección de señales en vivo de Chile, Argentina, México y más." }
        ].map((f, i) => (
          <div key={i} className="premium-card p-10 rounded-[3rem] space-y-6 group">
            <div className="w-20 h-20 bg-yellow-400/20 rounded-2xl flex items-center justify-center text-yellow-500 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-yellow-500/10"><f.icon size={36} /></div>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">{f.title}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed font-medium">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PricingSection = () => {
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const plans = [
    { months: 1, price: 8000, bestValue: false, tag: "Acceso Básico" },
    { months: 3, price: 22000, bestValue: false, tag: "Más Popular" },
    { months: 6, price: 45000, bestValue: true, tag: "Mejor Valor" },
    { months: 12, price: 75000, bestValue: false, tag: "Ahorro Anual" }
  ];

  return (
    <section id="planes" className="py-24 bg-zinc-50 dark:bg-zinc-950 overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">MEMBRESÍAS <span className="text-yellow-600 dark:text-yellow-400 italic">VIP</span></h2>
          <p className="text-zinc-500 text-sm font-black uppercase tracking-widest">Activación inmediata tras validación de pago</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {plans.map((p, i) => (
            <div key={i} className={`relative p-8 rounded-[3rem] border group transition-all duration-500 flex flex-col items-center text-center space-y-8 premium-card ${p.bestValue ? 'border-yellow-500 bg-yellow-400/5 ring-8 ring-yellow-400/5' : 'border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5'}`}>
              <div className={`absolute -top-4 px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest z-10 shadow-lg ${p.bestValue ? 'bg-yellow-500 text-black' : 'bg-zinc-900 text-white'}`}>{p.tag}</div>
              <div className="space-y-2">
                <h3 className="text-xs font-black text-zinc-400 uppercase tracking-[0.3em]">{p.months === 1 ? 'Mensual' : `${p.months} Meses`}</h3>
                <div className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter">${p.price.toLocaleString('es-CL')}</div>
              </div>
              <ul className="text-[11px] text-left w-full space-y-4 flex-1 text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-tight">
                <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-yellow-500 shrink-0" /> +8k Canales En Vivo</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-yellow-500 shrink-0" /> Multi-dispositivo</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-yellow-500 shrink-0" /> Estrenos VOD 4K</li>
                <li className="flex items-center gap-3"><CheckCircle2 size={16} className="text-yellow-500 shrink-0" /> Soporte VIP 24/7</li>
              </ul>
              <button onClick={() => setSelectedPlan(p)} className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg ${p.bestValue ? 'bg-yellow-500 text-black shadow-yellow-500/20' : 'bg-zinc-900 dark:bg-white text-white dark:text-black hover:scale-105'}`}>
                CONTRATAR <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        <CheckoutModal isOpen={!!selectedPlan} onClose={() => setSelectedPlan(null)} plan={selectedPlan || {}} />
      </div>
    </section>
  );
};

// Componente FAQItem refinado
const FAQItem = ({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void; key?: React.Key }) => {
  return (
    <div className={`premium-card rounded-3xl border transition-all duration-500 overflow-hidden ${isOpen ? 'border-yellow-500/50 bg-yellow-500/[0.03] shadow-lg shadow-yellow-500/5' : 'border-zinc-100 dark:border-white/5'}`}>
      <button 
        onClick={onClick} 
        className="w-full flex justify-between items-center p-7 text-left focus:outline-none group/btn"
      >
        <span className={`font-black uppercase tracking-tight text-sm md:text-base transition-colors duration-500 ${isOpen ? 'text-yellow-600 dark:text-yellow-400' : 'text-zinc-900 dark:text-white group-hover/btn:text-yellow-500'}`}>
          {question}
        </span>
        <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-yellow-500 text-black rotate-180 shadow-lg shadow-yellow-500/30' : 'bg-zinc-100 dark:bg-white/5 text-zinc-400'}`}>
          <ChevronDown size={22} className={`transition-transform duration-500 ${isOpen ? 'scale-110' : ''}`} />
        </div>
      </button>
      
      <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 py-7 pt-0' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="px-7 space-y-4">
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
    setOpenIndex(prevIndex => prevIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white dark:bg-zinc-950 scroll-mt-24">
      <div className="max-w-3xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-block p-4 bg-yellow-400/10 rounded-3xl mb-2 animate-bounce-slow">
            <HelpCircle className="text-yellow-600 dark:text-yellow-400" size={40} />
          </div>
          <h2 className="text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter italic">
            CENTRO DE <span className="text-yellow-600 dark:text-yellow-400 underline decoration-yellow-500/30 underline-offset-8">SOPORTE</span>
          </h2>
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest opacity-70">Despeja tus dudas y comienza la experiencia</p>
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
          <p className="text-xs text-zinc-400 font-black uppercase tracking-widest mb-4">¿Aún necesitas ayuda personalizada?</p>
          <a href={WHATSAPP_LINK("Hola, tengo una duda que no aparece en el FAQ.")} className="inline-flex items-center gap-3 text-yellow-600 dark:text-yellow-400 font-black text-sm hover:translate-x-2 transition-all group">
            HABLAR CON UN ASESOR <ArrowRight size={18} className="group-hover:scale-125 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

const ChatBot = () => {
  const [messages, setMessages] = useState<any[]>([{ role: 'bot', text: '¡Hola! Soy tu asistente TVGO. ¿En qué puedo ayudarte hoy? ¿Dudas con los planes o el proceso de pago?' }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async (e: any) => {
    e.preventDefault();
    if (!input.trim() || typing) return;
    const msg = input; setInput('');
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setTyping(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: msg,
        config: { systemInstruction: "Eres un asistente de ventas experto de Full Premium TVGO. Tu misión es ayudar a los usuarios con los planes ($8000 mensual, $22000 trimestral, $45000 semestral, $75000 anual) y guiarlos en los métodos de pago (Webpay, PayPal, Cripto). Sé convincente, amable, profesional y breve. Si preguntan por fútbol, diles que incluimos todas las ligas premium (Libertadores, Champions, etc). Si tienen problemas con el pago, dile que nos contacten por el botón flotante de WhatsApp." }
      });
      setMessages(prev => [...prev, { role: 'bot', text: response.text || "Lo siento, ¿podrías repetir? O si prefieres, escríbenos directamente a WhatsApp para una atención humana." }]);
    } catch { 
      setMessages(prev => [...prev, { role: 'bot', text: "Estamos experimentando alta demanda. Para una respuesta inmediata, usa el botón flotante de WhatsApp." }]);
    } finally { setTyping(false); }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col h-[480px] shadow-2xl animate-in slide-in-from-bottom-8 duration-500">
      <div className="bg-yellow-500 p-5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3 text-black font-black uppercase tracking-widest text-xs"><Bot size={22} className="animate-bounce-slow" /> Smart Assistant</div>
        <div className="flex items-center gap-2">
           <span className="text-[8px] font-black text-black/60 uppercase">Online</span>
           <div className="w-2.5 h-2.5 rounded-full bg-green-600 animate-pulse border-2 border-white/20"></div>
        </div>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 hide-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-[11px] font-bold leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-yellow-500 text-black rounded-tr-none' : 'bg-zinc-100 dark:bg-white/5 text-zinc-900 dark:text-white rounded-tl-none border border-zinc-200/20 dark:border-white/5'}`}>{m.text}</div>
          </div>
        ))}
        {typing && <div className="text-[10px] text-zinc-400 font-black uppercase tracking-widest animate-pulse flex items-center gap-2"><Loader2 size={12} className="animate-spin" /> Procesando respuesta...</div>}
      </div>
      <form onSubmit={handleSend} className="p-4 bg-zinc-50 dark:bg-black/20 flex gap-3 border-t border-zinc-100 dark:border-white/5">
        <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="¿Tienes dudas sobre el pago?" className="flex-1 bg-white dark:bg-zinc-800 border dark:border-white/10 rounded-xl px-5 py-3 text-xs outline-none focus:border-yellow-500 transition-all text-zinc-900 dark:text-white font-bold" />
        <button type="submit" disabled={typing} className="bg-yellow-500 text-black p-3 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg disabled:opacity-50"><Send size={20} /></button>
      </form>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-white/5 py-24">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-20">
      <div className="space-y-8">
        <Logo />
        <p className="text-sm text-zinc-500 leading-relaxed font-medium">Servicio de streaming ultra-estable con servidores redundantes en toda Latinoamérica. Disfruta la mejor calidad sin cortes ni retrasos.</p>
        <div className="flex flex-col gap-6">
          <div className="flex gap-5">
            <ShieldCheck size={28} title="Transacción Segura" className="text-yellow-500 cursor-help hover:scale-125 transition-transform" />
            <Lock size={28} title="Cifrado SSL" className="text-blue-500 cursor-help hover:scale-125 transition-transform" />
            <Globe size={28} title="Servicio Global" className="text-green-500 cursor-help hover:scale-125 transition-transform" />
          </div>
          <a href="#" className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 hover:text-yellow-500 transition-all group">
            <FileText size={16} className="group-hover:scale-125 transition-transform" /> 
            <span>Términos & Privacidad</span>
          </a>
        </div>
      </div>
      <div className="space-y-8">
        <h4 className="font-black text-zinc-900 dark:text-white uppercase tracking-[0.3em] text-xs">Asistente Inteligente</h4>
        <ChatBot />
      </div>
      <div className="space-y-8">
        <h4 className="font-black text-zinc-900 dark:text-white uppercase tracking-[0.3em] text-xs">Atención Urgente</h4>
        <a href={WHATSAPP_LINK("Hola, necesito asistencia técnica inmediata.")} className="flex items-center gap-4 p-5 bg-zinc-50 dark:bg-white/5 rounded-3xl border border-zinc-100 dark:border-white/10 hover:border-yellow-500 transition-all group shadow-sm hover:shadow-xl">
          <div className="w-14 h-14 bg-green-500 text-white rounded-2xl flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all shadow-lg shadow-green-500/20"><MessageCircle size={32} /></div>
          <div>
            <span className="block font-black text-lg text-zinc-900 dark:text-white tracking-tighter">+56 9 7942 9123</span>
            <span className="text-[10px] text-green-500 uppercase font-black tracking-widest animate-pulse">Consultor en línea</span>
          </div>
        </a>
        <div className="p-6 bg-zinc-100 dark:bg-zinc-900/50 rounded-3xl border border-zinc-200/50 dark:border-white/5 space-y-4">
           <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Estado de Servidores:</h5>
           <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
              <span className="text-xs font-black text-zinc-600 dark:text-zinc-300 uppercase tracking-tighter">Nodo Latam: ÓPTIMO</span>
           </div>
           <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
              <span className="text-xs font-black text-zinc-600 dark:text-zinc-300 uppercase tracking-tighter">Nodo Europa: ÓPTIMO</span>
           </div>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-zinc-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
       <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">© 2025 Full Premium TVGO - Todos los derechos reservados</p>
       <div className="flex gap-6">
          <Globe size={16} className="text-zinc-300 hover:text-yellow-500 transition-colors cursor-pointer" />
          <Tv size={16} className="text-zinc-300 hover:text-yellow-500 transition-colors cursor-pointer" />
          <Star size={16} className="text-zinc-300 hover:text-yellow-500 transition-colors cursor-pointer" />
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
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-500 selection:bg-yellow-500 selection:text-black">
      <nav className="fixed w-full z-50 bg-white/80 dark:bg-black/90 backdrop-blur-xl border-b border-zinc-200 dark:border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-6">
            <button onClick={() => setIsDark(!isDark)} className="p-2.5 rounded-2xl hover:bg-zinc-100 dark:hover:bg-white/10 text-zinc-500 dark:text-yellow-400 transition-all active:scale-90 border border-transparent dark:border-white/5">
              {isDark ? <Sun size={22} /> : <Moon size={22} />}
            </button>
            <a href="#planes" className="bg-yellow-500 text-black px-8 py-2.5 rounded-2xl font-black text-xs uppercase tracking-[0.15em] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-yellow-500/20">Contratar VIP</a>
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
      
      <a 
        href={WHATSAPP_LINK("¡Hola! Me gustaría contratar un plan o recibir información personalizada.")} 
        className="fixed bottom-10 right-10 z-[90] bg-[#25d366] text-white p-5 rounded-3xl shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 animate-bounce-slow"
      >
        <MessageCircle size={36} />
        <span className="absolute -top-1 -left-1 w-4 h-4 bg-red-500 border-2 border-white dark:border-zinc-900 rounded-full"></span>
      </a>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);