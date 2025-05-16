"use client";
import React, { useState } from "react";
import LocationItem from "./LocationItem";
import AddLocationForm from "./AddLocationForm"; // New import

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
  
    const handleAddLocation = (newLoc) => {
      onAddLocation(newLoc);
      setIsAdding(false);
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
              onUpdate={(updated) => onUpdateLocation(idx, updated)}
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
  
        <div className="mt-6 text-center">
          <button
            onClick={onClearLocations}
            className="text-sm text-red-500 hover:text-red-700"
          >
            🗑️ Clear All Locations
          </button>
        </div>
      </div>
    );
  }
  