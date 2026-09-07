import React, { useState, useMemo } from "react";
import {
  FolderKanban,
  Search,
  Filter,
  ArrowUpDown,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  IndianRupee,
  Calendar,
  Building2,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  Clock
} from "lucide-react";
import RiskBadge from "../components/RiskBadge";
import { useApi } from "../context/ApiContext";
import { TableSkeleton } from "../components/LoadingSkeleton";
import EmptyState from "../components/EmptyState";

function Projects({ setCurrentPage }) {
  const {
    projects,
    loadingProjects,
    errorProjects,
    refreshAll,
    setSelectedProjectId
  } = useApi();

  const [viewMode, setViewMode] = useState("table"); // 'table' | 'cards'
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("ALL");
  const [ministryFilter, setMinistryFilter] = useState("ALL");
  const [riskFilter, setRiskFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortField, setSortField] = useState("overallRisk");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  // Dynamic sectors and ministries
  const sectors = useMemo(() => {
    return Array.from(new Set(projects.map((p) => p.sector).filter(Boolean)));
  }, [projects]);

  const ministries = useMemo(() => {
    return Array.from(new Set(projects.map((p) => p.ministry).filter(Boolean)));
  }, [projects]);

  // Filtered list
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

  // Sorted list
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

  // Pagination
  const totalPages = Math.ceil(sortedProjects.length / pageSize) || 1;
  const paginatedProjects = useMemo(() => {
    const start = (currentPageNum - 1) * pageSize;
    return sortedProjects.slice(start, start + pageSize);
  }, [sortedProjects, currentPageNum, pageSize]);

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
    setCurrentPageNum(1);
  };

  const handleSelectProject = (id) => {
    setSelectedProjectId(id);
    setCurrentPage("details");
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Central Project Registry
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {filteredProjects.length} Projects Loaded
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1 flex items-center gap-2">
            <FolderKanban size={22} className="text-blue-600" />
            Infrastructure Project Repository
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Comprehensive catalog of central sector infrastructure projects monitored under MoSPI OCMS framework
          </p>
        </div>

        {/* View Switcher & Refresh */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition ${
                viewMode === "table"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
              title="Table View"
            >
              <List size={14} />
              <span className="hidden sm:inline">Table</span>
            </button>
            <button
              onClick={() => setViewMode("cards")}
              className={`p-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition ${
                viewMode === "cards"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-500 hover:text-slate-900"
              }`}
              title="Card Grid View"
            >
              <LayoutGrid size={14} />
              <span className="hidden sm:inline">Cards</span>
            </button>
          </div>

          <button
            onClick={refreshAll}
            className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg border border-slate-200 transition"
            title="Refresh Repository"
          >
            <RefreshCw size={14} className={loadingProjects ? "animate-spin text-blue-600" : ""} />
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="gov-card p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {/* Search Box */}
          <div className="relative md:col-span-2">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by project name, ID, contractor, state..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPageNum(1);
              }}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 placeholder:text-slate-400 outline-none focus:bg-white focus:border-blue-600 transition"
            />
          </div>

          {/* Sector Filter */}
          <select
            value={sectorFilter}
            onChange={(e) => {
              setSectorFilter(e.target.value);
              setCurrentPageNum(1);
            }}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 outline-none focus:border-blue-600"
          >
            <option value="ALL">All Sectors</option>
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
              setCurrentPageNum(1);
            }}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 outline-none focus:border-blue-600"
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
              setCurrentPageNum(1);
            }}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 outline-none focus:border-blue-600"
          >
            <option value="ALL">All AI Risk Levels</option>
            <option value="CRITICAL">Critical (≥80%)</option>
            <option value="HIGH">High Risk (65–79%)</option>
            <option value="MEDIUM">Moderate (40–64%)</option>
            <option value="LOW">Low Risk (&lt;40%)</option>
          </select>
        </div>

        {/* Active Filter Tags */}
        {(searchTerm || sectorFilter !== "ALL" || ministryFilter !== "ALL" || riskFilter !== "ALL" || statusFilter !== "ALL") && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500 font-medium">
              Filtered {filteredProjects.length} of {projects.length} total projects
            </span>
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {loadingProjects ? (
        <div className="gov-card p-6">
          <TableSkeleton rows={8} cols={7} />
        </div>
      ) : errorProjects ? (
        <EmptyState
          type="error"
          title="Error Loading Project Data"
          description={errorProjects}
          onRetry={refreshAll}
        />
      ) : paginatedProjects.length === 0 ? (
        <div className="gov-card p-12 text-center space-y-3">
          <AlertTriangle size={32} className="mx-auto text-amber-500" />
          <h3 className="font-bold text-slate-800 text-sm">No Matching Projects Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No projects matched your active search query or filter combination.
          </p>
          <button
            onClick={resetFilters}
            className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg border border-blue-200 hover:bg-blue-100 transition"
          >
            Clear Filters
          </button>
        </div>
      ) : viewMode === "table" ? (
        /* ================= TABULAR VIEW ================= */
        <div className="gov-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="gov-table-header">
                  <th
                    onClick={() => handleSort("id")}
                    className="py-3 px-4 cursor-pointer hover:text-slate-900 transition"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Project Identifier & Name</span>
                      <ArrowUpDown size={11} className="opacity-60" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("sector")}
                    className="py-3 px-4 cursor-pointer hover:text-slate-900 transition"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Sector & Ministry</span>
                      <ArrowUpDown size={11} className="opacity-60" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("originalCost")}
                    className="py-3 px-4 text-right cursor-pointer hover:text-slate-900 transition"
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      <span>Approved (₹ Cr)</span>
                      <ArrowUpDown size={11} className="opacity-60" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("revisedCost")}
                    className="py-3 px-4 text-right cursor-pointer hover:text-slate-900 transition"
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      <span>Revised / Est. (₹ Cr)</span>
                      <ArrowUpDown size={11} className="opacity-60" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("physicalProgress")}
                    className="py-3 px-4 text-center cursor-pointer hover:text-slate-900 transition"
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <span>Progress</span>
                      <ArrowUpDown size={11} className="opacity-60" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("overallRisk")}
                    className="py-3 px-4 text-center cursor-pointer hover:text-slate-900 transition"
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <span>AI Risk</span>
                      <ArrowUpDown size={11} className="opacity-60" />
                    </div>
                  </th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {paginatedProjects.map((project) => {
                  const overrunPercent = project.originalCost
                    ? Math.round(((project.revisedCost - project.originalCost) / project.originalCost) * 100)
                    : 0;

                  return (
                    <tr
                      key={project.id}
                      onClick={() => handleSelectProject(project.id)}
                      className="hover:bg-slate-50 transition cursor-pointer group"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-start gap-2">
                          <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 rounded text-slate-700 border border-slate-200 shrink-0 mt-0.5">
                            {project.id}
                          </span>
                          <div>
                            <p className="font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug line-clamp-1">
                              {project.name}
                            </p>
                            <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                              <span>{project.state || "National"}</span>
                              {project.contractor && (
                                <>
                                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                  <span className="truncate max-w-[130px]">{project.contractor}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-800 text-[11px]">{project.sector}</p>
                        <p className="text-[10px] text-slate-500 truncate max-w-[150px]">{project.ministry}</p>
                      </td>

                      <td className="py-3 px-4 text-right font-mono text-slate-700">
                        ₹{(project.originalCost || 0).toLocaleString()}
                      </td>

                      <td className="py-3 px-4 text-right font-mono">
                        <span className="font-bold text-slate-900">
                          ₹{(project.revisedCost || project.originalCost || 0).toLocaleString()}
                        </span>
                        {overrunPercent > 0 && (
                          <div className="text-[10px] text-rose-600 font-semibold">
                            +{overrunPercent}% Overrun
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <div className="max-w-[90px] mx-auto space-y-1">
                          <div className="flex justify-between text-[10px] text-slate-600">
                            <span>Phy:</span>
                            <span className="font-bold font-mono">{project.physicalProgress || 0}%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-blue-600 h-full rounded-full"
                              style={{ width: `${project.physicalProgress || 0}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-center">
                        <RiskBadge risk={project.overallRisk || 0} size="small" />
                      </td>

                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border ${
                            project.status === "Delayed"
                              ? "bg-rose-50 text-rose-700 border-rose-200"
                              : project.status === "Completed"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                          }`}
                        >
                          {project.status || "Ongoing"}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleSelectProject(project.id)}
                          className="px-2 py-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded border border-blue-100 transition inline-flex items-center gap-1"
                        >
                          <span>Dossier</span>
                          <ExternalLink size={10} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* ================= CARD GRID VIEW ================= */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleSelectProject(project.id)}
              className="gov-card p-5 hover:border-blue-400 transition cursor-pointer space-y-3 group"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200">
                  {project.id}
                </span>
                <RiskBadge risk={project.overallRisk || 0} size="small" />
              </div>

              <div>
                <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug line-clamp-2">
                  {project.name}
                </h4>
                <p className="text-xs text-slate-500 mt-1">{project.sector} • {project.state || "India"}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-lg text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 block">Approved</span>
                  <span className="font-bold text-slate-800">₹{(project.originalCost || 0).toLocaleString()} Cr</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Revised</span>
                  <span className="font-bold text-slate-900">₹{(project.revisedCost || project.originalCost || 0).toLocaleString()} Cr</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                  <span>Physical Progress</span>
                  <span className="font-bold">{project.physicalProgress || 0}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full"
                    style={{ width: `${project.physicalProgress || 0}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <span className="text-[11px] text-slate-500 truncate max-w-[160px]">{project.ministry}</span>
                <span className="text-xs font-semibold text-blue-600 group-hover:translate-x-0.5 transition flex items-center gap-1">
                  <span>View Details</span>
                  <ExternalLink size={11} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Footer */}
      <div className="p-4 gov-card flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPageNum(1);
            }}
            className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-semibold text-slate-700"
          >
            <option value={5}>5</option>
            <option value={8}>8</option>
            <option value={15}>15</option>
            <option value={30}>30</option>
          </select>
          <span className="text-slate-400 font-mono">
            Showing {filteredProjects.length === 0 ? 0 : (currentPageNum - 1) * pageSize + 1}–
            {Math.min(currentPageNum * pageSize, filteredProjects.length)} of {filteredProjects.length}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPageNum((p) => Math.max(1, p - 1))}
            disabled={currentPageNum === 1}
            className="p-1.5 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 transition"
            title="Previous Page"
          >
            <ChevronLeft size={15} />
          </button>
          <span className="px-3 font-semibold font-mono text-slate-700">
            Page {currentPageNum} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPageNum((p) => Math.min(totalPages, p + 1))}
            disabled={currentPageNum === totalPages}
            className="p-1.5 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 transition"
            title="Next Page"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Projects;
