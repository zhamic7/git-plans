"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MapView from "../components/MapView";

export default function HomePage() {
  const [days, setDays] = useState([{ locations: [] }]);
  const [currentDay, setCurrentDay] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on client after mount
  useEffect(() => {
    try {
      const savedDays = localStorage.getItem("locations");
      const savedDay = localStorage.getItem("currentDay");

      if (savedDays) setDays(JSON.parse(savedDays));
      if (savedDay) setCurrentDay(JSON.parse(savedDay));
    } catch (error) {
      console.error("Local storage load error:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when days change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("locations", JSON.stringify(days));
    } catch (error) {
      console.error("Local storage save error (days):", error);
    }
  }, [days, isLoaded]);

  // Save to localStorage when currentDay changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("currentDay", JSON.stringify(currentDay));
    } catch (error) {
      console.error("Local storage save error (currentDay):", error);
    }
  }, [currentDay, isLoaded]);

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

  const updateLocation = (index, updatedLocation) => {
    const newDays = [...days];
    newDays[currentDay].locations[index] = updatedLocation;
    setDays(newDays);
  };

  const clearLocations = () => {
    const newDays = [...days];
    newDays[currentDay].locations = [];
    setDays(newDays);
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

  return (
    <div className="flex h-screen">
      <Sidebar
        locations={days[currentDay]?.locations || []}
        onAddLocation={addLocation}
        onDeleteLocation={deleteLocation}
        onUpdateLocation={updateLocation}
        onClearLocations={clearLocations}
        onPrevDay={() => changeDay(-1)}
        onNextDay={() => changeDay(1)}
        currentDay={currentDay + 1}
      />
      <MapView />
    </div>
  );
}
