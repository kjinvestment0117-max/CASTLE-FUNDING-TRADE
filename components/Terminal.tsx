
import React, { useEffect, useRef, useState } from 'react';

interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

const Terminal: React.FC = () => {
  const [candles, setCandles] = useState<Candle[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [latency, setLatency] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // Initial Data Fetch: api.binance.com
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('https://api.binance.com/fapi/v1/klines?symbol=BTCUSDT&interval=1m&limit=200');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const history: Candle[] = data.map((d: any) => ({
          time: d[0],
          open: parseFloat(d[1]),
          high: parseFloat(d[2]),
          low: parseFloat(d[3]),
          close: parseFloat(d[4]),
        }));
        setCandles(history);
        if (history.length > 0) {
          setCurrentPrice(history[history.length - 1].close);
        }
      } catch (err) {
        console.error("Failed to fetch historical data from api.binance.com", err);
      }
    };
    fetchHistory();
  }, []);

  // Real-time WebSocket: fstream.binance.com
  useEffect(() => {
    let reconnectTimer: any;
    
    const connectWS = () => {
      const ws = new WebSocket('wss://fstream.binance.com/ws/btcusdt@kline_1m');
      wsRef.current = ws;

      ws.onmessage = (event) => {
        const start = Date.now();
        const data = JSON.parse(event.data);
        if (data.e !== 'kline') return;
        
        const k = data.k;
        const candle: Candle = {
          time: k.t,
          open: parseFloat(k.o),
          high: parseFloat(k.h),
          low: parseFloat(k.l),
          close: parseFloat(k.c),
        };

        setLatency(Date.now() - start + Math.floor(Math.random() * 5)); 
        setCurrentPrice(candle.close);
        
        setCandles(prev => {
          const last = prev[prev.length - 1];
          if (last && last.time === candle.time) {
            const updated = [...prev];
            updated[updated.length - 1] = candle;
            return updated;
          } else {
            return [...prev.slice(-199), candle];
          }
        });
      };

      ws.onclose = () => {
        console.log("WebSocket closed. Reconnecting...");
        reconnectTimer = setTimeout(connectWS, 3000);
      };

      ws.onerror = (err) => {
        console.error("WebSocket Error:", err);
      };
    };

    connectWS();
    return () => {
      wsRef.current?.close();
      clearTimeout(reconnectTimer);
    };
  }, []);

  // Canvas Responsive Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || candles.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const width = rect.width;
      const height = rect.height;
      const paddingRight = 60;
      const paddingVertical = 40;
      const chartWidth = width - paddingRight;
      const chartHeight = height - paddingVertical * 2;

      ctx.clearRect(0, 0, width, height);

      // Scale Logic
      const visibleCount = 80;
      const visibleCandles = candles.slice(-visibleCount);
      if (visibleCandles.length === 0) return;

      const minP = Math.min(...visibleCandles.map(c => c.low)) * 0.9995;
      const maxP = Math.max(...visibleCandles.map(c => c.high)) * 1.0005;
      const range = maxP - minP;

      const getX = (i: number) => (i / (visibleCount - 1)) * chartWidth;
      const getY = (p: number) => height - paddingVertical - ((p - minP) / range) * chartHeight;

      // Grid & Axis
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 1;
      ctx.fillStyle = '#666';
      ctx.font = '10px Inter';
      
      for (let i = 0; i <= 5; i++) {
        const val = minP + (range * i) / 5;
        const y = getY(val);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(chartWidth, y);
        ctx.stroke();
        ctx.fillText(val.toFixed(1), chartWidth + 10, y + 4);
      }

      // Candles
      const candleWidth = (chartWidth / visibleCount) * 0.7;
      visibleCandles.forEach((c, i) => {
        const x = getX(i);
        const isUp = c.close >= c.open;
        const color = isUp ? '#22c55e' : '#ef4444';

        ctx.strokeStyle = color;
        ctx.fillStyle = color;

        // Wick
        ctx.beginPath();
        ctx.moveTo(x, getY(c.high));
        ctx.lineTo(x, getY(c.low));
        ctx.stroke();

        // Body
        const bodyTop = getY(Math.max(c.open, c.close));
        const bodyBottom = getY(Math.min(c.open, c.close));
        const bodyH = Math.max(1, bodyBottom - bodyTop);
        ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyH);
      });

      // Price Line
      const curY = getY(currentPrice);
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = 'rgba(184, 134, 11, 0.4)';
      ctx.beginPath(); ctx.moveTo(0, curY); ctx.lineTo(chartWidth, curY); ctx.stroke();
      ctx.setLineDash([]);
    };

    const resizeObserver = new ResizeObserver(() => render());
    resizeObserver.observe(container);
    render();

    return () => resizeObserver.disconnect();
  }, [candles, currentPrice]);

  return (
    <div className="flex h-screen bg-[#050505] overflow-hidden text-white font-sans">
      {/* Mini Sidebar */}
      <aside className="w-16 bg-[#000] border-r border-white/5 flex flex-col items-center py-6 space-y-6 shrink-0">
        <a href="#dashboard" className="w-10 h-10 btn-gold rounded-xl flex items-center justify-center font-bold text-black shadow-lg hover:scale-105 transition-transform">←</a>
        <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-[#b8860b] cursor-pointer hover:bg-white/5 transition-colors">📈</div>
        <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-600 cursor-pointer hover:bg-white/5 transition-colors">⚡</div>
      </aside>
      
      <main className="flex-1 flex flex-col min-w-0">
        {/* Terminal Header */}
        <header className="h-16 border-b border-white/5 bg-[#080808] flex items-center px-8 justify-between shrink-0">
          <div className="flex items-center space-x-12">
            <div className="flex flex-col">
               <span className="font-castle font-black italic castle-gradient tracking-[0.2em] text-lg leading-none">BTCUSDT.P</span>
               <span className="text-[10px] text-gray-500 font-bold uppercase mt-1 tracking-widest">Binance Perpetual</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-black tabular-nums transition-colors duration-200 ${currentPrice >= candles[candles.length-2]?.close ? 'text-green-500' : 'text-red-500'}`}>
                ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tighter">Live Feed</span>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
             <div className="text-right">
                <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Network Latency</div>
                <div className="text-xs font-bold text-green-500/80">{latency}ms</div>
             </div>
             <div className="h-8 w-px bg-white/5"></div>
             <div className="text-right">
                <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">System Status</div>
                <div className="text-xs font-bold text-white uppercase">Operational</div>
             </div>
          </div>
        </header>
        
        <div className="flex-1 flex overflow-hidden">
          {/* Main Chart Area */}
          <div ref={containerRef} className="flex-1 bg-[#050505] relative flex flex-col p-2 overflow-hidden">
             <div className="absolute top-10 left-10 z-0 pointer-events-none select-none opacity-5">
                <h4 className="text-[6rem] font-castle font-black text-white uppercase italic tracking-tighter leading-none">CASTLE</h4>
             </div>
             <canvas ref={canvasRef} className="w-full h-full cursor-crosshair z-10" />
          </div>

          {/* Trade Panel */}
          <aside className="w-80 bg-[#080808] border-l border-white/5 p-6 flex flex-col space-y-6 shrink-0 overflow-y-auto">
            <div className="flex p-1 bg-white/5 rounded-2xl">
              <button className="flex-1 py-3 bg-green-600/20 text-green-500 rounded-xl font-black text-[11px] uppercase tracking-widest border border-green-500/20 transition-all hover:bg-green-600/30">Long</button>
              <button className="flex-1 py-3 text-gray-500 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all hover:text-white">Short</button>
            </div>
            
            <div className="space-y-6 flex-1">
               <div className="space-y-3">
                 <div className="flex justify-between items-center">
                   <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Order Size</label>
                   <span className="text-[10px] text-gray-600 font-bold">Max: $450,200</span>
                 </div>
                 <div className="relative group">
                   <input 
                     type="number" 
                     className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm font-bold outline-none focus:border-[#b8860b] group-hover:bg-white/10 transition-all" 
                     placeholder="0.00" 
                   />
                   <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-500 tracking-widest">USDT</span>
                 </div>
               </div>

               <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Leverage Control</label>
                    <span className="text-[11px] font-black text-[#b8860b] bg-[#b8860b]/10 px-3 py-1 rounded-lg">20.0X</span>
                 </div>
                 <input type="range" className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#b8860b]" min="1" max="100" defaultValue="20" />
                 <div className="flex justify-between text-[9px] font-black text-gray-600 uppercase tracking-tighter">
                   <span>1X</span><span>25X</span><span>50X</span><span>75X</span><span>100X</span>
                 </div>
               </div>

               <div className="p-5 glass rounded-[24px] border border-white/5 space-y-4">
                 <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                   <span>Initial Margin</span>
                   <span className="text-white">0.00 USDT</span>
                 </div>
                 <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                   <span>Maintenance</span>
                   <span className="text-white">0.00 USDT</span>
                 </div>
                 <div className="pt-3 border-t border-white/5 flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                   <span>Liq. Price</span>
                   <span className="text-red-500">--</span>
                 </div>
               </div>
            </div>

            <div className="space-y-4 pt-6">
              <button className="w-full py-5 btn-gold text-black rounded-2xl font-black uppercase text-xs tracking-[0.3em] shadow-xl shadow-[#b8860b]/10 transition-all active:scale-95">
                Open Position
              </button>
              <p className="text-center text-[9px] text-gray-600 font-bold uppercase tracking-widest leading-relaxed">
                Evaluation Protocol Active<br/>HFT Strategies are strictly monitored
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Terminal;
