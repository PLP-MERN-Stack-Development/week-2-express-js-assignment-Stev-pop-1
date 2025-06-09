// API key auth middleware

// const API_KEY = "12345"; // I'd like to learn how to store it securely (e.g., in .env file)

const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const validApiKey = process.env.API_KEY || "12345"; // Fallback if env not set
  if (apiKey !== validApiKey) {
    return res.status(403).json({ error: "Unauthorized - Invalid API Key" });
  }
  next();
};

module.exports = authenticate;
