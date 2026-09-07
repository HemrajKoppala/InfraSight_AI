import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  SlidersHorizontal,
  FolderKanban,
  CheckCircle2,
  AlertTriangle,
  Clock,
  RefreshCw
} from "lucide-react";
import RiskBadge from "./RiskBadge";
import { TableSkeleton } from "./LoadingSkeleton";
import EmptyState from "./EmptyState";

function ProjectTable({
  projects = [],
  loading = false,
  error = null,
  onSelectProject,
  onRefresh
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("ALL");
  const [ministryFilter, setMinistryFilter] = useState("ALL");
  const [riskFilter, setRiskFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortField, setSortField] = useState("overallRisk");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Extract unique sectors & ministries dynamically from projects array
  const sectors = useMemo(() => {
    const set = new Set(projects.map((p) => p.sector).filter(Boolean));
    return Array.from(set);
  }, [projects]);

  const ministries = useMemo(() => {
    const set = new Set(projects.map((p) => p.ministry).filter(Boolean));
    return Array.from(set);
  }, [projects]);

  // Filter & Sort Logic
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch =
        !searchTerm ||
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.contractor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.state?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchSector = sectorFilter === "ALL" || p.sector === sectorFilter;
      const matchMinistry = ministryFilter === "ALL" || p.ministry === ministryFilter;

      let matchRisk = true;
      if (riskFilter === "CRITICAL") matchRisk = (p.overallRisk || 0) >= 80;
      else if (riskFilter === "HIGH") matchRisk = (p.overallRisk || 0) >= 65 && (p.overallRisk || 0) < 80;
      else if (riskFilter === "MEDIUM") matchRisk = (p.overallRisk || 0) >= 40 && (p.overallRisk || 0) < 65;
      else if (riskFilter === "LOW") matchRisk = (p.overallRisk || 0) < 40;

      let matchStatus = true;
      if (statusFilter !== "ALL") matchStatus = p.status === statusFilter;

      return matchSearch && matchSector && matchMinistry && matchRisk && matchStatus;
    });
  }, [projects, searchTerm, sectorFilter, ministryFilter, riskFilter, statusFilter]);

  const sortedProjects = useMemo(() => {
    return [...filteredProjects].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === "string") {
        valA = valA.toLowerCase();
        valB = valB?.toLowerCase() || "";
      }

      if (valA < valB) return sortDirection === "asc" ? -1 : 1;
      if (valA > valB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredProjects, sortField, sortDirection]);

  // Pagination Logic
  const totalPages = Math.ceil(sortedProjects.length / pageSize) || 1;
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedProjects.slice(start, start + pageSize);
  }, [sortedProjects, currentPage, pageSize]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSectorFilter("ALL");
    setMinistryFilter("ALL");
    setRiskFilter("ALL");
    setStatusFilter("ALL");
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 bg-slate-200 rounded w-48 animate-pulse"></div>
          <div className="h-8 bg-slate-200 rounded w-32 animate-pulse"></div>
        </div>
        <TableSkeleton rows={6} cols={7} />
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        type="error"
        title="Unable to Load Project Records"
        description={error}
        onRetry={onRefresh}
      />
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Table Header Controls & Filters */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/50 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <FolderKanban size={18} className="text-blue-600" />
              Infrastructure Project Repository
              <span className="text-xs font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full font-mono">
                {filteredProjects.length} Records
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live Central Sector Projects monitored under MoSPI OCMS Framework
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="p-2 text-slate-500 hover:text-blue-600 hover:bg-white rounded-xl border border-slate-200/80 transition shadow-2xs"
                title="Refresh Table Data"
              >
                <RefreshCw size={15} />
              </button>
            )}
            {(searchTerm || sectorFilter !== "ALL" || ministryFilter !== "ALL" || riskFilter !== "ALL" || statusFilter !== "ALL") && (
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-100 transition"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-1">
          {/* Search Box */}
          <div className="relative md:col-span-2">
            <Search size={15} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by project name, ID, contractor, state..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition"
            />
          </div>

          {/* Sector Filter */}
          <select
            value={sectorFilter}
            onChange={(e) => {
              setSectorFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 outline-none focus:border-blue-500 transition cursor-pointer"
          >
            <option value="ALL">All Infrastructure Sectors</option>
            {sectors.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Ministry Filter */}
          <select
            value={ministryFilter}
            onChange={(e) => {
              setMinistryFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 outline-none focus:border-blue-500 transition cursor-pointer"
          >
            <option value="ALL">All Ministries</option>
            {ministries.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          {/* Risk Filter */}
          <select
            value={riskFilter}
            onChange={(e) => {
              setRiskFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 outline-none focus:border-blue-500 transition cursor-pointer"
          >
            <option value="ALL">All AI Risk Levels</option>
            <option value="CRITICAL">Critical (≥80%)</option>
            <option value="HIGH">High Risk (65–79%)</option>
            <option value="MEDIUM">Moderate (40–64%)</option>
            <option value="LOW">Low Risk (&lt;40%)</option>
          </select>
        </div>
      </div>

      {/* Main Production Table */}
      <div className="overflow-x-auto max-h-[600px] scrollbar-thin">
        <table className="w-full text-xs text-left border-collapse">
          {/* Sticky Table Header */}
          <thead className="sticky top-0 z-10 bg-slate-100/90 backdrop-blur-md text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
            <tr>
              <th
                onClick={() => handleSort("id")}
                className="py-3 px-4 cursor-pointer hover:text-slate-900 transition"
              >
                <div className="flex items-center gap-1.5">
                  <span>Project Details</span>
                  <ArrowUpDown size={12} className="opacity-60" />
                </div>
              </th>

              <th
                onClick={() => handleSort("sector")}
                className="py-3 px-4 cursor-pointer hover:text-slate-900 transition"
              >
                <div className="flex items-center gap-1.5">
                  <span>Sector & Ministry</span>
                  <ArrowUpDown size={12} className="opacity-60" />
                </div>
              </th>

              <th
                onClick={() => handleSort("originalCost")}
                className="py-3 px-4 text-right cursor-pointer hover:text-slate-900 transition"
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>Approved (₹ Cr)</span>
                  <ArrowUpDown size={12} className="opacity-60" />
                </div>
              </th>

              <th
                onClick={() => handleSort("revisedCost")}
                className="py-3 px-4 text-right cursor-pointer hover:text-slate-900 transition"
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>Revised / AI Est.</span>
                  <ArrowUpDown size={12} className="opacity-60" />
                </div>
              </th>

              <th
                onClick={() => handleSort("physicalProgress")}
                className="py-3 px-4 text-center cursor-pointer hover:text-slate-900 transition"
              >
                <div className="flex items-center justify-center gap-1.5">
                  <span>Progress (Phy/Fin)</span>
                  <ArrowUpDown size={12} className="opacity-60" />
                </div>
              </th>

              <th
                onClick={() => handleSort("overallRisk")}
                className="py-3 px-4 text-center cursor-pointer hover:text-slate-900 transition"
              >
                <div className="flex items-center justify-center gap-1.5">
                  <span>AI Risk Level</span>
                  <ArrowUpDown size={12} className="opacity-60" />
                </div>
              </th>

              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {paginatedProjects.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-500">
                  <div className="max-w-xs mx-auto space-y-2">
                    <AlertTriangle size={28} className="mx-auto text-amber-500 opacity-80" />
                    <p className="font-semibold text-slate-700">No matching projects found</p>
                    <p className="text-[11px] text-slate-400">
                      Try clearing your search or adjusting sector/ministry filters.
                    </p>
                    <button
                      onClick={resetFilters}
                      className="mt-2 px-3 py-1.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-lg border border-blue-100 hover:bg-blue-100 transition"
                    >
                      Reset All Filters
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedProjects.map((project) => {
                const costOverrunPercent = project.originalCost
                  ? Math.round(((project.revisedCost - project.originalCost) / project.originalCost) * 100)
                  : 0;

                return (
                  <tr
                    key={project.id}
                    onClick={() => onSelectProject && onSelectProject(project.id)}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                  >
                    {/* Project Details Column */}
                    <td className="py-3.5 px-4 font-medium text-slate-900">
                      <div className="flex items-start gap-2.5">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200 shrink-0 mt-0.5">
                          {project.id}
                        </span>
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug line-clamp-1">
                            {project.name}
                          </p>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1 flex-wrap">
                            <span>{project.state || "India"}</span>
                            {project.contractor && (
                              <>
                                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                <span className="truncate max-w-[140px]" title={project.contractor}>
                                  {project.contractor}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Sector & Ministry */}
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-800 text-[11px]">{project.sector}</p>
                      <p className="text-[10px] text-slate-500 truncate max-w-[160px]" title={project.ministry}>
                        {project.ministry}
                      </p>
                    </td>

                    {/* Original Cost */}
                    <td className="py-3.5 px-4 text-right font-mono font-medium text-slate-700">
                      ₹{(project.originalCost || 0).toLocaleString()} Cr
                    </td>

                    {/* Revised Cost & Escalation */}
                    <td className="py-3.5 px-4 text-right font-mono">
                      <span className="font-bold text-slate-900">
                        ₹{(project.revisedCost || project.originalCost || 0).toLocaleString()} Cr
                      </span>
                      {costOverrunPercent > 0 && (
                        <div className="text-[10px] text-rose-600 font-semibold mt-0.5">
                          +{costOverrunPercent}% Overrun
                        </div>
                      )}
                    </td>

                    {/* Progress Bars */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="max-w-[110px] mx-auto space-y-1.5">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-slate-500 font-medium">Phy:</span>
                          <span className="font-bold text-slate-800">{project.physicalProgress || 0}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              (project.physicalProgress || 0) >= 80
                                ? "bg-emerald-500"
                                : (project.physicalProgress || 0) >= 50
                                ? "bg-blue-500"
                                : "bg-amber-500"
                            }`}
                            style={{ width: `${Math.min(100, Math.max(0, project.physicalProgress || 0))}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-400">
                          <span>Fin:</span>
                          <span>{project.financialProgress || 0}%</span>
                        </div>
                      </div>
                    </td>

                    {/* Risk Badge */}
                    <td className="py-3.5 px-4 text-center">
                      <RiskBadge risk={project.overallRisk || 0} size="small" />
                    </td>

                    {/* Action Button */}
                    <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onSelectProject && onSelectProject(project.id)}
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg border border-slate-200/80 transition inline-flex items-center gap-1 font-semibold text-[11px] px-2.5"
                        title="View Full Risk Intelligence & Forecasts"
                      >
                        <span>Details</span>
                        <ExternalLink size={12} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Production Pagination Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 outline-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <span className="text-slate-400 font-mono">
            Showing {filteredProjects.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}–
            {Math.min(currentPage * pageSize, filteredProjects.length)} of {filteredProjects.length}
          </span>
        </div>

        {/* Page Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white transition"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="px-3 font-semibold font-mono text-slate-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white transition"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectTable;
