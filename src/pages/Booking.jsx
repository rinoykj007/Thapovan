import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { format } from "date-fns";
import { Star, HelpCircle } from "lucide-react";
import { submitToGoogleSheets } from "../utils/googleSheets";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("4:00 PM");
  const [notifyMe, setNotifyMe] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelMode: "",
    services: "",
    notes: "",
  });

  const [completedSteps, setCompletedSteps] = useState({
    date: false,
    time: false,
    name: false,
    email: false,
    phone: false,
    travelMode: false,
    notes: false,
  });

  // Update completed steps when form data changes
  useEffect(() => {
    setCompletedSteps({
      date: selectedDate !== null,
      time: selectedTime !== "",
      name: formData.name.trim() !== "",
      email: formData.email.trim() !== "",
      phone: formData.phone.trim() !== "",
      travelMode: formData.travelMode !== "",
      notes: formData.notes ? formData.notes.trim() !== "" : false,
    });
  }, [selectedDate, selectedTime, formData]);

  const totalCompleted = Object.values(completedSteps).filter(Boolean).length;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSaveAndContinue = async () => {
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const formDataToSave = {
        date: selectedDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
        time: selectedTime,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        travelMode: formData.travelMode,
        services: formData.services || "N/A",
        notes: formData.notes || "N/A",
        notifyMe: notifyMe,
      };

      console.log("Saving form data:", formDataToSave);

      const result = await submitToGoogleSheets(formDataToSave);

      if (result.success) {
        console.log("Successfully saved to Google Sheets! Row:", result.row);
        setSubmitSuccess(true);
        // Optionally reset form or navigate to next step
      } else {
        console.error("Failed to save to Google Sheets:", result.error);
        const errorMsg =
          typeof result.error === "string"
            ? result.error
            : "Failed to save your booking. Please try again.";
        setSubmitError(errorMsg);
      }
    } catch (error) {
      console.error("Error saving form data:", error);
      const errorMsg = error.message || "An error occurred. Please try again.";
      setSubmitError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const morningSlots = [
    "9:15 AM",
    "9:45 AM",
    "10:00 AM",
    "10:15 AM",
    "10:30 AM",
    "10:45 AM",
    "11:00 AM",
    "11:15 AM",
    "11:30 AM",
    "11:45 AM",
  ];
  const afternoonSlots = [
    "1:00 PM",
    "1:15 PM",
    "1:30 PM",
    "1:45 PM",
    "2:30 PM",
    "4:00 PM",
    "4:15 PM",
    "4:45 PM",
  ];
  const eveningSlots = [
    "5:00 PM",
    "5:30 PM",
    "7:00 PM",
    "7:15 PM",
    "7:30 PM",
    "7:45 PM",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 flex flex-col md:flex-row p-2 sm:p-4">
      {/* Left Sidebar */}
      <div className="w-full md:w-80 lg:w-96 bg-slate-800/40 backdrop-blur-sm rounded-3xl p-4 md:mr-4 lg:mr-6 mb-4 md:mb-0 flex-shrink-0">
        <div className="mb-6 md:mb-8">
          <h1 className="text-white text-xl sm:text-2xl font-bold">
            LABSY <span className="text-white">*</span>
          </h1>
        </div>

        {/* Blood Count Section */}
        <div className="bg-slate-700/50 rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex items-start gap-3 mb-2">
            <div className="w-14 h-14 bg-slate-600 rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1579154204601-01588f351e67?w=100&h=100&fit=crop"
                alt="Blood test"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Service</h3>
              <p className="text-white text-sm leading-tight">
                Do not eat for 8 hours before your visit; you may only drink
                water.
              </p>
            </div>
          </div>
        </div>

        {/* Customer Info Form */}
        <div className="mb-6 space-y-4">
          <h2 className="text-white text-xl font-semibold mb-2">
            Personal Details
          </h2>

          <div className="space-y-3">
            <div>
              <label htmlFor="name" className="block text-white text-sm mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-white text-sm mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-white text-sm mb-1">
                Phone Number
              </label>
              <PhoneInput
                country={"in"}
                value={formData.phone}
                onChange={(phone) => setFormData({ ...formData, phone: phone })}
                inputStyle={{
                  width: "100%",
                  backgroundColor: "rgba(51, 65, 85, 0.5)",
                  border: "1px solid rgb(71, 85, 105)",
                  borderRadius: "0.5rem",
                  padding: "0.5rem 3rem",
                  color: "white",
                  fontSize: "0.875rem",
                }}
                buttonStyle={{
                  backgroundColor: "rgba(51, 65, 85, 0.5)",
                  border: "1px solid rgb(71, 85, 105)",
                  borderRadius: "0.5rem 0 0 0.5rem",
                }}
                dropdownStyle={{
                  backgroundColor: "rgb(30, 41, 59)",
                  color: "white",
                }}
                searchStyle={{
                  backgroundColor: "rgb(51, 65, 85)",
                  color: "white",
                }}
                enableSearch={true}
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label htmlFor="travel" className="block text-white text-sm mb-1">
                Mode of Travel
              </label>
              <select
                id="travel"
                value={formData.travelMode}
                onChange={(e) =>
                  setFormData({ ...formData, travelMode: e.target.value })
                }
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
              >
                <option value="" className="bg-slate-800">
                  Select mode of travel
                </option>
                <option value="car" className="bg-slate-800">
                  Car
                </option>
                <option value="public" className="bg-slate-800">
                  Public Transport
                </option>
                <option value="taxi" className="bg-slate-800">
                  Taxi
                </option>
                <option value="flight" className="bg-slate-800">
                  Flight
                </option>
                <option value="walk" className="bg-slate-800">
                  Walking
                </option>
              </select>
            </div>
            <div>
              <label
                htmlFor="services"
                className="block text-white text-sm mb-1"
              >
                Services
              </label>
              <select
                id="services"
                value={formData.services}
                onChange={(e) =>
                  setFormData({ ...formData, services: e.target.value })
                }
                className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-teal-500"
              >
                <option value="" className="bg-slate-800">
                  Select service
                </option>
                <option value="service1" className="bg-slate-800">
                  Service 1
                </option>
                <option value="service2" className="bg-slate-800">
                  Service 2
                </option>
                <option value="additional" className="bg-slate-800">
                  Additional optional services
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Help Button */}
        <button className="flex items-center gap-2 text-white hover:text-white text-sm mt-auto">
          <HelpCircle className="w-4 h-4" />
          <span>Help</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-slate-800/40 backdrop-blur-sm rounded-3xl p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-white text-2xl font-semibold">
            Select date and time
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-white text-sm font-semibold">
              {Math.round((totalCompleted / 7) * 100)}% COMPLETED
            </span>
            <span className="text-white text-sm">{totalCompleted}/7</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4, 5, 6, 7].map((step) => (
            <div
              key={step}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                step <= totalCompleted ? "bg-teal-500" : "bg-slate-600"
              }`}
            />
          ))}
        </div>

        {/* Calendar and Time Slots */}
        <div className="flex flex-col xl:flex-row gap-4 xl:gap-8">
          {/* Calendar */}
          <div className="bg-slate-800/50 rounded-2xl p-3 sm:p-4 md:p-6 w-full xl:w-96 text-white">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={dayjs(selectedDate)}
                onChange={(newVal) => {
                  if (newVal && newVal.toDate) setSelectedDate(newVal.toDate());
                }}
                disablePast
                shouldDisableDate={(date) => date.day() === 0}
                sx={{
                  "& .MuiPickersCalendarHeader-root": {
                    color: "white",
                  },
                  "& .MuiPickersDay-root": {
                    color: "white",
                    "&.Mui-selected": {
                      backgroundColor: "white",
                      color: "black",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                      },
                    },
                    "&.MuiPickersDay-today": {
                      borderColor: "white",
                    },
                  },
                  "& .MuiDayCalendar-weekDayLabel": {
                    color: "rgba(255, 255, 255, 0.8)",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                }}
              />
            </LocalizationProvider>
          </div>

          {/* Time Slots */}
          <div className="flex-1 space-y-4 md:space-y-6 overflow-x-hidden">
            <div className="text-white font-semibold text-base sm:text-lg mb-3 md:mb-4">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </div>

            {/* Morning */}
            <div>
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-slate-700/50 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-base md:text-lg">☀️</span>
                </div>
                <div>
                  <div className="text-white font-medium text-sm sm:text-base">
                    Morning
                  </div>
                  <div className="text-white text-xs">9:00 AM to 12:00 PM</div>
                </div>
              </div>
              <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
                {morningSlots.map((time) => (
                  <button
                    key={time}
                    className={`px-1.5 sm:px-2 py-1.5 rounded-lg text-[11px] xs:text-xs sm:text-[13px] font-medium transition-colors ${
                      selectedTime === time
                        ? "bg-white text-slate-900"
                        : "bg-slate-700/50 text-white hover:bg-slate-700/70"
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Afternoon */}
            <div>
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-slate-700/50 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-base md:text-lg">🌤️</span>
                </div>
                <div>
                  <div className="text-white font-medium text-sm sm:text-base">
                    Afternoon
                  </div>
                  <div className="text-white text-xs">12:00 PM to 5:00 PM</div>
                </div>
              </div>
              <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
                {afternoonSlots.map((time) => (
                  <button
                    key={time}
                    className={`px-1.5 sm:px-2 py-1.5 rounded-lg text-[11px] xs:text-xs sm:text-[13px] font-medium transition-colors ${
                      selectedTime === time
                        ? "bg-white text-slate-900"
                        : "bg-slate-700/50 text-white hover:bg-slate-700/70"
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Evening */}
            <div>
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-slate-700/50 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-base md:text-lg">🌙</span>
                </div>
                <div>
                  <div className="text-white font-medium text-sm sm:text-base">
                    Evening
                  </div>
                  <div className="text-white text-xs">5:00 PM to 8:00 PM</div>
                </div>
              </div>
              <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
                {eveningSlots.map((time) => (
                  <button
                    key={time}
                    className={`px-1.5 sm:px-2 py-1.5 rounded-lg text-[11px] xs:text-xs sm:text-[13px] font-medium transition-colors ${
                      selectedTime === time
                        ? "bg-white text-slate-900"
                        : "bg-slate-700/50 text-white hover:bg-slate-700/70"
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Notes Field */}
        <div className="mt-6">
          <label className="block text-white font-medium text-sm sm:text-base mb-2">
            Additional Notes (Optional)
          </label>
          <textarea
            value={formData.notes || ""}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            className="w-full bg-slate-800/50 text-white rounded-lg p-3 border border-slate-700 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors min-h-[100px]"
            placeholder="Any special requests or additional information..."
          />
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-700/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <div className="bg-slate-700/50 text-slate-300 px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base whitespace-nowrap w-full sm:w-auto text-center sm:text-left">
              {selectedTime}, {format(selectedDate, "MMM d, yyyy")}
            </div>
            <label className="flex items-center gap-2 text-slate-400 text-sm cursor-pointer w-full sm:w-auto">
              <input
                type="checkbox"
                checked={notifyMe}
                onChange={(e) => setNotifyMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-teal-500 focus:ring-teal-500 flex-shrink-0"
              />
              <span className="whitespace-nowrap">Notify me 1 day before</span>
            </label>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* Feedback Messages */}
            {submitError && (
              <div className="w-full sm:w-auto px-4 py-2 bg-red-500/20 border border-red-500 text-red-300 rounded-lg text-sm">
                {submitError}
              </div>
            )}
            {submitSuccess && (
              <div className="w-full sm:w-auto px-4 py-2 bg-green-500/20 border border-green-500 text-green-300 rounded-lg text-sm">
                Booking saved successfully!
              </div>
            )}
            <button className="px-4 sm:px-6 py-2 bg-slate-700/50 text-white rounded-lg hover:bg-slate-700 transition-colors w-full sm:w-auto">
              Back
            </button>
            <button
              onClick={handleSaveAndContinue}
              disabled={isSubmitting}
              className={`px-4 sm:px-6 py-2 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-slate-100"
              } text-slate-900 rounded-lg transition-colors font-medium w-full sm:w-auto`}
            >
              {isSubmitting ? "Saving..." : "Save and Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
