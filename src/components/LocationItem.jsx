"use client";
import React, { useState, useEffect } from "react";

export default function LocationItem({
  loc,
  idx,
  selected,
  toggleExpand,
  onDelete,
  onUpdate,
  onBookmark,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(loc.name ?? "");
  const [editLocation, setEditLocation] = useState(loc.location ?? "");
  const [suggestions, setSuggestions] = useState([]);

  const handleSave = () => {
    onUpdate(idx, { ...loc, name: editName, location: editLocation });
    setIsEditing(false);
    setSuggestions([]);
  };

  const handleCancel = () => {
    setEditName(loc.name ?? "");
    setEditLocation(loc.location ?? "");
    setIsEditing(false);
    setSuggestions([]);
  };

  useEffect(() => {
    if (!isEditing || editLocation.length < 3) {
      setSuggestions([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            editLocation
          )}&format=json`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error("Nominatim error:", err);
      }
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [editLocation, isEditing]);

  const handleSuggestionClick = (s) => {
    setEditLocation(s.display_name);
    setSuggestions([]);
  };

  return (
    <div className="bg-white rounded-lg border border-blue-200 overflow-visible relative">
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
            checked={loc.view}
            onChange={(e) =>
              onUpdate(idx, { ...loc, view: e.target.checked })
            }
            onClick={(e) => e.stopPropagation()}
          />
          <span className="text-gray-800">{loc.name}</span>
        </span>
        <div className="flex gap-2">
          <button
            className="text-yellow-500 hover:text-yellow-600"
            onClick={(e) => {
              e.stopPropagation();
              if (selected !== idx) toggleExpand(idx);
              setIsEditing(true);
            }}
          >
            ✏️
          </button>
          <button
            className="text-green-600 hover:text-green-700"
            onClick={(e) => {
              e.stopPropagation();
              onBookmark(loc);
            }}
          >
            Bookmark Location
          </button>
          <button
            className="text-red-500 hover:text-red-600"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(idx);
            }}
          >
            🗑️
          </button>
        </div>
      </div>

      {selected === idx && (
  <div className="px-4 py-2 bg-blue-50 text-sm text-blue-900 relative overflow-visible">
    {isEditing ? (
      <div className="space-y-2">
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          className="w-full px-2 py-1 border rounded"
        />
        <div className="relative overflow-visible">
          <input
            type="text"
            value={editLocation}
            onChange={(e) => setEditLocation(e.target.value)}
            className="w-full px-2 py-1 border rounded"
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-50 bg-white border border-blue-200 rounded mt-1 w-full max-h-60 overflow-y-auto shadow-lg">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  onClick={() => handleSuggestionClick(s)}
                  className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700"
                >
                  {s.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="text-sm text-gray-500 hover:text-gray-700"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="text-sm text-blue-600 font-medium hover:underline"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    ) : (
      <>
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
      </>
    )}
  </div>
)}
    </div>
  );
}
