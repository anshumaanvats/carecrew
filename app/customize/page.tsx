"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import jsPDF from "jspdf"
import { ChevronDown, ChevronUp } from 'lucide-react'

// Define types
interface Option {
  label: string;
  price: number;
  selected: boolean;
  disabled: boolean;
}

interface Options {
  controlOptions: Option[];
  mobilityComfort: Option[];
  securitySafety: Option[];
  chargingPower: Option[];
  smartHomeIntegration: Option[];
  extraAddons: Option[];
}

interface FormData {
  name: string;
  email: string;
  phone: string;
}

interface FormErrors {
  name: string;
  email: string;
  phone: string;
}

const options: Options = {
  controlOptions: [
    { label: "Standard Joystick", price: 0, selected: true, disabled: true },
    { label: "Gesture Control", price: 2500, selected: false, disabled: false },
    { label: "Mobile Control", price: 1500, selected: false, disabled: false },
  ],
  mobilityComfort: [
    { label: "Omnidirectional Mecanum Wheels", price: 0, selected: true, disabled: true },
    { label: "Auto Height Adjustment", price: 4000, selected: false, disabled: false },
    { label: "Posture Correction System", price: 3000, selected: false, disabled: false },
    { label: "Ventilated Seat with Temperature Adjustment", price: 4000, selected: false, disabled: false },
  ],
  securitySafety: [
    { label: "Biometric Authentication Lock", price: 0, selected: true, disabled: true },
    { label: "Emergency Panic Button", price: 1200, selected: false, disabled: false },
    { label: "Fall Detection System", price: 2500, selected: false, disabled: false },
  ],
  chargingPower: [
    { label: "Standard DC Socket Charging", price: 0, selected: true, disabled: true },
    { label: "Solar Charging", price: 3500, selected: false, disabled: false },
    { label: "Wireless Charging Dock", price: 6000, selected: false, disabled: false },
  ],
  smartHomeIntegration: [
    { label: "Basic Home Control (Lights & Fans)", price: 0, selected: true, disabled: true },
    { label: "IoT-Based Smart Home Control", price: 4500, selected: false, disabled: false },
    { label: "Voice Assistant", price: 16500, selected: false, disabled: false },
  ],
  extraAddons: [
    { label: "Led Headlights and Horn", price: 0, selected: true, disabled: true },
    { label: "Foot Rest Support", price: 1800, selected: false, disabled: false },
    { label: "Head Rest Support", price: 2000, selected: false, disabled: false },  
    { label: "Battery Upgrade (More capacity)", price: 5000, selected: false, disabled: false },
    { label: "Weatherproof Seat Covers", price: 1500, selected: false, disabled: false },
    { label: "Comfortable Cushion Seat", price: 1500, selected: false, disabled: false },
    { label: "Customized Seat Cover", price: 1000, selected: false, disabled: false },
    { label: "Wheel Chair Colour Option", price: 1200, selected: false, disabled: false },
  ],
}

export default function Customize() {
  const [selectedOptions, setSelectedOptions] = useState<Options>(options)
  const [totalPrice, setTotalPrice] = useState<number>(52500) // Base price set to 52500
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", phone: "" })
  const [formErrors, setFormErrors] = useState<FormErrors>({ name: "", email: "", phone: "" })
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [isPriceCardExpanded, setIsPriceCardExpanded] = useState<boolean>(true)

  const handleChange = (category: keyof Options, index: number) => {
    if (selectedOptions[category][index].disabled) return

    const updatedCategory = [...selectedOptions[category]]
    updatedCategory[index].selected = !updatedCategory[index].selected
    const updatedOptions = { ...selectedOptions, [category]: updatedCategory }
    setSelectedOptions(updatedOptions)
    calculateTotal(updatedOptions)
  }

  const calculateTotal = (updatedOptions: Options) => {
    let total = 52500 // Base price
    Object.values(updatedOptions).forEach((category: Option[]) => {
      category.forEach((option: Option) => {
        if (option.selected && !option.disabled) total += option.price
      })
    })
    setTotalPrice(total)
  }

  useEffect(() => {
    calculateTotal(options)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setFormErrors(prev => ({ ...prev, [name]: "" }))
  }

  const handleSubmit = () => {
    const nameValid = formData.name.length >= 2
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    const phoneValid = /^\d{10}$/.test(formData.phone)

    setFormErrors({
      name: nameValid ? "" : "Name must be at least 2 characters.",
      email: formData.email && emailValid ? "" : "Please enter a valid email.",
      phone: formData.phone && phoneValid ? "" : "Please enter a valid phone number (10 digits).",
    })

    if (nameValid && emailValid && phoneValid) {
      setShowPopup(true)
    }
  }

  const generatePDF = () => {
    const doc = new jsPDF()
    
    // Header
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.text("CARE CREW", 20, 20)
    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text("Wheelchair Quotation", 20, 30)
    
    // Customer Info
    doc.setFontSize(10)
    doc.text(`Name: ${formData.name}`, 20, 40)
    doc.text(`Email: ${formData.email}`, 20, 45)
    doc.text(`Phone: ${formData.phone}`, 20, 50)
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 55)
    
    // Selected Features Table
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("Selected Features", 20, 70)
    
    let yPos = 80
    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text("Description", 20, yPos)
    doc.text("Price", 180, yPos, { align: "right" })
    yPos += 5
    doc.line(20, yPos, 190, yPos)
    
    yPos += 10
    let baseFeatures: string[] = []
    let additionalFeatures: { label: string; price: number }[] = []
    
    Object.entries(selectedOptions).forEach(([_, items]) => {
      items.forEach((option) => {
        if (option.selected) {
          if (option.disabled) {
            baseFeatures.push(option.label)
          } else {
            additionalFeatures.push({ label: option.label, price: option.price })
          }
        }
      })
    })

    doc.setFont("helvetica", "bold")
    doc.text("Base Features (Included):", 20, yPos)
    yPos += 5
    doc.setFont("helvetica", "normal")
    baseFeatures.forEach((feature) => {
      doc.text(feature, 25, yPos)
      doc.text("Included", 180, yPos, { align: "right" })
      yPos += 5
    })

    if (additionalFeatures.length > 0) {
      yPos += 5
      doc.setFont("helvetica", "bold")
      doc.text("Additional Features:", 20, yPos)
      yPos += 5
      doc.setFont("helvetica", "normal")
      additionalFeatures.forEach((feature) => {
        doc.text(feature.label, 25, yPos)
        doc.text(`₹${feature.price.toLocaleString()}`, 180, yPos, { align: "right" })
        yPos += 5
      })
    }

    yPos += 10
    doc.line(20, yPos, 190, yPos)
    yPos += 5
    doc.setFont("helvetica", "bold")
    doc.text("Base Price (including labour):", 20, yPos)
    doc.text(`₹${(52500).toLocaleString()}`, 180, yPos, { align: "right" })
    yPos += 5
    doc.text("Total Additional Cost:", 20, yPos)
    const additionalCost = totalPrice - 52500
    doc.text(`₹${additionalCost.toLocaleString()}`, 180, yPos, { align: "right" })
    yPos += 5
    doc.line(20, yPos, 190, yPos)
    yPos += 5
    doc.text("Total Price (including GST):", 20, yPos)
    doc.text(`₹${totalPrice.toLocaleString()}`, 180, yPos, { align: "right" })

    yPos += 15
    doc.setFontSize(8)
    doc.text("Thank you for choosing CARE CREW!", 20, yPos)
    doc.text("Contact us at: support@carecrew.com", 20, yPos + 5)

    doc.save(`CARE_CREW_Quotation_${formData.name}_${new Date().toISOString().split('T')[0]}.pdf`)
  }

  const handleClosePopup = () => {
    generatePDF()
    setShowPopup(false)
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="section-title md:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Customize Your Wheelchair
        </motion.h2>

        <div className="grid gap-8">
          {Object.entries(selectedOptions).map(([category, items]) => (
            <motion.div
              key={category}
              className="rounded-xl shadow-lg p-6 hover-lift"
              style={{ 
                backgroundColor: 'hsl(var(--card))',
                borderColor: 'hsl(var(--border))'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 
                className="text-2xl font-semibold mb-6 capitalize"
                style={{ color: 'hsl(var(--card-foreground))' }}
              >
                {category.replace(/([A-Z])/g, " $1").trim()}
              </h3>
              <div className="space-y-4">
                {(items as Option[]).map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      option.disabled 
                        ? "opacity-75 cursor-not-allowed" 
                        : "hover:bg-opacity-5 transition-colors cursor-pointer"
                    }`}
                    style={{ 
                      backgroundColor: option.disabled ? 'hsl(var(--muted) / 0.2)' : 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))'
                    }}
                    onClick={() => handleChange(category as keyof Options, index)}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`${category}-${index}`}
                        checked={option.selected}
                        disabled={option.disabled}
                        onChange={() => handleChange(category as keyof Options, index)}
                        className="h-5 w-5 rounded focus:ring-2"
                        style={{
                          color: 'hsl(var(--primary))',
                          borderColor: 'hsl(var(--input))',
                          backgroundColor: option.selected ? 'hsl(var(--primary))' : 'transparent',
                        }}
                      />
                      <label
                        htmlFor={`${category}-${index}`}
                        className="text-lg ml-4"
                        style={{ color: option.disabled ? 'hsl(var(--muted-foreground))' : 'hsl(var(--card-foreground))' }}
                      >
                        {option.label}
                      </label>
                    </div>
                    <span
                      className="text-lg font-medium"
                      style={{ 
                        color: option.disabled ? 'hsl(var(--muted-foreground))' : 'hsl(var(--primary))'
                      }}
                    >
                      {option.disabled 
                        ? "Included" 
                        : option.price > 0 
                          ? `+₹${option.price.toLocaleString()}` 
                          : "Free"}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total Price Card with Swipe Down */}
        <motion.div
          className="fixed bottom-8 right-8 w-96 rounded-xl shadow-xl border-t-4"
          style={{ 
            backgroundColor: 'hsl(var(--card))',
            borderTopColor: 'hsl(var(--primary))'
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Swipe Handle */}
          <div 
            className="flex justify-center cursor-pointer py-2"
            onClick={() => setIsPriceCardExpanded(!isPriceCardExpanded)}
          >
            <div className="w-12 h-1 bg-gray-400 rounded-full" />
          </div>

          {/* Collapsible Content */}
          <motion.div
            animate={{ 
              height: isPriceCardExpanded ? 'auto' : 0,
              opacity: isPriceCardExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden px-6 pb-6"
          >
            <div className="flex justify-between items-center mb-4">
              <span 
                className="text-xl font-semibold"
                style={{ color: 'hsl(var(--card-foreground))' }}
              >
                Total Price
              </span>
              <span 
                className="text-2xl font-bold"
                style={{ color: 'hsl(var(--primary))' }}
              >
                ₹{totalPrice.toLocaleString()}
              </span>
            </div>

            <div className="space-y-4 mb-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="w-full p-2 rounded border"
                  style={{
                    borderColor: 'hsl(var(--input))',
                    backgroundColor: 'hsl(var(--card))',
                    color: 'hsl(var(--card-foreground))'
                  }}
                />
                {formErrors.name && (
                  <p className="text-sm mt-1" style={{ color: 'hsl(var(--destructive))' }}>
                    {formErrors.name}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  className="w-full p-2 rounded border"
                  style={{
                    borderColor: 'hsl(var(--input))',
                    backgroundColor: 'hsl(var(--card))',
                    color: 'hsl(var(--card-foreground))'
                  }}
                />
                {formErrors.email && (
                  <p className="text-sm mt-1" style={{ color: 'hsl(var(--destructive))' }}>
                    {formErrors.email}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Your Phone Number"
                  className="w-full p-2 rounded border"
                  style={{
                    borderColor: 'hsl(var(--input))',
                    backgroundColor: 'hsl(var(--card))',
                    color: 'hsl(var(--card-foreground))'
                  }}
                />
                {formErrors.phone && (
                  <p className="text-sm mt-1" style={{ color: 'hsl(var(--destructive))' }}>
                    {formErrors.phone}
                  </p>
                )}
              </div>
            </div>

            <button
              className="apple-button w-full"
              onClick={handleSubmit}
            >
              Get Final Quote
            </button>
          </motion.div>

          {/* Expand/Collapse Button */}
          <div 
            className="flex justify-center py-2 cursor-pointer"
            onClick={() => setIsPriceCardExpanded(!isPriceCardExpanded)}
          >
            {isPriceCardExpanded ? (
              <ChevronDown className="w-6 h-6" style={{ color: 'hsl(var(--primary))' }} />
            ) : (
              <ChevronUp className="w-6 h-6" style={{ color: 'hsl(var(--primary))' }} />
            )}
          </div>
        </motion.div>

        {/* Popup */}
        {showPopup && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div 
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setShowPopup(false)}
            />
            <motion.div
              className="relative bg-white rounded-xl p-8 shadow-2xl max-w-md w-full"
              style={{ 
                backgroundColor: 'hsl(var(--card))',
                color: 'hsl(var(--card-foreground))'
              }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4">Thank You!</h3>
              <p className="text-lg">
                We have received your requirement. We will contact you soon.
              </p>
              <button
                className="mt-6 apple-button w-full"
                onClick={handleClosePopup}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}