// Google Apps Script Code
// Deploy this as a Web App in Google Apps Script
// File > Deploy > New deployment > Web app

function doPost(e) {
  try {
    // Get the active spreadsheet and sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Extract parameters from the POST request
    const date = e.parameter.date || "";
    const time = e.parameter.time || "";
    const name = e.parameter.name || "";
    const email = e.parameter.email || "";
    const phone = e.parameter.phone || "";
    const travelMode = e.parameter.travelMode || "";
    const services = e.parameter.services || "";
    const notes = e.parameter.notes || "";
    const notifyMe = e.parameter.notifyMe || "";
    const whatsappURL = e.parameter.whatsappURL || "";

    // Create a row with timestamp
    const timestamp = new Date();
    const row = [
      timestamp,
      date,
      time,
      name,
      email,
      phone,
      travelMode,
      services,
      notes,
      notifyMe,
      whatsappURL
    ];

    // Append the row to the sheet
    sheet.appendRow(row);

    // Get the row number that was just added
    const lastRow = sheet.getLastRow();

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({
        result: "success",
        row: lastRow,
        message: "Data saved successfully"
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({
        result: "error",
        error: error.toString(),
        message: "Failed to save data"
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify setup
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "Google Apps Script is running",
      message: "Use POST request to submit data"
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

/* DEPLOYMENT INSTRUCTIONS:
 *
 * 1. Open Google Sheets and create a new spreadsheet
 * 2. Add headers in the first row:
 *    Timestamp | Date | Time | Name | Email | Phone | Travel Mode | Services | Notes | Notify Me | WhatsApp Chat
 *
 * 3. Click Extensions > Apps Script
 * 4. Delete any existing code and paste this code
 * 5. Click "Deploy" > "New deployment"
 * 6. Click "Select type" > "Web app"
 * 7. Settings:
 *    - Description: "Booking Form Submission"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (important!)
 * 8. Click "Deploy"
 * 9. Copy the deployment ID from the URL
 * 10. Paste it in your .env file as VITE_GOOGLE_APPS_SCRIPT_ID
 *
 * The deployment ID is the part between /s/ and /exec in the URL:
 * https://script.google.com/macros/s/YOUR_ID_HERE/exec
 *
 * NOTE: The WhatsApp Chat column will contain clickable links that open WhatsApp
 * with a pre-filled message for the customer. Simply click the URL in Google Sheets
 * to start a WhatsApp conversation!
 */
