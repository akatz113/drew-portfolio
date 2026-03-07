"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Plane, MapPin, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { trips, Trip } from "@/lib/data/interests";
import PhotoModal from "@/components/interests/PhotoModal";

const TravelMap = dynamic(() => import("@/components/interests/TravelMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[480px] rounded-2xl bg-stone-900/60 border border-stone-700/50 flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-stone-600 border-t-stone-300 rounded-full animate-spin" />
    </div>
  ),
});

export default function TravelPage() {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [modalTrip, setModalTrip] = useState<Trip | null>(null);

  const handleTripSelect = (trip: Trip) => {
    setSelectedTrip(trip);
    setModalTrip(trip);
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      {/* Back button */}
      <Link href="/interests" className="inline-flex items-center gap-1 text-stone-500 hover:text-stone-300 text-sm transition-colors mb-6">
        <ChevronLeft size={15} />
        Interests
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sky-400/60 text-xs font-mono uppercase tracking-wider mb-3">
          <Plane size={12} />
          Personal Interests
        </div>
        <h1 className="text-4xl font-bold text-stone-100 mb-2">Travel & Trips</h1>
        <p className="text-stone-400 text-lg">
          Click a pin or route on the map to explore the album.
        </p>
      </div>

      {/* Interactive map */}
      <TravelMap selectedTrip={selectedTrip} onTripSelect={handleTripSelect} />

      {/* Trip cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {trips.map((trip) => {
          const isSelected = selectedTrip?.id === trip.id;
          return (
            <motion.button
              key={trip.id}
              onClick={() => handleTripSelect(trip)}
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.18 }}
              className="text-left glass rounded-2xl p-5 border transition-colors duration-200"
              style={{
                borderColor: isSelected
                  ? trip.mapColor + "66"
                  : "rgba(87,83,78,0.5)",
                boxShadow: isSelected ? `0 0 0 1px ${trip.mapColor}22` : "none",
              }}
            >
              <div
                className="w-8 h-1 rounded-full mb-3"
                style={{ backgroundColor: trip.mapColor }}
              />
              <p className="text-stone-500 text-xs font-mono uppercase tracking-wider mb-1">
                {trip.year}
              </p>
              <h3 className="text-stone-100 font-semibold text-lg mb-2">
                {trip.title}
              </h3>
              <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 mb-3">
                {trip.cities.map((city, i) => (
                  <span key={city.name} className="flex items-center gap-1">
                    {i === 0 && <MapPin size={10} className="text-stone-600" />}
                    {i > 0 && <span className="text-stone-700 text-xs">·</span>}
                    <span className="text-stone-400 text-xs">{city.name}</span>
                  </span>
                ))}
              </div>
              <span className="text-xs font-medium" style={{ color: trip.mapColor }}>
                View photos →
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Photo modal */}
      <AnimatePresence>
        {modalTrip && (
          <PhotoModal
            album={modalTrip.album}
            title={modalTrip.title}
            subtitle={modalTrip.year}
            description={modalTrip.description}
            cities={modalTrip.cities.map((c) => c.name)}
            accentColor={modalTrip.mapColor}
            onClose={() => {
              setModalTrip(null);
              setSelectedTrip(null);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
