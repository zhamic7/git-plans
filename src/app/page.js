"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MapView from "../components/MapView";
import PlanSelectorSidebar from "../components/PlanSelectorSidebar"; // You’ll need to create this

export default function HomePage() {
  const [plans, setPlans] = useState({});
  const [currentPlanName, setCurrentPlanName] = useState(null);
  const [days, setDays] = useState([{ locations: [] }]);
  const [currentDay, setCurrentDay] = useState(0);
  const [bookmarks, setBookmarks] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sidebarMode, setSidebarMode] = useState("plans"); // "plans" or "locations"

  // Load plans from localStorage
  useEffect(() => {
    const savedPlans = JSON.parse(localStorage.getItem("plans") || "{}");
    const savedPlanName = localStorage.getItem("currentPlan");

    if (savedPlanName && savedPlans[savedPlanName]) {
      setPlans(savedPlans);
      setCurrentPlanName(savedPlanName);
      const plan = savedPlans[savedPlanName];
      setDays(plan.days);
      setBookmarks(plan.bookmarks || []);
      setStartDate(plan.startDate || null);
    }

    setIsLoaded(true);
  }, []);

  // Save current plan to localStorage
  useEffect(() => {
    if (!isLoaded || !currentPlanName) return;

    const updatedPlans = {
      ...plans,
      [currentPlanName]: { days, bookmarks, startDate },
    };

    setPlans(updatedPlans);
    localStorage.setItem("plans", JSON.stringify(updatedPlans));
    localStorage.setItem("currentPlan", currentPlanName);
  }, [days, bookmarks, startDate, currentPlanName, isLoaded]);

  const addLocation = (location) => {
    const newDays = [...days];
    newDays[currentDay].locations.push({ ...location, view: true });
    setDays(newDays);
  };

  const deleteLocation = (index) => {
    const newDays = [...days];
    newDays[currentDay].locations.splice(index, 1);
    setDays(newDays);
  };
  const normalizeLocation = (raw) => ({
    name: raw.name ?? "",
    location: raw.location ?? "",
    latitude: typeof raw.latitude === "number" ? raw.latitude : 0,
    longitude: typeof raw.longitude === "number" ? raw.longitude : 0,
    view: typeof raw.view === "boolean" ? raw.view : true,
  });

  const updateLocation = (index, updatedLocation) => {
    console.log(index);
    console.log(updatedLocation);
    const newDays = [...days];
    const safeLoc = normalizeLocation(updatedLocation);
    newDays[currentDay].locations.splice(index, 1);
    newDays[currentDay].locations.push(safeLoc);
    setDays(newDays);
  };

  const clearLocations = () => {
    const newDays = [...days];
    newDays[currentDay].locations = [];
    setDays(newDays);
  };

  const addBookmark = (loc) => {
    setBookmarks((prev) => {
      const exists = prev.some(
        (b) => b.name === loc.name && b.location === loc.location
      );
      if (exists) return prev;
      return [...prev, loc];
    });
  };

  const changeDay = (offset) => {
    const nextDay = currentDay + offset;
    if (nextDay >= 0 && nextDay < days.length) {
      setCurrentDay(nextDay);
    } else if (nextDay === days.length) {
      setDays([...days, { locations: [] }]);
      setCurrentDay(nextDay);
    }
  };

  const handleSelectPlan = (planName) => {
    const plan = plans[planName];
    if (!plan) return;
    setCurrentPlanName(planName);
    setDays(plan.days);
    setBookmarks(plan.bookmarks || []);
    setStartDate(plan.startDate || null);
    setCurrentDay(0);
    setSidebarMode("locations");
  };

  const handleCreatePlan = (name) => {
    if (!name || plans[name]) {
      alert("Invalid or duplicate plan name.");
      return;
    }
  
    const newPlan = { days: [{ locations: [] }], bookmarks: [], startDate: null };
    setPlans((prev) => ({ ...prev, [name]: newPlan }));
    setCurrentPlanName(name);
    setDays(newPlan.days);
    setBookmarks([]);
    setStartDate(null);
    setCurrentDay(0);
    setSidebarMode("locations");
  };

  const handleDeletePlan = (planName) => {
  
    const newPlans = { ...plans };
    delete newPlans[planName];
  
    // Save the updated plans to localStorage
    localStorage.setItem("plans", JSON.stringify(newPlans));
  
    // If the deleted plan was the current one
    if (planName === currentPlanName) {
      setCurrentPlanName(null);
      localStorage.removeItem("currentPlan");
  
      setDays([{ locations: [] }]);
      setBookmarks([]);
      setStartDate(null);
      setCurrentDay(0);
      setSidebarMode("plans");
    }
  
    // Update state
    setPlans(newPlans);
  };

  const handleImportPlan = (planName, importedPlan) => {
    const rawPlans = localStorage.getItem("plans") || "{}";
    const existingPlans = JSON.parse(rawPlans);
  
    if (existingPlans[planName]) {
      const confirmOverwrite = confirm(`Plan "${planName}" already exists. Overwrite it?`);
      if (!confirmOverwrite) return;
    }
  
    const updatedPlans = {
      ...existingPlans,
      [planName]: importedPlan,
    };
  
    localStorage.setItem("plans", JSON.stringify(updatedPlans));
    localStorage.setItem("currentPlan", planName);
  
    setPlans(updatedPlans);
    setCurrentPlanName(planName);
    setDays(importedPlan.days);
    setBookmarks(importedPlan.bookmarks || []);
    setStartDate(importedPlan.startDate || null);
    setCurrentDay(0);
    setSidebarMode("locations");
  };

  return (
    <div className="flex h-screen relative">
      {Object.keys(plans).length > 0 && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-row items-center space-x-3 bg-white px-4 py-2 rounded shadow border border-gray-200">
  {sidebarMode === "locations" && currentPlanName && (
    <div className="text-sm font-semibold text-gray-800 whitespace-nowrap">
      📌 {currentPlanName}
    </div>
  )}
  <button
    onClick={() =>
      setSidebarMode((prev) => (prev === "locations" ? "plans" : "locations"))
    }
    className="px-3 py-1 bg-blue-600 text-white rounded shadow hover:bg-blue-700 text-sm whitespace-nowrap"
  >
    {sidebarMode === "locations" ? "📂 Switch Plans" : "📍 Back to Planner"}
  </button>
</div>

      )}


      {sidebarMode === "locations" ? (
        <Sidebar
          locations={days[currentDay]?.locations || []}
          onAddLocation={addLocation}
          onDeleteLocation={deleteLocation}
          onUpdateLocation={updateLocation}
          onClearLocations={clearLocations}
          onPrevDay={() => changeDay(-1)}
          onNextDay={() => changeDay(1)}
          currentDay={currentDay + 1}
          onBookmark={addBookmark}
          bookmarks={bookmarks}
          changeDay={changeDay}
          days={days}
          startDate={startDate}
          setStartDate={setStartDate}
        />
      ) : (
        <PlanSelectorSidebar
          plans={plans}
          onSelectPlan={handleSelectPlan}
          onCreatePlan={handleCreatePlan}
          onDeletePlan={handleDeletePlan}
          onImportPlan={handleImportPlan}
        />


      )}

      <MapView currentDay={currentDay} allDays={days} />

      <div className="absolute bottom-4 left-4 bg-white p-2 shadow-lg rounded max-w-xs overflow-y-auto max-h-64">
        <h4 className="font-semibold mb-1 text-black">Bookmarks</h4>
        <ul className="text-sm text-gray-700 list-disc pl-4">
          {bookmarks.map((b, i) => (
            <li key={i}>{b.name} – {b.location}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
