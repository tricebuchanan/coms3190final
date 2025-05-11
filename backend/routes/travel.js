const express = require("express");
const router = express.Router();

const WEATHER_API_KEY = "d37fb593f5460b5114a3e4abff02a807";

router.get("/", async (req, res) => {
    const cityAliases = {
        "The Grand Canyon": "Grand Canyon Village",
        Maui: "Kahului",
    };

    const city = req.query.city;
    const safeCity = cityAliases[city] || city;

    if (!city) return res.status(400).json({ error: "City is required" });

    try {
        const weatherRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(safeCity)}&units=metric&appid=${WEATHER_API_KEY}`
        );

        const weatherData = await weatherRes.json();

        res.json({
            weather: weatherData.weather?.[0]?.description || "Unknown",
            icon: weatherData.weather?.[0]?.icon || null,
            temperature: weatherData.main?.temp,
            feels_like: weatherData.main?.feels_like,
            humidity: weatherData.main?.humidity,
            wind_speed: weatherData.wind?.speed,
            sunrise: weatherData.sys?.sunrise,
            sunset: weatherData.sys?.sunset,
        });
    } catch (err) {
        console.error("Travel API error:", err);
        res.status(500).json({ error: "Failed to fetch travel info" });
    }
});

module.exports = router;
