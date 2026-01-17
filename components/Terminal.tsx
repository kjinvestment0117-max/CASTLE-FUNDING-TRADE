
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
  const [priceChange, setPriceChange] = useState<number>(0);
  const [latency, setLatency] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // Fetch Historical Data
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('https://fapi.binance.com/fapi/v1/klines?symbol=BTCUSDT&interval=1m&limit=200');
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
        console.error("Failed to fetch history", err);
      }
    };

    fetchHistory();
  }, []);

  // WebSocket Connection
  useEffect(() => {
    const connectWS = () => {
      const ws = new WebSocket('wss://fstream.binance.com/ws/btcusdt@kline_1m');
      wsRef.current = ws;

      ws.onmessage = (event) => {
        const start = Date.now();
        const data = JSON.parse(event.data);
        const k = data.k;
        const candle: Candle = {
          time: k.t,
          open: parseFloat(k.o),
          high: parseFloat(k.h),
          low: parseFloat(k.l),
          close: parseFloat(k.c),
        };

        setLatency(Date.now() - start + 2); // Mocking network latency + processing
        setCurrentPrice(candle.close);
        
        setCandles(prev => {
          const lastCandle = prev[prev.length - 1];
          if (lastCandle && lastCandle.time === candle.time) {
            const updated = [...prev];
            updated[updated.length - 1] = candle;
            return updated;
          } else {
            return [...prev.slice(-199), candle];
          }
        });
      };

      ws.onclose = () => setTimeout(connectWS, 3000);
    };

    connectWS();
    return () => wsRef.current?.close();
  }, []);

  // Chart Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || candles.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = 40;
    const chartWidth = width - padding;
    const chartHeight = height - padding;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Calculate Range
    const visibleCandles = candles.slice(-100);
    const minP = Math.min(...visibleCandles.map(c => c.low)) * 0.999;
    const maxP = Math.max(...visibleCandles.map(c => c.high)) * 1.001;
    const range = maxP - minP;

    const getX = (i: number) => (i / 100) * chartWidth;
    const getY = (p: number) => chartHeight - ((p - minP) / range) * chartHeight;

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = getY(minP + (range * i) / 5);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(chartWidth, y);
      ctx.stroke();
      
      ctx.fillStyle = '#666';
      ctx.font = '10px Inter';
      ctx.fillText((minP + (range * i) / 5).toFixed(0), chartWidth + 5, y + 4);
    }

    // Candles
    const candleWidth = (chartWidth / 100) * 0.8;

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
      const top = getY(Math.max(c.open, c.close));
      const bottom = getY(Math.min(c.open, c.close));
      const bodyHeight = Math.max(1, bottom - top);
      
      ctx.fillRect(x - candleWidth / 2, top, candleWidth, bodyHeight);
    });

    // Current Price Line
    const curY = getY(currentPrice);
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = 'rgba(184, 134, 11, 0.5)';
    ctx.beginPath();
    ctx.moveTo(0, curY);
    ctx.lineTo(chartWidth, curY);
    ctx.stroke();
    ctx.setLineDash([]);

  }, [candles, currentPrice]);

  return (
    <div className="flex h-screen bg-[#050505] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-16 bg-[#050505] border-r border-white/5 flex flex-col items-center py-6 space-y-6">
        <a href="#dashboard" className="w-10 h-10 btn-gold rounded-lg flex items-center justify-center font-bold text-black shadow-lg hover:scale-110 transition-transform">←</a>
        <div className="w-10 h-10 glass rounded-lg flex items-center justify-center text-[#b8860b] cursor-pointer hover:bg-white/5">📈</div>
        <div className="w-10 h-10 glass rounded-lg flex items-center justify-center text-gray-500 cursor-pointer hover:bg-white/5">💼</div>
        <div className="w-10 h-10 glass rounded-lg flex items-center justify-center text-gray-500 cursor-pointer hover:bg-white/5">⚡</div>
      </aside>
      
      <main className="flex-1 flex flex-col">
        {/* Terminal Header */}
        <header className="h-14 border-b border-white/5 bg-[#050505] flex items-center px-6 justify-between shrink-0">
          <div className="flex items-center space-x-8">
            <div className="flex flex-col">
               <span className="font-castle font-black italic castle-gradient tracking-widest leading-none">BTCUSDT.P</span>
               <span className="text-[9px] text-gray-500 font-bold uppercase mt-1">Binance Futures</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-sm font-black transition-colors duration-300 ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[9px] font-bold text-gray-600 uppercase">Mark Price</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex flex-col items-end">
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center">
                 {latency}ms
                 <div className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
               </span>
               <span className="text-[8px] font-bold text-gray-600 uppercase">Engine Status: Stable</span>
            </div>
          </div>
        </header>
        
        <div className="flex-1 grid grid-cols-4 overflow-hidden">
          {/* Main Chart Area */}
          <div className="col-span-3 bg-[#050505] relative border-r border-white/5 flex flex-col p-4">
             <div className="absolute top-8 left-8 z-10 pointer-events-none">
                <h4 className="text-3xl font-castle font-black text-white/5 uppercase italic tracking-widest">CASTLE_TERMINAL_V1</h4>
             </div>
             <canvas 
               ref={canvasRef} 
               className="w-full h-full cursor-crosshair"
             />
          </div>

          {/* Order Panel */}
          <div className="col-span-1 bg-[#050505] p-6 space-y-6 flex flex-col overflow-y-auto">
            <div className="flex space-x-2">
              <button className="flex-1 py-4 bg-green-600/10 text-green-500 border border-green-500/20 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-green-600/20 transition-all active:scale-95">BUY / LONG</button>
              <button className="flex-1 py-4 bg-red-600/10 text-red-500 border border-red-500/20 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600/20 transition-all active:scale-95">SELL / SHORT</button>
            </div>
            
            <div className="space-y-6 flex-1">
               <div className="space-y-3">
                 <div className="flex justify-between items-center">
                   <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Size (USDT)</label>
                   <span className="text-[10px] text-gray-600 font-bold">Max: 24,500</span>
                 </div>
                 <div className="relative">
                   <input 
                     type="number" 
                     className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm font-bold outline-none focus:border-[#b8860b] transition-colors" 
                     placeholder="0.00" 
                   />
                   <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-500">USDT</span>
                 </div>
               </div>

               <div className="space-y-4">
                 <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Leverage</label>
                    <span className="text-[10px] font-black text-[#b8860b] bg-[#b8860b]/10 px-2 py-1 rounded">20X ISOLATED</span>
                 </div>
                 <input 
                    type="range" 
                    className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-[#b8860b]" 
                    min="1" 
                    max="125" 
                 />
                 <div className="flex justify-between text-[8px] font-black text-gray-600 uppercase">
                   <span>1x</span>
                   <span>25x</span>
                   <span>50x</span>
                   <span>75x</span>
                   <span>100x</span>
                   <span>125x</span>
                 </div>
               </div>

               <div className="p-4 glass rounded-2xl border border-white/5 space-y-3">
                 <div className="flex justify-between text-[9px] font-bold text-gray-500 uppercase">
                   <span>Est. Liq Price</span>
                   <span className="text-white">$58,241.00</span>
                 </div>
                 <div className="flex justify-between text-[9px] font-bold text-gray-500 uppercase">
                   <span>Initial Margin</span>
                   <span className="text-white">124.50 USDT</span>
                 </div>
               </div>
            </div>

            <div className="space-y-3 mt-auto">
              <button className="w-full py-5 btn-gold text-black rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-[#b8860b]/20 active:scale-[0.98] transition-all">
                Execute Order
              </button>
              <p className="text-center text-[8px] text-gray-600 font-bold uppercase tracking-widest leading-relaxed">
                Orders are executed in the Castle simulation engine.<br/>Subject to evaluation compliance.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Terminal;
