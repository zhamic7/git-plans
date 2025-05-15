"use client";
import React, { useRef, useEffect } from "react";
import { Map, Marker, config, MapStyle } from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "../styles/map.css";

import { getRoute, Location } from "../data/data.js"
import allDataRaw from "../data/data.json" assert { type: "json" }

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

    // Variables for which route and which day
    var route_name = "route_example";
    var day = 2;
    var route = allDataRaw[route_name];
    var view_locs = getRoute(route, day);

    // Center locations
    var min_lat = Math.min(...view_locs.map(item => item.latitude))
    var max_lat = Math.max(...view_locs.map(item => item.latitude))
    var min_lng = Math.min(...view_locs.map(item => item.longitude))
    var max_lng = Math.max(...view_locs.map(item => item.longitude))

    var bounds = ([[min_lng, min_lat], [max_lng, max_lat]])
    map.current.fitBounds(bounds, {padding: 200});

    // Create markers for locations
    view_locs.forEach(function (loc) {
      const el = document.createElement('div');
      el.className = 'marker';
      el.innerHTML = '<span><b>' + (loc.order) + '</b></span>';
      
      new Marker({element:el})
        .setLngLat([loc.longitude, loc.latitude])
        .addTo(map.current);
    });
  }, [center.lng, center.lat, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}