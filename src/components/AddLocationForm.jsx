"use client";
import React, { useState } from "react";

export default function AddLocationForm({ onAdd, onCancel, bookmarks = [] }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [selectedBookmarkIndex, setSelectedBookmarkIndex] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && location.trim()) {
      onAdd({ name: name.trim(), location: location.trim(), view: true });
      setName("");
      setLocation("");
      setSelectedBookmarkIndex("");
    }
  };

  const handleBookmarkSelect = (e) => {
    const index = e.target.value;
    if (index !== "") {
      const bookmark = bookmarks[parseInt(index)];
      setName(bookmark.name);
      setLocation(bookmark.location);
      setSelectedBookmarkIndex(index);
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

        {bookmarks.length > 0 && (
          <select
            value={selectedBookmarkIndex}
            onChange={handleBookmarkSelect}
            className="w-full px-3 py-2 border border-blue-300 rounded-md text-gray-800 bg-white"
          >
            <option value="">📌 Select from bookmarked locations</option>
            {bookmarks.map((b, i) => (
              <option key={i} value={i}>
                {b.name} – {b.location}
              </option>
            ))}
          </select>
        )}

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
