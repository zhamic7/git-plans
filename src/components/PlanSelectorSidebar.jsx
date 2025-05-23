"use client";
import React, { useState, useRef } from "react";

export default function PlanSelectorSidebar({
  plans,
  onSelectPlan,
  onCreatePlan,
  onDeletePlan,
  onImportPlan,
}) {
  const [newPlanName, setNewPlanName] = useState("");
  const fileInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPlanName.trim()) return;
    onCreatePlan(newPlanName.trim());
    setNewPlanName("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        const data = JSON.parse(text);
        const planName = Object.keys(data)[0];
        const locations = data[planName];

        if (!Array.isArray(locations)) throw new Error("Invalid plan structure");

        const days = [];
        locations.forEach((loc) => {
          const dayIndex = (loc.day || 1) - 1;
          if (!days[dayIndex]) days[dayIndex] = { locations: [] };
          days[dayIndex].locations.push({
            name: loc.name ?? "",
            location: loc.location ?? "",
            latitude: typeof loc.latitude === "number" ? loc.latitude : 0,
            longitude: typeof loc.longitude === "number" ? loc.longitude : 0,
            view: true,
          });
        });

        const newPlan = {
          days,
          bookmarks: [],
          startDate: null,
        };

        onImportPlan(planName, newPlan);
      } catch (err) {
        console.error("Import error:", err);
        alert("Failed to import plan. Please check the file format.");
      } finally {
        e.target.value = ""; // Reset input
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="w-1/3 bg-gradient-to-b from-gray-100 to-gray-200 p-6 shadow-md overflow-y-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4">📁 All Plans</h2>

      {Object.keys(plans).length === 0 ? (
        <p className="text-gray-500 italic">No plans yet. Create one below!</p>
      ) : (
        <ul className="space-y-2">
          {Object.keys(plans).map((planName) => (
            <li key={planName} className="flex items-center justify-between">
              <button
                onClick={() => onSelectPlan(planName)}
                className="text-left px-3 py-2 rounded hover:bg-blue-100 font-medium text-blue-900 flex-1"
              >
                🗂 {planName}
              </button>
              <button
                onClick={() => onDeletePlan(planName)}
                className="text-red-500 hover:text-red-700 ml-2 text-sm"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col space-y-2">
        <input
          type="text"
          value={newPlanName}
          onChange={(e) => setNewPlanName(e.target.value)}
          placeholder="New plan name"
          className="text-gray-800 px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button
          type="submit"
          className="self-start text-sm text-blue-700 underline hover:text-blue-900"
        >
        </button>
      </form>

      <div className="mt-4">
        <input
          type="file"
          accept=".json"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-sm text-green-700 underline hover:text-green-900"
        >
          📥 Import Plan from JSON
        </button>
      </div>
    </div>
  );
}
