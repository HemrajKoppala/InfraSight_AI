import React from 'react';

/**
 * FlowButton
 * Implementation of the flowing animated button from 21st.dev.
 * Features centered expanding circle that flows across the button on hover,
 * morphing border-radius, and smooth text transition.
 */
export function FlowButton({
  children,
  text,
  onClick,
  icon: Icon = null,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  title = '',
  ...props
}) {
  const displayText = text || children;

  // Size configurations — generous and clickable
  const sizeStyles = {
    xs: 'px-3.5 py-1.5 text-xs min-h-[32px]',
    sm: 'px-5 py-2 text-xs font-semibold min-h-[38px]',
    md: 'px-6 py-2.5 text-sm font-semibold min-h-[44px]',
    lg: 'px-8 py-3.5 text-base font-semibold min-h-[50px]',
    xl: 'px-10 py-4 text-base font-bold min-h-[54px]',
  };

  // Color & Theme Variants (Optimized for Light Mode)
  const variantStyles = {
    // MoSPI Navy / Primary
    primary: {
      border: 'border-blue-600 bg-white shadow-xs',
      text: 'text-blue-700 font-semibold',
      circleBg: 'bg-blue-600',
      hoverText: 'group-hover:text-white',
    },
    // Solid Blue
    solid: {
      border: 'border-blue-600 bg-blue-600 shadow-md',
      text: 'text-white font-semibold',
      circleBg: 'bg-blue-800',
      hoverText: 'group-hover:text-white',
    },
    // Dark / Slate
    dark: {
      border: 'border-slate-800 bg-slate-900',
      text: 'text-white font-semibold',
      circleBg: 'bg-blue-600',
      hoverText: 'group-hover:text-white',
    },
    // Danger / Escalation
    danger: {
      border: 'border-rose-500 bg-rose-50',
      text: 'text-rose-700 font-semibold',
      circleBg: 'bg-rose-600',
      hoverText: 'group-hover:text-white',
    },
    // Amber / Warning
    amber: {
      border: 'border-amber-500 bg-amber-50',
      text: 'text-amber-800 font-semibold',
      circleBg: 'bg-amber-600',
      hoverText: 'group-hover:text-white',
    },
    // Emerald / Success
    emerald: {
      border: 'border-emerald-600 bg-emerald-50',
      text: 'text-emerald-800 font-semibold',
      circleBg: 'bg-emerald-600',
      hoverText: 'group-hover:text-white',
    },
    // Subtle Neutral Outline
    secondary: {
      border: 'border-slate-300 bg-white hover:border-slate-400',
      text: 'text-slate-700 font-medium',
      circleBg: 'bg-slate-800',
      hoverText: 'group-hover:text-white',
    },
    // White button
    white: {
      border: 'border-white bg-white shadow-md',
      text: 'text-blue-700 font-bold',
      circleBg: 'bg-blue-700',
      hoverText: 'group-hover:text-white',
    },
  };

  const v = variantStyles[variant] || variantStyles.primary;
  const s = sizeStyles[size] || sizeStyles.md;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[100px] border-[1.5px] font-medium cursor-pointer transition-all duration-[500ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:rounded-[10px] active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${v.border} ${v.text} ${v.hoverText} ${s} ${className}`}
      {...props}
    >
      {/* Expanding flow circle in center */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 ${v.circleBg} rounded-[50%] opacity-0 group-hover:w-[420px] group-hover:h-[420px] group-hover:opacity-100 transition-all duration-[700ms] ease-[cubic-bezier(0.19,1,0.22,1)]`}
      />

      {/* Button content label - guaranteed crisp pure white text on hover */}
      <span className={`relative z-[1] transition-colors duration-[200ms] whitespace-nowrap inline-flex items-center justify-center gap-2 ${v.text} group-hover:!text-white`}>
        {Icon && <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110 group-hover:!text-white" />}
        <span className="group-hover:!text-white">{displayText}</span>
      </span>
    </button>
  );
}

export default FlowButton;
