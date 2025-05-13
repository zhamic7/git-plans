"use client"

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import MapView from "../components/MapView";

export default function HomePage() {
  const [days, setDays] = useState([
    { locations: [] }
  ]);
  const [currentDay, setCurrentDay] = useState(0);

  const addLocation = () => {
    const newDays = [...days];
    newDays[currentDay].locations.push({ name: `Location ${newDays[currentDay].locations.length + 1}` });
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