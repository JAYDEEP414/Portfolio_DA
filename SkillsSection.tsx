import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  Code2, 
  Cpu, 
  Sliders, 
  CheckCircle2, 
  Sparkles,
  Layers,
  TrendingUp,
  Database
} from 'lucide-react';
import { skillCategories } from '../data/portfolioData';
import { playUiSound } from '../utils/audio';

export const SkillsSection: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  // Interactive Live KPI Sandbox State
  const [simSales, setSimSales] = useState(5000);
  const [simDiscount, setSimDiscount] = useState(15);
  const [simReturnRate, setSimReturnRate] = useState(6);

  // Simulated DAX Measures
  const grossRevenue = simSales * 45; // average item price $45
  const discountAmount = grossRevenue * (simDiscount / 100);
  const netRevenue = grossRevenue - discountAmount;
  const returnLoss = netRevenue * (simReturnRate / 100);
  const finalProfit = netRevenue * 0.32 - returnLoss;
  const aov = grossRevenue / simSales;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-3 backdrop-blur-md">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>TECHNICAL ARSENAL & PROFICIENCY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
          Mastering Data &{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-500 bg-clip-text text-transparent">
            BI Architecture
          </span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          3D background morphs into a multidimensional bar-chart formation echoing active analytical models.
        </p>
      </div>

      {/* Category Selection Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10 p-1.5 rounded-full bg-[#0b0f19]/95 border border-slate-800 backdrop-blur-xl">
        {skillCategories.map((cat, idx) => {
          const isActive = activeCategoryIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => {
                playUiSound('click');
                setActiveCategoryIndex(idx);
              }}
              onMouseEnter={() => playUiSound('hover')}
              className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                isActive
                  ? 'bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {idx === 0 && <BarChart3 className="w-3.5 h-3.5" />}
              {idx === 1 && <Code2 className="w-3.5 h-3.5" />}
              {idx === 2 && <Cpu className="w-3.5 h-3.5" />}
              <span>{cat.title}</span>
            </button>
          );
        })}
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Active Category Skill Bars with Staggered Scroll Fills */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 rounded-2xl bg-[#0b0f19]/95 border border-slate-800 mb-2">
            <h3 className="text-base font-display font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              {skillCategories[activeCategoryIndex].title}
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              {skillCategories[activeCategoryIndex].description}
            </p>
          </div>

          <div className="space-y-3.5">
            {skillCategories[activeCategoryIndex].skills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-4 rounded-2xl bg-[#0b0f19]/95 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 group shadow-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-sm text-white group-hover:text-cyan-400 transition-colors">
                      {skill.name}
                    </span>
                    {skill.tag && (
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/50 uppercase font-semibold">
                        {skill.tag}
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-xs font-bold text-cyan-400">
                    {skill.level}%
                  </span>
                </div>

                {/* Animated Fill Bar */}
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-[1px] mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, delay: 0.1 + idx * 0.1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                  />
                </div>

                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Interactive Live DAX & KPI Simulator Widget */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0b0f19]/95 backdrop-blur-xl border border-slate-800 shadow-2xl relative">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs font-mono text-cyan-400">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span className="font-bold">LIVE POWER BI / DAX ENGINE</span>
            </div>
            <span className="text-[10px] text-cyan-400 flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              DYNAMIC
            </span>
          </div>

          <p className="text-xs text-slate-300 mb-5">
            Demonstrating calculated DAX metrics and revenue elasticity modeling:
          </p>

          {/* Interactive Sliders */}
          <div className="space-y-4 mb-6">
            {/* Sales Volume */}
            <div>
              <div className="flex justify-between text-xs font-mono text-slate-200 mb-1">
                <span>Transaction Volume</span>
                <span className="text-cyan-400 font-bold">{simSales.toLocaleString()} orders</span>
              </div>
              <input
                type="range"
                min="1000"
                max="25000"
                step="500"
                value={simSales}
                onChange={(e) => setSimSales(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 border border-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Discount % */}
            <div>
              <div className="flex justify-between text-xs font-mono text-slate-200 mb-1">
                <span>Discount Strategy</span>
                <span className="text-purple-400 font-bold">{simDiscount}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                step="1"
                value={simDiscount}
                onChange={(e) => setSimDiscount(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 border border-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
              />
            </div>

            {/* Return Rate % */}
            <div>
              <div className="flex justify-between text-xs font-mono text-slate-200 mb-1">
                <span>Return Rate (Mitigated)</span>
                <span className="text-emerald-400 font-bold">{simReturnRate}%</span>
              </div>
              <input
                type="range"
                min="2"
                max="18"
                step="1"
                value={simReturnRate}
                onChange={(e) => setSimReturnRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 border border-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>
          </div>

          {/* Simulated DAX Output Cards */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-300 uppercase font-semibold">Net Revenue (DAX)</div>
              <div className="text-lg font-display font-bold text-cyan-400 mt-0.5">
                ${(netRevenue / 1000).toFixed(1)}k
              </div>
              <div className="text-[10px] text-slate-400">Post-discount net</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-300 uppercase font-semibold">Net Profit Margin</div>
              <div className="text-lg font-display font-bold text-emerald-400 mt-0.5">
                ${(finalProfit / 1000).toFixed(1)}k
              </div>
              <div className="text-[10px] text-emerald-400 font-medium">
                {((finalProfit / netRevenue) * 100).toFixed(1)}% margin
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-300 uppercase font-semibold">Average Order Value</div>
              <div className="text-lg font-display font-bold text-sky-400 mt-0.5">
                ${aov.toFixed(2)}
              </div>
              <div className="text-[10px] text-slate-400">Gross AOV</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-300 uppercase font-semibold">Return Loss Impact</div>
              <div className="text-lg font-display font-bold text-rose-400 mt-0.5">
                -${(returnLoss / 1000).toFixed(1)}k
              </div>
              <div className="text-[10px] text-slate-400">Logistics loss</div>
            </div>
          </div>

          <div className="mt-4 p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-cyan-300 overflow-x-auto">
            <code>
              {`NetProfit = CALCULATE(SUM(Sales[Amount]) * 0.32 - [ReturnLoss])`}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};
