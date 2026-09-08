import React, { useState } from "react";
import { STATES_DATA } from "../data/paimanaData";
import { Layers, MapPin, AlertTriangle, ShieldCheck, ChevronRight } from "lucide-react";

// Standard India States SVG Path coordinates & centroids (Optimized Clean Projection)
const STATE_PATHS = [
  {
    code: "JK",
    name: "Jammu & Kashmir",
    d: "M 160 30 L 195 20 L 230 45 L 245 75 L 220 95 L 180 90 L 155 70 Z",
    centroid: [195, 60],
  },
  {
    code: "HP",
    name: "Himachal Pradesh",
    d: "M 180 90 L 220 95 L 235 125 L 205 135 L 185 115 Z",
    centroid: [205, 115],
  },
  {
    code: "PB",
    name: "Punjab",
    d: "M 155 95 L 185 115 L 180 145 L 150 140 L 145 110 Z",
    centroid: [165, 125],
  },
  {
    code: "UK",
    name: "Uttarakhand",
    d: "M 220 95 L 255 110 L 265 140 L 230 145 L 215 125 Z",
    centroid: [238, 125],
  },
  {
    code: "HR",
    name: "Haryana",
    d: "M 175 125 L 205 135 L 210 165 L 175 165 Z",
    centroid: [192, 145],
  },
  {
    code: "UT",
    name: "Delhi & Other UTs",
    d: "M 200 148 L 210 148 L 210 156 L 200 156 Z",
    centroid: [205, 152],
  },
  {
    code: "RJ",
    name: "Rajasthan",
    d: "M 115 140 L 175 140 L 200 175 L 180 235 L 125 240 L 95 190 Z",
    centroid: [150, 190],
  },
  {
    code: "UP",
    name: "Uttar Pradesh",
    d: "M 205 140 L 265 140 L 320 180 L 310 220 L 245 225 L 205 175 Z",
    centroid: [260, 185],
  },
  {
    code: "BR",
    name: "Bihar",
    d: "M 320 180 L 380 185 L 390 220 L 330 225 L 320 200 Z",
    centroid: [350, 205],
  },
  {
    code: "WB",
    name: "West Bengal",
    d: "M 380 195 L 405 205 L 395 270 L 365 275 L 375 230 Z",
    centroid: [385, 240],
  },
  {
    code: "JH",
    name: "Jharkhand",
    d: "M 325 225 L 375 225 L 370 265 L 315 260 Z",
    centroid: [345, 245],
  },
  {
    code: "OD",
    name: "Odisha",
    d: "M 320 260 L 370 265 L 380 305 L 340 345 L 305 300 Z",
    centroid: [340, 300],
  },
  {
    code: "MP",
    name: "Madhya Pradesh",
    d: "M 180 215 L 260 215 L 295 245 L 275 290 L 195 285 L 175 240 Z",
    centroid: [235, 255],
  },
  {
    code: "GJ",
    name: "Gujarat",
    d: "M 80 210 L 135 225 L 145 275 L 105 295 L 60 265 L 65 230 Z",
    centroid: [100, 255],
  },
  {
    code: "CT",
    name: "Chhattisgarh",
    d: "M 275 250 L 315 250 L 310 325 L 275 335 L 265 285 Z",
    centroid: [290, 290],
  },
  {
    code: "MH",
    name: "Maharashtra",
    d: "M 135 275 L 235 275 L 255 335 L 195 365 L 130 330 Z",
    centroid: [185, 315],
  },
  {
    code: "TG",
    name: "Telangana",
    d: "M 220 335 L 275 330 L 275 375 L 225 385 Z",
    centroid: [248, 355],
  },
  {
    code: "AP",
    name: "Andhra Pradesh",
    d: "M 265 335 L 305 345 L 285 435 L 235 435 L 245 385 Z",
    centroid: [270, 395],
  },
  {
    code: "KA",
    name: "Karnataka",
    d: "M 165 345 L 220 350 L 225 435 L 180 445 L 160 380 Z",
    centroid: [190, 395],
  },
  {
    code: "TN",
    name: "Tamil Nadu",
    d: "M 195 435 L 245 435 L 225 500 L 190 495 Z",
    centroid: [215, 465],
  },
  {
    code: "KL",
    name: "Kerala",
    d: "M 175 435 L 195 435 L 190 495 L 175 480 Z",
    centroid: [185, 460],
  },
  {
    code: "AS",
    name: "Assam",
    d: "M 420 185 L 475 180 L 490 215 L 435 220 Z",
    centroid: [450, 200],
  },
  {
    code: "NE",
    name: "Other NE States",
    d: "M 445 170 L 495 175 L 505 245 L 455 240 Z",
    centroid: [475, 210],
  },
];

export default function IndiaMap({ selectedStateCode = "OD", onSelectState }) {
  const [hoveredState, setHoveredState] = useState(null);

  // Helper to get color shade based on project count (Choropleth heat map matching PAIMANA reference)
  const getStateFill = (code) => {
    const data = STATES_DATA.find((s) => s.code === code);
    if (!data) return "#f1f5f9";

    const count = data.projectCount;
    if (count >= 130) return "#991b1b"; // Deep Red / Crimson (Highest load)
    if (count >= 100) return "#dc2626"; // Strong Red
    if (count >= 75) return "#ea580c";  // Amber / Orange
    if (count >= 50) return "#f97316";  // Warm Orange
    if (count >= 35) return "#fdba74";  // Soft Amber
    return "#fed7aa";                   // Light Pale Amber
  };

  const activeData =
    STATES_DATA.find((s) => s.code === (hoveredState?.code || selectedStateCode)) ||
    STATES_DATA[0];

  return (
    <div className="bg-white border border-slate-300 rounded-xs p-4 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 mb-3 gap-2">
        <div>
          <div className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-blue-900" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              State-wise Infrastructure Concentration & Risk Heat Map
            </h4>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Select or hover any state to inspect project load, delays, and critical risk flags.
          </p>
        </div>

        {/* Quick State Dropdown Selector */}
        <div className="flex items-center gap-1.5">
          <label className="text-[11px] font-semibold text-slate-600">Active State:</label>
          <select
            value={selectedStateCode}
            onChange={(e) => {
              const st = STATES_DATA.find((s) => s.code === e.target.value);
              if (st && onSelectState) onSelectState(st);
            }}
            className="text-xs bg-slate-50 border border-slate-300 rounded-xs px-2 py-1 font-medium text-slate-800 focus:outline-hidden focus:border-blue-700"
          >
            {STATES_DATA.map((st) => (
              <option key={st.code} value={st.code}>
                {st.name} ({st.projectCount} Projects)
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* SVG Interactive Map */}
        <div className="lg:col-span-8 relative flex justify-center items-center bg-slate-50/70 border border-slate-200 rounded-xs p-2 min-h-[380px]">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#0b2240_1px,transparent_1px)] [background-size:16px_16px]" />

          <svg
            viewBox="50 15 470 500"
            className="w-full max-w-[460px] h-[360px] drop-shadow-xs"
            aria-label="Map of India showing state infrastructure project load"
          >
            {STATE_PATHS.map((sp) => {
              const stateInfo = STATES_DATA.find((s) => s.code === sp.code);
              const isSelected = selectedStateCode === sp.code;
              const isHovered = hoveredState?.code === sp.code;

              return (
                <g key={sp.code}>
                  <path
                    d={sp.d}
                    fill={getStateFill(sp.code)}
                    stroke={isSelected ? "#0b2240" : "#ffffff"}
                    strokeWidth={isSelected ? "2.5" : "1.2"}
                    className="transition-colors duration-150 cursor-pointer"
                    onMouseEnter={() => setHoveredState({ code: sp.code, name: sp.name, ...stateInfo })}
                    onMouseLeave={() => setHoveredState(null)}
                    onClick={() => {
                      if (stateInfo && onSelectState) {
                        onSelectState(stateInfo);
                      }
                    }}
                  />
                  {/* State Code Label */}
                  <text
                    x={sp.centroid[0]}
                    y={sp.centroid[1]}
                    fontSize="9"
                    fontWeight={isSelected ? "bold" : "600"}
                    fill={isSelected ? "#0b2240" : "#334155"}
                    textAnchor="middle"
                    pointerEvents="none"
                    className="select-none"
                  >
                    {sp.code}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Choropleth Heat Map Vertical Legend (Matching PAIMANA Reference) */}
          <div className="absolute right-3 bottom-3 sm:top-12 bg-white/95 border border-slate-300 rounded-xs p-2 shadow-xs text-[10px] text-slate-700">
            <div className="font-bold text-slate-900 border-b border-slate-200 pb-1 mb-1 text-center">
              Projects
            </div>
            <div className="flex flex-col gap-1 items-center">
              <div className="flex items-center gap-1.5 w-full justify-between">
                <span className="w-3.5 h-3.5 bg-[#991b1b] border border-slate-300 inline-block" />
                <span className="font-mono font-medium">130+</span>
              </div>
              <div className="flex items-center gap-1.5 w-full justify-between">
                <span className="w-3.5 h-3.5 bg-[#dc2626] border border-slate-300 inline-block" />
                <span className="font-mono font-medium">100-129</span>
              </div>
              <div className="flex items-center gap-1.5 w-full justify-between">
                <span className="w-3.5 h-3.5 bg-[#ea580c] border border-slate-300 inline-block" />
                <span className="font-mono font-medium">75-99</span>
              </div>
              <div className="flex items-center gap-1.5 w-full justify-between">
                <span className="w-3.5 h-3.5 bg-[#f97316] border border-slate-300 inline-block" />
                <span className="font-mono font-medium">50-74</span>
              </div>
              <div className="flex items-center gap-1.5 w-full justify-between">
                <span className="w-3.5 h-3.5 bg-[#fdba74] border border-slate-300 inline-block" />
                <span className="font-mono font-medium">25-49</span>
              </div>
              <div className="flex items-center gap-1.5 w-full justify-between">
                <span className="w-3.5 h-3.5 bg-[#fed7aa] border border-slate-300 inline-block" />
                <span className="font-mono font-medium">&lt; 25</span>
              </div>
            </div>
          </div>
        </div>

        {/* Selected / Hovered State Snapshot Card */}
        <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-xs p-3.5 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2.5">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-900" />
                <span className="font-bold text-sm text-slate-900">
                  {activeData.name}
                </span>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-xs uppercase border ${
                  activeData.riskLevel === "Critical"
                    ? "bg-red-50 text-red-700 border-red-200"
                    : activeData.riskLevel === "High"
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : "bg-emerald-50 text-emerald-800 border-emerald-200"
                }`}
              >
                {activeData.riskLevel} Risk Tier
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Total Central Sector Projects:</span>
                <span className="font-bold text-slate-900 font-mono">
                  {activeData.projectCount}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Sanctioned Cost:</span>
                <span className="font-bold text-slate-900 font-mono">
                  ₹ {activeData.originalCost.toLocaleString("en-IN")} Cr
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Anticipated Revised Cost:</span>
                <span className="font-bold text-slate-900 font-mono">
                  ₹ {activeData.revisedCost.toLocaleString("en-IN")} Cr
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Cumulative Expenditure:</span>
                <span className="font-bold text-slate-900 font-mono">
                  ₹ {activeData.expenditure.toLocaleString("en-IN")} Cr
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Projects with Delay:</span>
                <span className="font-bold text-amber-700 font-mono">
                  {activeData.delayedCount} (
                  {Math.round((activeData.delayedCount / activeData.projectCount) * 100)}%)
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Flagged Critical Priority:</span>
                <span className="font-bold text-red-700 font-mono">
                  {activeData.criticalRiskCount} Projects
                </span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-200">
            <button
              onClick={() => {
                if (onSelectState) onSelectState(activeData);
              }}
              className="w-full text-xs font-semibold bg-[#0b2240] hover:bg-blue-900 text-white py-1.5 px-3 rounded-xs flex items-center justify-center gap-1 transition"
            >
              <span>Filter Dashboard by {activeData.name}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
