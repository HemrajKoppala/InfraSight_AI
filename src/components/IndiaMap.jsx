import React, { useState, useMemo } from "react";
import {
  Calculator,
  Coins,
  HandCoins,
  TrendingUp,
  Calendar,
  Building,
  Info,
  Layers,
  MapPin,
  ChevronRight
} from "lucide-react";
import { STATES_DATA } from "../data/infraSightData";
import { REAL_INDIA_STATES } from "../data/indiaSvgData";

// Continuous yellow -> orange -> red sequential color interpolation
// Exact scale: 0: #fdf6d8, 46: #f6c17a, 91: #ef8f6b, 137: #df5b52, 182: #a52520
// Continuous government blue sequential color interpolation for choropleth
export function getChoroplethColor(count, maxCount = 1) {
  const num = typeof count === "number" ? count : 0;
  if (num === 0) return "#f8fafc"; // Neutral light slate for states with 0 projects in DB
  const upper = Math.max(maxCount, 1);
  const ratio = Math.min(1, num / upper);
  if (ratio <= 0.33) return "#93c5fd";
  if (ratio <= 0.66) return "#3b82f6";
  return "#1e3a8a";
}

export default function IndiaMap({
  selectedStateCode = null,
  onSelectState,
  dataMap = null,
  showDetailPanel = true,
  monthYear = "September, 2026",
}) {
  // Find first active state code from dataMap if no explicit selectedStateCode
  const defaultCode = useMemo(() => {
    if (selectedStateCode) return selectedStateCode;
    if (dataMap && Object.keys(dataMap).length > 0) {
      const first = Object.values(dataMap)[0];
      return first.code || Object.keys(dataMap)[0].toUpperCase();
    }
    return "KA";
  }, [selectedStateCode, dataMap]);

  const [internalSelectedCode, setInternalSelectedCode] = useState(defaultCode);
  const [hoveredState, setHoveredState] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const activeCode = selectedStateCode || internalSelectedCode || defaultCode;

  // Build indexed map lookup strictly from real database records (all others 0)
  const statesLookup = useMemo(() => {
    const lookup = {};
    STATES_DATA.forEach((s) => {
      // 100% clean baseline without mock numbers
      const base = {
        code: s.code,
        name: s.name,
        count: 0,
        projectCount: 0,
        originalCost: 0,
        revisedCost: 0,
        expenditure: 0,
        completedThisMonth: 0,
        newlyAdded: 0,
        delayedCount: 0,
        criticalRiskCount: 0,
        riskLevel: "Normal",
      };
      lookup[s.code] = base;
      lookup[s.name.toLowerCase()] = base;
    });

    if (dataMap) {
      Object.keys(dataMap).forEach((key) => {
        const item = dataMap[key];
        const count = item.totalProjects || item.projectCount || item.count || 0;
        const orig = item.costOriginal || item.originalCost || 0;
        const rev = item.costRevised || item.revisedCost || 0;
        const exp = item.expenditure || 0;

        const current = lookup[key] || lookup[item.name?.toLowerCase()] || {};
        const merged = {
          ...current,
          name: item.name || current.name || key,
          code: item.code || current.code || key.toUpperCase(),
          count,
          projectCount: count,
          originalCost: orig,
          revisedCost: rev,
          expenditure: exp,
          completedThisMonth: 0,
          newlyAdded: 0,
        };

        lookup[key] = merged;
        if (merged.code) lookup[merged.code] = merged;
        if (merged.name) lookup[merged.name.toLowerCase()] = merged;
      });
    }
    return lookup;
  }, [dataMap]);

  const maxCount = useMemo(() => {
    let max = 1;
    Object.values(statesLookup).forEach((s) => {
      if ((s.count || 0) > max) max = s.count;
    });
    return max;
  }, [statesLookup]);

  const activeStateData = useMemo(() => {
    if (activeCode && (statesLookup[activeCode] || statesLookup[activeCode.toLowerCase()])) {
      return statesLookup[activeCode] || statesLookup[activeCode.toLowerCase()];
    }
    if (dataMap && Object.keys(dataMap).length > 0) {
      const firstKey = Object.keys(dataMap)[0];
      if (statesLookup[firstKey]) return statesLookup[firstKey];
    }
    return statesLookup["KA"] || Object.values(statesLookup)[0];
  }, [activeCode, statesLookup, dataMap]);

  const handleStateClick = (stateInfo) => {
    setInternalSelectedCode(stateInfo.code);
    if (onSelectState) {
      onSelectState(stateInfo);
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-md border border-slate-200 p-4 sm:p-6 select-none"
      style={{
        background: "linear-gradient(135deg, #e8f4fc 0%, #c4e4f7 50%, #a9d8f0 100%)",
      }}
      onMouseMove={handleMouseMove}
    >
      {/* 2-3 Subtle Diagonal White/Light-Blue Wave & Ribbon Shapes (Geometric bands) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 1000 600"
      >
        <path
          d="M -100 150 Q 300 80 600 240 T 1200 180 L 1200 -50 L -100 -50 Z"
          fill="rgba(255, 255, 255, 0.42)"
        />
        <path
          d="M -50 380 Q 250 260 650 420 T 1150 340 L 1150 180 Q 750 260 250 140 Z"
          fill="rgba(255, 255, 255, 0.28)"
        />
        <path
          d="M 100 620 Q 500 480 900 580 L 1100 620 L -50 620 Z"
          fill="rgba(255, 255, 255, 0.35)"
        />
      </svg>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* ================================================================= */}
        {/* DETAIL PANEL (Appears on click, positioned left of / overlapping)  */}
        {/* ================================================================= */}
        {showDetailPanel && (
          <div className="w-full lg:w-[360px] shrink-0">
            {/* Caption above card, outside it */}
            <div className="mb-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                State-wise Projects{" "}
                <span className="text-xs font-normal italic text-slate-600">
                  (as of {monthYear})
                </span>
              </h3>
            </div>

            {/* White rounded card with soft drop shadow */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200/90 overflow-hidden">
              {/* Header bar: solid dark navy (#0a1e33), full width of card, bold white centered state name */}
              <div className="bg-[#0a1e33] text-white py-2.5 px-4 flex items-center justify-between">
                <span className="text-xs font-bold font-display tracking-wide uppercase text-slate-300">
                  State Focus
                </span>
                <span className="text-sm font-bold font-display tracking-wide text-white">
                  {activeStateData.name}
                </span>
                <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-white/10 rounded text-slate-200">
                  {activeStateData.code}
                </span>
              </div>

              {/* 2x3 Grid of Stat Cells with Thin Dividers */}
              <div className="grid grid-cols-2 divide-x divide-y divide-slate-100">
                {/* 1. Project Count */}
                <div className="p-3 flex items-start gap-2.5 hover:bg-slate-50/50 transition">
                  <div className="p-1.5 bg-blue-50/80 border border-blue-100 rounded-lg text-blue-700 shrink-0 mt-0.5">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold font-sans uppercase tracking-wider text-slate-500 flex items-center gap-1">
                      <span>Projects</span>
                      <span title="Total Central Sector Projects in State">
                        <Info className="w-2.5 h-2.5 text-slate-400" />
                      </span>
                    </div>
                    <div className="text-xl font-bold font-display text-slate-900 leading-tight mt-0.5">
                      {activeStateData.count || activeStateData.projectCount || 0}
                    </div>
                  </div>
                </div>

                {/* 2. Original Cost */}
                <div className="p-3 flex items-start gap-2.5 hover:bg-slate-50/50 transition">
                  <div className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 shrink-0 mt-0.5">
                    <Coins className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold font-sans uppercase tracking-wider text-slate-500">
                      Original Outlay
                    </div>
                    <div className="text-base font-bold font-mono text-slate-900 leading-tight mt-0.5 truncate">
                      ₹ {Number(activeStateData.originalCost || 0).toLocaleString("en-IN")} Cr
                    </div>
                  </div>
                </div>

                {/* 3. Latest Revised Cost */}
                <div className="p-3 flex items-start gap-2.5 hover:bg-slate-50/50 transition">
                  <div className="p-1.5 bg-amber-50 border border-amber-100 rounded-lg text-amber-700 shrink-0 mt-0.5">
                    <HandCoins className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold font-sans uppercase tracking-wider text-slate-500">
                      Revised Outlay
                    </div>
                    <div className="text-base font-bold font-mono text-amber-800 leading-tight mt-0.5 truncate">
                      ₹ {Number(activeStateData.revisedCost || 0).toLocaleString("en-IN")} Cr
                    </div>
                  </div>
                </div>

                {/* 4. Expenditure (Cumm.) */}
                <div className="p-3 flex items-start gap-2.5 hover:bg-slate-50/50 transition">
                  <div className="p-1.5 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-700 shrink-0 mt-0.5">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold font-sans uppercase tracking-wider text-slate-500">
                      Expenditure
                    </div>
                    <div className="text-base font-bold font-mono text-emerald-800 leading-tight mt-0.5 truncate">
                      ₹ {Number(activeStateData.expenditure || 0).toLocaleString("en-IN")} Cr
                    </div>
                  </div>
                </div>

                {/* 5. Completed During Month */}
                <div className="p-3 flex items-start gap-2.5 hover:bg-slate-50/50 transition">
                  <div className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold font-sans uppercase tracking-wider text-slate-500">
                      Completed Month
                    </div>
                    <div className="text-base font-bold font-mono text-slate-900 leading-tight mt-0.5">
                      {activeStateData.completedThisMonth || 0}
                    </div>
                  </div>
                </div>

                {/* 6. Newly Added */}
                <div className="p-3 flex items-start gap-2.5 hover:bg-slate-50/50 transition">
                  <div className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 shrink-0 mt-0.5">
                    <Building className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold font-sans uppercase tracking-wider text-slate-500">
                      Newly Added
                    </div>
                    <div className="text-base font-bold font-mono text-slate-900 leading-tight mt-0.5">
                      {activeStateData.newlyAdded || 0}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* INTERACTIVE REAL INDIA MAP CANVAS + VERTICAL LEGEND               */}
        {/* ================================================================= */}
        <div className="flex-1 w-full flex items-center justify-center relative min-h-[420px]">
          <svg
            viewBox="20 60 565 610"
            className="w-full max-w-[540px] h-[380px] sm:h-[430px] drop-shadow-sm transition-all"
            aria-label="Real-time Geographic Choropleth Map of India"
          >
            {REAL_INDIA_STATES.map((sp) => {
              const stateData =
                statesLookup[sp.code] ||
                statesLookup[sp.name.toLowerCase()] ||
                {};
              const count = stateData.count || stateData.projectCount || 0;
              const fillColor = getChoroplethColor(count, maxCount);
              const isSelected = activeCode === sp.code || activeStateData.name === sp.name;
              const isHovered = hoveredState?.code === sp.code;

              return (
                <g key={sp.code} className="group">
                  <path
                    d={sp.d}
                    fill={fillColor}
                    stroke={isHovered ? "#000000" : isSelected ? "#0a1e33" : "#94a3b8"}
                    strokeWidth={isSelected ? "2.0" : isHovered ? "1.6" : "0.75"}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    className="cursor-pointer transition-colors duration-150"
                    onMouseEnter={() =>
                      setHoveredState({
                        code: sp.code,
                        name: sp.name,
                        count,
                        ...stateData,
                      })
                    }
                    onMouseLeave={() => setHoveredState(null)}
                    onClick={() =>
                      handleStateClick({
                        code: sp.code,
                        name: sp.name,
                        count,
                        ...stateData,
                      })
                    }
                  />
                  {/* Subtle Selected State Overlay Tint */}
                  {isSelected && (
                    <path
                      d={sp.d}
                      fill="#0a1e33"
                      fillOpacity="0.22"
                      stroke="#0a1e33"
                      strokeWidth="2.0"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      pointerEvents="none"
                    />
                  )}
                  {/* State Code Label for Major States */}
                  {sp.centroid && (
                    <text
                      x={sp.centroid[0]}
                      y={sp.centroid[1]}
                      fontSize="8"
                      fontWeight={isSelected ? "bold" : "600"}
                      fill={count > 0 ? "#1e3a8a" : "#64748b"}
                      textAnchor="middle"
                      pointerEvents="none"
                      className="select-none"
                    >
                      {sp.code}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Floating Dark Navy Pill Tooltip on Hover */}
          {hoveredState && (
            <div
              className="absolute pointer-events-none z-30 transition-transform duration-75 ease-out"
              style={{
                left: `${tooltipPos.x}px`,
                top: `${tooltipPos.y - 38}px`,
                transform: "translateX(-50%)",
              }}
            >
              <div className="bg-[#0a1e33] text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5 border border-slate-700 whitespace-nowrap">
                <span>{hoveredState.name}:</span>
                <span className="font-mono text-amber-300 font-bold">
                  {hoveredState.count} {hoveredState.count === 1 ? "project" : "projects"}
                </span>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* VERTICAL GRADIENT LEGEND (Right-aligned white rounded card)        */}
          {/* ================================================================= */}
          <div className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 bg-white rounded-md p-2.5 shadow-sm border border-slate-200/90 text-slate-800 z-20">
            <div className="text-[10px] font-bold text-slate-900 text-center mb-1.5 pb-1 border-b border-slate-200">
              Projects
            </div>

            <div className="flex items-center gap-2">
              {/* Vertical Color Scale Bar */}
              <div
                className="w-3.5 h-28 rounded-xs border border-slate-300"
                style={{
                  background:
                    "linear-gradient(to bottom, #1e3a8a 0%, #3b82f6 50%, #93c5fd 100%)",
                }}
              />

              {/* Tick Labels along the bar */}
              <div className="h-28 flex flex-col justify-between text-[9px] font-mono font-bold text-slate-700 text-right">
                <span>{maxCount}</span>
                <span>{Math.max(1, Math.round(maxCount / 2))}</span>
                <span>1</span>
              </div>
            </div>

            <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center gap-1.5 text-[9px] text-slate-500">
              <span className="w-2.5 h-2.5 bg-slate-100 border border-slate-300 rounded-2xs inline-block shrink-0" />
              <span>0 (None)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
