import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { hasPermission as checkRolePermission, PERMISSIONS, ROLE_PERMISSIONS } from "../lib/permissions";

const AuthContext = createContext();

const INITIAL_DEMO_USERS = [
  {
    id: "admin-001",
    name: "Main Administrator",
    email: "admin@infrasight.ai",
    password: "Admin@123",
    role: "admin",
    status: "approved",
    department: "MoSPI Central Monitoring Desk",
    registeredAt: "01 Sep 2026",
  },
  {
    id: "manager-001",
    name: "Dr. Vikram Seth",
    email: "manager@infrasight.ai",
    password: "Manager@123",
    role: "manager",
    status: "approved",
    department: "Project Management Directorate",
    registeredAt: "02 Sep 2026",
  },
  {
    id: "analyst-001",
    name: "Pooja Deshmukh",
    email: "analyst@infrasight.ai",
    password: "Analyst@123",
    role: "analyst",
    status: "approved",
    department: "Infrastructure Risk & Financial Intelligence",
    registeredAt: "02 Sep 2026",
  },
  {
    id: "user-001",
    name: "Demo Nodal Officer",
    email: "user@infrasight.ai",
    password: "User@123",
    role: "user",
    status: "approved",
    department: "Ministry of Road Transport & Highways",
    registeredAt: "02 Sep 2026",
  },
  {
    id: "user-002",
    name: "Rajesh Sharma",
    email: "rajesh.sharma@nhai.gov.in",
    password: "Sharma@123",
    role: "user",
    status: "pending",
    department: "NHAI - Technical Division",
    registeredAt: "Today, 11:20 AM",
  },
  {
    id: "user-003",
    name: "Ananya Verma",
    email: "ananya.v@railways.gov.in",
    password: "Ananya@123",
    role: "user",
    status: "pending",
    department: "Ministry of Railways (EDFC Division)",
    registeredAt: "Yesterday, 03:45 PM",
  },
  {
    id: "user-004",
    name: "Kiran Reddy",
    email: "kiran.reddy@powergrid.in",
    password: "Kiran@123",
    role: "user",
    status: "rejected",
    department: "PowerGrid Transmission Integration",
    registeredAt: "04 Sep 2026",
    rejectedReason: "Security vetting unverified by nodal authority.",
  },
];

const STORAGE_USERS_KEY = "infrasight_demo_users_v1";
const STORAGE_SESSION_KEY = "infrasight_demo_session_v1";

export function AuthProvider({ children }) {
  // Load users database from localStorage or fallback
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_USERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Failed to load demo users from localStorage", e);
    }
    return INITIAL_DEMO_USERS;
  });

  // Load session from localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SESSION_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Failed to load demo session from localStorage", e);
    }
    return null;
  });

  // Save users whenever modified
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    } catch (e) {
      console.warn("Failed to save demo users to localStorage", e);
    }
  }, [users]);

  // Save/clear session
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_SESSION_KEY);
      }
    } catch (e) {
      console.warn("Failed to update demo session in localStorage", e);
    }
  }, [currentUser]);

  // Login handler
  const login = useCallback(
    (email, password) => {
      const trimmedEmail = email.trim().toLowerCase();
      const trimmedPassword = password.trim();

      const found = users.find(
        (u) => u.email.toLowerCase() === trimmedEmail && u.password === trimmedPassword
      );

      if (!found) {
        return {
          success: false,
          error: "Invalid email or password. Please verify credentials.",
        };
      }

      if (found.status === "pending") {
        return {
          success: false,
          status: "pending",
          user: found,
          error: "Your account is still awaiting administrator approval.",
        };
      }

      if (found.status === "rejected") {
        return {
          success: false,
          status: "rejected",
          user: found,
          error: "Your account request has been rejected by the administrator.",
        };
      }

      // Approved user
      setCurrentUser(found);
      return { success: true, user: found };
    },
    [users]
  );

  // Register handler (strictly sets status: "pending")
  const register = useCallback(
    ({ name, email, password, department }) => {
      const trimmedEmail = email.trim().toLowerCase();

      const existing = users.find((u) => u.email.toLowerCase() === trimmedEmail);
      if (existing) {
        return {
          success: false,
          error: "An account with this official email already exists.",
        };
      }

      const newUser = {
        id: `user-${Date.now().toString().slice(-4)}`,
        name: name.trim(),
        email: trimmedEmail,
        password: password.trim(),
        department: department?.trim() || "Government Department / PSU",
        role: "user",
        status: "pending", // NON-NEGOTIABLE: Always pending on registration
        registeredAt: "Just now",
      };

      setUsers((prev) => [newUser, ...prev]);
      return { success: true, user: newUser };
    },
    [users]
  );

  // Logout handler
  const logout = useCallback(() => {
    setCurrentUser(null);
    try {
      localStorage.removeItem(STORAGE_SESSION_KEY);
    } catch (e) {}
  }, []);

  // Admin Actions: Approve User
  const approveUser = useCallback((userId) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: "approved" } : u))
    );
    // If the currently logged-in user is updated
    setCurrentUser((current) =>
      current && current.id === userId ? { ...current, status: "approved" } : current
    );
    return { success: true };
  }, []);

  // Admin Actions: Reject User
  const rejectUser = useCallback((userId, reason = "Rejected by Administrator") => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, status: "rejected", rejectedReason: reason } : u
      )
    );
    setCurrentUser((current) =>
      current && current.id === userId ? { ...current, status: "rejected" } : current
    );
    return { success: true };
  }, []);

  // Admin Actions: Delete User
  const deleteUser = useCallback((userId) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    return { success: true };
  }, []);

  const isAuthenticated = !!currentUser && currentUser.status === "approved";

  // RBAC Permission Evaluator
  const checkPermission = useCallback(
    (permission) => checkRolePermission(currentUser?.role, permission),
    [currentUser?.role]
  );

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        userStatus: currentUser?.status || null,
        role: currentUser?.role || null,
        hasPermission: checkPermission,
        checkPermission,
        users,
        login,
        register,
        logout,
        approveUser,
        rejectUser,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
