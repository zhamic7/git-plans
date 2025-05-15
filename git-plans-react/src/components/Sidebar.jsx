"use client";
import React, { useState } from "react";
import LocationItem from "./LocationItem";
import AddLocationForm from "./AddLocationForm"; // New import

export default function Sidebar({ onPrevDay, onNextDay, currentDay }) {
  const [locations, setLocations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const toggleExpand = (idx) => {
    setSelected(selected === idx ? null : idx);
  };

  const handleAddLocation = (newLoc) => {
    setLocations((prev) => [...prev, newLoc]);
    setIsAdding(false);
  };

  const handleDeleteLocation = (idx) => {
    setLocations((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleUpdateLocation = (idx, updatedLoc) => {
    setLocations((prev) => prev.map((loc, i) => (i === idx ? updatedLoc : loc)));
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
          onDelete={handleDeleteLocation}
          onUpdate={handleUpdateLocation}
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

      <div className="mt-8 text-center">
        <button className="text-blue-400 text-sm hover:text-blue-600">❓ Help</button>
      </div>
    </div>
  );
}
