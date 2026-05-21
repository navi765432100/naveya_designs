'use strict';

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getCollections } from '@/sanity/client';
import { Collection } from '@/data/mockData';

export default function Collections() {
  const [collectionsList, setCollectionsList] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCollections();
        setCollectionsList(data);
      } catch (err) {
        console.error("Failed to load collections", err);
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
          <div className="w-8 h-8 border-2 border-amber-200 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[10px] tracking-[0.3em] text-stone-500 uppercase font-medium">
            Loading Showcases
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-950 text-stone-300 min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Title */}
        <div className="space-y-3 mb-20 text-center md:text-left">
          <span className="text-[10px] tracking-[0.3em] text-amber-200 uppercase font-semibold">
            Annual Showcases
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-stone-100 tracking-wide uppercase font-light">
            The Collections
          </h1>
          <div className="w-16 h-[1px] bg-amber-200/30 mx-auto md:mx-0 mt-4" />
        </div>

        {/* Collections Stack */}
        <div className="space-y-32">
          {collectionsList.map((collection, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center`}
              >
                {/* Image Showcase Column */}
                <div 
                  className={`lg:col-span-7 aspect-[16/10] md:aspect-[16/9] relative overflow-hidden bg-stone-900 border border-stone-850 group ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <Image
                    src={collection.coverImage}
                    alt={collection.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/40 transition-colors duration-500" />
                </div>

                {/* Info Details Column */}
                <div 
                  className={`lg:col-span-5 space-y-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 text-[9px] tracking-[0.25em] text-amber-200 uppercase font-semibold">
                      <span>{collection.category}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-800" />
                      <span>{collection.year}</span>
                    </div>
                    <h2 className="font-serif text-2xl md:text-4xl text-stone-100 uppercase tracking-wide leading-tight font-light">
                      {collection.title}
                    </h2>
                  </div>

                  <p className="text-stone-400 text-sm md:text-base leading-relaxed font-light">
                    {collection.description}
                  </p>

                  <div className="pt-4 flex items-center space-x-6">
                    <Link
                      href="/portfolio"
                      className="group inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] bg-stone-100 hover:bg-amber-200 text-stone-950 font-bold px-6 py-3.5 transition-all duration-300 rounded-none"
                    >
                      <span>Explore Works</span>
                      <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
