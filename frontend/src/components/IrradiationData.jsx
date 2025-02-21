

// import axios from "axios";
// import { useEffect, useState, useRef } from "react";
// import Chart from 'chart.js/auto';

// const IrradiationData = () => {
//     const [lat, setLat] = useState(null);
//     const [long, setLong] = useState(null);
//     const [error, setError] = useState(null);
//     const [irradiationData, setIrradiationData] = useState(null);
//     const [processedData, setProcessedData] = useState(null);
//     const [chartData, setChartData] = useState([]);
//     const chartRef = useRef(null); // Reference for chart instance
//     const chartInstance = useRef(null); // To store the Chart.js instance

//     useEffect(() => {
//         if (!navigator.geolocation) {
//             setError("Geolocation is not supported by this browser.");
//             return;
//         }
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 setLat(position.coords.latitude);
//                 setLong(position.coords.longitude);
//             },
//             (error) => setError("Error getting location: " + error.message)
//         );
//     }, []);

//     function calculateYearlyAverage(dataString) {
//         const lines = dataString.split("\r\n");
//         const yearlyData = {};

//         lines.forEach(line => {
//             const parts = line.split("\t").filter(Boolean);
//             if (parts.length === 3) {
//                 const year = parts[0].trim();
//                 const irradiation = parseFloat(parts[2]);

//                 if (!isNaN(irradiation)) {
//                     if (!yearlyData[year]) {
//                         yearlyData[year] = [];
//                     }
//                     yearlyData[year].push(irradiation);
//                 }
//             }
//         });

//         const yearlyAverages = Object.entries(yearlyData).map(([year, values]) => {
//             const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
//             return { year, avgIrradiation: avg.toFixed(2) };
//         });

//         return yearlyAverages;
//     }

//     async function fetchIrradiationData() {
//         try {
//             if (lat === null || long === null) {
//                 setError("Location not available yet. Please wait.");
//                 return;
//             }

//             const result = await axios.get(`http://localhost:3000/proxyIrradiationData?lat=${lat}&long=${long}`);
//             console.log("API response:", result.data);

//             const processed = calculateYearlyAverage(result.data);
//             setProcessedData(processed);
//             setChartData(processed);
//             setIrradiationData(result.data);
//         } catch (error) {
//             console.error("Error fetching irradiation data:", error);
//             setError("Failed to fetch irradiation data. Try again later.");
//         }
//     }

//     useEffect(() => {
//         if (chartData.length === 0) return;

//         // Destroy the previous chart instance if it exists
//         if (chartInstance.current) {
//             chartInstance.current.destroy();
//         }

//         const ctx = chartRef.current.getContext("2d");
//         chartInstance.current = new Chart(ctx, {
//             type: "bar",
//             data: {
//                 labels: chartData.map((row) => row.year),
//                 datasets: [
//                     {
//                         label: "Avg Irradiation per Year (kWh/m2/mo)",
//                         data: chartData.map((row) => row.avgIrradiation),
//                         backgroundColor: "rgba(255, 165, 0, 0.6)",
//                         borderColor: "rgb(205, 127, 50)",
//                         borderWidth: 2,
//                         hoverBackgroundColor: "rgba(255, 69, 0, 0.8)",
//                     },
//                 ],
//             },
//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                     legend: {
//                         labels: {
//                             color: "black",
//                             font: {
//                                 size: 14,
//                             },
//                         },
//                     },
//                 },
//                 scales: {
//                     x: {
//                         ticks: {
//                             color: "black",
//                         },
//                         grid: {
//                             color: "rgba(255, 255, 255, 0.2)",
//                         },
//                     },
//                     y: {
//                         ticks: {
//                             color: "black",
//                         },
//                         grid: {
//                             color: "rgba(255, 255, 255, 0.2)",
//                         },
//                     },
//                 },
//             },
//         });

//     }, [chartData]);

//     return (
//         <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-lg p-6 shadow-lg w-96 flex flex-col items-center space-y-6">
//             <button
//                 className="bg-blue-600 text-xl rounded-lg text-white px-4 py-2 hover:bg-blue-800 transition"
//                 onClick={fetchIrradiationData}
//                 disabled={lat === null || long === null}
//             >
//                 Get Irradiation Data
//             </button>

//             {error && <p className="text-red-400">{error}</p>}

//             {/**If the code below is uncommented we can see the data in table fomat/ }

//             {/* {processedData && (
//                 <div className="w-full mt-4 overflow-x-auto">
//                     <table className="w-full border-collapse border border-gray-700 rounded-lg shadow-lg">
//                         <thead className="bg-blue-700 text-white">
//                             <tr>
//                                 <th className="px-4 py-2 border border-gray-600">Year</th>
//                                 <th className="px-4 py-2 border border-gray-600">Avg Irradiation (kWh/m2/mo)</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {processedData.map((item, index) => (
//                                 <tr key={index} className="text-center bg-gray-800 text-white odd:bg-gray-900 even:bg-gray-800">
//                                     <td className="px-4 py-2 border border-gray-600">{item.year}</td>
//                                     <td className="px-4 py-2 border border-gray-600">{item.avgIrradiation}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )} */}
//             {/*cpmment end for table format*/}
//             {/* Chart Canvas */}
//             <div className="w-full h-64">
//                 <canvas ref={chartRef}></canvas>
//             </div>
//         </div>
//     );
// };

// export default IrradiationData;
//v2code:
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Chart from 'chart.js/auto';

const IrradiationData = ({ lat, long }) => {
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState([]);
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (!lat || !long) return;

        async function fetchIrradiationData() {
            try {
                const result = await axios.get(`http://localhost:3000/proxyIrradiationData?lat=${lat}&long=${long}`);
                console.log("API response:", result.data);
                
                const processed = calculateYearlyAverage(result.data);
                setChartData(processed);
            } catch (error) {
                console.error("Error fetching irradiation data:", error);
                setError("Failed to fetch irradiation data. Try again later.");
            }
        }

        fetchIrradiationData();
    }, [lat, long]);

    function calculateYearlyAverage(dataString) {
        const lines = dataString.split("\r\n");
        const yearlyData = {};

        lines.forEach(line => {
            const parts = line.split("\t").filter(Boolean);
            if (parts.length === 3) {
                const year = parts[0].trim();
                const irradiation = parseFloat(parts[2]);

                if (!isNaN(irradiation)) {
                    if (!yearlyData[year]) {
                        yearlyData[year] = [];
                    }
                    yearlyData[year].push(irradiation);
                }
            }
        });

        let processedData = Object.entries(yearlyData).map(([year, values]) => ({
            year,
            avgIrradiation: values.reduce((sum, val) => sum + val, 0) / values.length
        }));

        // **Dynamic Scaling to Enhance Small Differences**
        const minIrradiation = Math.min(...processedData.map(d => d.avgIrradiation));
        const maxIrradiation = Math.max(...processedData.map(d => d.avgIrradiation));
        const range = maxIrradiation - minIrradiation;

        if (range > 0 && range < 10) {  
            processedData = processedData.map(d => ({
                ...d,
                avgIrradiation: ((d.avgIrradiation - minIrradiation) / range) * 50 + minIrradiation 
            }));
        }

        return processedData.map(d => ({
            year: d.year,
            avgIrradiation: d.avgIrradiation.toFixed(2)
        }));
    }

    useEffect(() => {
        if (chartData.length === 0) return;
        if (chartInstance.current) chartInstance.current.destroy();

        const ctx = chartRef.current.getContext("2d");
        chartInstance.current = new Chart(ctx, {
            type: "bar",
            data: {
                labels: chartData.map(row => row.year),
                datasets: [{
                    label: "Avg Irradiation per Year (kWh/m²)",
                    data: chartData.map(row => row.avgIrradiation),
                    backgroundColor: "rgba(255, 165, 0, 0.6)",
                    borderColor: "rgb(205, 127, 50)",
                    borderWidth: 2,
                    hoverBackgroundColor: "rgba(255, 69, 0, 0.8)",
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { grid: { color: "rgba(255, 255, 255, 0.2)" } },
                    y: { 
                        grid: { color: "rgba(255, 255, 255, 0.2)" },
                        beginAtZero: false,
                        ticks: { stepSize: 5 } // Ensures proper scale visibility
                    }
                }
            }
        });
    }, [chartData]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Solar Irradiation Data</h3>
            {error && <p className="text-red-400">{error}</p>}
            <div className="w-full h-64">
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
};

export default IrradiationData;
