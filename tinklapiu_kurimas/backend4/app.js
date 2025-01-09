const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

const calculateDistance = (pickup, delivery) => {
  // calculator
  return 316; // distance in km
};

const calculatePrice = (distance, vehicle) => {
  const basePricePerKm = 0.2;
  let price = distance * basePricePerKm;

  const vehicleMarkup = {
    bicycle: 1.1,
    motorbike: 1.15,
    parcel_car: 1.2,
    small_van: 1.3,
    large_van: 1.4,
  };

  if (vehicle && vehicleMarkup[vehicle]) {
    price *= vehicleMarkup[vehicle];
  }

  return Math.round(price);
};

app.post("/carrier", (req, res) => {
  const { pickup_postcode, delivery_postcode, vehicle } = req.body;

  if (!pickup_postcode || !delivery_postcode) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const distance = calculateDistance(pickup_postcode, delivery_postcode);
  const price = calculatePrice(distance, vehicle);

  res.json({
    pickup_postcode,
    delivery_postcode,
    vehicle,
    distance_km: distance,
    price,
  });
});

app.listen(port, () => {
  console.log(`Service running on port ${port}`);
});
