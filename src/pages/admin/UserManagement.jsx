import React, { useState, useMemo } from "react";
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  Search,
  CheckCircle,
  XCircle,
  ShieldCheck,
  Building2,
  AlertTriangle,
  Mail,
  Calendar,
  Filter
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useApi } from "../../context/ApiContext";
import FlowButton from "../../components/FlowButton";
import { Can, PERMISSIONS } from "../../lib/permissions";
import logoIcon from "@/assets/logo-icon.png";

export function UserManagement() {
  const { users, approveUser, rejectUser, deleteUser, role } = useAuth();
  const { showToast } = useApi();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rejectingUser, setRejectingUser] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  // Counts
  const pendingCount = users.filter((u) => u.status === "pending").length;
  const approvedCount = users.filter((u) => u.status === "approved").length;
  const rejectedCount = users.filter((u) => u.status === "rejected").length;

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesStatus =
        statusFilter === "all" ? true : u.status === statusFilter;

      const q = searchTerm.toLowerCase();
      const matchesSearch =
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.department && u.department.toLowerCase().includes(q));

      return matchesStatus && matchesSearch;
    });
  }, [users, statusFilter, searchTerm]);

  const handleApprove = (userId, name) => {
    approveUser(userId);
    showToast(`Access approved for ${name}. User can now sign in.`, "success");
  };

  const handleConfirmReject = () => {
    if (!rejectingUser) return;
    rejectUser(rejectingUser.id, rejectReason || "Security clearance unfulfilled");
    showToast(`Access rejected for ${rejectingUser.name}.`, "info");
    setRejectingUser(null);
    setRejectReason("");
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Banner with Logo Icon Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/90 p-1.5 shadow-2xs flex items-center justify-center shrink-0">
            <img
              src={logoIcon}
              alt="InfraSight AI"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                User Access Management
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold border border-blue-200">
                ADMINISTRATION
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Review, approve, or reject security clearance requests from departmental officers.
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs self-start sm:self-auto">
          Central Access Control Desk
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total */}
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <span>Total Accounts</span>
            <Users size={16} className="text-slate-400" />
          </div>
          <p className="text-2xl font-bold font-mono text-slate-900 mt-2">
            {users.length}
          </p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">
            Registered personnel
          </span>
        </div>

        {/* Pending */}
        <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl shadow-2xs">
          <div className="flex items-center justify-between text-amber-800 text-xs font-medium">
            <span>Pending Clearance</span>
            <Clock size={16} className="text-amber-600" />
          </div>
          <p className="text-2xl font-bold font-mono text-amber-900 mt-2">
            {pendingCount}
          </p>
          <span className="text-[11px] text-amber-700 mt-0.5 block font-semibold">
            {pendingCount > 0 ? "Requires review action" : "All requests reviewed"}
          </span>
        </div>

        {/* Approved */}
        <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl shadow-2xs">
          <div className="flex items-center justify-between text-emerald-800 text-xs font-medium">
            <span>Active Approved</span>
            <UserCheck size={16} className="text-emerald-600" />
          </div>
          <p className="text-2xl font-bold font-mono text-emerald-900 mt-2">
            {approvedCount}
          </p>
          <span className="text-[11px] text-emerald-700 mt-0.5 block">
            Authorized for workspace
          </span>
        </div>

        {/* Rejected */}
        <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-xl shadow-2xs">
          <div className="flex items-center justify-between text-rose-800 text-xs font-medium">
            <span>Access Denied</span>
            <UserX size={16} className="text-rose-600" />
          </div>
          <p className="text-2xl font-bold font-mono text-rose-900 mt-2">
            {rejectedCount}
          </p>
          <span className="text-[11px] text-rose-700 mt-0.5 block">
            Blocked from platform
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {[
            { id: "all", label: "All Users", count: users.length },
            { id: "pending", label: "Pending", count: pendingCount, alert: pendingCount > 0 },
            { id: "approved", label: "Approved", count: approvedCount },
            { id: "rejected", label: "Rejected", count: rejectedCount }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                statusFilter === tab.id
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  statusFilter === tab.id
                    ? "bg-white/25 text-white"
                    : tab.alert
                    ? "bg-amber-200 text-amber-900 font-bold"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search size={15} className="absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, email, ministry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 bg-slate-50 transition"
          />
        </div>
      </div>

      {/* Users Table & Responsive Mobile Cards (Section 12 & 17) */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
        {/* Desktop View (>= 768px): Structured Government Data Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-600 uppercase font-bold text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Applicant & Department</th>
                <th className="py-3 px-4">Official Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Registered Date</th>
                <th className="py-3 px-4">Access Status</th>
                <th className="py-3 px-4 text-right">Clearance Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                    No user requests found matching filter criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const isPending = u.status === "pending";
                  const isApproved = u.status === "approved";
                  const isRejected = u.status === "rejected";

                  return (
                    <tr key={u.id} className="hover:bg-slate-50/70 transition">
                      {/* Name & Dept */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                              u.role === "admin"
                                ? "bg-slate-900 text-white"
                                : "bg-blue-100 text-blue-800 border border-blue-200"
                            }`}
                          >
                            {u.name
                              .split(" ")
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join("")}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">
                              {u.name}
                            </span>
                            <span className="text-[11px] text-slate-500 block truncate max-w-[220px]">
                              {u.department || "Government Department"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-3.5 px-4 font-mono text-slate-600">
                        {u.email}
                      </td>

                      {/* Role */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                            u.role === "admin"
                              ? "bg-purple-100 text-purple-800 border border-purple-200"
                              : "bg-slate-100 text-slate-700 border border-slate-200"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                        {u.registeredAt || "Recent"}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {isPending && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                            <Clock size={12} className="animate-pulse" />
                            Pending Review
                          </span>
                        )}
                        {isApproved && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle size={12} />
                            Approved
                          </span>
                        )}
                        {isRejected && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                            <XCircle size={12} />
                            Rejected
                          </span>
                        )}
                      </td>

                      {/* Action buttons with RBAC Can guard */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {isPending && (
                            <>
                              <Can permission={PERMISSIONS.USERS_APPROVE} role={role}>
                                <button
                                  type="button"
                                  onClick={() => handleApprove(u.id, u.name)}
                                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition cursor-pointer shadow-2xs"
                                >
                                  Approve
                                </button>
                              </Can>
                              <Can permission={PERMISSIONS.USERS_REJECT} role={role}>
                                <button
                                  type="button"
                                  onClick={() => setRejectingUser(u)}
                                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-rose-50 text-rose-700 border border-rose-300 font-semibold text-xs transition cursor-pointer"
                                >
                                  Reject
                                </button>
                              </Can>
                            </>
                          )}

                          {isApproved && u.role !== "admin" && (
                            <Can permission={PERMISSIONS.USERS_REVOKE} role={role}>
                              <button
                                type="button"
                                onClick={() => setRejectingUser(u)}
                                className="px-2.5 py-1 rounded-md text-[11px] text-slate-500 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 transition cursor-pointer"
                                title="Revoke access"
                              >
                                Revoke Access
                              </button>
                            </Can>
                          )}

                          {isRejected && (
                            <Can permission={PERMISSIONS.USERS_APPROVE} role={role}>
                              <button
                                type="button"
                                onClick={() => handleApprove(u.id, u.name)}
                                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition cursor-pointer shadow-2xs"
                              >
                                Re-Approve
                              </button>
                            </Can>
                          )}

                          {u.role === "admin" && (
                            <span className="text-[11px] text-slate-400 italic">
                              Super Admin
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View (< 768px): Compact Cards matching Section 12 */}
        <div className="md:hidden divide-y divide-slate-100">
          {filteredUsers.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              No user requests found matching filter criteria.
            </div>
          ) : (
            filteredUsers.map((u) => {
              const isPending = u.status === "pending";
              const isApproved = u.status === "approved";
              const isRejected = u.status === "rejected";

              return (
                <div key={u.id} className="p-4 space-y-3 bg-white">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 truncate">
                        {u.name}
                      </h4>
                      <p className="text-xs font-mono text-slate-500 truncate">
                        {u.email}
                      </p>
                    </div>

                    <div>
                      {isPending && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                          <Clock size={10} className="animate-pulse" />
                          Pending
                        </span>
                      )}
                      {isApproved && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <CheckCircle size={10} />
                          Approved
                        </span>
                      )}
                      {isRejected && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                          <XCircle size={10} />
                          Rejected
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-semibold block">Role</span>
                      <span className="font-bold text-slate-700 uppercase font-mono text-[11px]">{u.role}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-semibold block">Created</span>
                      <span className="font-medium text-slate-600 font-mono text-[11px]">{u.registeredAt || "Recent"}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-400 text-[10px] uppercase font-semibold block">Department</span>
                      <span className="font-medium text-slate-700 truncate block text-[11px]">{u.department || "Government Department"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    {isPending && (
                      <>
                        <Can permission={PERMISSIONS.USERS_APPROVE} role={role}>
                          <button
                            type="button"
                            onClick={() => handleApprove(u.id, u.name)}
                            className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-2xs cursor-pointer text-center"
                          >
                            Approve
                          </button>
                        </Can>
                        <Can permission={PERMISSIONS.USERS_REJECT} role={role}>
                          <button
                            type="button"
                            onClick={() => setRejectingUser(u)}
                            className="flex-1 py-2 rounded-lg bg-white hover:bg-rose-50 text-rose-700 border border-rose-300 font-bold text-xs transition cursor-pointer text-center"
                          >
                            Reject
                          </button>
                        </Can>
                      </>
                    )}

                    {isApproved && u.role !== "admin" && (
                      <Can permission={PERMISSIONS.USERS_REVOKE} role={role}>
                        <button
                          type="button"
                          onClick={() => setRejectingUser(u)}
                          className="w-full py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 transition cursor-pointer"
                        >
                          Revoke Access
                        </button>
                      </Can>
                    )}

                    {isRejected && (
                      <Can permission={PERMISSIONS.USERS_APPROVE} role={role}>
                        <button
                          type="button"
                          onClick={() => handleApprove(u.id, u.name)}
                          className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-2xs cursor-pointer text-center"
                        >
                          Re-Approve Access
                        </button>
                      </Can>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Confirmation Dialog for Reject / Revoke */}
      {rejectingUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Reject Access Request
                </h3>
                <p className="text-xs text-slate-500">
                  This will deny login access for this account.
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <p className="font-bold text-slate-800">{rejectingUser.name}</p>
              <p className="font-mono text-slate-500">{rejectingUser.email}</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Reason for Rejection (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Official vetting documents unverified"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRejectingUser(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer transition shadow-xs"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
