"use client";
import React from "react";

export default function LocationItem({ loc, idx, selected, toggleExpand }) {
  return (
    <div className="bg-white rounded-lg border border-blue-200 overflow-hidden">
      <div
        className={`flex items-center justify-between px-4 py-2 cursor-pointer transition-all duration-150 ${
          selected === idx ? "bg-blue-100" : "hover:bg-blue-50"
        }`}
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
          {loc.location && (
            <p className="mb-2">
              <strong>Location:</strong> {loc.location}
            </p>
          )}
          <ul className="list-disc list-inside">
            <li>Route info</li>
            <li>Estimated time</li>
            <li>Notes...</li>
          </ul>
        </div>
      )}
    </div>
  );
}
