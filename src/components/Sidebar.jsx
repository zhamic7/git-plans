"use client";
import React, { useState, useRef } from "react";
import LocationItem from "./LocationItem";
import AddLocationForm from "./AddLocationForm";
import {
  Box,
  Stack,
  Button,
  Typography,
  Paper,
  ClickAwayListener,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

export default function Sidebar({
  locations,
  onAddLocation,
  onDeleteLocation,
  onUpdateLocation,
  onClearLocations,
  onPrevDay,
  onNextDay,
  currentDay,
  onBookmark,
  bookmarks,
  changeDay,
  days,
  startDate,
  setStartDate,
}) {
  const [selected, setSelected] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showDaySelector, setShowDaySelector] = useState(false);
  const dayButtonRef = useRef(null);

  const handleSelectDay = (dayIndex) => {
    setShowDaySelector(false);
    changeDay(dayIndex - currentDay); // simulate offset
  };

  const toggleExpand = (idx) => {
    setSelected(selected === idx ? null : idx);
  };

  const geocodeAddress = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`;

    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "location-app/1.0",
        },
      });
      const data = await response.json();
      if (data.length > 0) {
        return {
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon),
        };
      } else {
        alert(`Could not find coordinates for: ${address}`);
        return null;
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      alert("Error geocoding address.");
      return null;
    }
  };

  const handleAddLocation = async (newLoc) => {
    const coords = await geocodeAddress(newLoc.location);
    if (!coords) return;

    const locWithCoords = {
      ...newLoc,
      latitude: coords.latitude,
      longitude: coords.longitude,
    };

    onAddLocation(locWithCoords);
    setIsAdding(false);
  };

  const downloadPlanAsJSON = () => {
    const rawPlans = localStorage.getItem("plans");
    const currentPlanName = localStorage.getItem("currentPlan");

    if (!rawPlans || !currentPlanName) {
      alert("No current plan data found in localStorage.");
      return;
    }

    try {
      const plans = JSON.parse(rawPlans);
      const currentPlan = plans[currentPlanName];

      if (!currentPlan || !Array.isArray(currentPlan.days)) {
        alert("Current plan is invalid or missing.");
        return;
      }

      const flattened = currentPlan.days.flatMap((dayData, dayIndex) =>
        (dayData.locations || [])
          .filter((loc) => loc.view !== false)
          .map((loc) => ({
            name: loc.name,
            location: loc.location,
            latitude: loc.latitude,
            longitude: loc.longitude,
            day: dayIndex + 1,
          }))
      );

      const blob = new Blob(
        [JSON.stringify({ [currentPlanName]: flattened }, null, 2)],
        { type: "application/json" }
      );

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${currentPlanName.replace(/\s+/g, "_")}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to export plan JSON:", err);
      alert("Failed to export plan data.");
    }
  };

  const currentDayDate = startDate
    ? new Date(
        new Date(startDate + "T00:00:00").getTime() +
          (currentDay - 1) * 86400000
      ).toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 400,
        bgcolor: "background.paper",
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        height: "100vh",
        overflowY: "auto",
      }}
    >
      {/* Day Navigation */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Button size="small" onClick={onPrevDay} variant="text">« Prev</Button>

        {/* Day Button + Selector */}
        <Box sx={{ position: 'relative' }} ref={dayButtonRef}>
  <Button
    onClick={() => setShowDaySelector(!showDaySelector)}
    variant="text"
    sx={{ fontWeight: "bold", fontSize: 18 }}
  >
    Day {currentDay}
  </Button>
  {currentDayDate && (
    <Typography
      variant="caption"
      color="text.secondary"
      display="block"
      textAlign="center"
    >
      {currentDayDate}
    </Typography>
  )}

  {showDaySelector && (
    <ClickAwayListener onClickAway={() => setShowDaySelector(false)}>
      <Paper
        elevation={4}
        sx={{
          position: "absolute",
          top: "100%",
          left: 0,
          mt: 1,
          zIndex: 10,
          maxHeight: 300,
          overflowY: "auto",
          width: 160,
        }}
      >
        {days.map((_, i) => {
          const date = startDate
            ? new Date(new Date(startDate + "T00:00:00").getTime() + i * 86400000).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric"
              })
            : null;

          return (
            <Button
              key={i}
              fullWidth
              variant={i + 1 === currentDay ? "contained" : "text"}
              onClick={() => handleSelectDay(i + 1)}
              sx={{ justifyContent: "space-between", px: 2 }}
            >
              Day {i + 1}
              {date && (
                <Typography variant="caption" sx={{ ml: 1 }}>
                  {date}
                </Typography>
              )}
            </Button>
          );
        })}
      </Paper>
    </ClickAwayListener>
  )}
</Box>


        <Button size="small" onClick={onNextDay} variant="text">Next »</Button>
      </Stack>

      {/* Start Date Picker */}
      <Box mb={2}>
        <Typography variant="subtitle2" color="text.primary" gutterBottom>
          Start Date (Day 1)
        </Typography>
        <input
          type="date"
          value={startDate || ""}
          onChange={(e) => setStartDate(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />
      </Box>

      {/* Locations Section */}
      <Box mt={3} mb={2}>
        {locations.map((loc, idx) => (
          <Paper key={idx} variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ position: "relative", width: 28, height: 40 }}>
                {/* Blue teardrop pin */}
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: "50% 50% 50% 0",
                    backgroundColor: "#1E5AFF",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    fontWeight: 600,
                    transform: "rotate(-45deg)",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.4)",
                  }}
                >
                  <Box sx={{ transform: "rotate(45deg)" }}>{idx + 1}</Box>
                </Box>

                {/* Purple dot below */}
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: "rgba(160, 64, 255, 0.6)",
                    position: "absolute",
                    bottom: -6,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 0,
                  }}
                />
              </Box>

              <Box flex={1}>
                <LocationItem
                  loc={loc}
                  idx={idx}
                  selected={selected}
                  toggleExpand={toggleExpand}
                  onDelete={() => onDeleteLocation(idx)}
                  onUpdate={async (i, updatedLoc) => {
                    const coords = await geocodeAddress(updatedLoc.location);
                    if (!coords) return;
                    const updatedLocWithCoords = { ...updatedLoc, ...coords };
                    onUpdateLocation(i, updatedLocWithCoords);
                  }}
                  onBookmark={onBookmark}
                />
              </Box>
            </Stack>
          </Paper>
        ))}

        {/* Add Location */}
        {isAdding ? (
          <AddLocationForm
            onAdd={handleAddLocation}
            onCancel={() => setIsAdding(false)}
            bookmarks={bookmarks}
          />
        ) : (
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            sx={{ borderStyle: "dashed", mt: 2 }}
            onClick={() => setIsAdding(true)}
          >
            ➕ Add Location
          </Button>
        )}
      </Box>

      {/* Action Buttons */}
      <Stack spacing={2} mt={4} alignItems="center">
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={onClearLocations}
        >
          Clear All Locations
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<DownloadIcon />}
          onClick={downloadPlanAsJSON}
        >
          Download Plan JSON
        </Button>
      </Stack>
    </Box>
  );
}
