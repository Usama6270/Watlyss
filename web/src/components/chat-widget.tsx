'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  ChevronLeft, 
  RotateCcw, 
  Smile, 
  Paperclip, 
  ExternalLink,
  Bot,
  User,
  CheckCircle2,
  Package,
  Truck,
  Clock,
  AlertCircle,
  Calculator,
  PhoneCall,
  Sparkles
} from 'lucide-react';

interface OrderCardData {
  orderNumber: string;
  status: string;
  total?: number;
  createdAt?: string;
  itemsCount?: number;
  customerName?: string;
  deliveryAddress?: string;
}

interface CalculatorCardData {
  bottlesCount: number;
  refillCost: number;
  deliveryFee: number;
  discountName: string;
  discountPercent: number;
  discountSavings: number;
  monthlyTotal: number;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  type?: 'text' | 'order_cards' | 'calculator_card' | 'whatsapp_link';
  ordersData?: OrderCardData[];
  calcData?: CalculatorCardData;
  whatsappUrl?: string;
}

const ACTION_CHIPS = [
  { id: 'pricing', label: '💰 Pricing & Plans' },
  { id: 'tracking', label: '🚚 Order Tracking' },
  { id: 'subscription', label: '⏸️ Pause/Resume Subscription' },
  { id: 'discounts', label: '🎁 Active Discounts' },
  { id: 'human', label: '💬 Talk to Human (WhatsApp)' },
];

const INITIAL_BOT_GREETING = "👋 Welcome to **Watlys Assistant**! How can I help you with your 19L mineral water delivery today?";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // State machine flags
  const [awaitingTrackingQuery, setAwaitingTrackingQuery] = useState(false);
  const [awaitingCalculatorInput, setAwaitingCalculatorInput] = useState(false);
  const [awaitingLeadDetails, setAwaitingLeadDetails] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: INITIAL_BOT_GREETING,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
    }
  }, [messages, isOpen, isTyping]);

  const pushBotMessage = (
    text: string, 
    type: 'text' | 'order_cards' | 'calculator_card' | 'whatsapp_link' = 'text',
    extra?: { ordersData?: OrderCardData[]; calcData?: CalculatorCardData; whatsappUrl?: string }
  ) => {
    const newMsg: Message = {
      id: (Date.now() + Math.random()).toString(),
      sender: 'bot',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type,
      ordersData: extra?.ordersData,
      calcData: extra?.calcData,
      whatsappUrl: extra?.whatsappUrl,
    };

    setMessages((prev) => [...prev, newMsg]);
    setIsTyping(false);

    if (!isOpen) {
      setUnreadCount((c) => c + 1);
    }
  };

  const resetAllAwaitingFlags = () => {
    setAwaitingTrackingQuery(false);
    setAwaitingCalculatorInput(false);
    setAwaitingLeadDetails(false);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'bot',
        text: INITIAL_BOT_GREETING,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    resetAllAwaitingFlags();
  };

  // Dynamic Plan Calculator Logic
  const calculatePlan = (bottlesCount: number) => {
    const basePrice = 320; // PKR per bottle
    const flatDeliveryFeePerTrip = 100; // PKR per delivery
    const totalTrips = 4; // Monthly assumption
    const refillCost = bottlesCount * basePrice;
    const deliveryFee = totalTrips * flatDeliveryFeePerTrip;
    const subtotal = refillCost + deliveryFee;

    let discountPercent = 5;
    let discountName = "Individual Discount (5%)";
    if (bottlesCount >= 16) {
      discountPercent = 15;
      discountName = "Corporate Discount (15%)";
    } else if (bottlesCount >= 8) {
      discountPercent = 10;
      discountName = "Student / Premium Discount (10%)";
    } else if (bottlesCount >= 4) {
      discountPercent = 8;
      discountName = "Family Discount (8%)";
    }

    const discountSavings = Math.round((subtotal * discountPercent) / 100);
    const monthlyTotal = subtotal - discountSavings;

    return {
      bottlesCount,
      refillCost,
      deliveryFee,
      discountName,
      discountPercent,
      discountSavings,
      monthlyTotal,
    };
  };

  // Order Search API Call
  const fetchOrderTracking = async (query: string) => {
    setIsTyping(true);
    try {
      const res = await fetch(`/api/orders?query=${encodeURIComponent(query)}`);
      const data = await res.json();

      if (data.success && data.orders && data.orders.length > 0) {
        const orderCards: OrderCardData[] = data.orders.map((o: any) => ({
          orderNumber: o.orderNumber || o._id.replace(/^drafts\./, ''),
          status: o.orderStatus || o.status || 'Pending',
          total: o.total || o.pricingSummary?.grandTotal || 0,
          createdAt: o._createdAt ? new Date(o._createdAt).toLocaleDateString() : 'Recent',
          itemsCount: o.items ? o.items.length : 1,
          customerName: o.customerName || 'Valued Customer',
          deliveryAddress: o.deliveryAddress || o.city || 'Standard Delivery',
        }));

        pushBotMessage(
          `🔍 Found **${orderCards.length} order(s)** matching "${query}":`,
          'order_cards',
          { ordersData: orderCards }
        );
      } else {
        pushBotMessage(
          `⚠️ No live orders found matching **"${query}"**.\n\nPlease double check your Order ID (e.g. WAT-2026-XXXX) or registered Phone Number, or chat directly with our WhatsApp team.`,
          'text'
        );
      }
    } catch (err) {
      pushBotMessage(
        `⚠️ Could not fetch order details at this moment. Please verify your connection or contact support directly on WhatsApp.`,
        'text'
      );
    } finally {
      setIsTyping(false);
      setAwaitingTrackingQuery(false);
    }
  };

  const processUserInput = async (userText: string, isActionChipClick: boolean = false) => {
    const raw = userText.trim();
    if (!raw) return;

    // Push User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: raw,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const q = raw.toLowerCase();

    // Reset flags on chip click
    if (isActionChipClick) {
      resetAllAwaitingFlags();
    }

    // 1. Common Greetings
    const isGreeting = /^(hello|hi|hey|hlo|hy|aoa|assalam|alaikum|salam|good morning|good evening|good afternoon|watlys)/i.test(q);
    if (isGreeting && !isActionChipClick) {
      resetAllAwaitingFlags();
      setTimeout(() => {
        pushBotMessage(
          `👋 Hello! Welcome to **Watlys Assistant**.\n\nHow can I help you today? You can check prices, track an order, manage subscriptions, or ask any question!`,
          'text'
        );
      }, 400);
      return;
    }

    // 2. Thanks / Appreciation
    const isThanks = /^(thanks|thank you|shukriya|thx|jazakallah|great)/i.test(q);
    if (isThanks && !isActionChipClick) {
      resetAllAwaitingFlags();
      setTimeout(() => {
        pushBotMessage(
          `😊 You're very welcome! Stay healthy and hydrated with Watlys 19L pure mineral water. Let me know if you need anything else!`,
          'text'
        );
      }, 400);
      return;
    }

    // 3. Awaiting Tracking Query State
    if (awaitingTrackingQuery && !isActionChipClick) {
      await fetchOrderTracking(raw);
      return;
    }

    // 4. Awaiting Calculator Input State
    if (awaitingCalculatorInput && !isActionChipClick) {
      const numMatch = raw.match(/\d+/);
      if (numMatch && !q.includes('price') && !q.includes('track') && !q.includes('subscription')) {
        const bottles = parseInt(numMatch[0], 10);
        const calcResult = calculatePlan(bottles);
        pushBotMessage(
          `📊 Here is your estimated monthly plan calculation for **${bottles} bottle(s)** per month:`,
          'calculator_card',
          { calcData: calcResult }
        );
        setAwaitingCalculatorInput(false);
        return;
      } else {
        setAwaitingCalculatorInput(false);
      }
    }

    // 5. Awaiting Lead Details State
    if (awaitingLeadDetails && !isActionChipClick) {
      const waMsg = encodeURIComponent(`Hello Watlys Support! Customer inquiry/details: ${raw}`);
      const waUrl = `https://wa.me/923000000000?text=${waMsg}`;
      pushBotMessage(
        `✅ Thanks! Click below to open direct WhatsApp concierge support with your pre-filled inquiry:`,
        'whatsapp_link',
        { whatsappUrl: waUrl }
      );
      setAwaitingLeadDetails(false);
      return;
    }

    // 6. Intent Handlers
    setTimeout(() => {
      if (q.includes('pricing') || q.includes('plan') || q.includes('cost') || q.includes('rate') || q.includes('price') || q.includes('💰')) {
        pushBotMessage(
          `💧 **Watlys 19L Pricing & Rates Engine:**\n\n• **Base Refill Rate:** PKR 320 / 19L bottle\n• **Delivery Charge:** PKR 100 flat fee per trip\n\nWould you like to calculate an estimated monthly subscription bill? Type the number of bottles per month (e.g. **4**, **8**, **12**):`,
          'text'
        );
        setAwaitingCalculatorInput(true);
        return;
      }

      if (q.includes('track') || q.includes('order status') || q.includes('order') || q.includes('where is my bottle') || q.includes('🚚')) {
        pushBotMessage(
          `🚚 **Live Order Tracking:**\n\nPlease enter your **Order Number** (e.g., WAT-2026-1001) or registered **Phone Number** below to fetch live status:`,
          'text'
        );
        setAwaitingTrackingQuery(true);
        return;
      }

      if (q.includes('pause') || q.includes('resume') || q.includes('subscription') || q.includes('account') || q.includes('⏸️')) {
        pushBotMessage(
          `⏸️ **Pause / Resume Subscription:**\n\nYou can easily manage your hydration deliveries anytime:\n1. Log into your dashboard at [/account](/account).\n2. Click on **Subscriptions & Deliveries**.\n3. Toggle **Pause** or **Resume**, or modify bottle quantities & delivery day.\n\nChanges take effect immediately before your next scheduled delivery window!`,
          'text'
        );
        return;
      }

      if (q.includes('discount') || q.includes('tier') || q.includes('student') || q.includes('family') || q.includes('corporate') || q.includes('🎁')) {
        pushBotMessage(
          `🎁 **Watlys Tiered Savings Program:**\n\n• 🎓 **Student Tier:** 10% OFF\n• 👨‍👩‍👧‍👦 **Family Tier:** 8% OFF\n• 🏢 **Corporate Tier:** 15% OFF\n• 👤 **Individual Tier:** 5% OFF\n\nTier discounts automatically apply to recurring monthly hydration plans!`,
          'text'
        );
        return;
      }

      if (q.includes('human') || q.includes('whatsapp') || q.includes('agent') || q.includes('representative') || q.includes('support') || q.includes('💬')) {
        setAwaitingLeadDetails(true);
        pushBotMessage(
          `💬 **Talk to Human Concierge:**\n\nPlease reply with your **Name & Phone Number** (or question summary) to connect instantly with our WhatsApp support agent:`,
          'text'
        );
        return;
      }

      if (q.includes('location') || q.includes('city') || q.includes('coverage') || q.includes('deliver to') || q.includes('lahore') || q.includes('karachi') || q.includes('islamabad')) {
        pushBotMessage(
          `📍 **Delivery Coverage Areas:**\nWe deliver fresh 19L mineral water bottles across major cities including **Lahore, Karachi, Islamabad, and Rawalpindi**! Check out [/locations](/locations) for full details.`,
          'text'
        );
        return;
      }

      if (q.includes('quality') || q.includes('purification') || q.includes('clean') || q.includes('tds') || q.includes('mineral')) {
        pushBotMessage(
          `🔬 **Watlys 19L Water Quality:**\nOur water undergoes multi-stage filtration including Reverse Osmosis, UV Sterilization, and precise mineral balancing to ensure maximum purity and refreshing taste.`,
          'text'
        );
        return;
      }

      const directNum = raw.match(/^\d+$/);
      if (directNum) {
        const bottles = parseInt(directNum[0], 10);
        const calcResult = calculatePlan(bottles);
        pushBotMessage(
          `📊 Monthly calculation for **${bottles} bottle(s)** per month:`,
          'calculator_card',
          { calcData: calcResult }
        );
        return;
      }

      const waMsg = encodeURIComponent(`Hello Watlys Support! Query: ${raw}`);
      const waUrl = `https://wa.me/923000000000?text=${waMsg}`;

      pushBotMessage(
        `I'm trained on Watlys 19L water pricing, order tracking, subscriptions, and discounts!\n\nFor complex or custom queries, you can connect directly with our live WhatsApp team:`,
        'whatsapp_link',
        { whatsappUrl: waUrl }
      );
    }, 450);
  };

  // Helper for rendering formatted Markdown text and links
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = linkRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        const linkText = match[1];
        const linkUrl = match[2];
        const isExternal = linkUrl.startsWith('http');
        
        parts.push(
          <a
            key={match.index}
            href={linkUrl}
            target={isExternal ? '_blank' : '_self'}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center gap-1 font-semibold underline underline-offset-2 text-blue-600 dark:text-sky-400 hover:text-blue-800 dark:hover:text-sky-200 transition-colors"
          >
            {linkText}
            {isExternal && <ExternalLink className="w-3 h-3 inline" />}
          </a>
        );
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      const processedLine = parts.map((part, partIdx) => {
        if (typeof part !== 'string') return part;
        const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
        return boldParts.map((bPart, bIdx) => {
          if (bPart.startsWith('**') && bPart.endsWith('**')) {
            return (
              <strong key={bIdx} className="font-semibold text-slate-900 dark:text-white">
                {bPart.slice(2, -2)}
              </strong>
            );
          }
          return bPart;
        });
      });

      return (
        <span key={lineIdx} className="block leading-relaxed">
          {processedLine}
          {lineIdx < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  const getStatusBadge = (status: string) => {
    const s = (status || '').toLowerCase();
    if (s.includes('deliver') && !s.includes('out')) {
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-blue-600" /> Delivered
        </span>
      );
    }
    if (s.includes('out') || s.includes('shipping')) {
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-200 flex items-center gap-1">
          <Truck className="w-3 h-3 text-sky-600 animate-pulse" /> Out for Delivery
        </span>
      );
    }
    if (s.includes('cancel')) {
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 text-rose-600" /> Cancelled
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 flex items-center gap-1">
        <Clock className="w-3 h-3 text-amber-600" /> Processing
      </span>
    );
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[9999] flex flex-col items-end font-sans">
      {/* Chat Window Container */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-32px)] max-w-[390px] sm:w-[400px] h-[540px] max-h-[84vh] rounded-2xl bg-white dark:bg-[#09132c] shadow-2xl border border-blue-100 dark:border-blue-900/40 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header Bar - Watlys Ocean Blue Header */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 p-3.5 text-white flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center font-bold text-white shadow-inner backdrop-blur-md">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-sky-300 border-2 border-blue-700 rounded-full animate-pulse"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight text-white flex items-center gap-1.5">
                  Watlys Assistant
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-blue-100 font-medium">
                  <span className="w-2 h-2 rounded-full bg-sky-300"></span>
                  <span>Active Now • 19L Support</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg hover:bg-white/15 text-blue-100 hover:text-white transition-colors cursor-pointer"
                title="Reset / Clear Chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/15 text-blue-100 hover:text-white transition-colors cursor-pointer"
                title="Minimize"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Subheader Notice */}
          <div className="bg-blue-50/90 dark:bg-blue-950/40 border-b border-blue-100 dark:border-blue-900/30 px-3.5 py-1.5 flex items-center justify-between text-[11px] text-blue-800 dark:text-blue-300">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400 shrink-0" />
              <span className="font-medium">24/7 Automated Hydration Assistant</span>
            </div>
            <span className="text-[10px] text-blue-600 dark:text-sky-400 font-semibold">Watlys 19L</span>
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-3.5 space-y-3.5 overflow-y-auto bg-slate-50/70 dark:bg-[#070e20]/70 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-slate-700 dark:bg-slate-800 text-white'
                      : 'bg-blue-600 text-white shadow-sm'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Bubble Container */}
                <div className="max-w-[85%] space-y-2">
                  <div
                    className={`p-3 rounded-2xl shadow-xs text-xs sm:text-sm ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-xs'
                        : 'bg-slate-100 dark:bg-[#0d1838] border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-xs'
                    }`}
                  >
                    <div>{renderFormattedText(msg.text)}</div>

                    {/* Order Cards */}
                    {msg.type === 'order_cards' && msg.ordersData && (
                      <div className="mt-2.5 space-y-2">
                        {msg.ordersData.map((ord, idx) => (
                          <div
                            key={idx}
                            className="bg-blue-50/80 dark:bg-[#09132c] border border-blue-200/80 dark:border-blue-800/60 p-2.5 rounded-xl space-y-1.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-blue-950 dark:text-blue-100 text-xs flex items-center gap-1">
                                <Package className="w-3.5 h-3.5 text-blue-600" />
                                {ord.orderNumber}
                              </span>
                              {getStatusBadge(ord.status)}
                            </div>
                            <div className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-between">
                              <span>Total: <strong className="text-blue-700 dark:text-sky-300">PKR {ord.total?.toLocaleString() || '320'}</strong></span>
                              <span>Date: {ord.createdAt}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Calculator Card */}
                    {msg.type === 'calculator_card' && msg.calcData && (
                      <div className="mt-2.5 bg-blue-50/80 dark:bg-[#09132c] border border-blue-200 dark:border-blue-800 p-3 rounded-xl space-y-2 text-xs">
                        <div className="flex items-center justify-between font-bold text-blue-950 dark:text-blue-100 border-b border-blue-200/60 dark:border-blue-800/60 pb-1.5">
                          <span className="flex items-center gap-1">
                            <Calculator className="w-4 h-4 text-blue-600" />
                            Monthly Estimate
                          </span>
                          <span className="text-blue-600 font-extrabold">{msg.calcData.bottlesCount} Bottles/mo</span>
                        </div>
                        <div className="space-y-1 text-[11px] text-slate-700 dark:text-slate-300">
                          <div className="flex justify-between">
                            <span>Refill Cost ({msg.calcData.bottlesCount} × PKR 320):</span>
                            <span className="font-semibold">PKR {msg.calcData.refillCost.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Delivery Fee (4 Trips × PKR 100):</span>
                            <span className="font-semibold">PKR {msg.calcData.deliveryFee.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-blue-700 dark:text-sky-400 font-semibold">
                            <span>{msg.calcData.discountName}:</span>
                            <span>- PKR {msg.calcData.discountSavings.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="border-t border-blue-200/60 dark:border-blue-800/60 pt-1.5 flex justify-between items-center font-bold text-blue-950 dark:text-blue-50 text-xs">
                          <span>Estimated Monthly Total:</span>
                          <span className="text-sm font-extrabold text-blue-600 dark:text-sky-400">
                            PKR {msg.calcData.monthlyTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* WhatsApp CTA Link Button */}
                    {msg.type === 'whatsapp_link' && msg.whatsappUrl && (
                      <div className="mt-2.5">
                        <a
                          href={msg.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-md transition-all active:scale-98"
                        >
                          <PhoneCall className="w-4 h-4" />
                          <span>Open WhatsApp Concierge</span>
                          <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-80" />
                        </a>
                      </div>
                    )}

                    <span
                      className={`block text-[9px] mt-1 text-right ${
                        msg.sender === 'user' ? 'text-blue-100/90' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs italic">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-100 dark:bg-[#0d1838] border border-slate-200/80 dark:border-slate-800 px-3.5 py-2.5 rounded-2xl rounded-tl-xs flex items-center gap-1.5 shadow-xs text-xs text-slate-600 dark:text-slate-300">
                  <span className="font-semibold text-blue-700 dark:text-sky-300 text-[11px]">Assistant is typing</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Action Chips Container */}
          <div className="px-3 py-2 bg-blue-50/60 dark:bg-[#070e20] border-t border-blue-100 dark:border-blue-900/40 flex gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
            {ACTION_CHIPS.map((chip) => (
              <button
                key={chip.id}
                onClick={() => processUserInput(chip.label, true)}
                className="text-[11px] font-medium whitespace-nowrap bg-white dark:bg-[#0d1838] hover:bg-blue-50 dark:hover:bg-blue-950/60 text-blue-700 dark:text-sky-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1.5 rounded-full transition-all active:scale-95 shrink-0 cursor-pointer shadow-2xs"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input Form Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              processUserInput(input, false);
            }}
            className="p-2.5 bg-white dark:bg-[#09132c] border-t border-blue-100 dark:border-blue-900/40 flex items-center gap-2 shrink-0"
          >
            <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 pl-1">
              <button
                type="button"
                className="p-1 hover:text-blue-600 transition-colors cursor-pointer"
                title="Add emoji"
              >
                <Smile className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-1 hover:text-blue-600 transition-colors cursor-pointer"
                title="Attach file"
              >
                <Paperclip className="w-4 h-4" />
              </button>
            </div>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type here and press enter..."
              className="flex-1 bg-slate-100 dark:bg-[#0d1838] text-slate-800 dark:text-slate-100 text-xs sm:text-sm px-3.5 py-2 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/40 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />

            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Trigger Button - Watlys Ocean Blue */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-300 z-50 cursor-pointer"
        aria-label="Toggle Watlys Assistant"
      >
        {/* Ripple Pulse Effect */}
        <span className="absolute -inset-1 rounded-full bg-blue-500/40 animate-ping opacity-75 group-hover:opacity-100 pointer-events-none"></span>

        {isOpen ? (
          <X className="w-6 h-6 relative z-10 transition-transform duration-300 rotate-90" />
        ) : (
          <MessageCircle className="w-6 h-6 relative z-10 transition-transform duration-300 group-hover:scale-110" />
        )}

        {/* Unread Badge Indicator */}
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-rose-500 text-white text-[10px] font-extrabold border-2 border-white dark:border-[#09132c] rounded-full flex items-center justify-center px-1 shadow-md">
            {unreadCount}
          </span>
        )}

        {/* Active Online Indicator (when unread is 0) */}
        {!isOpen && unreadCount === 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-sky-300 border-2 border-white dark:border-[#09132c] rounded-full flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-blue-950 rounded-full"></span>
          </span>
        )}
      </button>
    </div>
  );
}

export default ChatWidget;
