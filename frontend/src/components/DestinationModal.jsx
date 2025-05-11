import { useEffect, useState } from "react";

export default function DestinationModal({ destination, onClose }) {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8080/api/travel?city=${destination.location_name}`)
            .then((res) => res.json())
            .then((data) => {
                setWeather(data);
            })
            .catch((err) => console.error("Failed to fetch travel info", err));
    }, [destination.location_name]);

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div onClick={handleBackgroundClick} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white w-full h-full max-w-5xl mx-auto rounded-lg p-6 shadow-lg overflow-y-auto max-h-[90vh]">
                <img src={destination.image_url} alt={destination.location_name} className="w-full h-[50%] object-cover rounded mb-4" />

                <h2 className="text-3xl font-bold mb-2 text-center">{destination.location_name}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">{destination.description}</p>

                <div className="border-t text-center border-gray-700 pt-4">
                    {weather ? (
                        <>
                            <div className="flex items-center justify-center">
                                {weather.icon && (
                                    <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.weather} className="w-12 h-12" />
                                )}
                                <p className="capitalize">{weather.weather}</p>
                            </div>
                            <p className="mb-1">
                                Temperature: {weather.temperature}°C (feels like {weather.feels_like}°C)
                            </p>
                            <p className="mb-1">Humidity: {weather.humidity}%</p>
                            <p className="mb-1">Wind Speed: {weather.wind_speed} m/s</p>
                            <p className="mb-1">Sunrise: {new Date(weather.sunrise * 1000).toLocaleTimeString()}</p>
                            <p className="mb-2">Sunset: {new Date(weather.sunset * 1000).toLocaleTimeString()}</p>
                        </>
                    ) : (
                        <p>Loading weather data...</p>
                    )}
                </div>
            </div>
        </div>
    );
}
