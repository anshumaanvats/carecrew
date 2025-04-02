"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutUs() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto">
        {/* About Us Section */}
        <motion.h2
          className="text-5xl font-black mb-8 text-center text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Us
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h3 className="text-3xl font-bold mb-4 text-foreground">Empowering Mobility with Technology</h3>
            <p className="text-muted-foreground mb-6">
              At <span className="text-black dark:text-white transition-colors duration-200 hover:text-blue-500 dark:hover:text-blue-500 hover:font-bold">CareCrew</span>, we are dedicated to designing innovative smart wheelchair solutions that enhance mobility and independence. Our team of passionate engineers combines cutting-edge technology with user-centric design to create customizable, AI-powered wheelchairs tailored to individual needs.
            </p>
            <p className="text-muted-foreground">
              From motion control via gestures to real-time safety features, we are transforming accessibility solutions to provide seamless experiences for users worldwide.
            </p>
          </motion.div>
          <motion.div
            className="relative h-96 group" // Added 'group' class for hover targeting
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-br from-primary to-blue-600 rounded-lg transform rotate-3 transition-transform duration-300 ease-in-out group-hover:-rotate-3"
            ></div>
            <div
              className="absolute inset-0 bg-muted rounded-lg transform -rotate-3 transition-transform duration-300 ease-in-out flex items-center justify-center group-hover:rotate-3"
            >
              <p className="text-2xl font-bold text-foreground text-center">
                Innovating for a More Accessible Future
              </p>
            </div>
          </motion.div>
        </div>

        {/* Meet Our Team Section */}
        <motion.h2
          className="text-4xl font-bold mt-16 mb-8 text-center text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Meet Our Team
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Team Member 1 - Software Engineer */}
          <motion.div
            className="group relative overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/image1.png"
              alt="Software Engineer"
              width={400}
              height={400}
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 transition-opacity duration-300 group-hover:bg-opacity-70">
              <h3 className="text-white text-xl font-semibold">Anshumaan Vats</h3>
              <p className="text-primary text-sm">Software Engineer</p>
              <p className="text-white text-xs">Led the team while designing and programming the smart wheelchair’s circuits and control systems.Also completed the project website.</p>
            </div>
          </motion.div>

          {/* Team Member 2 - Mechanical Engineer */}
          <motion.div
            className="group relative overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src="/image2.png"
              alt="Mechanical Engineer"
              width={400}
              height={400}
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 transition-opacity duration-300 group-hover:bg-opacity-70">
              <h3 className="text-white text-xl font-semibold">Ankit</h3>
              <p className="text-primary text-sm">Mechanical Engineer</p>
              <p className="text-white text-xs">Designed the wheelchair’s frame and handled the mechanical structure and movement mechanisms.</p>
            </div>
          </motion.div>

          {/* Team Member 3 - Software Engineer */}
          <motion.div
            className="group relative overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Image
              src="/image3.jpg"
              alt="Software Engineer"
              width={400}
              height={400}
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 transition-opacity duration-300 group-hover:bg-opacity-70">
              <h3 className="text-white text-xl font-semibold">Abhay</h3>
              <p className="text-primary text-sm">Software Engineer</p>
              <p className="text-white text-xs">Conducted market research and identified revenue opportunities to drive product innovation and business growth.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}