'use strict';

'use client';

import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2, ZoomIn, ZoomOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioItem } from '@/data/mockData';
import Image from 'next/image';

interface ImageModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  items: PortfolioItem[];
  onSelect: (item: PortfolioItem) => void;
}

export default function ImageModal({ item, onClose, items, onSelect }: ImageModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [zoom, setZoom] = useState(false);

  // Get list of all images for the current active item
  const allImages = item ? [item.image, ...(item.secondaryImages || [])] : [];

  useEffect(() => {
    setActiveImageIndex(0);
    setZoom(false);
  }, [item]);

  // Handle escape key to close and arrow keys to navigate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!item) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNextItem();
      if (e.key === 'ArrowLeft') handlePrevItem();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, activeImageIndex]);

  if (!item) return null;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom(false);
    setActiveImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoom(false);
    setActiveImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handlePrevItem = () => {
    const currentIndex = items.findIndex((i) => i.id === item.id);
    if (currentIndex > -1) {
      const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
      onSelect(items[prevIndex]);
    }
  };

  const handleNextItem = () => {
    const currentIndex = items.findIndex((i) => i.id === item.id);
    if (currentIndex > -1) {
      const nextIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
      onSelect(items[nextIndex]);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex flex-col justify-between overflow-y-auto"
        onClick={onClose}
      >
        {/* Header / Top Bar */}
        <div className="flex justify-between items-center px-6 py-4 md:px-12 border-b border-stone-900 bg-stone-950/50 backdrop-blur sticky top-0 z-10">
          <div className="flex flex-col">
            <span className="text-[10px] tracking-[0.25em] text-amber-200 uppercase font-semibold">
              {item.category}
            </span>
            <h3 className="font-serif text-sm md:text-base text-stone-100 tracking-wide mt-0.5">
              {item.title}
            </h3>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setZoom(!zoom);
              }}
              className="p-2 text-stone-400 hover:text-stone-100 transition-colors"
              title={zoom ? "Reset Zoom" : "Zoom Image"}
            >
              {zoom ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-100 transition-colors"
              title="Close (Esc)"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main Content Body */}
        <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full px-6 md:px-12 py-8 items-center lg:items-stretch gap-12">
          {/* Image Display Panel */}
          <div className="w-full lg:w-3/5 flex flex-col justify-between items-center relative min-h-[400px] lg:min-h-[500px]">
            {/* Gallery Images Container */}
            <div 
              className="flex-1 w-full flex items-center justify-center relative overflow-hidden bg-stone-950/30 border border-stone-900/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Navigation Arrow */}
              {allImages.length > 1 && (
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 z-10 p-3 bg-stone-950/80 hover:bg-amber-200 hover:text-stone-950 text-stone-300 transition-all rounded-full border border-stone-850 hover:border-amber-200"
                  aria-label="Previous Image"
                >
                  <ChevronLeft size={18} />
                </button>
              )}

              {/* Image viewport */}
              <div className="relative w-full h-[380px] md:h-[480px] transition-transform duration-500 overflow-hidden">
                <Image
                  src={allImages[activeImageIndex]}
                  alt={`${item.title} - Image ${activeImageIndex + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  priority
                  className={`object-contain transition-transform duration-300 ${
                    zoom ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                  }`}
                  onClick={() => setZoom(!zoom)}
                />
              </div>

              {/* Right Navigation Arrow */}
              {allImages.length > 1 && (
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 z-10 p-3 bg-stone-950/80 hover:bg-amber-200 hover:text-stone-950 text-stone-300 transition-all rounded-full border border-stone-850 hover:border-amber-200"
                  aria-label="Next Image"
                >
                  <ChevronRight size={18} />
                </button>
              )}
            </div>

            {/* Carousel Dots indicator */}
            {allImages.length > 1 && (
              <div className="flex items-center space-x-2.5 mt-4" onClick={(e) => e.stopPropagation()}>
                {allImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setZoom(false);
                      setActiveImageIndex(index);
                    }}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      index === activeImageIndex ? 'w-6 bg-amber-200' : 'bg-stone-700 hover:bg-stone-500'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Details Metadata Panel */}
          <div 
            className="w-full lg:w-2/5 flex flex-col justify-between space-y-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              {/* Navigation across portfolio items */}
              <div className="flex items-center justify-between border-b border-stone-900 pb-4">
                <span className="text-[10px] tracking-[0.2em] text-stone-500 uppercase font-light">
                  Explore Project
                </span>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={handlePrevItem}
                    className="p-1.5 text-stone-400 hover:text-amber-200 hover:bg-stone-900 transition-all"
                    title="Previous Design"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-[10px] tracking-wider text-stone-400 font-light px-2 select-none">
                    {items.findIndex((i) => i.id === item.id) + 1} / {items.length}
                  </span>
                  <button
                    onClick={handleNextItem}
                    className="p-1.5 text-stone-400 hover:text-amber-200 hover:bg-stone-900 transition-all"
                    title="Next Design"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-300">
                  Concept & Design
                </h4>
                <p className="text-sm text-stone-400 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              {/* Details table */}
              <div className="border-t border-stone-900 pt-6 space-y-4">
                <div className="grid grid-cols-3 text-xs tracking-wider">
                  <span className="text-stone-500 uppercase">Season / Year</span>
                  <span className="col-span-2 text-stone-300 uppercase font-light">{item.year}</span>
                </div>

                <div className="grid grid-cols-3 text-xs tracking-wider">
                  <span className="text-stone-500 uppercase">Materials</span>
                  <div className="col-span-2 flex flex-wrap gap-1.5">
                    {item.materials.map((material, index) => (
                      <span
                        key={index}
                        className="text-[9px] uppercase tracking-widest text-amber-200/90 border border-amber-200/20 px-2 py-0.5 bg-amber-200/5 font-medium"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>

                {item.credits && (
                  <div className="grid grid-cols-3 text-xs tracking-wider border-t border-stone-900/50 pt-4">
                    <span className="text-stone-500 uppercase">Credits</span>
                    <span className="col-span-2 text-stone-400 font-light italic text-[11px] leading-tight">
                      {item.credits}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Footer / Call To Action */}
            <div className="border-t border-stone-900 pt-6">
              <p className="text-[10px] text-stone-500 uppercase tracking-widest leading-relaxed">
                Interested in this couture design or seeking bespoke fittings? 
                <a href="/contact" className="text-amber-200 hover:underline block mt-1 transition-all">
                  Inquire about custom fittings →
                </a>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
