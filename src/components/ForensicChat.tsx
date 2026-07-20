import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, ShieldCheck, HelpCircle, Activity, Mic, MicOff, Volume2, Square } from 'lucide-react';
import { Language } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ForensicChatProps {
  lang: Language;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function ForensicChat({ lang }: ForensicChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Audio / Speech Recognition and Synthesis States
  const [isRecording, setIsRecording] = useState(false);
  const [activeSpeakingIndex, setActiveSpeakingIndex] = useState<number | null>(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Sync state with global event to avoid mobile overlapping
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('forensic-chat-toggle', { detail: { open: isOpen } }));
    if (!isOpen && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setActiveSpeakingIndex(null);
    }
  }, [isOpen]);

  // Sync with accessibility state changes
  useEffect(() => {
    const handleAccToggle = (e: any) => {
      setIsAccessibilityOpen(e.detail?.open || false);
    };
    window.addEventListener('accessibility-toggle', handleAccToggle);
    return () => {
      window.removeEventListener('accessibility-toggle', handleAccToggle);
    };
  }, []);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSpeechSupported(true);
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = lang === 'it' ? 'it-IT' : 'en-US';

      rec.onstart = () => {
        setIsRecording(true);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      rec.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputValue((prev) => {
            const space = prev && !prev.endsWith(' ') ? ' ' : '';
            return prev + space + transcript;
          });
        }
      };

      recognitionRef.current = rec;
    }

    // Load voices in background
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [lang]);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error("Failed to start speech recognition:", err);
      }
    }
  };

  const toggleSpeak = (text: string, index: number) => {
    if (!window.speechSynthesis) return;

    if (activeSpeakingIndex === index) {
      window.speechSynthesis.cancel();
      setActiveSpeakingIndex(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Strip markdown formatting for cleaner reading
    const cleanText = text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/#+/g, '')
      .replace(/`+/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === 'it' ? 'it-IT' : 'en-US';

    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = null;

    if (lang === 'it') {
      // Find a premium, natural or high-quality Italian male voice if available
      selectedVoice = voices.find(v => 
        v.lang.startsWith('it') && 
        (v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('microsoft')) &&
        (v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('uomo') || v.name.toLowerCase().includes('cosimo') || v.name.toLowerCase().includes('diego') || v.name.toLowerCase().includes('piero') || v.name.toLowerCase().includes('vittorio'))
      );
      if (!selectedVoice) {
        selectedVoice = voices.find(v => 
          v.lang.startsWith('it') && 
          (v.name.toLowerCase().includes('cosimo') || 
           v.name.toLowerCase().includes('diego') || 
           v.name.toLowerCase().includes('male') || 
           v.name.toLowerCase().includes('uomo') || 
           v.name.toLowerCase().includes('piero') || 
           v.name.toLowerCase().includes('molo') || 
           v.name.toLowerCase().includes('guy') || 
           v.name.toLowerCase().includes('vittorio') ||
           v.name.toLowerCase().includes('luca') ||
           v.name.toLowerCase().includes('roberto') ||
           v.name.toLowerCase().includes('siri'))
        );
      }
      if (!selectedVoice) {
        selectedVoice = voices.find(v => v.lang.startsWith('it'));
      }
    } else {
      // Find a premium, natural or high-quality English male voice if available
      selectedVoice = voices.find(v => 
        v.lang.startsWith('en') && 
        (v.name.toLowerCase().includes('google') || v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('microsoft')) &&
        (v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('guy') || v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('james'))
      );
      if (!selectedVoice) {
        selectedVoice = voices.find(v => 
          v.lang.startsWith('en') && 
          (v.name.toLowerCase().includes('david') || 
           v.name.toLowerCase().includes('james') || 
           v.name.toLowerCase().includes('mark') || 
           v.name.toLowerCase().includes('male') || 
           v.name.toLowerCase().includes('guy') || 
           v.name.toLowerCase().includes('george') ||
           v.name.toLowerCase().includes('siri'))
        );
      }
      if (!selectedVoice) {
        selectedVoice = voices.find(v => v.lang.startsWith('en'));
      }
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Detect if the user is on an Apple device (macOS, iOS, Safari)
    const isApple = typeof navigator !== 'undefined' && 
      (/Macintosh|MacIntel|iPad|iPhone|iPod/.test(navigator.userAgent) || 
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

    if (!isApple) {
      // On non-Apple platforms, configure a highly fluid and natural standard tone (pitch 1.0, speed 1.05)
      utterance.pitch = 1.0;
      utterance.rate = 1.05; // A rate of 1.05 sounds significantly more fluid and conversational
    } else {
      // On Apple devices, leave the classic native system settings untouched as requested
    }

    utterance.onend = () => {
      setActiveSpeakingIndex(null);
    };

    utterance.onerror = () => {
      setActiveSpeakingIndex(null);
    };

    setActiveSpeakingIndex(index);
    window.speechSynthesis.speak(utterance);
  };

  // Initialize welcome message when language changes
  useEffect(() => {
    const welcomeText = lang === 'it' 
      ? "Salve, sono l'Assistente Virtuale di Criminologia dello Studio Elena Angelini. Posso fornirle informazioni sulle nostre perizie, la ricostruzione 3D con software FORA, i casi di mobbing o aiutarla a prenotare un colloquio telefonico protetto e gratuito. Come posso assisterla?"
      : "Hello, I am the Virtual Forensic Assistant of Studio Elena Angelini. I can provide information about our reports, 3D reconstructions with FORA software, mobbing investigations, or help you book a free protected preliminary call. How can I assist you today?";
    
    setMessages([{ role: 'assistant', content: welcomeText }]);
  }, [lang]);

  // Autoscroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    if (!textToSend) {
      setInputValue('');
    }

    const newMessages = [...messages, { role: 'user', content: text } as ChatMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/forensic-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: newMessages })
      });

      const data = await response.json();
      if (response.ok) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        throw new Error(data.error || 'Server error');
      }
    } catch (error: any) {
      console.error("Chat Error:", error);
      const errMsg = error?.message || String(error);
      const errReply = lang === 'it'
        ? `Spiacenti, si è verificato un errore di connessione sicura con il nostro server forense.\nDettagli tecnici: ${errMsg}`
        : `Sorry, a secure connection error occurred with our forensic server.\nTechnical details: ${errMsg}`;
      setMessages((prev) => [...prev, { role: 'assistant', content: errReply }]);
    } finally {
      setIsLoading(false);
    }
  };

  const presetQuestions = lang === 'it' 
    ? [
        "Come funziona la ricostruzione 3D FORA?",
        "Il colloquio telefonico è davvero gratuito?",
        "Come posso tutelare la mia privacy?"
      ]
    : [
        "How does FORA 3D reconstruction work?",
        "Is the phone consultation really free?",
        "How can I protect my case privacy?"
      ];

  return (
    <>
      {/* Floating Launcher Action Button */}
      {!isOpen && !isAccessibilityOpen && (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsOpen(true)}
          id="forensic-chat-launcher"
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-cold-500 hover:bg-cold-600 text-white shadow-xl shadow-cold-500/20 flex items-center justify-center cursor-pointer active:scale-95 border border-cold-400/20"
        >
          <MessageSquare className="w-6 h-6 animate-pulse" />
          <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950"></span>
        </motion.button>
      )}

      {/* Chat Window overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            // Full-screen on mobile, full-height sidebar on the right on desktop
            className="fixed inset-0 w-full h-full md:left-auto md:right-0 md:top-0 md:bottom-0 md:h-screen md:w-[460px] md:rounded-none z-[9995] bg-slate-950 border-l border-slate-900 flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header section with forensic credentials */}
            <div className="bg-slate-900 px-4 py-3.5 border-b border-slate-850 flex items-center justify-between">
              <div className="flex items-center space-x-2.5 text-left">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-cold-500/10 border border-cold-500/30 flex items-center justify-center text-cold-400 font-mono text-sm">
                    EA
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-900"></span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider leading-tight">
                    {lang === 'it' ? 'Assistente Forense Virtuale' : 'Virtual Forensic Assistant'}
                  </h4>
                  <div className="flex items-center space-x-1 text-[9px] font-mono text-slate-400">
                    <Activity className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
                    <span>SYS_SECURE // ONLINE</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-slate-950 border border-slate-850 text-slate-400 hover:text-slate-100 cursor-pointer active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Privacy Alert banner */}
            <div className="bg-slate-950 border-b border-slate-900/50 px-4 py-2 flex items-center justify-between text-[9px] font-mono text-cyan-400/80">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>CHAT_ENCRYPTED // SEGRETO PROFESSIONALE forense (Art. 200 c.p.p.)</span>
              </span>
            </div>

            {/* Messages scrolling stack */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gradient-to-b from-slate-950 to-slate-950/90 scrollbar-thin">
              {messages.map((msg, index) => {
                const isAssistant = msg.role === 'assistant';
                return (
                  <div
                    key={index}
                    className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} items-start space-x-2 text-left`}
                  >
                    <div
                      className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                        isAssistant
                          ? 'bg-slate-900/70 border border-slate-850 text-slate-200'
                          : 'bg-cold-500 text-white border border-cold-400/20'
                      }`}
                    >
                      <p className="whitespace-pre-wrap font-sans text-xs md:text-sm">{msg.content}</p>
                      <span className="block text-[8px] font-mono text-slate-400/80 mt-1 text-right uppercase">
                        {isAssistant ? 'Forensic System' : 'Secured User'}
                      </span>
                    </div>

                    {isAssistant && (
                      <button
                        type="button"
                        onClick={() => toggleSpeak(msg.content, index)}
                        className={`p-2 rounded-lg border transition-all cursor-pointer active:scale-90 self-center ${
                          activeSpeakingIndex === index
                            ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-400 animate-pulse'
                            : 'bg-slate-900/80 border-slate-850 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/20'
                        }`}
                        title={lang === 'it' ? 'Ascolta risposta' : 'Listen to response'}
                      >
                        {activeSpeakingIndex === index ? (
                          <Square className="w-3.5 h-3.5 fill-cyan-400/20" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>
                );
              })}

              {/* Glowing dynamic typing/loading feedback */}
              {isLoading && (
                <div className="flex justify-start text-left">
                  <div className="bg-slate-900/70 border border-slate-850 text-slate-300 rounded-xl px-4 py-3 text-sm flex items-center space-x-2">
                    <span className="text-xs font-mono text-cold-400">// ANALIZZANDO GLI ATTI</span>
                    <div className="flex space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cold-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-cold-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-cold-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>

            {/* Preset prompt selectors inside the widget */}
            {messages.length < 3 && !isLoading && (
              <div className="px-4 py-2 border-t border-slate-900 bg-slate-950 flex flex-wrap gap-2 justify-start">
                {presetQuestions.map((q, index) => (
                  <button
                    key={index}
                    onClick={() => handleSend(q)}
                    className="text-[11px] font-sans text-cold-300 hover:text-white bg-slate-900/50 hover:bg-slate-900 border border-slate-850 rounded-full px-3 py-1.5 text-left transition-colors cursor-pointer active:scale-95"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Bottom Input Area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-4 bg-slate-900 border-t border-slate-850 flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  isRecording 
                    ? (lang === 'it' ? 'Ascolto attivo... parla ora' : 'Listening... speak now') 
                    : (lang === 'it' ? 'Scrivi un quesito forense...' : 'Type a forensic inquiry...')
                }
                disabled={isLoading}
                className="flex-1 bg-slate-950 text-slate-100 border border-slate-850 rounded-lg px-3.5 py-3 text-xs md:text-sm focus:outline-none focus:border-cold-400 disabled:opacity-50 font-sans"
              />

              {isSpeechSupported && (
                <button
                  type="button"
                  onClick={toggleRecording}
                  disabled={isLoading}
                  className={`p-3 rounded-lg border transition-all cursor-pointer active:scale-95 flex items-center justify-center ${
                    isRecording
                      ? 'bg-red-600 border-red-500 text-white animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.5)]'
                      : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/20'
                  }`}
                  title={
                    lang === 'it' 
                      ? (isRecording ? 'Ferma dettatura' : 'Dettatura vocale') 
                      : (isRecording ? 'Stop voice typing' : 'Voice typing')
                  }
                >
                  {isRecording ? (
                    <MicOff className="w-4 h-4 text-white" />
                  ) : (
                    <Mic className="w-4 h-4 text-cyan-400" />
                  )}
                </button>
              )}

              <button
                type="submit"
                disabled={isLoading || (!inputValue.trim() && !isRecording)}
                className="p-3 rounded-lg bg-cold-500 hover:bg-cold-600 disabled:bg-slate-800 disabled:text-slate-600 text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95 border border-cold-400/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
