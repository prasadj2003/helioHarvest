const express = require("express");
const cors = require("cors");
const ort = require("onnxruntime-node");

const app = express();
app.use(cors());
app.use(express.json());

async function predictSolarEnergy(month, solarZenithAngle, humidity, windSpeed, area) {
  try {
    const session = await ort.InferenceSession.create("model_xg.onnx");

    const inputTensor = new ort.Tensor(
      "float32",
      new Float32Array([month, solarZenithAngle, humidity, windSpeed]),
      [1, 4]
    );

    const results = await session.run({ input: inputTensor });

    const predictedEnergyPerUnit = results["variable"].data[0];

    const usableArea = area * 0.7;
    const totalEnergy = predictedEnergyPerUnit * usableArea * 0.8;

    return totalEnergy.toFixed(2);
  } catch (error) {
    console.error("Error running ONNX model:", error);
    return null;
  }
}

// API Endpoint
app.post("/predict", async (req, res) => {
  const { month, solarZenithAngle, humidity, windSpeed, area } = req.body;
  
  const prediction = await predictSolarEnergy(month, solarZenithAngle, humidity, windSpeed, area);
  
  if (prediction) {
    res.json({ prediction });
  } else {
    res.status(500).json({ error: "Model inference failed" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});