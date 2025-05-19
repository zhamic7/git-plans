"use client";
import React, { useRef, useEffect } from "react";
import { Map, Marker, config, MapStyle } from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "../styles/map.css";

export default function MapView({ currentDay, allDays }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);

  config.apiKey = "QdJSZvrw6MpZWuGeDuMe";

  const center = { lng: -118.95258684698637, lat: 34.18334035884417 };
  const zoom = 16;

  useEffect(() => {
    if (map.current) return;

    map.current = new Map({
      container: mapContainer.current,
      style: MapStyle.STREETS,
      center: [center.lng, center.lat],
      zoom: zoom,
    });
  }, []);

  useEffect(() => {
    if (!map.current || !Array.isArray(allDays)) return;

    // Remove previous markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    let allValidLocations = [];

    allDays.forEach((dayObj, dayIdx) => {
      const isCurrent = dayIdx === currentDay;
      const locs = (dayObj.locations || []).filter(
        loc =>
          typeof loc.latitude === "number" &&
          typeof loc.longitude === "number" &&
          loc.view !== false
      );

      locs.forEach((loc, idx) => {
        const el = document.createElement("div");
        el.className = isCurrent ? "marker marker-current" : "marker marker-other";
        el.innerHTML = `<span><b>${idx + 1}</b></span>`;

        const marker = new Marker({ element: el })
          .setLngLat([loc.longitude, loc.latitude])
          .addTo(map.current);

        markersRef.current.push(marker);
        allValidLocations.push(loc);
      });
    });

    // Fit bounds if we have markers
    if (allValidLocations.length > 0) {
      const lats = allValidLocations.map(loc => loc.latitude);
      const lngs = allValidLocations.map(loc => loc.longitude);

      const bounds = [
        [Math.min(...lngs), Math.min(...lats)],
        [Math.max(...lngs), Math.max(...lats)],
      ];

      map.current.fitBounds(bounds, { padding: 200 });
    }
  }, [allDays, currentDay]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
