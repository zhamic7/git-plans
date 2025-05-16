"use client";
import React, { useState } from "react";
import LocationItem from "./LocationItem";
import AddLocationForm from "./AddLocationForm";

export default function Sidebar({
  locations,
  onAddLocation,
  onDeleteLocation,
  onUpdateLocation,
  onClearLocations,
  onPrevDay,
  onNextDay,
  currentDay,
}) {
  const [selected, setSelected] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const toggleExpand = (idx) => {
    setSelected(selected === idx ? null : idx);
  };

  const geocodeAddress = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "location-app/1.0",
        },
      });
      const data = await response.json();
      if (data.length > 0) {
        return {
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon),
        };
      } else {
        alert(`Could not find coordinates for: ${address}`);
        return null;
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      alert("Error geocoding address.");
      return null;
    }
  };

  const handleAddLocation = async (newLoc) => {
    const coords = await geocodeAddress(newLoc.location);
    if (!coords) return;

    const locWithCoords = {
      ...newLoc,
      latitude: coords.latitude,
      longitude: coords.longitude,
    };

    onAddLocation(locWithCoords);
    setIsAdding(false);
  };

  const downloadPlanAsJSON = () => {
    const raw = localStorage.getItem("locations");
    if (!raw) {
      alert("No plan data found in localStorage.");
      return;
    }

    try {
      const parsedDays = JSON.parse(raw);
      const flattened = parsedDays.flatMap((dayData, dayIndex) =>
        dayData.locations
          .filter((loc) => loc.view !== false)
          .map((loc) => ({
            name: loc.name,
            location: loc.location,
            latitude: loc.latitude,
            longitude: loc.longitude,
            day: dayIndex + 1,
          }))
      );

      const blob = new Blob([JSON.stringify({ route_example: flattened }, null, 2)], {
        type: "application/json",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "plan.json";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to export plan JSON:", err);
      alert("Failed to export plan data.");
    }
  };

  return (
    <div className="w-1/3 bg-gradient-to-b from-blue-50 to-blue-100 p-6 shadow-md overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <button className="text-blue-700 font-semibold" onClick={onPrevDay}>
          &lt;&lt; prev
        </button>
        <h2 className="text-xl font-bold text-blue-900">DAY {currentDay}</h2>
        <button className="text-blue-700 font-semibold" onClick={onNextDay}>
          next &gt;&gt;
        </button>
      </div>

      <div className="space-y-2">
        {locations.map((loc, idx) => (
          <LocationItem
            key={idx}
            loc={loc}
            idx={idx}
            selected={selected}
            toggleExpand={toggleExpand}
            onDelete={() => onDeleteLocation(idx)}
            onUpdate={onUpdateLocation}
          />
        ))}

        {isAdding ? (
          <AddLocationForm onAdd={handleAddLocation} onCancel={() => setIsAdding(false)} />
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="mt-4 p-2 w-full text-blue-600 font-medium border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50"
          >
            ➕ Add Location
          </button>
        )}
      </div>

      <div className="mt-6 text-center space-y-2">
        <button
          onClick={onClearLocations}
          className="text-sm text-red-500 hover:text-red-700"
        >
          🗑️ Clear All Locations
        </button>

        <button
          onClick={downloadPlanAsJSON}
          className="text-sm text-green-600 hover:text-green-800 underline"
        >
          ⬇️ Download Plan JSON
        </button>
      </div>
    </div>
  );
}
