import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, ShieldCheck, HelpCircle, Activity } from 'lucide-react';
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
      {!isOpen && (
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
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            // Full-screen on mobile (w-full h-full inset-0), compact overlay on desktop
            className="fixed md:bottom-6 md:right-6 md:w-[420px] md:h-[620px] md:rounded-2xl w-full h-full inset-0 z-50 bg-slate-950 border border-slate-900 flex flex-col shadow-2xl overflow-hidden"
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
                    className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} text-left`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                        isAssistant
                          ? 'bg-slate-900/70 border border-slate-850 text-slate-200'
                          : 'bg-cold-500 text-white border border-cold-400/20'
                      }`}
                    >
                      <p className="whitespace-pre-wrap font-sans">{msg.content}</p>
                      <span className="block text-[8px] font-mono text-slate-400/80 mt-1 text-right uppercase">
                        {isAssistant ? 'Forensic System' : 'Secured User'}
                      </span>
                    </div>
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
                placeholder={lang === 'it' ? 'Scrivi un quesito forense...' : 'Type a forensic inquiry...'}
                disabled={isLoading}
                className="flex-1 bg-slate-950 text-slate-100 border border-slate-850 rounded-lg px-3.5 py-3 text-sm focus:outline-none focus:border-cold-400 disabled:opacity-50 font-sans"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
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
