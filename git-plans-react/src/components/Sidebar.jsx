"use client";
import React, { useState } from "react";

export default function Sidebar({ locations, onAddLocation, onPrevDay, onNextDay, currentDay }) {
  const [selected, setSelected] = useState(null);

  const toggleExpand = (idx) => {
    setSelected(selected === idx ? null : idx);
  };

  return (
    <div className="w-1/3 bg-gradient-to-b from-blue-50 to-blue-100 p-6 shadow-md overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <button className="text-blue-700 font-semibold" onClick={onPrevDay}>&lt;&lt; prev</button>
        <h2 className="text-xl font-bold text-blue-900">DAY {currentDay}</h2>
        <button className="text-blue-700 font-semibold" onClick={onNextDay}>next &gt;&gt;</button>
      </div>

      <div className="space-y-2">
        {locations.map((loc, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-blue-200 overflow-hidden">
            <div
              className={`flex items-center justify-between px-4 py-2 cursor-pointer transition-all duration-150 ${selected === idx ? "bg-blue-100" : "hover:bg-blue-50"}`}
              onClick={() => toggleExpand(idx)}
            >
              <span className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 accent-blue-600"
                  onClick={(e) => e.stopPropagation()}
                />
                {loc.name}
              </span>
              <button
                className="text-yellow-500 hover:text-yellow-600"
                onClick={(e) => e.stopPropagation()}
              >
                ✏️
              </button>
            </div>
            {selected === idx && (
              <div className="px-4 py-2 bg-blue-50 text-sm text-blue-900">
                <p>Details for {loc.name}:</p>
                <ul className="list-disc list-inside">
                  <li>Route info</li>
                  <li>Estimated time</li>
                  <li>Notes...</li>
                </ul>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={onAddLocation}
          className="mt-4 p-2 w-full text-blue-600 font-medium border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50"
        >
          ➕ Add Location
        </button>
      </div>

      <div className="mt-8 text-center">
        <button className="text-blue-400 text-sm hover:text-blue-600">❓ Help</button>
      </div>
    </div>
  );
}
