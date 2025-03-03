"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

const timelineEvents = [
  {
    year: 2022,
    title: "Concept & Research",
    description: "The idea for OmniMate was born, focusing on AI-driven smart mobility.",
    details:
      "CareCrew initiated the development of an intelligent wheelchair with AI-assisted navigation and IoT connectivity.",
  },
  {
    year: 2023,
    title: "Prototype Development & Patent Published",
    description: "Our first working prototype was tested in controlled environments.",
    details:
      "We developed and tested the first version of OmniMate, integrating NodeMCU for IoT features and an MPU6050 sensor for movement detection. A patent was published to protect the innovation.",
  },
  {
    year: 2024,
    title: "Real-world Testing & Refinement",
    description: "User feedback led to significant improvements in design and functionality.",
    details:
      "Field testing with actual users helped refine the wheelchair's AI-driven controls, safety mechanisms, and power efficiency.",
  },
  {
    year: 2025,
    title: "Market Launch Mid-2025",
    description: "OmniMate is set to launch worldwide in mid-2025!",
    details:
      "Final testing and regulatory approvals are in progress to ensure a successful global launch.",
  },
  {
    year: 2026,
    title: "Next-gen Innovations",
    description: "Exploring AI-driven automation and enhanced accessibility.",
    details:
      "Future plans include integrating advanced voice controls, automated obstacle detection, and improved energy-efficient motors.",
  },
];

// ✅ Fixed: Removed scaling issues in WheelchairIcon
const WheelchairIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M8 14L12 10L16 14" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="16" r="2" fill="currentColor" />
  </svg>
);

export default function Timeline() {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section ref={containerRef} className="py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">The OmniMate Journey</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Evolution of the OmniMate Wheelchair from concept to reality
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary/20"
            style={{ scaleY: scaleX }}
          />

          {/* ✅ Fixed: Removed unwanted scaling of Wheelchair Icon */}
          <motion.div
            className="sticky top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-primary"
          >
            <WheelchairIcon />
          </motion.div>

          {timelineEvents.map((event, index) => (
            <TimelineEvent
              key={event.year}
              event={event}
              index={index}
              isExpanded={expandedEvent === index}
              onToggle={() => setExpandedEvent(expandedEvent === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineEvent({
  event,
  index,
  isExpanded,
  onToggle,
}: {
  event: (typeof timelineEvents)[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <div className="w-5/12" />
      <div className="z-20">
        <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
          <div className="w-3 h-3 bg-background rounded-full" />
        </div>
      </div>
      <motion.div
        className="w-5/12 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
      >
        <div className="p-4 bg-background rounded-lg shadow-md border border-primary/10">
          <span className="font-bold text-primary">{event.year}</span>
          <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
          <p className="text-muted-foreground">{event.description}</p>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-2 text-sm text-muted-foreground">{event.details}</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
