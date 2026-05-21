'use strict';

'use client';

import React from 'react';

interface SkeletonGridProps {
  count?: number;
}

export default function SkeletonGrid({ count = 6 }: SkeletonGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="space-y-4 animate-pulse">
          {/* Image box */}
          <div className="aspect-[3/4] bg-stone-900 w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 -translate-x-full animate-[shimmer_1.5s_infinite]" />
          </div>
          {/* Metadata */}
          <div className="space-y-2 py-1">
            <div className="h-3 bg-stone-800 w-1/3" />
            <div className="h-5 bg-stone-850 w-2/3" />
            <div className="h-3 bg-stone-900 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
