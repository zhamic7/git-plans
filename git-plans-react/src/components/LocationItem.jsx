"use client";
import React, { useState } from "react";

export default function LocationItem({ loc, idx, selected, toggleExpand, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(loc.name);
  const [editLocation, setEditLocation] = useState(loc.location);

  const handleSave = () => {
    onUpdate(idx, { ...loc, name: editName, location: editLocation });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(loc.name);
    setEditLocation(loc.location);
    setIsEditing(false);
  };

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
            checked={loc.view}
            onChange={(e) => {
              const updatedLoc = { ...loc, view: e.target.checked }; 
              onUpdate(idx, updatedLoc); 
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <span className="text-gray-800">{loc.name}</span>
        </span>
        <div className="flex gap-2">
        <button
            className="text-yellow-500 hover:text-yellow-600"
            onClick={(e) => {
                e.stopPropagation();
                if (selected !== idx) {
                toggleExpand(idx); // make sure it's expanded
                }
                setIsEditing(true);
            }}
            >
            ✏️
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
        <div className="px-4 py-2 bg-blue-50 text-sm text-blue-900">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-2 py-1 border rounded"
              />
              <input
                type="text"
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
                className="w-full px-2 py-1 border rounded"
              />
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
