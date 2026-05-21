'use strict';

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getDesignerInfo } from '@/sanity/client';
import { DesignerInfo } from '@/data/mockData';

export default function About() {
  const [designer, setDesigner] = useState<DesignerInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getDesignerInfo();
        setDesigner(data);
      } catch (err) {
        console.error("Failed to load designer info", err);
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
            Loading Atelier Details
          </p>
        </div>
      </div>
    );
  }

  const timelineMilestones = [
    { year: "2018", title: "Graduate Excellence", desc: "Completed master's degree in Fashion Design at Istituto Marangoni Milan, winning the Golden Needle award." },
    { year: "2020", title: "Paris Apprenticeship", desc: "Worked alongside senior designers in Paris, focusing on traditional draping and textile manipulation techniques." },
    { year: "2022", title: "Maison Voss Foundation", desc: "Launched Valentina Voss brand in Milan, releasing the debut collection 'Sculpted Silence'." },
    { year: "2025", title: "Paris Fashion Week Debut", desc: "Presented the Autumn/Winter Haute Couture collection at PFW, receiving critical acclaim from Vogue & Harper's Bazaar." }
  ];

  const pressQuotes = [
    { quote: "An avant-garde force... Voss shapes silk like a master architect shapes concrete.", source: "Vogue Italia" },
    { quote: "Valentina Voss represents the perfect alignment of structured tailoring and fragile poetry.", source: "L'Officiel" }
  ];

  return (
    <div className="bg-stone-950 text-stone-300 min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Title */}
        <div className="space-y-3 mb-16 md:mb-24 text-center md:text-left">
          <span className="text-[10px] tracking-[0.3em] text-amber-200 uppercase font-semibold">
            The Creative Force
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-stone-100 tracking-wide uppercase font-light">
            About Valentina Voss
          </h1>
          <div className="w-16 h-[1px] bg-amber-200/30 mx-auto md:mx-0 mt-4" />
        </div>

        {/* Profile & Biography Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-24">
          
          {/* Portrait Image Column */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] bg-stone-900 border border-stone-850 overflow-hidden"
            >
              {designer?.portraitUrl && (
                <Image
                  src={designer.portraitUrl}
                  alt={designer.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                />
              )}
            </motion.div>

            {/* Stats list */}
            <div className="grid grid-cols-2 gap-4 border-t border-stone-900 pt-8">
              {designer?.stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <span className="font-serif text-3xl text-amber-200 font-light block">
                    {stat.value}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-stone-500 font-medium block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Biography & Philosophy Column */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="font-serif text-2xl md:text-3xl text-stone-200 font-light italic leading-relaxed">
                "{designer?.biographyShort}"
              </h2>
              <p className="text-stone-400 text-sm md:text-base leading-relaxed font-light">
                {designer?.biographyLong}
              </p>
            </motion.div>

            {/* Philosophy quote */}
            <div className="border-l border-amber-200/30 pl-6 py-2 space-y-3 bg-amber-200/[0.01]">
              <span className="text-[9px] uppercase tracking-[0.25em] text-stone-500 font-semibold block">
                Design Ethos
              </span>
              <p className="font-serif text-lg text-stone-300 font-light leading-relaxed">
                {designer?.philosophy}
              </p>
            </div>

            {/* Press Quotes */}
            <div className="space-y-6 border-t border-stone-900 pt-8">
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-200">
                Press & Critique
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pressQuotes.map((p, index) => (
                  <div key={index} className="space-y-3 bg-stone-900/10 p-5 border border-stone-900">
                    <p className="text-xs italic text-stone-400 leading-relaxed font-light">
                      "{p.quote}"
                    </p>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-amber-200 block font-semibold">
                      — {p.source}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Timeline Journey Section */}
        <div className="border-t border-stone-900 pt-20">
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.25em] text-stone-500 uppercase font-semibold">
              The Journey
            </span>
            <h2 className="font-serif text-3xl text-stone-100 uppercase tracking-widest mt-1 font-light">
              Career Timeline
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {timelineMilestones.map((m, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="space-y-4 relative"
              >
                {/* Year tag */}
                <div className="flex items-center space-x-4">
                  <span className="font-serif text-4xl text-amber-200 font-light">
                    {m.year}
                  </span>
                  <div className="flex-1 h-[1px] bg-stone-900 hidden md:block" />
                </div>
                {/* Milestone details */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-[0.15em] font-semibold text-stone-200">
                    {m.title}
                  </h4>
                  <p className="text-xs text-stone-400 leading-relaxed font-light">
                    {m.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
