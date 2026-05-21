'use strict';

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Mail, Phone, MapPin } from 'lucide-react';

const Instagram = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Linkedin = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-850 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

        {/* Branding & Philosophy Column */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h3 className="font-serif text-2xl tracking-[0.25em] text-stone-100 uppercase font-light">
              Naveya Designs
            </h3>
            <p className="text-[10px] tracking-[0.4em] text-stone-400 uppercase font-light mt-1">
              navjot kaur
            </p>
          </div>
          <p className="text-sm text-stone-400 font-light max-w-sm leading-relaxed">
            Constructing wearable sculptures that frame human fragility and strength. Designed in Milan, sourced ethically, crafted for generations.
          </p>

          {/* Social Icons */}
          <div className="flex items-center space-x-6 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-amber-200 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-amber-200 transition-colors"
              aria-label="Pinterest"
            >
              <Compass size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-amber-200 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Studio Info Column */}
        <div className="space-y-6">
          <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-100">
            The Atelier
          </h4>
          <ul className="space-y-4 text-sm text-stone-400 font-light">
            <li className="flex items-start space-x-3">
              <MapPin size={16} className="text-amber-200 shrink-0 mt-0.5" />
              <span>Via della Spiga 15,<br />20121 Milano, Italy</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={16} className="text-amber-200 shrink-0" />
              <a href="mailto:navjotkauruppal933@gmail.com" className="hover:text-amber-200 transition-colors">
                navjotkauruppal933@gmail.com
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={16} className="text-amber-200 shrink-0" />
              <a href="tel:7973539880" className="hover:text-amber-200 transition-colors">
                +91 79735 39880
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="space-y-6">
          <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-100">
            Newsletter
          </h4>
          <p className="text-sm text-stone-400 font-light leading-relaxed">
            Subscribe to receive exclusive access to private salon previews and new collection arrivals.
          </p>

          <form onSubmit={handleSubscribe} className="relative mt-4 flex border-b border-stone-700 focus-within:border-amber-200 transition-colors py-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="YOUR EMAIL"
              required
              className="bg-transparent border-none outline-none w-full text-xs text-stone-100 tracking-widest placeholder:text-stone-600 focus:ring-0 uppercase font-light"
            />
            <button
              type="submit"
              className="text-stone-400 hover:text-amber-200 transition-colors ml-2"
              aria-label="Submit subscription"
            >
              <ArrowRight size={18} />
            </button>
          </form>

          {subscribed && (
            <p className="text-[10px] text-amber-200 tracking-widest uppercase animate-fade-in font-medium">
              Thank you for subscribing.
            </p>
          )}
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.2em] text-stone-500 uppercase space-y-4 md:space-y-0">
        <span>© {new Date().getFullYear()} Naveya Designs. All rights reserved.</span>
        <div className="flex space-x-6">
          <Link href="/portfolio" className="hover:text-stone-300 transition-colors">Portfolio</Link>
          <Link href="/about" className="hover:text-stone-300 transition-colors">About</Link>
          <Link href="/contact" className="hover:text-stone-300 transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
