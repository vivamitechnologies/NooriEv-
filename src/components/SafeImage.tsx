import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Zap, Shield, Sparkles, BatteryCharging } from "lucide-react";

// Explicitly import all static assets so Vite bundles, hashes, and registers them correctly for production
// @ts-ignore
import hero_ev_scooter_1778998312134 from "../assets/images/hero_ev_scooter_1778998312134.png";
// @ts-ignore
import noori_ev_logo_1779001469404 from "../assets/images/noori_ev_logo_1779001469404.png";
// @ts-ignore
import regenerated_image_1778998889956 from "../assets/images/regenerated_image_1778998889956.jpg";
// @ts-ignore
import regenerated_image_1779358389194 from "../assets/images/regenerated_image_1779358389194.jpg";
// @ts-ignore
import regenerated_image_1778999311685 from "../assets/images/regenerated_image_1778999311685.jpg";
// @ts-ignore
import regenerated_image_1778999507755 from "../assets/images/regenerated_image_1778999507755.jpg";
// @ts-ignore
import regenerated_image_1778999718740 from "../assets/images/regenerated_image_1778999718740.jpg";
// @ts-ignore
import regenerated_image_1779001295972 from "../assets/images/regenerated_image_1779001295972.jpg";
// @ts-ignore
import regenerated_image_1779002171490 from "../assets/images/regenerated_image_1779002171490.jpg";
// @ts-ignore
import regenerated_image_1779182447179 from "../assets/images/regenerated_image_1779182447179.jpg";
// @ts-ignore
import regenerated_image_1779261083379 from "../assets/images/regenerated_image_1779261083379.png";
// @ts-ignore
import regenerated_image_1779261253330 from "../assets/images/regenerated_image_1779261253330.png";
// @ts-ignore
import regenerated_image_1779261418432 from "../assets/images/regenerated_image_1779261418432.png";
// @ts-ignore
import regenerated_image_1779261578648 from "../assets/images/regenerated_image_1779261578648.png";
// @ts-ignore
import regenerated_image_1779261633248 from "../assets/images/regenerated_image_1779261633248.png";
// @ts-ignore
import regenerated_image_1779266945074 from "../assets/images/regenerated_image_1779266945074.png";
// @ts-ignore
import scooter_model_1_1778998327118 from "../assets/images/scooter_model_1_1778998327118.png";
// @ts-ignore
import scooter_model_2_1778998344644 from "../assets/images/scooter_model_2_1778998344644.png";
// @ts-ignore
import showroom_interior_1778998358772 from "../assets/images/showroom_interior_1778998358772.png";

const ASSET_REGISTRY: Record<string, string> = {
  "/src/assets/images/hero_ev_scooter_1778998312134.png": hero_ev_scooter_1778998312134,
  "/src/assets/images/noori_ev_logo_1779001469404.png": noori_ev_logo_1779001469404,
  "/src/assets/images/regenerated_image_1778998889956.jpg": regenerated_image_1778998889956,
  "/src/assets/images/regenerated_image_1778999311685.jpg": regenerated_image_1778999311685,
  "/src/assets/images/regenerated_image_1778999507755.jpg": regenerated_image_1778999507755,
  "/src/assets/images/regenerated_image_1778999718740.jpg": regenerated_image_1778999718740,
  "/src/assets/images/regenerated_image_1779001295972.jpg": regenerated_image_1779001295972,
  "/src/assets/images/regenerated_image_1779002171490.jpg": regenerated_image_1779002171490,
  "/src/assets/images/regenerated_image_1779182447179.jpg": regenerated_image_1779182447179,
  "/src/assets/images/regenerated_image_1779261083379.png": regenerated_image_1779261083379,
  "/src/assets/images/regenerated_image_1779261253330.png": regenerated_image_1779261253330,
  "/src/assets/images/regenerated_image_1779261418432.png": regenerated_image_1779261418432,
  "/src/assets/images/regenerated_image_1779261578648.png": regenerated_image_1779261578648,
  "/src/assets/images/regenerated_image_1779261633248.png": regenerated_image_1779261633248,
  "/src/assets/images/regenerated_image_1779266945074.png": regenerated_image_1779266945074,
  "/src/assets/images/regenerated_image_1779358389194.jpg": regenerated_image_1779358389194,
  "/src/assets/images/scooter_model_1_1778998327118.png": scooter_model_1_1778998327118,
  "/src/assets/images/scooter_model_2_1778998344644.png": scooter_model_2_1778998344644,
  "/src/assets/images/showroom_interior_1778998358772.png": showroom_interior_1778998358772,
};

// Extremely smart resolver to find Vite's hashed bundled path from original static paths
const resolveBundledAsset = (srcUrl?: string): string | undefined => {
  if (!srcUrl) return undefined;
  
  // 1. Direct key match
  if (ASSET_REGISTRY[srcUrl]) return ASSET_REGISTRY[srcUrl];
  
  // 2. Check with leading slash normalized
  const normalized = srcUrl.startsWith("/") ? srcUrl : `/${srcUrl}`;
  if (ASSET_REGISTRY[normalized]) return ASSET_REGISTRY[normalized];
  
  // 3. Fallback to parsing file name for robust resolution (handles arbitrary root domains/directories)
  const splitted = srcUrl.split("/");
  const filename = splitted[splitted.length - 1];
  if (filename) {
    const matchedKey = Object.keys(ASSET_REGISTRY).find(k => k.endsWith(filename));
    if (matchedKey) return ASSET_REGISTRY[matchedKey];
  }
  
  return srcUrl;
};

interface SafeImageProps {
  src?: string;
  alt?: string;
  className?: string;
  fallbackType?: "scooter" | "banner" | "logo" | "gallery" | "showroom";
  [key: string]: any;
}

export default function SafeImage({
  src,
  alt = "Noori EV Image",
  className = "",
  fallbackType = "scooter",
  ...props
}: SafeImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const resolvedSrc = resolveBundledAsset(src);

  // Check if src is falsy or might be an unresolved placeholder
  useEffect(() => {
    if (!resolvedSrc) {
      setError(true);
      setLoading(false);
    } else {
      // Reset state if src changes
      setLoading(true);
      setError(false);

      // Smart Network Connection Timeout (6 seconds)
      // On slow 2G/3G networks, if an image hangs indefinitely, we trigger a fallback
      const timer = setTimeout(() => {
        setLoading(prevLoading => {
          if (prevLoading) {
            setError(true);
            return false;
          }
          return prevLoading;
        });
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [resolvedSrc]);

  // Handle standard loading completion
  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  // Handle image loading error
  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  // Helper to render high-concept custom vector fallbacks
  const renderFallback = () => {
    switch (fallbackType) {
      case "logo":
        return (
          <div className="flex items-center gap-2 bg-brand-blue/10 border border-brand-green/20 px-4 py-2 rounded-2xl h-14 select-none">
            <Zap className="text-brand-green animate-pulse" size={20} />
            <span className="font-extrabold tracking-widest text-[#A6FF00] font-sans text-lg">
              NOORI <span className="text-white text-xs opacity-60">EV</span>
            </span>
          </div>
        );

      case "banner":
        return (
          <div className="w-full h-full min-h-[400px] bg-slate-900 flex flex-col items-center justify-center p-8 relative overflow-hidden select-none">
            {/* Tech grid bg */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(166,255,0,0.05)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(166,255,0,0.05)_1px,_transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
            {/* Ambient gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-green/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute top-10 right-10 w-40 h-40 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 text-center max-w-md">
              <div className="inline-flex p-4 rounded-3xl bg-brand-green/10 text-brand-green mb-6 border border-brand-green/20 animate-bounce">
                <Zap size={40} />
              </div>
              <h4 className="text-white text-2xl uppercase font-black tracking-widest leading-none mb-3">
                NOORI SMART PLATFORM
              </h4>
              <p className="text-white/60 text-xs uppercase tracking-widest font-mono">
                High Performance Electric Vehicles
              </p>
              <div className="mt-8 flex items-center justify-center gap-6 text-[10px] font-bold text-brand-green/80 uppercase tracking-widest bg-brand-blue/40 border border-white/5 px-6 py-2 rounded-full">
                <span>⚡ Active Core</span>
                <span className="opacity-40">•</span>
                <span>🔋 Smart BMS v3.5</span>
              </div>
            </div>
          </div>
        );

      case "showroom":
        return (
          <div className="w-full h-full min-h-[300px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-[3rem] p-12 flex flex-col justify-between border border-white/10 relative overflow-hidden select-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <span className="text-brand-green font-black text-xs tracking-wider uppercase bg-brand-green/15 px-3 py-1.5 rounded-xl border border-brand-green/20">
                Premium Space
              </span>
              <h4 className="text-white font-extrabold text-2xl md:text-3xl uppercase tracking-tight mt-6 leading-tight">
                Raees Motors <br />Showroom Hub
              </h4>
            </div>
            <div className="relative z-10 flex items-center gap-3 text-white/40 text-[10px] font-bold uppercase tracking-widest mt-12 bg-black/20 p-4 rounded-2xl">
              <Sparkles size={16} className="text-brand-green" />
              <span>World-Class EV Infrastructure Experience</span>
            </div>
          </div>
        );

      case "gallery":
        return (
          <div className="w-full h-64 bg-slate-900 border border-white/5 rounded-3xl flex flex-col items-center justify-center p-6 relative overflow-hidden group select-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(166,255,0,0.03)_0%,_transparent_100%)]"></div>
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-green mb-4 group-hover:scale-110 transition-transform">
              <Sparkles size={20} />
            </div>
            <p className="text-white/80 text-xs font-black uppercase tracking-widest text-center">
              NOORI Fleet Display
            </p>
            <p className="text-white/40 text-[9px] uppercase font-mono tracking-widest mt-1">
              Ref ID: GALLERY_IMAGE
            </p>
          </div>
        );

      case "scooter":
      default:
        return (
          <div className="w-full h-full min-h-[160px] bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6 relative overflow-hidden select-none rounded-[1.5rem]">
            {/* Stylized vector drawing (SVG) of a premium scooter */}
            <svg
              className="w-48 h-32 text-brand-blue/15 transition-transform duration-500 hover:scale-105"
              viewBox="0 0 200 120"
              fill="currentColor"
            >
              {/* Ground line */}
              <line x1="20" y1="110" x2="180" y2="110" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
              
              {/* Back Wheel */}
              <circle cx="50" cy="95" r="16" stroke="currentColor" strokeWidth="4" fill="none" />
              <circle cx="50" cy="95" r="8" fill="currentColor" className="opacity-40" />

              {/* Front Wheel */}
              <circle cx="150" cy="95" r="16" stroke="currentColor" strokeWidth="4" fill="none" />
              <circle cx="150" cy="95" r="8" fill="currentColor" className="opacity-40" />

              {/* Scooter Body / Deck */}
              <path d="M50 90 L100 90 L130 80" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M45 80 L115 80" stroke="#A6FF00" strokeWidth="4" strokeLinecap="round" className="opacity-80" />

              {/* Diagonal frame member to handle bars */}
              <line x1="125" y1="80" x2="145" y2="35" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              
              {/* Steer tube and handle bars */}
              <line x1="145" y1="35" x2="150" y2="20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              <path d="M135 25 L155 23" stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none" />

              {/* Back stay / cowl support */}
              <path d="M50 95 C 45 70, 75 70, 85 80" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              
              {/* Dynamic Tech / Electric bolts coming out */}
              <path d="M90 50 L80 65 L95 65 L85 85" stroke="#A6FF00" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <div className="absolute bottom-3 text-center">
              <span className="text-[10px] font-bold text-brand-blue/40 uppercase tracking-widest block">
                EV Model Preview
              </span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`relative overflow-hidden w-full h-full flex items-center justify-center ${className}`}>
      {/* Loading Skeleton */}
      {loading && (
        <div className="absolute inset-0 bg-slate-100 flex items-center justify-center overflow-hidden animate-pulse">
          <div className="w-full h-full bg-linear-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:400%_400%] animate-shimmer" />
          <div className="absolute text-brand-blue/25 uppercase font-mono text-[10px] tracking-widest font-black animate-pulse flex flex-col items-center gap-2">
            <BatteryCharging size={24} className="text-brand-green/30" />
            <span>Loading Media...</span>
          </div>
        </div>
      )}

      {/* Actual Image */}
      {!error && resolvedSrc && (
        <img
          src={resolvedSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full transition-opacity duration-300 ${className || "object-contain"} ${
            loading ? "opacity-0" : "opacity-100"
          }`}
          referrerPolicy="no-referrer"
          {...props}
        />
      )}

      {/* Custom Vector Fallback */}
      {error && renderFallback()}
    </div>
  );
}
