"use client";
import React, { useRef, useEffect } from "react";
import { Map, Marker, config, MapStyle } from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "../styles/map.css";

export default function MapView() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const center = { lng: -118.95258684698637, lat: 34.18334035884417 };
  const zoom = 16;

  config.apiKey = "QdJSZvrw6MpZWuGeDuMe";

  useEffect(() => {
    if (map.current) return;

    map.current = new Map({
      container: mapContainer.current,
      style: MapStyle.STREETS,
      center: [center.lng, center.lat],
      zoom: zoom,
    });

    const markers = [
      [34.18518367221783, -118.95283325589428],
      [34.18324442509275, -118.9525757638468],
      [34.18329323964055, -118.95214661043437]
    ];

    markers.forEach(([lat, lon]) => {
      new Marker({ color: "#FF0000" })
        .setLngLat([lon, lat])
        .addTo(map.current);
    });
  }, [center.lng, center.lat, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}