// components/LocationForm.jsx
"use client";
import React, { useState, useEffect } from "react";

export default function LocationForm({ initialName = "", initialLocation = "", onSubmit, onCancel, submitLabel = "Add" }) {
  const [name, setName] = useState(initialName);
  const [location, setLocation] = useState(initialLocation);

  useEffect(() => {
    setName(initialName);
    setLocation(initialLocation);
  }, [initialName, initialLocation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && location.trim()) {
      onSubmit({ name: name.trim(), location: location.trim() });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Location name"
        className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
        required
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Address/description"
        className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
        required
      />
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="text-sm text-blue-600 font-medium hover:underline"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
