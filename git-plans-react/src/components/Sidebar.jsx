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
  onBookmark,
  bookmarks,
  changeDay,
  days,
  startDate,
  setStartDate,
}) {
  const [selected, setSelected] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showDaySelector, setShowDaySelector] = useState(false);

const handleSelectDay = (dayIndex) => {
  setShowDaySelector(false);
  changeDay(dayIndex - currentDay); // simulate offset
};


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

  const currentDayDate = startDate
  ? new Date(new Date(startDate + "T00:00:00").getTime() + (currentDay - 1) * 86400000).toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  : null;



  return (
    <div className="w-1/3 bg-gradient-to-b from-blue-50 to-blue-100 p-6 shadow-md overflow-y-auto">
      <div className="relative mb-6">
  <div className="flex justify-between items-start gap-2">
    <button className="text-blue-700 font-semibold" onClick={onPrevDay}>
      &lt;&lt; prev
    </button>

    <div className="flex flex-col items-center text-center">
      <button
        onClick={() => setShowDaySelector(!showDaySelector)}
        className="text-xl font-bold text-blue-900 focus:outline-none"
      >
        DAY {currentDay}
      </button>
      {currentDayDate && (
        <span className="text-sm text-blue-600 font-medium mt-1">
          {currentDayDate}
        </span>
      )}
    </div>

    <button className="text-blue-700 font-semibold" onClick={onNextDay}>
      next &gt;&gt;
    </button>
  </div>

  {/* Start date input */}
  <div className="mt-4 px-2">
    <label className="text-sm text-blue-900 font-medium block mb-1">Start Date (Day 1)</label>
    <input
      type="date"
      className="w-full px-3 py-2 border border-blue-300 rounded-md text-blue-900 shadow-sm"
      value={startDate || ""}
      onChange={(e) => setStartDate(e.target.value)}
    />
  </div>

  {/* Day selector dropdown */}
  {showDaySelector && (
    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white border border-blue-200 rounded shadow-md z-10 max-h-60 overflow-y-auto w-44">
      {days.map((_, i) => {
        const date = startDate
          ? new Date(new Date(startDate + "T00:00:00").getTime() + i * 86400000).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric"
            })
          : null;

        return (
          <button
            key={i}
            onClick={() => handleSelectDay(i + 1)}
            className={`block w-full px-4 py-2 text-left text-sm text-blue-900 hover:bg-blue-100 ${
              i + 1 === currentDay ? "bg-blue-200 font-semibold" : ""
            }`}
          >
            Day {i + 1}
            {date && <div className="text-xs text-blue-500">{date}</div>}
          </button>
        );
      })}
    </div>
  )}
</div>






{/* jsadfjhlksad;jflkasdjf */}
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
            onBookmark={onBookmark}
          />
        ))}

        {isAdding ? (
          <AddLocationForm onAdd={handleAddLocation} onCancel={() => setIsAdding(false)} bookmarks={bookmarks}/>
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
