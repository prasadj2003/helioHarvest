// import axios from "axios"
// import { useState, useEffect } from "react";

// async function fetchData() {
//     const [weather, setWeather] = useState({});
//     const [humidity, setHumidity] = useState();
//     const [uvIndex, setUvIndex] = useState();
//     const [windSpeed, setWindSpeed] = useState();
//     const [month, setMonth] = useState();
//     const [solarZenithAngle, setSolarZenithAngle] = useState({})

//     const date = new Date();
    

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

//         // You can get access to weatherData by weather state variable
//         const fetchWeatherData = async () => {
//             try {
//                 const { latitude, longitude } = await getLatLong();
//                 const apiKey = 'your_api_key';
//                 const url = `https://api.tomorrow.io/v4/weather/realtime?location=${latitude},${longitude}&apikey=${apiKey}`;
//                 const response = await axios.get(url);
//                 console.log(response.data)
//                 setWeather(response.data);
//                 setHumidity(response.data.data.values.humidity)
//                 setUvIndex(response.data.data.values.uvIndex)
//                 setWindSpeed(response.data.data.values.windSpeed)
//                 setMonth(date.getMonth())
//             } catch (error) {
//                 setError("Failed to fetch weather data");
//                 console.error(error);
//             }
//         };

//         fetchWeatherData();

//         const fetchSolarZenithAngle = async () => {
//             const today = new Date();
//             const year = today.getUTCFullYear();
//             const month = String(today.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
//             const day = String(today.getUTCDate()).padStart(2, '0');

//             const startTime = `${year}-${month}-${day}T00:00:00Z`;
//             const endTime = `${year}-${month}-${day}T23:00:00Z`;


//             const res = await axios.get(`https://api.meteomatics.com/${startTime}--${endTime}:PT1H/sun_elevation:d/${latitude},${longitude}/json`)
//             setSolarZenithAngle(res.data)
//             console.log(solarZenithAngle)
//         }

//         fetchSolarZenithAngle()
//     }, []);
// }

// export default {fetchData}