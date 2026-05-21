'use strict';

'use client';

import React, { useState, useEffect } from 'react';
import { getPortfolioItems } from '@/sanity/client';
import { PortfolioItem } from '@/data/mockData';
import PortfolioGrid from '@/components/PortfolioGrid';
import ImageModal from '@/components/ImageModal';
import SkeletonGrid from '@/components/SkeletonGrid';

export default function Portfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getPortfolioItems();
        setItems(data);
      } catch (err) {
        console.error("Failed to load portfolio items", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="bg-stone-950 text-stone-300 min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Title */}
        <div className="space-y-3 mb-16 text-center md:text-left">
          <span className="text-[10px] tracking-[0.3em] text-amber-200 uppercase font-semibold">
            Creations Archive
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-stone-100 tracking-wide uppercase font-light">
            Selected Works
          </h1>
          <div className="w-16 h-[1px] bg-amber-200/30 mx-auto md:mx-0 mt-4" />
        </div>

        {/* Portfolio Content */}
        {loading ? (
          <SkeletonGrid count={6} />
        ) : (
          <PortfolioGrid
            items={items}
            onSelectItem={(item) => setSelectedItem(item)}
          />
        )}

      </div>

      {/* LIGHTBOX MODAL */}
      <ImageModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        items={items}
        onSelect={(item) => setSelectedItem(item)}
      />

    </div>
  );
}
