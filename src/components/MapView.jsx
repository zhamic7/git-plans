"use client";
import React, { useRef, useEffect, useState } from "react";
import { Map, Marker, Popup, config, MapStyle } from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "../styles/map.css";

import MapLibreGlDirections from "@maplibre/maplibre-gl-directions";

export default function MapView({ currentDay, allDays }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);
  const directionsRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  config.apiKey = "QdJSZvrw6MpZWuGeDuMe";
  const center = { lng: -98.5556199, lat: 39.8097343 };
  const zoom = 3;

  // Initialize map and plugin
  useEffect(() => {
    if (map.current) return;

    map.current = new Map({
      container: mapContainer.current,
      style: MapStyle.STREETS,
      center: [center.lng, center.lat],
      zoom: zoom,
    });

    map.current.on("load", () => {
      if (!directionsRef.current) {
        const directions = new MapLibreGlDirections(map.current);
        directions.interactive = false;
        directionsRef.current = directions;
      }
      setMapReady(true); // signal map + plugin ready
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
        directionsRef.current = null;
      }
    };
  }, []);

  // Sync markers + directions when ready
  useEffect(() => {
    if (!mapReady || !map.current || !Array.isArray(allDays)) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    const waypoints = [];
    const allVisible = [];

    allDays.forEach((dayObj, dayIdx) => {
      const isCurrent = dayIdx === currentDay;
      const locs = (dayObj.locations || []).filter(
        (loc) =>
          typeof loc.latitude === "number" &&
          typeof loc.longitude === "number" &&
          loc.view !== false
      );

      locs.forEach((loc, idx) => {
        const el = document.createElement("div");
        el.className = isCurrent ? "marker marker-current" : "marker marker-other";
        el.innerHTML = `<span><b>${idx + 1}</b></span>`;

const popup = new Popup({ offset: 25 }).setHTML(`
  <div style="color: black; font-size: 14px;">
    <strong>${loc.name}</strong><br/>
    <small>${loc.location}</small>
  </div>
`);


        const marker = new Marker({ element: el })
          .setLngLat([loc.longitude, loc.latitude])
          .setPopup(popup)
          .addTo(map.current);

        markersRef.current.push(marker);
        allVisible.push([loc.longitude, loc.latitude]);

        if (isCurrent) {
          waypoints.push([loc.longitude, loc.latitude]);
        }
      });
    });

    if (allVisible.length > 1) {
      const lngs = allVisible.map(([lng]) => lng);
      const lats = allVisible.map(([_, lat]) => lat);
      const bounds = [
        [Math.min(...lngs), Math.min(...lats)],
        [Math.max(...lngs), Math.max(...lats)],
      ];
      map.current.fitBounds(bounds, { padding: 200 });
    }
    else if (allVisible.length == 1) {
      const center = allVisible[0];
      const zoom = 15;
      map.current.flyTo({
        center: center,
        zoom: zoom
      });
    }

    // ⛳️ Set waypoints for routing after plugin is ready
    if (directionsRef.current) {
      directionsRef.current.setWaypoints(
        waypoints.length >= 2 ? waypoints : []
      );
    }
  }, [mapReady, allDays, currentDay]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
