"use client";

import { PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import { globeCountries, globeRegions } from "../data/globeStandards";
import type { GlobeCountry } from "../data/globeStandards";

type CountryPoint = {
  lat: number;
  lon: number;
};

type ProjectedCountry = GlobeCountry & {
  depth: number;
  visible: boolean;
  x: number;
  y: number;
};

const countryPoints: Record<string, CountryPoint> = {
  "United States": { lat: 39, lon: -98 },
  Canada: { lat: 57, lon: -106 },
  Mexico: { lat: 23, lon: -102 },
  Brazil: { lat: -10, lon: -55 },
  Argentina: { lat: -34, lon: -64 },
  "United Kingdom": { lat: 54, lon: -2 },
  France: { lat: 46, lon: 2 },
  Germany: { lat: 51, lon: 10 },
  Spain: { lat: 40, lon: -4 },
  Italy: { lat: 42, lon: 12 },
  Netherlands: { lat: 52, lon: 5 },
  Sweden: { lat: 62, lon: 15 },
  Poland: { lat: 52, lon: 19 },
  China: { lat: 35, lon: 103 },
  Japan: { lat: 37, lon: 138 },
  India: { lat: 21, lon: 78 },
  Pakistan: { lat: 30, lon: 70 },
  Australia: { lat: -25, lon: 134 },
  Singapore: { lat: 1.3, lon: 103.8 },
  "Saudi Arabia": { lat: 24, lon: 45 },
  UAE: { lat: 24, lon: 54 },
  "South Africa": { lat: -30, lon: 25 },
  Nigeria: { lat: 9, lon: 8 },
  Kenya: { lat: 0, lon: 38 },
};

const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

const landMasses: CountryPoint[][] = [
  [
    { lat: 72, lon: -165 }, { lat: 66, lon: -105 }, { lat: 52, lon: -60 }, { lat: 28, lon: -82 },
    { lat: 16, lon: -96 }, { lat: 24, lon: -124 }, { lat: 47, lon: -128 }, { lat: 62, lon: -150 },
  ],
  [
    { lat: 13, lon: -82 }, { lat: 6, lon: -76 }, { lat: -8, lon: -80 }, { lat: -36, lon: -72 },
    { lat: -55, lon: -67 }, { lat: -38, lon: -50 }, { lat: -12, lon: -36 }, { lat: 7, lon: -50 },
  ],
  [
    { lat: 72, lon: -10 }, { lat: 64, lon: 32 }, { lat: 51, lon: 64 }, { lat: 37, lon: 35 },
    { lat: 36, lon: -8 }, { lat: 50, lon: -11 },
  ],
  [
    { lat: 34, lon: -17 }, { lat: 31, lon: 34 }, { lat: 10, lon: 52 }, { lat: -35, lon: 28 },
    { lat: -34, lon: 18 }, { lat: -7, lon: 10 }, { lat: 9, lon: -14 },
  ],
  [
    { lat: 67, lon: 38 }, { lat: 60, lon: 105 }, { lat: 48, lon: 148 }, { lat: 30, lon: 122 },
    { lat: 8, lon: 104 }, { lat: 8, lon: 72 }, { lat: 25, lon: 45 }, { lat: 44, lon: 62 },
  ],
  [
    { lat: -11, lon: 113 }, { lat: -22, lon: 154 }, { lat: -43, lon: 146 }, { lat: -35, lon: 114 },
  ],
  [
    { lat: 7, lon: 95 }, { lat: -6, lon: 130 }, { lat: -10, lon: 115 }, { lat: 1, lon: 102 },
  ],
];

function rotatePoint(lat: number, lon: number, rotationX: number, rotationY: number) {
  const latRad = toRadians(lat);
  const lonRad = toRadians(lon);

  let x = Math.cos(latRad) * Math.sin(lonRad);
  let y = Math.sin(latRad);
  let z = Math.cos(latRad) * Math.cos(lonRad);

  const cosY = Math.cos(rotationY);
  const sinY = Math.sin(rotationY);
  const rotatedX = x * cosY + z * sinY;
  const rotatedZ = z * cosY - x * sinY;

  x = rotatedX;
  z = rotatedZ;

  const cosX = Math.cos(rotationX);
  const sinX = Math.sin(rotationX);
  const rotatedY = y * cosX - z * sinX;
  const finalZ = z * cosX + y * sinX;

  return { x, y: rotatedY, z: finalZ };
}

function drawGlobe(canvas: HTMLCanvasElement, rotationX: number, rotationY: number) {
  const context = canvas.getContext("2d");
  if (!context) return;

  const rect = canvas.getBoundingClientRect();
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(1, Math.floor(rect.width * pixelRatio));
  const height = Math.max(1, Math.floor(rect.height * pixelRatio));

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  context.clearRect(0, 0, rect.width, rect.height);

  const radius = Math.min(rect.width, rect.height) * 0.38;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const ocean = context.createRadialGradient(centerX - radius * 0.28, centerY - radius * 0.35, radius * 0.08, centerX, centerY, radius);
  ocean.addColorStop(0, "#58d7ef");
  ocean.addColorStop(0.45, "#0b607a");
  ocean.addColorStop(1, "#0B132B");

  context.save();
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI * 2);
  context.clip();
  context.fillStyle = ocean;
  context.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);

  context.fillStyle = "rgba(0,180,216,.42)";
  context.strokeStyle = "rgba(0,180,216,.28)";
  context.lineWidth = 1.2;
  landMasses.forEach((landMass) => {
    context.beginPath();
    let started = false;
    landMass.forEach((coordinate) => {
      const point = rotatePoint(coordinate.lat, coordinate.lon, rotationX, rotationY);
      if (point.z < -0.05) {
        started = false;
        return;
      }
      const x = centerX + point.x * radius;
      const y = centerY - point.y * radius;
      if (!started) {
        context.moveTo(x, y);
        started = true;
      } else {
        context.lineTo(x, y);
      }
    });
    if (started) {
      context.closePath();
      context.fill();
      context.stroke();
    }
  });

  context.strokeStyle = "rgba(255,255,255,.16)";
  context.lineWidth = 1;

  for (let lat = -60; lat <= 60; lat += 20) {
    context.beginPath();
    for (let lon = -180; lon <= 180; lon += 4) {
      const point = rotatePoint(lat, lon, rotationX, rotationY);
      if (point.z < -0.08) continue;
      const x = centerX + point.x * radius;
      const y = centerY - point.y * radius;
      lon === -180 ? context.moveTo(x, y) : context.lineTo(x, y);
    }
    context.stroke();
  }

  for (let lon = -180; lon < 180; lon += 20) {
    context.beginPath();
    let started = false;
    for (let lat = -86; lat <= 86; lat += 3) {
      const point = rotatePoint(lat, lon, rotationX, rotationY);
      if (point.z < -0.08) {
        started = false;
        continue;
      }
      const x = centerX + point.x * radius;
      const y = centerY - point.y * radius;
      started ? context.lineTo(x, y) : context.moveTo(x, y);
      started = true;
    }
    context.stroke();
  }

  context.fillStyle = "rgba(0,255,153,.85)";
  globeCountries.forEach((country) => {
    const location = countryPoints[country.name];
    if (!location) return;
    const point = rotatePoint(location.lat, location.lon, rotationX, rotationY);
    if (point.z < 0) return;
    context.beginPath();
    context.arc(centerX + point.x * radius, centerY - point.y * radius, 3.5 + point.z * 2, 0, Math.PI * 2);
    context.fill();
  });

  context.restore();

  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI * 2);
  context.strokeStyle = "#37cfff";
  context.lineWidth = 7;
  context.stroke();

  context.beginPath();
  context.arc(centerX, centerY, radius + 12, 0, Math.PI * 2);
  context.strokeStyle = "rgba(55,207,255,.18)";
  context.lineWidth = 18;
  context.stroke();
}

function projectCountries(rotationX: number, rotationY: number, size: { width: number; height: number }) {
  const radius = Math.min(size.width, size.height) * 0.38;
  const centerX = size.width / 2;
  const centerY = size.height / 2;

  return globeCountries.map((country) => {
    const location = countryPoints[country.name] ?? { lat: 0, lon: 0 };
    const point = rotatePoint(location.lat, location.lon, rotationX, rotationY);

    return {
      ...country,
      depth: point.z,
      visible: point.z > 0.08,
      x: centerX + point.x * radius,
      y: centerY - point.y * radius,
    };
  });
}

export default function InteractiveGlobeExplorer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragPoint = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);

  const [rotation, setRotation] = useState({ x: -0.12, y: 0.85 });
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState(globeCountries[0]);
  const [playing, setPlaying] = useState(false);
  const [stageSize, setStageSize] = useState({ width: 700, height: 700 });

  const visibleCountries = selectedRegion === "All"
    ? globeCountries
    : globeCountries.filter((country) => country.region === selectedRegion);

  const projectedCountries = useMemo(
    () => projectCountries(rotation.x, rotation.y, stageSize),
    [rotation, stageSize],
  );

  const frontLabels = useMemo(() => {
    const selected = projectedCountries.find((country) => country.name === selectedCountry.name);
    const others = projectedCountries
      .filter((country) => country.visible && country.name !== selectedCountry.name)
      .sort((a, b) => b.depth - a.depth)
      .slice(0, 5);

    return selected?.visible ? [selected, ...others].slice(0, 6) : others;
  }, [projectedCountries, selectedCountry.name]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawGlobe(canvas, rotation.x, rotation.y);
  }, [rotation, stageSize]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setStageSize({ width, height });
    });

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!playing || motionQuery.matches) {
      return undefined;
    }

    let frameId = 0;
    let lastTime = performance.now();

    const rotate = (time: number) => {
      const delta = Math.min(time - lastTime, 48);
      lastTime = time;
      setRotation((current) => ({ ...current, y: current.y + delta * 0.00022 }));
      frameId = requestAnimationFrame(rotate);
    };

    frameId = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(frameId);
  }, [playing]);

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    setPlaying(false);
    dragPoint.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;

    const deltaX = event.clientX - dragPoint.current.x;
    const deltaY = event.clientY - dragPoint.current.y;
    dragPoint.current = { x: event.clientX, y: event.clientY };

    setRotation((current) => ({
      x: Math.max(-0.85, Math.min(0.85, current.x + deltaY * 0.005)),
      y: current.y + deltaX * 0.006,
    }));
  };

  return (
    <section className="globe-explorer" aria-label="Interactive global cyber standards explorer">
      <div
        className="globe-explorer-stage"
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={() => {
          dragging.current = false;
        }}
        ref={stageRef}
      >
        <canvas
          aria-label="Interactive coordinate-based globe for cyber security standards"
          className="globe-canvas"
          ref={canvasRef}
        />

        <div className="globe-map-labels" aria-hidden="true">
          {frontLabels.map((country) => (
            <button
              className={country.name === selectedCountry.name ? "active-globe-label" : ""}
              key={country.name}
              style={{ left: country.x, top: country.y }}
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedCountry(country);
              }}
            >
              <strong>{country.name}</strong>
              <span>{country.standards.slice(0, 3).join(" · ")}</span>
            </button>
          ))}
        </div>

        <div className="globe-stage-card" aria-live="polite">
          <p>Selected country</p>
          <h3>{selectedCountry.name}</h3>
          <div className="globe-stage-tags">
            {selectedCountry.standards.map((standard) => <span key={standard}>{standard}</span>)}
          </div>
        </div>
        <div className="globe-hint">Drag the globe to rotate · crisp labels are rendered as page text</div>
      </div>

      <aside className="globe-control-panel">
        <div>
          <p>GLOBAL STANDARDS EXPLORER</p>
          <h2>{selectedCountry.name}</h2>
          <span>{selectedCountry.region}</span>
        </div>

        <div className="globe-standard-tags">
          {selectedCountry.standards.map((standard) => <span key={standard}>{standard}</span>)}
        </div>

        <div className="globe-related">
          <p>Related Golden Valley Cyber work</p>
          {selectedCountry.relatedServices.map((service) => <span key={service}>{service}</span>)}
        </div>

        <div className="globe-controls">
          <button type="button" onClick={() => setPlaying(!playing)}>{playing ? "Pause rotation" : "Play rotation"}</button>
          <button type="button" onClick={() => setRotation({ x: -0.12, y: 0.85 })}>Reset view</button>
        </div>

        <div className="globe-region-filter" aria-label="Filter countries by region">
          {["All", ...globeRegions].map((region) => (
            <button
              className={selectedRegion === region ? "active-filter" : ""}
              key={region}
              type="button"
              onClick={() => {
                setSelectedRegion(region);
                const nextCountry = region === "All" ? globeCountries[0] : globeCountries.find((country) => country.region === region);
                if (nextCountry) setSelectedCountry(nextCountry);
              }}
            >
              {region}
            </button>
          ))}
        </div>

        <label className="globe-country-select">
          <span>Choose country</span>
          <select
            value={selectedCountry.name}
            onChange={(event) => {
              const nextCountry = globeCountries.find((country) => country.name === event.target.value);
              if (nextCountry) setSelectedCountry(nextCountry);
            }}
          >
            {visibleCountries.map((country) => <option key={country.name} value={country.name}>{country.name}</option>)}
          </select>
        </label>
      </aside>
    </section>
  );
}
