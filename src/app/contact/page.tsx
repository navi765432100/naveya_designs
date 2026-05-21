'use strict';

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Mail, Phone, Clock, Send, Check } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'bespoke',
    message: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API Submission
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormState({
        name: '',
        email: '',
        phone: '',
        inquiryType: 'bespoke',
        message: ''
      });
      // Hide success message after 6 seconds
      setTimeout(() => setSubmitted(false), 6000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-stone-950 text-stone-300 min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Title */}
        <div className="space-y-3 mb-16 text-center md:text-left">
          <span className="text-[10px] tracking-[0.3em] text-amber-200 uppercase font-semibold">
            Bespoke Consultation
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-stone-100 tracking-wide uppercase font-light">
            Contact Atelier
          </h1>
          <div className="w-16 h-[1px] bg-amber-200/30 mx-auto md:mx-0 mt-4" />
        </div>

        {/* Form and Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Panel: Contact info */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <h3 className="font-serif text-xl md:text-2xl text-stone-200 font-light">
                Milano Showroom
              </h3>
              <p className="text-sm text-stone-400 font-light leading-relaxed">
                Our main studio and private viewing showroom are located in the heart of Milan's Quadrilatero della Moda. Visits are exclusively by private salon invitation or appointment.
              </p>
            </div>

            <div className="space-y-6 border-t border-stone-900 pt-8">
              <div className="flex items-start space-x-4">
                <MapPin size={18} className="text-amber-200 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-stone-500 font-medium block">Address</span>
                  <span className="text-sm font-light text-stone-300">Via della Spiga 15, 20121 Milano, Italy</span>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail size={18} className="text-amber-200 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-stone-500 font-medium block">Inquiries</span>
                  <a href="mailto:navjotkauruppal933@gmail.com" className="text-sm font-light text-stone-300 hover:text-amber-200 transition-colors">
                    navjotkauruppal933@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone size={18} className="text-amber-200 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-stone-500 font-medium block">Phone</span>
                  <a href="tel:7973539880" className="text-sm font-light text-stone-300 hover:text-amber-200 transition-colors">
                    +91 79735 39880
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock size={18} className="text-amber-200 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-stone-500 font-medium block">Atelier Hours</span>
                  <span className="text-sm font-light text-stone-300 block">Monday — Friday: 10:00 - 18:00</span>
                  <span className="text-xs text-stone-500 italic block">Saturday: By Special Invitation Only</span>
                </div>
              </div>
            </div>

            <div className="border-t border-stone-900 pt-8 text-[11px] text-stone-500 uppercase tracking-widest leading-relaxed">
              For immediate press kits or high-resolution editorial assets, please specify "Press & Media Inquiry" in your message.
            </div>
          </div>

          {/* Right Panel: Form */}
          <div className="lg:col-span-7 bg-stone-900/10 p-8 md:p-12 border border-stone-900 relative">
            <h3 className="font-serif text-2xl text-stone-200 font-light mb-8 uppercase tracking-wide">
              Send Inquiry
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-1.5">
                <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold block">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-stone-950 border border-stone-850 px-4 py-3 text-sm text-stone-100 placeholder:text-stone-700 focus:outline-none focus:border-amber-200 transition-colors uppercase tracking-wider font-light"
                  placeholder="E.G. ALEXANDER DUPONT"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-stone-950 border border-stone-850 px-4 py-3 text-sm text-stone-100 placeholder:text-stone-700 focus:outline-none focus:border-amber-200 transition-colors uppercase tracking-wider font-light"
                    placeholder="EMAIL@DOMAIN.COM"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold block">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleInputChange}
                    className="w-full bg-stone-950 border border-stone-850 px-4 py-3 text-sm text-stone-100 placeholder:text-stone-700 focus:outline-none focus:border-amber-200 transition-colors uppercase tracking-wider font-light"
                    placeholder="+33 6 1234 5678"
                  />
                </div>
              </div>

              {/* Inquiry Type */}
              <div className="space-y-1.5">
                <label htmlFor="inquiryType" className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold block">
                  Inquiry Nature
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formState.inquiryType}
                  onChange={handleInputChange}
                  className="w-full bg-stone-950 border border-stone-850 px-4 py-3 text-sm text-stone-300 focus:outline-none focus:border-amber-200 transition-colors uppercase tracking-wider font-light rounded-none cursor-pointer"
                >
                  <option value="bespoke">Bespoke Couture Fitting</option>
                  <option value="salon">Private Salon Appointment</option>
                  <option value="press">Press & Media Inquiry</option>
                  <option value="buy">Acquiring Catalog Pieces</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold block">
                  Inquiry / Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formState.message}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-stone-950 border border-stone-850 px-4 py-3 text-sm text-stone-100 placeholder:text-stone-700 focus:outline-none focus:border-amber-200 transition-colors font-light"
                  placeholder="Please describe your requirements, fitting dates, or editorial requests..."
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center space-x-2 text-xs uppercase tracking-[0.25em] bg-stone-100 hover:bg-amber-200 disabled:bg-stone-800 text-stone-950 font-bold py-4 transition-all duration-300 rounded-none disabled:text-stone-500 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Transmit Message</span>
                    <Send size={14} />
                  </>
                )}
              </button>
            </form>

            {/* Success toast popup */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute inset-x-0 bottom-0 bg-amber-200 text-stone-950 p-6 flex items-center space-x-4 border-t border-amber-300"
                >
                  <div className="p-2 bg-stone-950 text-amber-200 rounded-full">
                    <Check size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold">Transmission Successful</h4>
                    <p className="text-[11px] uppercase tracking-wider font-light mt-0.5">We shall review your request and contact you within 24 hours.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
