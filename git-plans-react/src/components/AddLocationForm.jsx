"use client";
import React, { useState } from "react";

export default function AddLocationForm({ onAdd, onCancel }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && location.trim()) {
      onAdd({ name: name.trim(), location: location.trim(), view: true });
      setName("");
      setLocation("");
    }
  };

  return (
    <div className="p-4 border border-blue-300 rounded-xl bg-white shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter location name"
          className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800"
          required
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location address/description"
          className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-800"
          required
        />
        <button
          type="button"
          className="w-full px-3 py-2 border border-blue-300 rounded-md text-blue-700 hover:bg-blue-50 transition"
        >
          Add from bookmarked locations
        </button>

        <div className="flex justify-end space-x-2">
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
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
