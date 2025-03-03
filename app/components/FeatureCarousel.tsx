"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { useTheme } from "next-themes";

const features = [
  {
    title: "Smart Control & Navigation",
    description: [
      "3-Way Control: Joystick, Mobile App, Gesture Watch.",
      "Omnidirectional Movement: Mecanum wheels for 360° maneuverability.",
      "Voice Assistant: Hands-free commands for accessibility.",
    ],
    lightIcon: "/smartcontrol.png",
    darkIcon: "/smartcontrol-d.png",
  },
  {
    title: "Safety & Security",
    description: [
      "Emergency Panic Button: Immediate alert system.",
      "Phone Snatching Detection: Anti-theft mechanism.",
      "Biometric Authentication: Secure startup and user access.",
    ],
    lightIcon: "/safety.png",
    darkIcon: "/safety-d.png",
  },
  {
    title: "Comfort & Connectivity",
    description: [
      "Auto Height Adjustment: Adaptive seating with linear actuators.",
      "Smartphone UI: Controls wheelchair, monitors battery, and provides usage analytics.",
      "Smart Home Integration: Control lights, fans, and other IoT-enabled devices.",
    ],
    lightIcon: "/connectivity.png",
    darkIcon: "/connectivity-d.png",
  },
];

export default function FeatureCarousel() {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const controls = useAnimation();
  const { theme, systemTheme } = useTheme(); // Get current theme
  const [currentTheme, setCurrentTheme] = useState("");

  useEffect(() => {
    // Determine initial theme (Fixes incorrect icon on first load)
    setCurrentTheme(theme === "system" ? (systemTheme ?? "light") : (theme ?? "light"));
  }, [theme, systemTheme]);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  const handleDragEnd = () => {
    const currentX = x.get();
    if (currentX > 0) {
      controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } });
    } else if (currentX < -width) {
      controls.start({ x: -width, transition: { type: "spring", stiffness: 300, damping: 30 } });
    }
  };

  return (
    <div id="features" className="py-20 bg-gradient-to-b from-background to-secondary/20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          Key Features – Three Pillars of Innovation
        </h2>
        <motion.div ref={carousel} className="cursor-grab overflow-hidden">
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            whileTap={{ cursor: "grabbing" }}
            animate={controls}
            style={{ x }}
            onDragEnd={handleDragEnd}
            className="flex"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="min-w-[300px] max-w-[350px] h-auto p-8 m-4 bg-background rounded-3xl shadow-lg flex flex-col justify-between transition-all duration-300 ease-in-out border-2 border-transparent hover:shadow-[0px_0px_20px_5px_rgba(128,90,213,0.7)]"
              >
                <div className="flex flex-col items-center">
                  {/* ✅ Fixed Icon Rendering on First Load & Theme Change */}
                  <img
                    src={currentTheme === "dark" ? feature.darkIcon : feature.lightIcon}
                    alt={feature.title}
                    className="w-12 h-12 mb-4"
                  />

                  <h3 className="text-xl font-semibold mb-2 text-foreground text-center">
                    {feature.title}
                  </h3>

                  {/* Bullet Point List */}
                  <ul className="text-muted-foreground text-left list-disc list-inside space-y-2">
                    {feature.description.map((item, idx) => (
                      <li key={idx} className="text-base">{item}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
