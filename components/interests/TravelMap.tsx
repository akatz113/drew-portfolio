"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { trips, Trip } from "@/lib/data/interests";

function MapStyleOverride() {
  const map = useMap();
  useEffect(() => {
    map.getContainer().style.background = "#1c1917";
  }, [map]);
  return null;
}

interface Props {
  selectedTrip: Trip | null;
  onTripSelect: (trip: Trip) => void;
}

export default function TravelMap({ selectedTrip, onTripSelect }: Props) {
  return (
    <div className="relative w-full h-[480px] rounded-2xl overflow-hidden border border-stone-700/50">
      <MapContainer
        center={[48, 8]}
        zoom={4}
        scrollWheelZoom={false}
        zoomControl={true}
        className="w-full h-full"
        style={{ background: "#1c1917" }}
      >
        <MapStyleOverride />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {trips.map((trip) => {
          const isSelected = selectedTrip?.id === trip.id;
          const positions = trip.cities.map(
            (c) => [c.lat, c.lng] as [number, number]
          );

          return (
            <div key={trip.id}>
              {/* Route line */}
              <Polyline
                positions={positions}
                pathOptions={{
                  color: trip.mapColor,
                  weight: isSelected ? 3 : 2,
                  opacity: isSelected ? 1 : 0.55,
                  dashArray: trip.routeStyle === "dashed" ? "8 5" : undefined,
                }}
                eventHandlers={{ click: () => onTripSelect(trip) }}
              />

              {/* City pins */}
              {trip.cities.map((city, i) => (
                <CircleMarker
                  key={`${trip.id}-${city.name}`}
                  center={[city.lat, city.lng]}
                  radius={isSelected ? 7 : 5}
                  pathOptions={{
                    fillColor: trip.mapColor,
                    color: "#1c1917",
                    weight: 2,
                    fillOpacity: isSelected ? 1 : 0.7,
                  }}
                  eventHandlers={{ click: () => onTripSelect(trip) }}
                >
                  <Tooltip
                    direction="top"
                    offset={[0, -10]}
                    opacity={1}
                    permanent={false}
                  >
                    <span className="text-xs font-medium">
                      {i + 1}. {city.name}
                    </span>
                  </Tooltip>
                </CircleMarker>
              ))}
            </div>
          );
        })}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 glass rounded-xl px-4 py-3 flex flex-col gap-2 z-[1000]">
        {trips.map((trip) => (
          <button
            key={trip.id}
            onClick={() => onTripSelect(trip)}
            className="flex items-center gap-2.5 text-left hover:opacity-100 transition-opacity"
            style={{ opacity: selectedTrip && selectedTrip.id !== trip.id ? 0.45 : 1 }}
          >
            <span
              className="w-6 h-0.5 shrink-0 rounded-full"
              style={{
                backgroundColor: trip.mapColor,
                backgroundImage:
                  trip.routeStyle === "dashed"
                    ? `repeating-linear-gradient(90deg, ${trip.mapColor} 0px, ${trip.mapColor} 5px, transparent 5px, transparent 9px)`
                    : undefined,
              }}
            />
            <span className="text-stone-300 text-xs font-medium">{trip.title}</span>
            <span className="text-stone-500 text-xs">{trip.year}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
