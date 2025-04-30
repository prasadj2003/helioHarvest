const express = require('express');
const app = express()
const axios = require('axios')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

const solarSystemLossFactor = {
    January: 0.175, //(Lower temperatures, some dust accumulation)
    February: 0.16, //(Moderate conditions)
    March: 0.15, //(Higher solar radiation, mild temperature rise)
    April: 0.175, //(Higher temperatures, increased panel heating losses)
    May: 0.215, //(Peak summer, efficiency drops due to heat)
    June: 0.25, //(Maximum temperature, potential dust accumulation)
    July: 0.215, //(Rainfall may reduce dust but humidity affects performance)
    August: 0.20, //(Similar to July, potential cloud cover reduces output)
    September: 0.175, //(Better efficiency as temperatures cool down)
    October: 0.16, //(Moderate temperatures, improved efficiency)
    November: 0.15, // (Cooler weather, lower heat losses)
    December: 0.175 //(Shorter days, lower temperatures, moderate dust impact)
};

const monthlyAverageSolarIrradiation = {
    "January": 214.45,
    "February": 204.02,
    "March": 219.63,
    "April": 201.13,
    "May": 188.02,
    "June": 123.41,
    "July": 102.59,
    "August": 109.55,
    "September": 130.83,
    "October": 177.71,
    "November": 185.09,
    "December": 203.88
};

let solarPotential = 0;

// Proxy endpoint to fetch irradiation data
app.get("/proxyIrradiationData", async (req, res) => {
    try {
        const { lat, long } = req.query;

        if (!lat || !long) {
            return res.status(400).json({ error: "Latitude and longitude are required" });
        }

        const result = await axios.get(
            `https://re.jrc.ec.europa.eu/api/MRcalc?lat=${lat}&lon=${long}&optrad=1`
        );

        res.json(result.data);
    } catch (error) {
        console.error("Error fetching irradiation data:", error);
        res.status(500).json({ error: "Failed to fetch irradiation data" });
    }
});


app.get('/calculatePotential', async (req, res) => {
    try {
        const {area} = req.query // this is a string
        const numericalArea = parseFloat(area)
        const date = new Date()
        const lossFactor = solarSystemLossFactor[monthNames[date.getMonth()]]
        const efficiency = 0.2 // considering 20% as an average
        const G_avg = monthlyAverageSolarIrradiation[monthNames[date.getMonth()]]

        solarPotential = ((0.7 * numericalArea) * efficiency * G_avg) * (1-lossFactor) * efficiency
        console.log("solar potential is: " + solarPotential.toFixed(2))
        roundedSolarPotential = solarPotential.toFixed(2)
        res.json(roundedSolarPotential)
    } catch (error) {
        console.log("error calculating solarPotential: ", error)
        res.status(500).json({error: "error calculation solar potential"})
    }
})



app.post('/filterData', (req, res) => {
    console.log("Received Data:", req.body);
    res.json({ message: "Data received", data: req.body }); // Send response
})



app.listen(3000, () => {
    console.log("app listening on port 3000")
})