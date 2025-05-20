"use client";
import React, { useRef, useEffect } from "react";
import { Map, Marker, config, MapStyle } from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "../styles/map.css";

// Import the plugin
import MapLibreGlDirections from "@maplibre/maplibre-gl-directions";

export default function MapView({ currentDay, allDays }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);
  const directions = useRef(null);
  const points = useRef([]);

  config.apiKey = "QdJSZvrw6MpZWuGeDuMe";

  const center = { lng: -98.5556199, lat: 39.8097343 };
  const zoom = 3;

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
    if (directions.current) return;
    map.current.on("load", () => {
      directions.current = new MapLibreGlDirections(map.current);
      directions.current.interactive = false;
    });
  }, []);

  useEffect(() => {
    if (!map.current || !Array.isArray(allDays) || !directions.current) return;

    // Remove previous markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    //points.current.forEach(point => point.remove());
    points.current = []

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

        if (isCurrent) {
          points.current.push([loc.longitude, loc.latitude])
        }
        

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

    // 
    map.current.fire('foo');
    map.current.on("foo", () => {
      directions.current.setWaypoints(points.current);
    });

  }, [allDays, currentDay,]);


  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
