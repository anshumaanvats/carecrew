"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function MoveWithConfidence() {
  const router = useRouter(); // ✅ Added router for navigation

  return (
    <section className="bg-background py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
            Move with Confidence
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            The OmniMate Wheelchair empowers you with effortless mobility, blending smart technology with ergonomic design for unmatched freedom and control.
          </p>
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* ✅ Button now redirects to "Customize Your Wheelchair" page */}
            <button 
              onClick={() => router.push("/customize")} 
              className="apple-button inline-flex items-center"
            >
              Get Yours Today
              <span className="ml-2 text-lg">→</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
