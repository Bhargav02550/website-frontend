"use client";
import React, { useState } from "react";
import { Switch } from "@headlessui/react";

const timeSlots = [
  "06:00 AM", "08:00 AM", "10:00 AM",
  "12:00 PM", "02:00 PM", "04:00 PM",
  "06:00 PM", "08:00 PM", "10:00 PM"
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function FlexibleSchedule() {
  const [isWeekly, setIsWeekly] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  const toggleDay = (day) => {
    setSelectedDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  return (
    <div className="max-w-md my-5 mx-auto bg-white shadow-xl rounded-2xl p-6 space-y-5">
      <h2 className="text-2xl font-bold text-gray-800">Flexible Schedules</h2>
      <p className="text-gray-500">Set up daily or weekly delivery timings</p>

      <div className="flex justify-between items-center">
        <span className="text-gray-700 font-medium">Daily</span>
        <Switch
          checked={isWeekly}
          onChange={setIsWeekly}
          className={`${isWeekly ? "bg-blue-600" : "bg-gray-300"}
            relative inline-flex h-6 w-11 items-center rounded-full transition`}
        >
          <span
            className={`${
              isWeekly ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
        <span className="text-gray-700 font-medium">Weekly</span>
      </div>

      {isWeekly && (
        <div className="grid grid-cols-7 gap-2">
          {daysOfWeek.map((day) => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={`py-1 px-2 rounded-xl border text-sm font-medium ${
                selectedDays.includes(day)
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Select Delivery Time
        </label>
        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">-- Select Time --</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>

      <div className="pt-4">
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl text-sm font-semibold shadow"
          onClick={() => {
            alert(
              isWeekly
                ? `Weekly schedule on ${selectedDays.join(", ")} at ${selectedTime}`
                : `Daily schedule at ${selectedTime}`
            );
          }}
        >
          Save Schedule
        </button>
      </div>
    </div>
  );
}
