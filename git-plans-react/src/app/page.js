"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MapView from "../components/MapView";

export default function HomePage() {
  const [days, setDays] = useState([{ locations: [] }]);
  const [currentDay, setCurrentDay] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  // Load from localStorage on client after mount
  useEffect(() => {
    try {
      const savedDays = localStorage.getItem("locations");
      const savedDay = localStorage.getItem("currentDay");
      const savedBookmarks = localStorage.getItem("bookmarks");

      if (savedDays) setDays(JSON.parse(savedDays));
      if (savedDay) setCurrentDay(JSON.parse(savedDay));
      if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
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


  useEffect(() => {
  if (!isLoaded) return;
  try {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } catch (error) {
    console.error("Local storage save error (bookmarks):", error);
  }
}, [bookmarks, isLoaded]);

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

const addBookmark = (loc) => {
  setBookmarks((prev) => {
    const exists = prev.some(b => b.name === loc.name && b.location === loc.location);
    if (exists) {
      console.log("Already bookmarked:", loc);
      return prev;
    }
    console.log("Bookmarked:", loc);
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
        onBookmark={addBookmark}
        bookmarks={bookmarks}
        changeDay={changeDay}
        days={days}
      />
      <MapView />
      <div className="absolute bottom-4 left-4 bg-white p-2 shadow-lg rounded max-w-xs overflow-y-auto max-h-64">
  <h4 className="font-semibold mb-1">Bookmarks</h4>
  <ul className="text-sm text-gray-700 list-disc pl-4">
    {bookmarks.map((b, i) => (
      <li key={i}>{b.name} – {b.location}</li>
    ))}
  </ul>
</div>

    </div>
  );
}
