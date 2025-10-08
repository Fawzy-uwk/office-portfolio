export async function POST(request) {
  try {
    // Validate environment variable
    const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz9Tw18KweLPLVg8HPCC3Uar_D5fwQdPAWrla3tZ6_-I5m2JW-XXZN3IDXp7eIFmiGHEQ/exec";
    if (!GOOGLE_APPS_SCRIPT_URL) {
      throw new Error("GOOGLE_APPS_SCRIPT_URL is not defined in environment variables");
    }

    // Parse the incoming JSON body
    let formData;
    try {
      formData = await request.json();
    } catch (error) {
      throw new Error("Invalid JSON body: " + error.message);
    }

    // Validate formData
    if (!formData.fullName || !formData.email || !formData.phone || !formData.notes || !formData.date) {
      throw new Error("Missing required form fields");
    }

    // Forward the request to Google Apps Script
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // Parse the Google Apps Script response
    const result = await response.json();

    // Check if Google Apps Script returned an error
    if (!response.ok) {
      throw new Error(result.message || "Google Apps Script request failed");
    }

    // Return success response
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Log the error for debugging
    console.error("API Error:", error.message);

    // Return detailed error response
    return new Response(
      JSON.stringify({ status: "error", message: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}