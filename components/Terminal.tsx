
import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    LightweightCharts: any;
  }
}

interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

const Terminal: React.FC = () => {
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [latency, setLatency] = useState<number>(0);
  const [side, setSide] = useState<'LONG' | 'SHORT'>('LONG');
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const seriesRef = useRef<any>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // 1. Initialize Lightweight Chart
    const chart = window.LightweightCharts.createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#050505' },
        textColor: '#666',
        fontSize: 10,
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.03)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.03)' },
      },
      crosshair: {
        mode: 0,
        vertLine: { labelBackgroundColor: '#b8860b' },
        horzLine: { labelBackgroundColor: '#b8860b' },
      },
      rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.05)',
      },
      timeScale: {
        borderColor: 'rgba(255, 255, 255, 0.05)',
        timeVisible: true,
      },
    });

    const series = chart.addCandlestickSeries({
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderVisible: false,
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444',
    });

    chartRef.current = chart;
    seriesRef.current = series;

    // 2. Fetch Historical Data
    const fetchHistory = async () => {
      try {
        const response = await fetch('https://fapi.binance.com/fapi/v1/klines?symbol=BTCUSDT&interval=1m&limit=500');
        const data = await response.json();
        const history = data.map((d: any) => ({
          time: d[0] / 1000,
          open: parseFloat(d[1]),
          high: parseFloat(d[2]),
          low: parseFloat(d[3]),
          close: parseFloat(d[4]),
        }));
        series.setData(history);
        setCurrentPrice(history[history.length - 1].close);
      } catch (err) {
        console.error("Historical Data Error:", err);
      }
    };

    fetchHistory();

    // 3. Setup WebSocket
    const connectWS = () => {
      const ws = new WebSocket('wss://fstream.binance.com/ws/btcusdt@kline_1m');
      wsRef.current = ws;

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const k = data.k;
        const candle = {
          time: k.t / 1000,
          open: parseFloat(k.o),
          high: parseFloat(k.h),
          low: parseFloat(k.l),
          close: parseFloat(k.c),
        };
        series.update(candle);
        setCurrentPrice(candle.close);
        setLatency(Math.floor(Math.random() * 20) + 5); // Simulated latency
      };

      ws.onclose = () => setTimeout(connectWS, 3000);
    };

    connectWS();

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ 
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight 
        });
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
      wsRef.current?.close();
    };
  }, []);

  return (
    <div className="flex h-screen bg-[#050505] overflow-hidden text-white">
      {/* Side Toolbar */}
      <aside className="w-16 bg-black border-r border-white/5 flex flex-col items-center py-6 space-y-8 shrink-0">
        <a href="#dashboard" className="w-10 h-10 btn-gold rounded-xl flex items-center justify-center font-bold text-black shadow-lg">←</a>
        <div className="flex flex-col space-y-6">
          <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-[#b8860b] cursor-pointer hover:bg-white/5">📊</div>
          <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-500 cursor-pointer hover:bg-white/5">⚙️</div>
          <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gray-500 cursor-pointer hover:bg-white/5">🔔</div>
        </div>
      </aside>
      
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-white/5 bg-[#080808] flex items-center px-8 justify-between shrink-0">
          <div className="flex items-center space-x-12">
            <div className="flex flex-col">
               <span className="font-castle font-black italic castle-gradient tracking-[0.2em] text-lg leading-none">BTCUSDT.P</span>
               <span className="text-[10px] text-gray-500 font-bold uppercase mt-1">Binance Futures Feed</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-black tabular-nums ${currentPrice >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Live Terminal</span>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></span>
              </div>
            </div>
          </div>
          <div className="flex space-x-8">
            <div className="text-right">
               <div className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Latency</div>
               <div className="text-xs font-bold text-green-500">{latency}ms</div>
            </div>
            <div className="text-right">
               <div className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Balance</div>
               <div className="text-xs font-bold text-white">$100,000.00</div>
            </div>
          </div>
        </header>
        
        <div className="flex-1 flex overflow-hidden">
          <div ref={chartContainerRef} className="flex-1 bg-[#050505] relative" />
          
          <aside className="w-80 bg-[#080808] border-l border-white/5 p-6 flex flex-col space-y-6 shrink-0 overflow-y-auto">
            <div className="flex p-1 bg-white/5 rounded-2xl border border-white/5">
              <button 
                onClick={() => setSide('LONG')}
                className={`flex-1 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${
                  side === 'LONG' ? 'bg-green-600 text-white shadow-lg' : 'text-gray-500'
                }`}
              >
                Buy / Long
              </button>
              <button 
                onClick={() => setSide('SHORT')}
                className={`flex-1 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all ${
                  side === 'SHORT' ? 'bg-red-600 text-white shadow-lg' : 'text-gray-500'
                }`}
              >
                Sell / Short
              </button>
            </div>
            
            <div className="space-y-6">
               <div className="space-y-2">
                 <div className="flex justify-between items-center">
                   <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Order Size (USDT)</label>
                   <span className="text-[9px] font-bold text-[#b8860b]">MAX: $100k</span>
                 </div>
                 <input type="number" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm font-bold outline-none focus:border-[#b8860b] transition-all" placeholder="0.00" />
               </div>
               
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Leverage</label>
                 <div className="grid grid-cols-4 gap-2">
                   {[1, 5, 10, 20].map(l => (
                     <button key={l} className="py-3 bg-white/5 border border-white/5 rounded-xl text-[10px] font-bold hover:bg-[#b8860b] hover:text-black transition-all">
                       {l}x
                     </button>
                   ))}
                 </div>
               </div>
            </div>

            <div className="p-6 bg-[#b8860b]/5 rounded-3xl border border-[#b8860b]/10 space-y-3 mt-auto">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-gray-500">Est. Liquidation</span>
                <span className="text-red-400">$64,210.50</span>
              </div>
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-gray-500">Trading Fee (0.04%)</span>
                <span className="text-white">$4.20</span>
              </div>
            </div>

            <button 
              className={`w-full py-6 rounded-2xl font-black uppercase text-xs tracking-[0.3em] shadow-2xl transition-all active:scale-95 ${
                side === 'LONG' ? 'btn-gold text-black' : 'bg-red-600 text-white'
              }`}
            >
              Open Market {side}
            </button>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Terminal;
