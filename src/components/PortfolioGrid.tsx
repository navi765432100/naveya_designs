'use strict';

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Eye } from 'lucide-react';
import Image from 'next/image';
import { PortfolioItem } from '@/data/mockData';

interface PortfolioGridProps {
  items: PortfolioItem[];
  onSelectItem: (item: PortfolioItem) => void;
}

const filterCategories = [
  { label: 'All Works', value: 'all' },
  { label: 'Runway', value: 'runway' },
  { label: 'Editorial', value: 'editorial' },
  { label: 'Sketches', value: 'sketches' },
  { label: 'Details', value: 'details' }
];

export default function PortfolioGrid({ items, onSelectItem }: PortfolioGridProps) {
  const [filter, setFilter] = useState('all');
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>(items);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter((item) => item.category === filter));
    }
  }, [filter, items]);

  return (
    <div className="space-y-12">
      {/* Category filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 border-b border-stone-900 pb-6">
        {filterCategories.map((category) => {
          const isActive = filter === category.value;
          return (
            <button
              key={category.value}
              onClick={() => setFilter(category.value)}
              className={`relative px-4 py-2 text-xs uppercase tracking-[0.2em] transition-all duration-300 font-medium ${
                isActive ? 'text-amber-200' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {category.label}
              {isActive && (
                <motion.div
                  layoutId="activeFilterUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-amber-200"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Grid container */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4 }}
              key={item.id}
              className="group relative cursor-pointer flex flex-col space-y-4"
              onClick={() => onSelectItem(item)}
            >
              {/* Image wrap with crop ratio */}
              <div className="aspect-[3/4] relative overflow-hidden bg-stone-900 border border-stone-850">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={item.category === 'runway'}
                />

                {/* Glassmorphic hover overlay */}
                <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col items-center">
                    <span className="p-3.5 bg-stone-950/80 rounded-full border border-amber-200/20 text-amber-200 mb-3 hover:scale-110 transition-transform">
                      <Eye size={20} />
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-stone-200 font-semibold bg-stone-950/90 border border-stone-800 px-4 py-2">
                      View Creation
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Meta details */}
              <div className="space-y-1 py-1">
                <div className="flex justify-between items-center text-[9px] tracking-[0.25em] text-stone-500 uppercase">
                  <span>{item.category}</span>
                  <span>{item.year}</span>
                </div>
                <h3 className="font-serif text-base text-stone-200 group-hover:text-amber-200 transition-colors tracking-wide leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-400 font-light line-clamp-1 tracking-wide">
                  {item.materials.join(', ')}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredItems.length === 0 && (
        <div className="text-center py-20 text-stone-500 tracking-widest text-sm uppercase">
          No designs found in this category.
        </div>
      )}
    </div>
  );
}
