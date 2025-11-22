const APP_ID = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_ID;
const baseURL = `https://script.google.com/macros/s/${APP_ID}/exec`;

// Your WhatsApp number to receive booking notifications
const ADMIN_WHATSAPP_NUMBER = "917588450990";

/**
 * Generates a WhatsApp chat URL for a customer
 * @param {string} phone - Phone number with country code (e.g., "919876543210")
 * @param {string} name - Customer name
 * @param {string} date - Booking date
 * @param {string} time - Booking time
 * @returns {string} WhatsApp URL
 */
const generateWhatsAppURL = (phone, name, date, time) => {
  // Remove any spaces, dashes, or special characters from phone number
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");

  // Create personalized message
  const message = encodeURIComponent(
    `Hello ${name}! 👋\n\n` +
      `This is a confirmation for your booking:\n` +
      `📅 Date: ${date}\n` +
      `🕒 Time: ${time}\n\n` +
      `We look forward to seeing you!`
  );

  // Return WhatsApp URL (works on both mobile and web)
  return `https://wa.me/${cleanPhone}?text=${message}`;
};

/**
 * Generates WhatsApp URL to send booking details to admin
 * @param {Object} formData - All booking form data
 * @returns {string} WhatsApp URL for admin notification
 */
export const generateAdminWhatsAppURL = (formData) => {
  const message = encodeURIComponent(
    `🔔 *New Booking Received!*\n\n` +
      `👤 *Customer Details:*\n` +
      `━━━━━━━━━━━━━━━\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: +${formData.phone}\n\n` +
      `📅 *Booking Details:*\n` +
      `━━━━━━━━━━━━━━━\n` +
      `Date: ${formData.date}\n` +
      `Time: ${formData.time}\n` +
      `Travel Mode: ${formData.travelMode || "N/A"}\n` +
      `Service: ${formData.services || "N/A"}\n\n` +
      `📝 *Notes:*\n` +
      `${formData.notes || "No additional notes"}\n\n` +
      `🔔 Notify Customer: ${formData.notifyMe ? "Yes" : "No"}\n\n` +
      `━━━━━━━━━━━━━━━\n` +
      `_Sent from Tapovan Booking System_`
  );

  return `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${message}`;
};

/**
 * Opens WhatsApp with booking details to send to admin
 * @param {Object} formData - All booking form data
 */
export const sendWhatsAppToAdmin = (formData) => {
  const url = generateAdminWhatsAppURL(formData);
  window.open(url, "_blank");
};

export const submitToGoogleSheets = async (formData) => {
  try {
    // Generate WhatsApp URL automatically
    const whatsappURL = generateWhatsAppURL(
      formData.phone,
      formData.name,
      formData.date,
      formData.time
    );

    // Format the data to match your Google Sheet columns
    const payload = {
      date: formData.date || new Date().toISOString().split("T")[0],
      time: formData.time || "",
      name: formData.name || "",
      email: formData.email || "",
      phone: formData.phone || "",
      travelMode: formData.travelMode || "",
      services: formData.services || "N/A",
      notes: formData.notes || "N/A",
      notifyMe: formData.notifyMe ? "Yes" : "No",
      whatsappURL: whatsappURL,
    };

    console.log("Sending to Google Sheets:", payload);

    // Use FormData to avoid CORS preflight
    const formDataToSend = new FormData();
    Object.keys(payload).forEach((key) => {
      formDataToSend.append(key, payload[key]);
    });

    const response = await fetch(baseURL, {
      method: "POST",
      body: formDataToSend,
    });

    const responseText = await response.text();
    console.log("Raw response:", responseText);

    const result = JSON.parse(responseText);
    console.log("Response from Google Sheets:", result);

    if (result.result === "success") {
      console.log("Successfully saved to row:", result.row);
      return { success: true, row: result.row };
    } else {
      const errorMsg =
        typeof result.error === "string"
          ? result.error
          : JSON.stringify(result.error) ||
            "Failed to save data to Google Sheets";
      console.error("Failed to save data:", errorMsg);
      return {
        success: false,
        error: errorMsg,
      };
    }
  } catch (error) {
    console.error("Error in submitToGoogleSheets:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
};
