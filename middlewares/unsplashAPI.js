const axios = require("axios");

// Unsplash API setup
const UNSPLASH_API_URL = process.env.UNSPLASH_API_URL || "https://api.unsplash.com/photos/random";
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

// Middleware to fetch random image from Unsplash for completed jobs
exports.fetchUnSplashImage = async () => {
  try {
    const response = await axios.get(UNSPLASH_API_URL, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
      params: {
        query: "nature",
        count: 1,
      },
    });
    if (response.data && response.data.length > 0) {
      // Return the image URL
      return response.data[0].urls.small; 
    }
  } catch (error) {
    console.error("Failed to fetch image from Unsplash:", error);
    throw error;
  }
  return null;
};