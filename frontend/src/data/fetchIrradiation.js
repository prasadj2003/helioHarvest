import axios from "axios"
import { useState, useEffect } from "react";

async function fetchIrradiationData() {

    


    const res = await axios.get("https://re.jrc.ec.europa.eu/api/MRcalc?lat=45&lon=8&optrad=1")
    console.log(res.data)
}

fetchIrradiationData();