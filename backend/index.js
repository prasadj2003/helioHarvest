const express = require('express');
const app = express()
const axios = require('axios')
const cors = require('cors')

app.use(cors())
app.use(express.json())


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

app.post('/filterData', (req, res) => {
    console.log("Received Data:", req.body);
    res.json({ message: "Data received", data: req.body }); // Send response
})



app.listen(3000, () => {
    console.log("app listening on port 3000")
})