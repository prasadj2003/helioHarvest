// import React, { useEffect, useRef, useState } from 'react';
// import mapboxgl from 'mapbox-gl';
// import MapboxDraw from '@mapbox/mapbox-gl-draw';
// import * as turf from '@turf/turf'
// import Sidebar from './Sidebar';
// import WeatherData from './WeatherData';

// import 'mapbox-gl/dist/mapbox-gl.css';
// import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

// const MapboxExample = () => {
//   const mapContainerRef = useRef(null);
//   const [lat, setLat] = useState(null);
//   const [long, setLong] = useState(null);
//   const [roundedArea, setRoundedArea] = useState();

//   // Get user location using Geolocation API
//   useEffect(() => {
//     if (!navigator.geolocation) {
//       alert('Geolocation is not supported by your browser.');
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setLat(latitude);
//         setLong(longitude);
//       },
//       (error) => {
//         alert('Unable to retrieve your location. Please allow location access.');
//         console.error(error);
//       }
//     );
//   }, []);


//   useEffect(() => {
//     if (lat === null || long === null) return;

//     mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2YTcwMzg4IiwiYSI6ImNtNjYybnRudTB2bTQybHF2azNjYm90emoifQ.MvLlGsaPsUBC8wmvg_t7gQ';

//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: 'mapbox://styles/mapbox/satellite-v9',
//       projection: 'globe',
//       center: [long, lat],
//       zoom: 18,
//     });

//     // Add fog effect
//     map.on('style.load', () => {
//       map.setFog({});
//     });

//     // Add a marker at the user's location
//     new mapboxgl.Marker()
//       .setLngLat([long, lat])
//       .addTo(map);

//     // Add drawing controls to the map
//     const draw = new MapboxDraw({
//       displayControlsDefault: false,
//       controls: {
//         polygon: true,
//         trash: true,
//       },
//       defaultMode: 'draw_polygon',
//     });
//     map.addControl(draw);

//     // Handle draw events
//     function updateArea(e) {
//       const data = draw.getAll();
//       if (data.features.length > 0) {
//         const area = turf.area(data); // Calculate the polygon area
//         setRoundedArea(Math.round(area * 100) / 100); // Round the area
//       } else {
//         setRoundedArea(null);
//         if (e.type !== 'draw.delete') alert('Click the map to draw a polygon.');
//       }
//     }

//     map.on('draw.create', updateArea);
//     map.on('draw.delete', updateArea);
//     map.on('draw.update', updateArea);

//     // Clean up on component unmount
//     return () => {
//       map.remove();
//     };
//   }, [lat, long]);

//   // useEffect(() => {
//   //   if(lat === null || long === null) return;
//   //   const marker = new mapboxgl.Marker().setLngLat([long, lat]).addTo(map)
//   // }, [lat, long])



//   return (
//     <div className='flex flex-row'>
//       <div>
//         <Sidebar />

//         <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
//           <span class="sr-only">Open sidebar</span>
//           <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//             <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
//           </svg>
//         </button>

//       </div>

//       <div>

//         <div style={{ height: '100vh', width: '100vw' }}>
//           {lat === null || long === null ? (
//             <div role="status" className='flex items-center justify-center h-screen'>
//               <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
//                 <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
//               </svg>
//               <span class="sr-only">Loading...</span>
//             </div>
//           ) : (
//             <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }}>

//             </div>
//           )}
//           <div
//             id="calculatedArea"
//             className="z-1 absolute top-4 right-40 bg-white text-black shadow-2xl rounded-xl p-6 border border-gray-300 transition-transform transform hover:scale-105"
//           >

//             {roundedArea && (

//               <>

//                 <p className="z-1 text-2xl font-bold text-indigo-600">
//                   {roundedArea}
//                 </p>
//                 <p className="text-md text-gray-500">square meters</p>

//               </>
//             )}
//           </div>

//         </div>

//       </div>

//     </div>

//   );
// };

// export default MapboxExample;

// ------------------------------------------------------------Original code----------------------------------------------------------------------------------


import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as turf from '@turf/turf'
import Sidebar from './Sidebar';
import WeatherData from './WeatherData';
import IrradiationData from './IrradiationData';
import MLModelOutput from './MLModelOutput'

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import axios from 'axios';

const MapboxExample = () => {
  const mapContainerRef = useRef(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [roundedArea, setRoundedArea] = useState();
  const [solarPotential, setSolarPotential] = useState(null);
  const [loading, setLoading] = useState(true);
  const [irradiationData, setIrradiationData] = useState(null);
  const [modelOutput, setModelOutput] = useState(null)

  // Get user location using Geolocation API
  useEffect(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLat(latitude);
        setLong(longitude);
      },
      (error) => {
        alert('Unable to retrieve your location. Please allow location access.');
        console.error(error);
      }
    );
  }, []);

  // map creation and positioning of pointer
  useEffect(() => {
    if (lat === null || long === null) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2YTcwMzg4IiwiYSI6ImNtNjYybnRudTB2bTQybHF2azNjYm90emoifQ.MvLlGsaPsUBC8wmvg_t7gQ';

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      projection: 'globe',
      center: [long, lat],
      zoom: 18,
    });

    // Add fog effect
    map.on('style.load', () => {
      map.setFog({});
    });

    // Add a marker at the user's location
    new mapboxgl.Marker()
      .setLngLat([long, lat])
      .addTo(map);

    // Add drawing controls to the map
    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
      defaultMode: 'draw_polygon',
    });
    map.addControl(draw);

    // Handle draw events
    async function updateArea(e) {
      const data = draw.getAll();
      if (data.features.length > 0) {
        const area = turf.area(data);
        setRoundedArea(Math.round(area * 100) / 100);
        // send area to the backend as well
        const areaToSend = (Math.round(area*100) / 100)
        const res = await axios.get(`http://localhost:3000/calculatePotential?area=${areaToSend}`) // this is undefined
        // const res = await axios.get(`http://localhost:3000/calculatePotential?area=112.5`)
        setSolarPotential(res.data)
      } else {
        setRoundedArea(null);
        if (e.type !== 'draw.delete') alert('Click the map to draw a polygon.');
      }
    }

    map.on('draw.create', updateArea);
    map.on('draw.delete', updateArea);
    map.on('draw.update', updateArea);

    return () => {
      map.remove();
    };
  }, [lat, long]);



  // `https://re.jrc.ec.europa.eu/api/MRcalc?lat=${lat}&lon=${long}&optrad=1`
  // fetching the irradiation data. We need to send it to the backend for calculation



  // sending data to the /getLatLong endpoint
  // Send coordinates to backend
  // const sendLatLongData = async () => {
  //   try {
  //     if (!lat || !long) {
  //       setError('Please provide both latitude and longitude');
  //       return;
  //     }

  //     const latLongArr = [lat, long];
  //     await axios.post('http://localhost:3000/getLatLong', latLongArr);

  //     // After sending coordinates, fetch irradiation data
  //     const irradiationResponse = await axios.get('http://localhost:3000/getIrradiationData');
  //     setIrradiationData(irradiationResponse.data);
  //   } catch (error) {
  //     console.error('Error:', error);

  //   }
  // };

  return (
    // <div className='flex flex-row'>
    //   <div>
    //     <Sidebar />
    //     <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
    //       <span className="sr-only">Open sidebar</span>
    //       <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    //         <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
    //       </svg>
    //     </button>
    //   </div>

    //   <div>
    //     <div style={{ position: 'relative', width: '100%' }} className='overflow-x-hidden'>
    //       {lat === null || long === null ? (
    //         <div role="status" className='flex items-center justify-center h-screen'>
    //           <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    //             <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
    //             <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
    //           </svg>
    //           <span className="sr-only">Loading...</span>
    //         </div>
    //       ) : (
    //         <div ref={mapContainerRef} style={{ height: '100vh', width: '100vw' }} />
    //       )}

    //       {/* Area Display */}
    //       {roundedArea && (
    //         <div className="absolute top-20 right-5 bg-white text-black shadow-2xl rounded-xl p-6 border border-gray-300 transition-transform transform hover:scale-105 z-10">
    //           <p className="text-2xl font-bold text-indigo-600">
    //             {roundedArea}
    //           </p>
    //           <p className="text-md text-gray-500">square meters</p>
    //         </div>
    //       )}

    //       {/* Weather Data */}

    //       {lat !== null && long !== null && (
            

    //         <div className="absolute top-48 right-[16px] flex flex-col space-y-4 w-64 z-10">
    //           <div className="flex flex-col space-y-4 items-end">
    //             {/* Weather Data */}
    //             <div className="shadow-2xl rounded-xl transition-transform transform hover:scale-105">
    //               <WeatherData />
    //             </div>

    //             {/* Irradiation Data */}
    //             <div className="shadow-2xl rounded-xl transition-transform transform hover:scale-105">
    //               <p>solar potential is: {solarPotential} kWh</p>
    //               <IrradiationData />
    //             </div>

    //             <div className="shadow-2xl rounded-xl transition-transform transform hover:scale-105">
    //               <MLModelOutput />
    //             </div>
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>

<div className="flex flex-row min-h-screen bg-gray-100">
  {/* Sidebar Section - Collapsible on mobile */}
  <div className="w-64 bg-white shadow-lg hidden sm:block transition-all duration-300">
    <Sidebar />
  </div>

  {/* Mobile Sidebar Toggle */}
  <button
    data-drawer-target="logo-sidebar"
    data-drawer-toggle="logo-sidebar"
    aria-controls="logo-sidebar"
    type="button"
    className="fixed top-4 left-4 z-50 inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 bg-white shadow-md"
  >
    <span className="sr-only">Open sidebar</span>
    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
    </svg>
  </button>

  {/* Main Content Section */}
  <div className="flex-1 flex flex-col p-4 md:p-6 lg:p-8 overflow-auto">
    <h1 className="text-2xl font-bold text-gray-800 mb-6 hidden sm:block">Dashboard</h1>

    {/* Map Container */}
    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl"
      style={{ height: '75vh' }}>
      {lat === null || long === null ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <svg
              aria-hidden="true"
              className="w-12 h-12 mx-auto text-gray-300 animate-spin dark:text-gray-600 fill-indigo-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <p className="mt-3 text-gray-500">Loading map data...</p>
          </div>
        </div>
      ) : (
        <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />
      )}
    </div>

    {/* Data Display */}
    {lat !== null && long !== null && (
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Area Card */}
        {roundedArea && (
          <div className="bg-white shadow-lg rounded-xl p-6 text-center border border-gray-200 transition-all duration-300 hover:shadow-xl flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Area</h3>
            <p className="text-3xl font-bold text-indigo-600">{roundedArea}</p>
            <p className="text-md text-gray-500 mt-2">Square Meters</p>
          </div>
        )}

        {/* Weather Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Weather Conditions</h3>
          <WeatherData />
        </div>

        {/* Solar Potential Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Solar Potential</h3>
          <p className="text-2xl font-bold text-green-600 mb-4">{solarPotential} kWh</p>
          <IrradiationData />
        </div>

        {/* ML Model Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 transition-all duration-300 hover:shadow-xl">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Model Prediction</h3>
          <div className="flex flex-col items-center">
            <MLModelOutput />
          </div>
        </div>
      </div>
    )}
  </div>
</div>


  );
};

export default MapboxExample;

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
