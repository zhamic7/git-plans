"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MapView from "../components/MapView";

export default function HomePage() {
  const [days, setDays] = useState(() => {
    try {
      const savedDays = localStorage.getItem("locations");
      return savedDays ? JSON.parse(savedDays) : [{ locations: [] }];
    } catch (error) {
      console.error("Local storage error:", error);
      return [{ locations: [] }];
    }
  });

//   const [currentDay, setCurrentDay] = useState(0);
  const [currentDay, setCurrentDay] = useState(() => {
    try {
      const day = localStorage.getItem("currentDay");
      return day ? JSON.parse(day) : 0;
    } catch (error) {
      console.error("Local storage error:", error);
      return 0;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("locations", JSON.stringify(days));
    } catch (error) {
      console.error("Local storage error:", error);
    }
  }, [days]);
  
  useEffect(() => {
    try {
      localStorage.setItem("currentDay", JSON.stringify(currentDay));
    } catch (error) {
      console.error("Local storage error:", error);
    }
  }, [currentDay]);

  const addLocation = () => {
    const newDays = [...days];
    newDays[currentDay].locations.push({
      name: `Location ${newDays[currentDay].locations.length + 1}`,
    });
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
        locations={days[currentDay].locations}
        onAddLocation={addLocation}
        onPrevDay={() => changeDay(-1)}
        onNextDay={() => changeDay(1)}
        currentDay={currentDay + 1}
      />
      <MapView />
    </div>
  );
}
