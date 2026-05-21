'use strict';

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navigationLinks = [
  { name: 'Home', path: '/' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Collections', path: '/collections' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on path change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled
            ? 'bg-stone-950/80 backdrop-blur-xl border-b border-stone-850 py-4 shadow-lg shadow-black/10'
            : 'bg-transparent border-b border-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <Link href="/" className="group flex flex-col">
            <span className="font-serif text-lg md:text-2xl tracking-[0.25em] text-stone-100 group-hover:text-amber-200 transition-colors uppercase font-light">
              Naveya Designs
            </span>
            <span className="text-[9px] tracking-[0.4em] text-stone-400 uppercase font-light -mt-1 group-hover:text-stone-300 transition-colors">
              navjot kaur
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {navigationLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className="relative group text-xs uppercase tracking-[0.2em] font-medium text-stone-300 hover:text-stone-100 transition-colors py-2"
                >
                  {link.name}
                  {/* Sliding Underline */}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[1px] bg-amber-200 origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Call To Action - Atelier Appointment */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-1.5 text-[10px] uppercase tracking-[0.2em] text-amber-200 border border-amber-200/30 hover:border-amber-200 hover:bg-amber-200/5 transition-all duration-300 px-5 py-2.5 rounded-none font-medium"
            >
              <span>Book Appointment</span>
              <ArrowUpRight size={12} className="opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="md:hidden text-stone-200 hover:text-amber-200 transition-colors focus:outline-none"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Full Screen Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-30 bg-stone-950/98 backdrop-blur-2xl flex flex-col justify-between pt-32 pb-16 px-8 md:hidden"
          >
            {/* Nav Links List */}
            <nav className="flex flex-col space-y-6">
              {navigationLinks.map((link, index) => {
                const isActive = pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.path}
                      className={`text-2xl font-serif tracking-widest font-light transition-colors ${isActive ? 'text-amber-200' : 'text-stone-300 hover:text-amber-200'
                        }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom Panel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="border-t border-stone-850 pt-8 flex flex-col space-y-4"
            >
              <Link
                href="/contact"
                className="w-full text-center text-xs uppercase tracking-[0.2em] bg-amber-200 text-stone-950 font-semibold py-3.5 hover:bg-amber-100 transition-all duration-300 rounded-none"
              >
                Book Appointment
              </Link>
              <div className="flex justify-between items-center text-[10px] tracking-widest text-stone-500 uppercase">
                <span>Milano Studio</span>
                <span>@naveyadesigns</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
