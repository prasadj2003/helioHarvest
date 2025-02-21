const ort = require('onnxruntime-node');

async function predictSolarEnergy(
  month,
  solarZenithAngle,
  humidity,
  windSpeed,
  area
) {
  try {
    // Load the ONNX model
    const session = await ort.InferenceSession.create('model_xg.onnx');

    // Model input and output names (check them if needed)
    const inputName = 'input'; // Ensure it matches your model
    const outputName = 'variable'; // Ensure it matches your model

    // Convert input values to Float32Array
    const inputTensor = new ort.Tensor(
      'float32',
      new Float32Array([month, solarZenithAngle, humidity, windSpeed]),
      [1, 4]
    );

    // Run the model
    const results = await session.run({ [inputName]: inputTensor });

    // Extract predicted energy per unit area
    const predictedEnergyPerUnit = results[outputName].data[0];
    console.log(
      `Solar Energy Per Unit Area: ${predictedEnergyPerUnit.toFixed(2)} kWh/m²`
    );

    // Adjust for usable area (70%) and system losses (80%), then normalize per day
    const usableArea = area * 0.7;
    const totalEnergy = predictedEnergyPerUnit * usableArea * 0.8;

    console.log(
      `Total Solar Energy Generated for Area (${area} m²): ${totalEnergy.toFixed(
        2
      )} kWh/day`
    );
    return totalEnergy.toFixed(2);
  } catch (error) {
    console.error('Error running ONNX model:', error);
  }
}

// Example usage
predictSolarEnergy(2, 54.9, 31, 0.7, 212.84);
