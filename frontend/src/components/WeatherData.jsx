// import axios from "axios";
// import { useEffect, useState } from "react";

// const WeatherData = () => {
//     const [weather, setWeather] = useState(null);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const getLatLong = async () => {
//             try {
//                 if (!navigator.geolocation) {
//                     throw new Error("Geolocation is not supported by this browser");
//                 }
//                 return new Promise((resolve, reject) => {
//                     navigator.geolocation.getCurrentPosition(
//                         position => resolve({
//                             latitude: position.coords.latitude,
//                             longitude: position.coords.longitude
//                         }),
//                         reject
//                     );
//                 });
//             } catch (error) {
//                 setError("Error getting location: " + error.message);
//                 throw error;
//             }
//         };

//         const fetchWeatherData = async () => {
//             try {
//                 const { latitude, longitude } = await getLatLong();
//                 const apiKey = 'bBciv2jGaNAVtnFoncviPAcRrEseL5W2';
//                 const url = `https://api.tomorrow.io/v4/weather/realtime?location=${latitude},${longitude}&apikey=${apiKey}`;
//                 const response = await axios.get(url);
//                 console.log(response.data)
//                 setWeather(response.data);
//             } catch (error) {
//                 setError("Failed to fetch weather data");
//                 console.error(error);
//             }
//         };

//         fetchWeatherData();
//     }, []);

//     return (
//         <div className="bg-white rounded-lg p-4 shadow-md h-64">
//             {error ? (
//                 <p className="text-red-500">{error}</p>
//             ) : weather ? (
//                 <div>
//                     <h2 className="text-lg font-bold">Weather Data</h2>
//                     <p><strong>Temperature:</strong> {weather.data.values.temperature}°C</p>
//                     <p><strong>Humidity:</strong> {weather.data.values.humidity}%</p>
//                     <p><strong>Cloud cover:</strong> {weather.data.values.cloudCover} okta</p>
//                     <p><strong>UV Index: </strong>{weather.data.values.uvIndex}</p>
//                 </div>
//             ) : (
//                 <p>Loading weather data...</p>
//             )}
//         </div>
//     );
// };

// export default WeatherData;

import axios from "axios";
import { useEffect, useState } from "react";
import { WiDaySunny, WiCloud, WiHumidity, WiThermometer, WiStrongWind } from "react-icons/wi";

const WeatherData = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getLatLong = async () => {
            try {
                if (!navigator.geolocation) {
                    throw new Error("Geolocation is not supported by this browser");
                }
                return new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(
                        position => resolve({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }),
                        reject
                    );
                });
            } catch (error) {
                setError("Error getting location: " + error.message);
                throw error;
            }
        };

        const fetchWeatherData = async () => {
            try {
                const { latitude, longitude } = await getLatLong();
                const apiKey = 'bBciv2jGaNAVtnFoncviPAcRrEseL5W2';
                const url = `https://api.tomorrow.io/v4/weather/realtime?location=${latitude},${longitude}&apikey=${apiKey}`;
                const response = await axios.get(url);
                console.log(response.data)
                setWeather(response.data);
            } catch (error) {
                setError("Failed to fetch weather data");
                console.error(error);
            }
        };

        fetchWeatherData();
    }, []);

    return (
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg p-6 shadow-lg w-80 flex flex-col items-center">
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : weather ? (
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold mb-2">Weather Data</h2>
                    <div className="flex items-center text-4xl mb-2">
                        <WiDaySunny />
                        <span className="ml-2 font-semibold">{weather.data.values.temperature}°C</span>
                    </div>
                    <div className="flex items-center mb-1">
                        <WiHumidity className="text-2xl mr-2" />
                        <p><strong>Humidity:</strong> {weather.data.values.humidity}%</p>
                    </div>
                    <div className="flex items-center mb-1">
                        <WiCloud className="text-2xl mr-2" />
                        <p><strong>Cloud Cover:</strong> {weather.data.values.cloudCover} okta</p>
                    </div>
                    <div className="flex items-center mb-1">
                        <WiStrongWind className="text-2xl mr-2" />
                        <p><strong>UV Index:</strong> {weather.data.values.uvIndex}</p>
                    </div>
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
};

export default WeatherData;
