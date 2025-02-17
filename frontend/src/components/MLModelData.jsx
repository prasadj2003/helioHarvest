import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherComponent = () => {
    const [weather, setWeather] = useState({});
    const [humidity, setHumidity] = useState();
    const [uvIndex, setUvIndex] = useState();
    const [windSpeed, setWindSpeed] = useState();
    const [month, setMonth] = useState();
    const [solarZenithAngle, setSolarZenithAngle] = useState({});
    const [error, setError] = useState(null);

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
                const apiKey = 'bBciv2jGaNAVtnFoncviPAcRrEseL5W2';
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
                            username: "student_joshi_prasad",
                            password: "6a4A2dQ3Bj"
                        }
                    }
                );
                // const res = await axios.get(`https://api.meteomatics.com/2025-02-17T00:00:00Z/t_2m:C/52.520551,13.461804/json`)
                setSolarZenithAngle(res.data);
                console.log(res.data);
            } catch (error) {
                setError("Failed to fetch solar zenith angle");
                console.error(error);
            }
        };

        fetchWeatherData();
        fetchSolarZenithAngle();
    }, []);

    return (
        <div>
            <h1>Weather Information</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>Humidity: {humidity}</p>
            <p>UV Index: {uvIndex}</p>
            <p>Wind Speed: {windSpeed}</p>
            <p>Month: {month}</p>
            <h2>Solar Zenith Angle</h2>
            <pre>{JSON.stringify(solarZenithAngle, null, 2)}</pre>
        </div>
    );
};

export default WeatherComponent;
