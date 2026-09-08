import React, { useState, useMemo } from "react";
import {
  MapPin,
  Layers,
  Filter,
  AlertTriangle,
  Building2,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Search,
  CheckCircle2,
  Clock,
  IndianRupee,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import IndiaMap from "../components/IndiaMap";
import { STATES_DATA } from "../data/infraSightData";
import { useApi } from "../context/ApiContext";

export default function MapPage({ onNavigateDetails }) {
  const { projects, stateStats, setSelectedProjectId } = useApi();

  const [selectedStateCode, setSelectedStateCode] = useState("KA");
  const [sectorFilter, setSectorFilter] = useState("ALL");
  const [searchPin, setSearchPin] = useState("");

  // Derive dynamic sectors strictly from real DB records
  const availableSectors = useMemo(() => {
    return Array.from(new Set(projects.map((p) => p.sector).filter(Boolean)));
  }, [projects]);

  // Map stateStats from /api/dashboard/state-summary to state lookup
  const stateDataMap = useMemo(() => {
    if (!stateStats || stateStats.length === 0) return null;
    const map = {};
    stateStats.forEach((s) => {
      map[s.state.toLowerCase()] = {
        name: s.state,
        totalProjects: s.project_count,
        costOriginal: s.original_cost,
        costRevised: s.current_cost,
        expenditure: s.expenditure,
      };
    });
    return map;
  }, [stateStats]);

  // Filter projects by search, sector, and selected state
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchSector = sectorFilter === "ALL" || p.sector === sectorFilter;
      const matchSearch =
        !searchPin ||
        p.name?.toLowerCase().includes(searchPin.toLowerCase()) ||
        p.id?.toLowerCase().includes(searchPin.toLowerCase()) ||
        p.state?.toLowerCase().includes(searchPin.toLowerCase());

      return matchSector && matchSearch;
    });
  }, [projects, sectorFilter, searchPin]);

  const handleSelectProject = (id) => {
    setSelectedProjectId(id);
    if (onNavigateDetails) {
      onNavigateDetails(id);
    }
  };

  return (
    <div className="space-y-4 font-sans text-slate-800 p-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white border border-slate-300 rounded-xs p-3.5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-0.5">
            <span>MoSPI Central Sector</span>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Geographic Intelligence</span>
          </div>
          <h2 className="text-base font-extrabold text-[#0b2240] flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-900" />
            <span>National Infrastructure GIS & State-wise Project Distribution</span>
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="bg-blue-50 text-blue-900 border border-blue-200 px-2.5 py-1 rounded-xs font-semibold">
            {projects.length} Central Sector Projects Active
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-300 rounded-xs p-3 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Select State / UT
            </label>
            <select
              value={selectedStateCode}
              onChange={(e) => setSelectedStateCode(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xs px-2.5 py-1 text-slate-800 font-medium"
            >
              {STATES_DATA.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Filter Sector
            </label>
            <select
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xs px-2.5 py-1 text-slate-800"
            >
              <option value="ALL">All Infrastructure Sectors ({availableSectors.length})</option>
              {availableSectors.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Search Projects
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by code or title..."
                value={searchPin}
                onChange={(e) => setSearchPin(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xs pl-7 pr-2 py-1 text-slate-800"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Map & State Inspector Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Interactive SVG Map with Live Backend Data */}
        <div className="lg:col-span-12">
          <IndiaMap
            selectedStateCode={selectedStateCode}
            onSelectState={(st) => setSelectedStateCode(st.code)}
            dataMap={stateDataMap}
          />
        </div>
      </div>

      {/* Authentic Geolocated Projects Directory */}
      <div className="bg-white border border-slate-300 rounded-xs p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div>
            <h3 className="text-sm font-bold text-[#0b2240] flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-blue-900" />
              <span>Project Geographic Directory</span>
            </h3>
            <p className="text-xs text-slate-500">
              Active central sector projects from SQLite database and coordinate verification status
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500">
            {filteredProjects.length} Projects
          </span>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            No data available.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredProjects.map((p) => {
              const hasCoords = Boolean(p.latitude && p.longitude);
              return (
                <div
                  key={p.id}
                  onClick={() => handleSelectProject(p.id)}
                  className="p-3 bg-slate-50 border border-slate-200 rounded hover:border-blue-400 cursor-pointer transition space-y-2 group"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold bg-white px-1.5 py-0.5 border border-slate-200 rounded text-slate-700">
                      {p.id}
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold">{p.sector}</span>
                  </div>

                  <h4 className="font-bold text-xs text-slate-900 group-hover:text-blue-700 transition line-clamp-1">
                    {p.name}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-slate-600">
                    <span>State: <strong>{p.state}</strong></span>
                    <span>Cost: <strong>₹{p.revisedCost || p.originalCost} Cr</strong></span>
                  </div>

                  {/* Step 13 Location Coordinate Check */}
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px]">
                    <span className="flex items-center gap-1">
                      <MapPin size={11} className={hasCoords ? "text-emerald-600" : "text-slate-400"} />
                      {hasCoords ? (
                        <span className="font-mono text-emerald-700">{p.latitude}, {p.longitude}</span>
                      ) : (
                        <span className="text-slate-500 italic">Location unavailable</span>
                      )}
                    </span>
                    <span className="font-semibold text-blue-600 group-hover:translate-x-0.5 transition flex items-center gap-0.5">
                      Dossier <ChevronRight size={10} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
