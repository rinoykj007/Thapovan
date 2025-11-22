import emailjs from '@emailjs/browser';

// EmailJS Configuration - Replace these with your actual keys from emailjs.com
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';

// Template for booking confirmation
const EMAILJS_BOOKING_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_BOOKING_TEMPLATE_ID || 'your_booking_template_id';

/**
 * Initialize EmailJS with your public key
 */
export const initEmailJS = () => {
  emailjs.init(EMAILJS_PUBLIC_KEY);
};

/**
 * Send contact form email to admin
 * @param {Object} formData - Contact form data
 * @returns {Promise} - EmailJS response
 */
export const sendContactEmail = async (formData) => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || 'Not provided',
      subject: formData.subject,
      message: formData.message,
      to_email: 'your-email@example.com', // Replace with your email
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('Email sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error: error.message || 'Failed to send email' };
  }
};

/**
 * Send booking confirmation email to admin
 * @param {Object} bookingData - Booking form data
 * @returns {Promise} - EmailJS response
 */
export const sendBookingEmail = async (bookingData) => {
  try {
    const templateParams = {
      // Customer details
      customer_name: bookingData.name,
      customer_email: bookingData.email,
      customer_phone: bookingData.phone || 'Not provided',

      // Booking details
      booking_date: bookingData.date,
      booking_time: bookingData.time,
      travel_mode: bookingData.travelMode || 'Not specified',
      service: bookingData.services || 'Not specified',
      notes: bookingData.notes || 'No additional notes',
      notify_customer: bookingData.notifyMe ? 'Yes' : 'No',

      // Admin email
      to_email: 'your-email@example.com', // Replace with your email
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_BOOKING_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log('Booking email sent successfully:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Failed to send booking email:', error);
    return { success: false, error: error.message || 'Failed to send email' };
  }
};
