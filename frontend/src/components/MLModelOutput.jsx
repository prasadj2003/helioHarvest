import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherComponent = () => {
    //const [weather, setWeather] = useState({});
    const [humidity, setHumidity] = useState();
    //const [uvIndex, setUvIndex] = useState();
    const [windSpeed, setWindSpeed] = useState();
    const [month, setMonth] = useState();
    const [solarZenithAngle, setSolarZenithAngle] = useState({});
    const [error, setError] = useState(null);
    //const [city, setCity] = useState("");
    const [area, setArea] = useState("");
    const [prediction, setPrediction] = useState(null);

    useEffect(() => {
        const getLatLong = () => {
            return new Promise((resolve, reject) => {
                if (!navigator.geolocation) {
                    reject(new Error("Geolocation is not supported by this browser"));
                }
                navigator.geolocation.getCurrentPosition(
                    position => resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }),
                    error => reject(new Error("Failed to get location"))
                );
            });
        };

        const fetchWeatherData = async () => {
            try {
                const { latitude, longitude } = await getLatLong();
                const apiKey = 'your_api_key';
                const url = `https://api.tomorrow.io/v4/weather/realtime?location=${latitude},${longitude}&apikey=${apiKey}`;
                const response = await axios.get(url);
                console.log(response.data)
                setWeather(response.data);
                setHumidity(response.data.data.values.humidity);
                setUvIndex(response.data.data.values.uvIndex);
                setWindSpeed(response.data.data.values.windSpeed);
                setMonth(new Date().getMonth());
            } catch (error) {
                setError("Failed to fetch weather data");
                console.error(error);
            }
        };

        const fetchSolarZenithAngle = async () => {
            try {
                const { latitude, longitude } = await getLatLong();
                const today = new Date();
                const year = today.getUTCFullYear();
                const month = String(today.getUTCMonth() + 1).padStart(2, '0');
                const day = String(today.getUTCDate()).padStart(2, '0');

                const startTime = `${year}-${month}-${day}T00:00:00Z`;
                const endTime = `${year}-${month}-${day}T23:00:00Z`;

                const res = await axios.get(`https://api.meteomatics.com/${startTime}--${endTime}:PT1H/sun_elevation:d/${latitude},${longitude}/json`, 
                    {
                        auth: {
                            username: "your_username",
                            password: "your_password"
                        }
                    }
                );
                setSolarZenithAngle(res.data);
                console.log(res.data);
            } catch (error) {
                setError("Failed to fetch solar zenith angle");
                console.error(error);
            }
        };

        const getCity = async () => {
            const { latitude, longitude } = await getLatLong();
            const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&json`)
            const city = res.data;
            setCity(city.address.city);
        }

        fetchWeatherData();
        fetchSolarZenithAngle();
        getCity();
    }, []);

    const sendPredictionRequest = async () => {
        try {
            const response = await axios.post("http://localhost:5000/predict", {
                month: parseFloat(month),
                solarZenithAngle: parseFloat(solarZenithAngle),
                humidity: parseFloat(humidity),
                windSpeed: parseFloat(windSpeed),
                area: parseFloat(area),
            });
            setPrediction(response.data.prediction);
        } catch (error) {
            console.error("Error fetching prediction:", error);
        }
    };

    return (
        <div>
            <input 
                type="number" 
                value={area} 
                onChange={(e) => setArea(e.target.value)} 
                placeholder="Enter area in m²"
                className="w-full p-3 border rounded-md focus:ring focus:ring-indigo-300 outline-none mb-4"
            />
            <button onClick={sendPredictionRequest} className="bg-blue-600 text-xl rounded-lg text-white px-4 py-2 hover:bg-blue-800 transition">Predict</button>
            {prediction && <p className="text-xl rounded-lg text-black">Predicted Energy: {Math.round(prediction * 0.2)} kWh/day</p>}
        </div>
    );
};

export default WeatherComponent;