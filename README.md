# helioHarvest

## 🌞 Harnessing Solar Potential with helioHarvest

helioHarvest is an innovative application designed to analyze solar potential using geospatial data and advanced mapping technologies. By leveraging real-time weather data and interactive mapping tools, helioHarvest provides accurate insights into solar energy feasibility for a given area.

## 🚀 Features

* **📍 Real-Time Geolocation**: Automatically fetches the user's location to provide localized solar data.
* **📐 Interactive Polygon Drawing**: Users can draw areas on the map to calculate solar potential.
* **🌍 Mapbox Integration**: Provides satellite imagery and interactive tools for precise mapping.
* **🌦️ Weather & Irradiation Data**: Retrieves real-time weather and solar irradiation data for better analysis.
* **📊 Visual Analytics**: Displays solar potential in an easy-to-understand graphical format.

## 🛠️ Tools & Technologies Used

### **Frontend**
* React.js
* Tailwind CSS
* Mapbox GL
* @mapbox/mapbox-gl-draw
* Turf.js
* Axios
* Chart.js
* React Router

### **Backend**
* Node.js
* Express.js
* Axios
* CORS

## 📖 How It Works

1. The user allows location access or manually inputs coordinates.
2. The application fetches the current location and overlays it on a satellite map.
3. Users draw polygons on the map to define an area.
4. The system calculates the solar potential using irradiation data and displays it.

## Steps to Run project on Local Machine
1. Fork the project
2. Clone the project by running `git clone https://github.com/prasadj2003/helioHarvest.git`
3. `cd frontend` 
4. configure auth params in `MLModelData.jsx` fetchSolarZenithAngle function
5. Configure auth params in `MLModelOutput.jsx` fetchSolarZenithAngle function and api key in fetchWeatherData function


View the PPT at : [google drive](https://drive.google.com/file/d/1puTaK3E6mRIFqEMdypjwY62r7aVS_Vdp/view?usp=sharing)

## 🌟 Future Scope

* **AI-based Solar Optimization**: Use AI to optimize panel placements for maximum efficiency.
* **Expanded Database**: Integration with more weather APIs for higher accuracy.
* **Mobile App Development**: Extend functionality to mobile devices.
* **Blockchain Integration**: Secure and track solar energy transactions.

## 📜 License

MIT License

## 📩 Contact

For any queries or collaborations, feel free to reach out!

---

🌍 *helioHarvest - Pioneering the Future of Solar Energy*