"use client";

import { useRef, useEffect, useMemo, useCallback, useState } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";
import { trips, Trip } from "@/lib/data/interests";
import { useTheme } from "@/components/theme/ThemeProvider";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";

interface Props {
  selectedTrip: Trip | null;
  onTripSelect: (trip: Trip) => void;
}

interface PointData {
  lat: number;
  lng: number;
  label: string;
  color: string;
  tripId: string;
  size: number;
}

interface ArcData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
  tripId: string;
}

interface GraticulePath {
  points: { lat: number; lng: number }[];
  isEquatorOrPrime: boolean;
}

const LAND_COLORS = [
  "#c4a882", "#b89e78", "#d4b896", "#c9ad8a", "#bfa07a",
  "#d0b48e", "#c6a680", "#ccb088", "#b8976e", "#c2a47e",
];

function landColor(feat: object): string {
  const id = (feat as { properties?: { name?: string } }).properties?.name ?? "";
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0;
  return LAND_COLORS[Math.abs(hash) % LAND_COLORS.length];
}

function createOceanTexture(): string {
  const canvas = document.createElement("canvas");
  const W = 2048, H = 1024;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#2a4a5e";
  ctx.fillRect(0, 0, W, H);

  // Seeded PRNG for deterministic but natural randomness
  let seed = 42;
  function rand() {
    seed = (seed * 16807 + 0) % 2147483647;
    return seed / 2147483647;
  }

  // Scatter hand-drawn wave marks with natural variation
  ctx.lineCap = "round";
  for (let i = 0; i < 2800; i++) {
    const x = rand() * W;
    const y = rand() * H;
    const alpha = 0.12 + rand() * 0.22;
    ctx.strokeStyle = `rgba(110, 175, 210, ${alpha})`;
    ctx.lineWidth = 0.6 + rand() * 1.1;
    const w = 10 + rand() * 16;
    const h = 1.5 + rand() * 4;
    const angle = (rand() - 0.5) * 0.35;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(-w / 2, 0);
    ctx.quadraticCurveTo(-w / 4, -h, 0, 0);
    ctx.quadraticCurveTo(w / 4, h, w / 2, 0);
    ctx.stroke();
    ctx.restore();
  }

  // Ocean labels in italic serif
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const oceans: { name: string; lat: number; lng: number; size: number; spacing?: number }[] = [
    { name: "A T L A N T I C", lat: 25, lng: -35, size: 26 },
    { name: "O C E A N", lat: 15, lng: -35, size: 22 },
    { name: "P A C I F I C", lat: 5, lng: -150, size: 28 },
    { name: "O C E A N", lat: -5, lng: -150, size: 24 },
    { name: "I N D I A N", lat: -15, lng: 75, size: 26 },
    { name: "O C E A N", lat: -25, lng: 75, size: 22 },
    { name: "A R C T I C  O C E A N", lat: 78, lng: 0, size: 16 },
    { name: "S O U T H E R N  O C E A N", lat: -63, lng: 30, size: 16 },
    { name: "Mediterranean Sea", lat: 35, lng: 18, size: 14 },
    { name: "Caribbean Sea", lat: 16, lng: -74, size: 12 },
  ];
  for (const o of oceans) {
    const x = ((o.lng + 180) / 360) * W;
    const y = ((90 - o.lat) / 180) * H;
    ctx.font = `italic ${o.size}px Georgia, "Times New Roman", serif`;
    ctx.fillStyle = "rgba(140, 190, 220, 0.45)";
    ctx.fillText(o.name, x, y);
  }

  return canvas.toDataURL("image/png");
}

function buildGraticule(): GraticulePath[] {
  const paths: GraticulePath[] = [];
  for (let lat = -60; lat <= 60; lat += 30) {
    const points = [];
    for (let lng = -180; lng <= 180; lng += 3) points.push({ lat, lng });
    paths.push({ points, isEquatorOrPrime: lat === 0 });
  }
  for (let lng = -180; lng < 180; lng += 30) {
    const points = [];
    for (let lat = -80; lat <= 80; lat += 3) points.push({ lat, lng });
    paths.push({ points, isEquatorOrPrime: lng === 0 });
  }
  return paths;
}

export default function TravelGlobe({ selectedTrip, onTripSelect }: Props) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 480 });
  const [countries, setCountries] = useState<object[]>([]);
  const [usStates, setUsStates] = useState<object[]>([]);
  const [zoomTier, setZoomTier] = useState(1);
  const { theme } = useTheme();

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then((r) => r.json())
      .then((topo: Topology) => {
        const geo = feature(topo, topo.objects.countries);
        if (geo.type === "FeatureCollection") {
          setCountries(geo.features);
        }
      });
    fetch("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json")
      .then((r) => r.json())
      .then((topo: Topology) => {
        const geo = feature(topo, topo.objects.states);
        if (geo.type === "FeatureCollection") {
          setUsStates(geo.features.map((f) => ({ ...f, _isState: true })));
        }
      });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver(([entry]) => {
      setDimensions({ width: entry.contentRect.width, height: 480 });
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.4;
    globe.controls().enableZoom = true;
    globe.controls().minDistance = 180;
    globe.controls().maxDistance = 500;

    globe.pointOfView({ lat: 45, lng: 10, altitude: 2.2 }, 0);

    const onCameraChange = () => {
      const alt = globe.pointOfView().altitude;
      const tier = alt <= 1.3 ? 3 : alt <= 2.0 ? 2 : alt <= 2.5 ? 1 : 0;
      setZoomTier((prev) => (prev !== tier ? tier : prev));
    };
    globe.controls().addEventListener("change", onCameraChange);
    return () => globe.controls().removeEventListener("change", onCameraChange);
  }, []);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe || !selectedTrip) return;

    const midCity = selectedTrip.cities[Math.floor(selectedTrip.cities.length / 2)];
    globe.pointOfView({ lat: midCity.lat, lng: midCity.lng, altitude: 1.8 }, 800);
    globe.controls().autoRotate = false;
    setTimeout(() => {
      const alt = globe.pointOfView().altitude;
      const tier = alt <= 1.3 ? 3 : alt <= 2.0 ? 2 : alt <= 2.5 ? 1 : 0;
      setZoomTier(tier);
    }, 900);
  }, [selectedTrip]);

  const points: PointData[] = useMemo(() => {
    return trips.flatMap((trip) =>
      trip.cities.map((city) => ({
        lat: city.lat,
        lng: city.lng,
        label: city.name,
        color: trip.mapColor,
        tripId: trip.id,
        size: selectedTrip?.id === trip.id ? 0.6 : 0.35,
      }))
    );
  }, [selectedTrip]);

  const arcs: ArcData[] = useMemo(() => {
    return trips.flatMap((trip) =>
      trip.cities.slice(0, -1).map((city, i) => ({
        startLat: city.lat,
        startLng: city.lng,
        endLat: trip.cities[i + 1].lat,
        endLng: trip.cities[i + 1].lng,
        color: trip.mapColor,
        tripId: trip.id,
      }))
    );
  }, []);

  const handlePointClick = useCallback(
    (point: object) => {
      const p = point as PointData;
      const trip = trips.find((t) => t.id === p.tripId);
      if (trip) onTripSelect(trip);
    },
    [onTripSelect]
  );

  const handleArcClick = useCallback(
    (arc: object) => {
      const a = arc as ArcData;
      const trip = trips.find((t) => t.id === a.tripId);
      if (trip) onTripSelect(trip);
    },
    [onTripSelect]
  );

  const isArcade = theme === "arcade";

  const oceanTextureUrl = useMemo(() => createOceanTexture(), []);
  const graticulePaths = useMemo(() => buildGraticule(), []);

  const allPolygons = useMemo(() => {
    if (!countries.length) return [];
    const withoutUS = countries.filter(
      (c) => (c as { id?: string }).id !== "840"
    );
    return [...withoutUS, ...usStates];
  }, [countries, usStates]);

  const allCountryLabels = useMemo(() => [
    // Tier 0 — always visible (large countries)
    { lat: 40.0, lng: -100.0, text: "United States", size: 1.4, tier: 0 },
    { lat: 56.1, lng: -106.3, text: "Canada", size: 1.4, tier: 0 },
    { lat: -10.0, lng: -52.0, text: "Brazil", size: 1.4, tier: 0 },
    { lat: 56.0, lng: 38.0, text: "Russia", size: 1.4, tier: 0 },
    { lat: 35.9, lng: 104.2, text: "China", size: 1.4, tier: 0 },
    { lat: 20.6, lng: 79.0, text: "India", size: 1.2, tier: 0 },
    { lat: -25.3, lng: 134.8, text: "Australia", size: 1.2, tier: 0 },
    // Tier 1 — medium zoom (medium countries)
    { lat: 46.6, lng: 2.5, text: "France", size: 1.0, tier: 1 },
    { lat: 40.0, lng: -3.7, text: "Spain", size: 1.0, tier: 1 },
    { lat: 51.2, lng: 10.4, text: "Germany", size: 1.0, tier: 1 },
    { lat: 39.0, lng: 35.0, text: "Turkey", size: 1.0, tier: 1 },
    { lat: 26.8, lng: 30.8, text: "Egypt", size: 1.0, tier: 1 },
    { lat: 23.6, lng: -102.5, text: "Mexico", size: 1.0, tier: 1 },
    { lat: -35.0, lng: -65.0, text: "Argentina", size: 1.0, tier: 1 },
    { lat: 9.1, lng: 8.7, text: "Nigeria", size: 0.9, tier: 1 },
    { lat: 54.5, lng: -2.5, text: "U.K.", size: 0.8, tier: 1 },
    { lat: 36.2, lng: 138.3, text: "Japan", size: 0.8, tier: 1 },
    // Tier 2 — closer zoom
    { lat: 42.5, lng: 12.5, text: "Italy", size: 0.8, tier: 2 },
    { lat: 52.0, lng: 20.0, text: "Poland", size: 0.9, tier: 2 },
    { lat: 60.5, lng: 9.0, text: "Norway", size: 0.7, tier: 2 },
    { lat: 62.0, lng: 15.0, text: "Sweden", size: 0.7, tier: 2 },
    { lat: 39.0, lng: 22.0, text: "Greece", size: 0.7, tier: 2 },
    { lat: 32.0, lng: -5.0, text: "Morocco", size: 0.8, tier: 2 },
    { lat: -1.3, lng: 36.8, text: "Kenya", size: 0.7, tier: 2 },
    { lat: -30.6, lng: 25.0, text: "South Africa", size: 0.8, tier: 2 },
    { lat: 47.5, lng: 14.5, text: "Austria", size: 0.7, tier: 2 },
    { lat: -5.0, lng: 22.0, text: "Congo", size: 0.8, tier: 2 },
    { lat: 9.0, lng: 42.0, text: "Ethiopia", size: 0.8, tier: 2 },
    { lat: 25.0, lng: 45.0, text: "Saudi Arabia", size: 0.9, tier: 2 },
    { lat: 32.4, lng: 53.7, text: "Iran", size: 0.9, tier: 2 },
    { lat: -2.0, lng: 118.0, text: "Indonesia", size: 0.9, tier: 2 },
    { lat: -42.0, lng: 172.0, text: "New Zealand", size: 0.7, tier: 2 },
    { lat: 4.6, lng: -74.1, text: "Colombia", size: 0.8, tier: 2 },
    { lat: -10.0, lng: -76.0, text: "Peru", size: 0.8, tier: 2 },
    // Tier 3 — very close zoom (small countries)
    { lat: 49.8, lng: 15.5, text: "Czechia", size: 0.6, tier: 3 },
    { lat: 46.8, lng: 8.2, text: "Switzerland", size: 0.55, tier: 3 },
    { lat: 50.8, lng: 4.4, text: "Belgium", size: 0.5, tier: 3 },
    { lat: 52.1, lng: 5.3, text: "Netherlands", size: 0.55, tier: 3 },
    { lat: 39.4, lng: -8.2, text: "Portugal", size: 0.65, tier: 3 },
    { lat: 48.7, lng: 19.7, text: "Slovakia", size: 0.5, tier: 3 },
    { lat: 47.2, lng: 19.5, text: "Hungary", size: 0.55, tier: 3 },
    { lat: 44.0, lng: 21.0, text: "Serbia", size: 0.5, tier: 3 },
    { lat: 43.9, lng: 17.7, text: "Bosnia", size: 0.45, tier: 3 },
    { lat: 42.7, lng: 25.5, text: "Bulgaria", size: 0.55, tier: 3 },
    { lat: 44.4, lng: 26.1, text: "Romania", size: 0.65, tier: 3 },
    { lat: 45.1, lng: 15.2, text: "Croatia", size: 0.5, tier: 3 },
    { lat: 61.9, lng: 25.7, text: "Finland", size: 0.7, tier: 3 },
    { lat: 56.9, lng: 24.1, text: "Latvia", size: 0.45, tier: 3 },
    { lat: 55.2, lng: 23.9, text: "Lithuania", size: 0.45, tier: 3 },
    { lat: 59.4, lng: 25.0, text: "Estonia", size: 0.45, tier: 3 },
    { lat: 56.3, lng: 9.5, text: "Denmark", size: 0.5, tier: 3 },
    { lat: 64.1, lng: -19.0, text: "Iceland", size: 0.5, tier: 3 },
    { lat: 53.4, lng: -8.2, text: "Ireland", size: 0.55, tier: 3 },
    { lat: 41.2, lng: 20.2, text: "Albania", size: 0.45, tier: 3 },
    { lat: 49.0, lng: 32.0, text: "Ukraine", size: 0.9, tier: 3 },
    { lat: 31.8, lng: 35.0, text: "Israel", size: 0.45, tier: 3 },
    { lat: 34.8, lng: 39.0, text: "Syria", size: 0.55, tier: 3 },
    { lat: 33.9, lng: 35.9, text: "Lebanon", size: 0.4, tier: 3 },
    { lat: 34.0, lng: 9.0, text: "Tunisia", size: 0.55, tier: 3 },
    { lat: 28.0, lng: 3.0, text: "Algeria", size: 0.9, tier: 3 },
    { lat: 26.3, lng: 17.2, text: "Libya", size: 0.8, tier: 3 },
    { lat: 15.4, lng: -1.5, text: "Burkina Faso", size: 0.5, tier: 3 },
    { lat: 7.5, lng: -5.5, text: "Ivory Coast", size: 0.55, tier: 3 },
    { lat: 7.9, lng: 1.0, text: "Ghana", size: 0.55, tier: 3 },
  ], []);

  const countryLabels = useMemo(() => {
    if (isArcade) return [];
    return allCountryLabels.filter((l) => l.tier <= zoomTier);
  }, [isArcade, zoomTier, allCountryLabels]);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden border border-stone-700/50"
      style={{ height: 480, background: isArcade ? "#0d0d0d" : "#1a1510" }}
    >
      {dimensions.width > 0 && (
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          globeImageUrl={isArcade
            ? "https://unpkg.com/three-globe/example/img/earth-night.jpg"
            : oceanTextureUrl
          }
          backgroundColor={isArcade ? "#0d0d0d" : "#1a1510"}
          backgroundImageUrl={isArcade ? "https://unpkg.com/three-globe/example/img/night-sky.png" : undefined}
          atmosphereColor={isArcade ? "#4ade80" : "#d4a574"}
          atmosphereAltitude={isArcade ? 0.15 : 0.12}
          showGlobe={true}
          polygonsData={isArcade ? [] : allPolygons}
          polygonCapColor={(d: object) => landColor(d)}
          polygonSideColor={() => "#8a7560"}
          polygonStrokeColor={(d: object) =>
            (d as { _isState?: boolean })._isState ? "#8a7a65" : "#3d2e1e"
          }
          polygonAltitude={(d: object) =>
            (d as { _isState?: boolean })._isState ? 0.009 : 0.008
          }
          pathsData={isArcade ? [] : graticulePaths}
          pathPoints="points"
          pathPointLat={(p: object) => (p as { lat: number }).lat}
          pathPointLng={(p: object) => (p as { lng: number }).lng}
          pathColor={(d: object) => {
            const g = d as GraticulePath;
            return g.isEquatorOrPrime
              ? "rgba(190, 160, 100, 0.55)"
              : "rgba(170, 145, 100, 0.3)";
          }}
          pathStroke={(d: object) => {
            const g = d as GraticulePath;
            return g.isEquatorOrPrime ? 1.0 : 0.5;
          }}
          pathDashLength={1.2}
          pathDashGap={0.6}
          pathTransitionDuration={0}
          htmlElementsData={countryLabels}
          htmlLat="lat"
          htmlLng="lng"
          htmlAltitude={0.012}
          htmlElement={(d: object) => {
            const label = d as { text: string; size: number };
            const el = document.createElement("div");
            el.textContent = label.text;
            el.style.cssText = `
              font-family: Georgia, "Times New Roman", serif;
              font-style: italic;
              font-size: ${Math.round(label.size * 10)}px;
              color: rgba(35, 25, 12, 0.95);
              text-shadow:
                0 0 3px rgba(210, 190, 160, 0.9),
                0 0 6px rgba(210, 190, 160, 0.6),
                1px 1px 1px rgba(210, 190, 160, 0.8);
              pointer-events: none;
              white-space: nowrap;
              transform: translate(-50%, -50%);
              letter-spacing: 1.5px;
              font-weight: 500;
            `;
            return el;
          }}
          pointsData={points}
          pointLat="lat"
          pointLng="lng"
          pointColor="color"
          pointAltitude={0.01}
          pointRadius="size"
          pointLabel={(d: object) => {
            const p = d as PointData;
            const bg = isArcade ? "rgba(0,0,0,0.75)" : "rgba(30,20,10,0.9)";
            return `<div style="font-family: system-ui; font-size: 12px; font-weight: 600; color: ${p.color}; background: ${bg}; padding: 4px 8px; border-radius: 6px; border: 1px solid ${p.color}40;">${p.label}</div>`;
          }}
          onPointClick={handlePointClick}
          arcsData={arcs}
          arcStartLat="startLat"
          arcStartLng="startLng"
          arcEndLat="endLat"
          arcEndLng="endLng"
          arcColor={(d: object) => {
            const a = d as ArcData;
            const opacity = selectedTrip && selectedTrip.id !== a.tripId ? 0.2 : 0.75;
            return `${a.color}${Math.round(opacity * 255).toString(16).padStart(2, "0")}`;
          }}
          arcStroke={0.6}
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashAnimateTime={2000}
          onArcClick={handleArcClick}
        />
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 glass rounded-xl px-4 py-3 flex flex-col gap-2 z-[1000]">
        {trips.map((trip) => (
          <button
            key={trip.id}
            onClick={() => onTripSelect(trip)}
            className="flex items-center gap-2.5 text-left hover:opacity-100 transition-opacity"
            style={{
              opacity:
                selectedTrip && selectedTrip.id !== trip.id ? 0.45 : 1,
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: trip.mapColor }}
            />
            <span className="text-stone-300 text-xs font-medium">
              {trip.title}
            </span>
            <span className="text-stone-500 text-xs">{trip.year}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
