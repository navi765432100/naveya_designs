'use strict';

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MoveDown } from 'lucide-react';
import { getDesignerInfo, getCollections, getPortfolioItems } from '@/sanity/client';
import { DesignerInfo, Collection, PortfolioItem } from '@/data/mockData';
import ImageModal from '@/components/ImageModal';
import SkeletonGrid from '@/components/SkeletonGrid';

export default function Home() {
  const [designer, setDesigner] = useState<DesignerInfo | null>(null);
  const [featuredCollection, setFeaturedCollection] = useState<Collection | null>(null);
  const [recentWorks, setRecentWorks] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [dInfo, cols, items] = await Promise.all([
          getDesignerInfo(),
          getCollections(),
          getPortfolioItems()
        ]);
        setDesigner(dInfo);
        if (cols && cols.length > 0) {
          setFeaturedCollection(cols[0]); // The latest collection
        }
        if (items && items.length > 0) {
          // Filter out sketches and show only runway/editorial on homepage
          const editorialItems = items.filter(i => i.category === 'runway' || i.category === 'editorial');
          setRecentWorks(editorialItems.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to load home page data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-950 flex flex-col justify-center items-center px-6">
        <div className="space-y-4 text-center">
          <h2 className="font-serif text-3xl tracking-[0.25em] text-stone-100 uppercase animate-pulse">
            Naveya Designs
          </h2>
          <div className="w-16 h-[1px] bg-amber-200 mx-auto animate-bounce" />
          <p className="text-[10px] tracking-[0.4em] text-stone-500 uppercase">
            Loading Atelier
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-950 text-stone-300 overflow-x-hidden min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center pt-20">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600"
            alt="Hero Editorial"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-stone-950/60" />
        </div>

        {/* Hero Branding Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[11px] md:text-xs uppercase tracking-[0.4em] text-amber-200 mb-6 font-semibold"
          >
            HAUTE COUTURE • MILANO
          </motion.span>

          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl md:text-8xl tracking-[0.15em] text-stone-100 uppercase font-light leading-none"
            >
              Naveya Designs
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="max-w-xl text-sm md:text-base text-stone-400 font-light leading-relaxed tracking-wide mb-10"
          >
            {designer?.biographyShort}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <Link
              href="/portfolio"
              className="group inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] bg-stone-100 hover:bg-amber-200 text-stone-950 font-semibold px-8 py-4 transition-all duration-300 rounded-none"
            >
              <span>Explore Creations</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] border border-stone-700 hover:border-amber-200 hover:bg-stone-900/40 text-stone-300 px-8 py-4 transition-all duration-300 rounded-none font-semibold"
            >
              Atelier Booking
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center space-y-2 cursor-pointer text-stone-500 hover:text-amber-200 transition-colors"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-[9px] uppercase tracking-[0.3em] font-medium">Scroll Down</span>
          <MoveDown size={14} />
        </motion.div>
      </section>

      {/* 2. DESIGN PHILOSOPHY SECTION */}
      <section className="py-24 md:py-32 bg-stone-900/20 border-y border-stone-900">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center space-y-8">
          <span className="text-[10px] tracking-[0.3em] text-amber-200 uppercase font-semibold">
            Philosophy
          </span>
          <blockquote className="font-serif text-2xl md:text-4xl text-stone-200 leading-relaxed font-light italic">
            "{designer?.philosophy}"
          </blockquote>
          <div className="w-12 h-[1px] bg-amber-200/40 mx-auto" />
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500 font-medium">
            — {designer?.name}
          </p>
        </div>
      </section>

      {/* 3. FEATURED COLLECTION SECTION */}
      {featuredCollection && (
        <section className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Visual Panel */}
            <div className="relative aspect-[3/4] md:aspect-[4/5] bg-stone-900 overflow-hidden border border-stone-850 group">
              <Image
                src={featuredCollection.coverImage}
                alt={featuredCollection.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-stone-950/20" />
            </div>

            {/* Content Panel */}
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-[10px] tracking-[0.3em] text-amber-200 uppercase font-semibold">
                  Featured Collection
                </span>
                <h2 className="font-serif text-3xl md:text-5xl text-stone-100 tracking-wide uppercase leading-tight font-light">
                  {featuredCollection.title}
                </h2>
              </div>
              <p className="text-stone-400 text-sm md:text-base leading-relaxed font-light">
                {featuredCollection.description}
              </p>
              <div className="border-t border-stone-900 pt-6 flex space-x-12 text-xs tracking-widest uppercase">
                <div>
                  <span className="text-stone-500 block mb-1">Release Year</span>
                  <span className="text-stone-300 font-light">{featuredCollection.year}</span>
                </div>
                <div>
                  <span className="text-stone-500 block mb-1">Line</span>
                  <span className="text-stone-300 font-light">{featuredCollection.category}</span>
                </div>
              </div>
              <div className="pt-4">
                <Link
                  href="/collections"
                  className="group inline-flex items-center space-x-3 text-xs uppercase tracking-[0.2em] text-amber-200 font-medium hover:text-amber-100 transition-colors"
                >
                  <span>View All Collections</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. RECENT CREATIONS SECTION */}
      <section className="py-24 md:py-32 bg-stone-900/10 border-t border-stone-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.3em] text-amber-200 uppercase font-semibold">
                Curated Showcase
              </span>
              <h2 className="font-serif text-3xl md:text-5xl text-stone-100 tracking-wide uppercase font-light">
                Recent Creations
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="group inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-stone-300 hover:text-amber-200 transition-colors font-medium border-b border-stone-800 pb-1"
            >
              <span>View Full Gallery</span>
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {recentWorks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentWorks.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="group cursor-pointer flex flex-col space-y-4"
                >
                  <div className="aspect-[3/4] relative overflow-hidden bg-stone-900 border border-stone-850">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/40 transition-colors duration-300" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[9px] tracking-[0.2em] text-stone-500 uppercase">
                      <span>{item.category}</span>
                      <span>{item.year}</span>
                    </div>
                    <h3 className="font-serif text-lg text-stone-200 group-hover:text-amber-200 transition-colors tracking-wide leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <SkeletonGrid count={3} />
          )}

        </div>
      </section>

      {/* 5. CALL TO ACTION: APPOINTMENT */}
      <section className="relative py-32 bg-stone-950 border-t border-stone-900 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1600"
            alt="Atelier Booking Background"
            fill
            sizes="100vw"
            className="object-cover object-top opacity-10"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center space-y-8">
          <h2 className="font-serif text-3xl md:text-5xl text-stone-100 tracking-wide uppercase font-light leading-tight">
            Acquire Bespoke Couture
          </h2>
          <p className="text-stone-400 text-sm md:text-base leading-relaxed font-light max-w-xl mx-auto">
            Book a private salon viewing or request a custom fitting appointment at our Milan atelier. Experience personalized tailoring structured to your form.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-3 text-xs uppercase tracking-[0.25em] bg-amber-200 text-stone-950 font-bold px-10 py-5 hover:bg-amber-100 transition-all duration-300 rounded-none"
            >
              <span>Request Private Consultation</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <ImageModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        items={recentWorks}
        onSelect={(item) => setSelectedItem(item)}
      />

    </div>
  );
}
