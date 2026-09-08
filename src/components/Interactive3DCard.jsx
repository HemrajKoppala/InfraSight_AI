import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Interactive3DCard
 * Inspired by 21st.dev 3D Interactive Card (Aether Card / Umair Waheed design).
 * Provides realistic 3D perspective tilt, cursor glare spotlight, and depth translation.
 */
export function Interactive3DCard({
  children,
  className = "",
  containerClassName = "",
  glare = true,
  maxTilt = 12,
  glowColor = "rgba(14, 165, 233, 0.25)",
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position normalized between -1 and 1
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for fluid motion
  const mouseX = useSpring(x, { stiffness: 260, damping: 25 });
  const mouseY = useSpring(y, { stiffness: 260, damping: 25 });

  // 3D Rotations
  const rotateX = useTransform(mouseY, [-1, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseX, [-1, 1], [-maxTilt, maxTilt]);

  // Glare position in percentages (0% to 100%)
  const glareX = useTransform(mouseX, [-1, 1], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-1, 1], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mousePosX = e.clientX - rect.left;
    const mousePosY = e.clientY - rect.top;

    const normalizedX = (mousePosX / width) * 2 - 1;
    const normalizedY = (mousePosY / height) * 2 - 1;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className={`relative [perspective:1000px] ${containerClassName}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
        className={`relative rounded-2xl overflow-hidden transition-shadow duration-300 ${
          isHovered ? "shadow-2xl shadow-cyan-500/10" : "shadow-lg"
        } ${className}`}
      >
        {/* Glowing border highlight */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${glareX} ${glareY}, ${glowColor}, transparent 70%)`,
          }}
        />

        {/* Dynamic Cursor Glare Overlay */}
        {glare && isHovered && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 320px at ${glareX} ${glareY}, rgba(255,255,255,0.12), transparent 70%)`,
            }}
          />
        )}

        {/* Card Body */}
        <div className="relative z-10 [transform-style:preserve-3d] h-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export default Interactive3DCard;
