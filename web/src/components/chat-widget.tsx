'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Headphones, CheckCircle2, User, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hi! Welcome to Watlys. How can I help you with your mineral water order or delivery today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const messageText = textToSend || input.trim();
    if (!messageText) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const lower = messageText.toLowerCase();
      let replyText = "Thank you for reaching out! A Watlys representative will assist you shortly. You can also view our 19L mineral water packages on the Services page.";

      if (lower.includes('order') || lower.includes('buy') || lower.includes('cart')) {
        replyText = "You can easily place an order through our shop or packages page! We deliver fresh 19L mineral water bottles directly to your home or office.";
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('rate') || lower.includes('plan')) {
        replyText = "Our 19L premium mineral water refills start at low rates with monthly subscription discounts! Check out our Interactive Calculator on the home page.";
      } else if (lower.includes('location') || lower.includes('city') || lower.includes('delivery') || lower.includes('coverage')) {
        replyText = "We deliver across Lahore, Karachi & Islamabad. Please check our Locations page to verify delivery in your area!";
      } else if (lower.includes('contact') || lower.includes('phone') || lower.includes('whatsapp') || lower.includes('number')) {
        replyText = "You can chat directly with our WhatsApp concierge at +92 300 1234567 or email us at care@watlys.com!";
      }

      const botReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[9999] flex flex-col items-end font-sans">
      {/* Floating Chat Window - Opens right on the page */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-40px)] max-w-[360px] sm:w-96 rounded-2xl bg-white dark:bg-[#0e1738] shadow-2xl border border-sky-100 dark:border-sky-900/40 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 flex flex-col h-[460px] max-h-[80vh]">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0064D0] to-[#0080FF] p-4 text-white flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-white shadow-inner">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm leading-snug">Watlys Live Support</h4>
                <span className="text-[11px] text-sky-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Online • Instant Assistance
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-3.5 space-y-3 overflow-y-auto bg-slate-50/50 dark:bg-[#0a1128]/50 text-xs sm:text-sm">
            <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/50 text-sky-900 dark:text-sky-200 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0064D0] shrink-0" />
              <span>Watlys Live Assistant is online!</span>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow ${
                    msg.sender === 'user'
                      ? 'bg-slate-700 text-white'
                      : 'bg-[#0064D0] text-white'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : 'W'}
                </div>
                <div
                  className={`max-w-[82%] p-3 rounded-2xl shadow-sm text-xs sm:text-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#0064D0] text-white rounded-tr-xs'
                      : 'bg-white dark:bg-[#141f45] border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-xs'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-sky-100' : 'text-slate-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic">
                <div className="w-7 h-7 rounded-full bg-[#0064D0] text-white flex items-center justify-center text-xs font-bold">
                  W
                </div>
                <div className="bg-white dark:bg-[#141f45] border border-slate-100 dark:border-slate-800 px-3 py-2 rounded-2xl rounded-tl-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-1.5 bg-slate-100/70 dark:bg-[#0c1432] border-t border-slate-200/60 dark:border-slate-800 flex gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
            {['Water Order', 'Delivery Rates', 'Coverage Areas', 'Contact Support'].map((chip) => (
              <button
                key={chip}
                onClick={() => handleSendMessage(chip)}
                className="text-[11px] whitespace-nowrap bg-white dark:bg-[#141f45] hover:bg-sky-50 dark:hover:bg-[#1a2858] text-[#0064D0] dark:text-sky-300 border border-sky-100 dark:border-sky-900/50 px-2.5 py-1 rounded-full transition-all active:scale-95 shrink-0 cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Chat Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-white dark:bg-[#0e1738] border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-slate-100 dark:bg-[#141f45] text-slate-800 dark:text-slate-100 text-xs sm:text-sm px-3.5 py-2 rounded-xl outline-none focus:ring-2 focus:ring-[#0064D0]/40 transition-all placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 rounded-xl bg-[#0064D0] hover:bg-[#0052ad] text-white transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Chat Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-[#0064D0] to-[#0080FF] text-white shadow-xl shadow-[#0064D0]/30 hover:shadow-2xl hover:shadow-[#0064D0]/50 hover:scale-105 active:scale-95 transition-all duration-300 z-50 cursor-pointer"
        aria-label="Toggle Watlys Support Chat"
      >
        {/* Ripple Pulse Effect */}
        <span className="absolute -inset-1 rounded-full bg-[#0064D0]/40 animate-ping opacity-75 group-hover:opacity-100 pointer-events-none"></span>

        {isOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 transition-transform duration-300 rotate-90" />
        ) : (
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 transition-transform duration-300 group-hover:scale-110" />
        )}

        {/* Unread indicator */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-emerald-500 border-2 border-white dark:border-[#0a1128] rounded-full"></span>
        )}
      </button>
    </div>
  );
}
}
