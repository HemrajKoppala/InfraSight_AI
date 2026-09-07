import React, { useState, createContext, useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logoIcon from "@/assets/logo-icon.png";

const SidebarContext = createContext(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate = true,
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = ({ className, children, ...props }) => {
  return (
    <>
      <DesktopSidebar className={className} {...props}>
        {children}
      </DesktopSidebar>
      <MobileSidebar className={className} {...props}>
        {children}
      </MobileSidebar>
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}) => {
  const { open, setOpen, animate } = useSidebar();

  return (
    <motion.aside
      aria-label="Sidebar Navigation"
      className={cn(
        "h-screen fixed top-0 left-0 z-40 hidden md:flex md:flex-col bg-white text-slate-700 border-r border-slate-200 select-none overflow-hidden shadow-xs",
        className
      )}
      initial={false}
      animate={{
        width: animate ? (open ? "268px" : "64px") : "268px",
      }}
      transition={{
        duration: 0.25,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      {...props}
    >
      {children}
    </motion.aside>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}) => {
  const { open, setOpen, animate } = useSidebar();

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, setOpen]);

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      {/* Mobile Top Navigation Bar (Light Mode) */}
      <div className="h-14 px-4 flex flex-row items-center justify-between bg-white text-slate-900 border-b border-slate-200 w-full fixed top-0 left-0 z-30 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <img
            src={logoIcon}
            alt="InfraSight AI"
            className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 p-0.5 object-contain shadow-2xs"
          />
          <div className="flex items-center gap-1">
            <span className="font-bold text-sm tracking-tight text-[#07133D]">InfraSight <span className="text-[#0B75B8]">AI</span></span>
            <span className="ml-1 text-[9px] font-mono px-1.5 py-0.2 bg-blue-50 text-[#07133D] rounded border border-blue-200 font-bold">
              MoSPI
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={open}
          className="p-2 rounded-lg bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
              aria-hidden="true"
            />

            {/* Mobile Drawer (Light Mode) */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                duration: 0.28,
                ease: [0.32, 0.72, 0, 1],
              }}
              className={cn(
                "relative flex flex-col w-[290px] max-w-[85vw] h-full bg-white text-slate-800 border-r border-slate-200 shadow-2xl z-10 select-none overflow-y-auto",
                className
              )}
              {...props}
            >
              {/* Close Button */}
              <div className="absolute right-3 top-3.5 z-20">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation menu"
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Force open: true inside drawer */}
              <SidebarContext.Provider value={{ open: true, setOpen, animate }}>
                {children}
              </SidebarContext.Provider>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SidebarLink = ({
  link,
  isActive = false,
  className,
  onClick,
  ...props
}) => {
  const { open, setOpen, animate } = useSidebar();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
    // Automatically close mobile drawer after navigation
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setOpen(false);
    }
  };

  const isLink = link.href && link.href !== "#";
  const Component = isLink ? "a" : "button";

  return (
    <div
      className="relative group/sidebar w-full flex justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Component
        type={Component === "button" ? "button" : undefined}
        href={isLink ? link.href : undefined}
        onClick={handleClick}
        aria-label={link.label}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "transition-all duration-150 relative outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer",
          open
            ? "w-full flex items-center h-10 px-3 rounded-xl text-xs font-medium"
            : "w-10 h-10 rounded-xl flex items-center justify-center my-0.5",
          isActive
            ? "bg-blue-600 text-white font-semibold shadow-xs"
            : "text-slate-500 hover:text-slate-900 hover:bg-slate-100",
          className
        )}
        {...props}
      >
        {/* Centered Icon Container */}
        <div
          className={cn(
            "w-5 h-5 flex items-center justify-center shrink-0 transition-colors",
            open && "mr-3",
            isActive ? "text-white" : "text-slate-500 group-hover/sidebar:text-blue-600"
          )}
        >
          {link.icon}
        </div>

        {/* Animated Text Label (only when expanded) */}
        <motion.div
          animate={{
            opacity: animate ? (open ? 1 : 0) : 1,
            width: animate ? (open ? "auto" : 0) : "auto",
            display: animate ? (open ? "flex" : "none") : "flex",
          }}
          transition={{ duration: 0.18, ease: "easeInOut" }}
          className="items-center justify-between flex-1 overflow-hidden whitespace-nowrap"
        >
          <span
            className={cn(
              "truncate text-left font-medium",
              isActive ? "text-white font-semibold" : "text-slate-700 group-hover/sidebar:text-slate-900"
            )}
          >
            {link.label}
          </span>

          {link.badge !== undefined && link.badge !== null && (
            <span
              className={cn(
                "ml-2 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded tracking-wide shrink-0",
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-slate-600 border border-slate-200 group-hover/sidebar:text-slate-800"
              )}
            >
              {link.badge}
            </span>
          )}
        </motion.div>
      </Component>

      {/* Accessible Tooltip in Desktop Collapsed Mode (Light Mode) */}
      {!open && isHovered && (
        <div
          role="tooltip"
          className="fixed left-[68px] z-50 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-xl border border-slate-800 pointer-events-none whitespace-nowrap flex items-center gap-2 animate-in fade-in zoom-in-95 duration-100"
          style={{
            transform: "translateY(-50%)",
            top: "var(--tooltip-top, auto)",
          }}
          ref={(el) => {
            if (el && el.parentElement) {
              const rect = el.parentElement.getBoundingClientRect();
              el.style.top = `${rect.top + rect.height / 2}px`;
            }
          }}
        >
          <span>{link.label}</span>
          {link.badge !== undefined && link.badge !== null && (
            <span className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-800 text-cyan-300 rounded border border-slate-700">
              {link.badge}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
