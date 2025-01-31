const require = createRequire(import.meta.url);
require("dotenv").config();
import { createRequire } from "module";
import soacModel from "./model/Soac.js";
const express = require("express");
const bodyParser = require("body-parser");
const MONGODB_URI = process.env.API_KEY;
const mongoose = require("mongoose");
const app = express();
var cors = require("cors");
app.use(cors());
const PORT = process.env.PORT || 4000;

type DegreeDayType = {
  [key: string]: {
    baseTemp: number;
    maxTemp?: number;
    peakMothFlight?: number;
    firstHatch?: number;
    firstFlight?: number;
    firstApplication?: number;
    firstSpray?: number;
    infectionPhase?: number;
    ddAfterDate?: string;
  };
};
const degreeDayType: DegreeDayType = {
  WesternCherry: {
    baseTemp: 41,
    ddAfterDate: "05-01",
    firstFlight: 950, // degree days after March 1st
    firstApplication: 1060, // on or before 1060 degree days
  },
  LeafRollers: {
    baseTemp: 41,
    maxTemp: 85,
    peakMothFlight: 0, // 220 -250 degree days
    firstHatch: 420, // degree days
  },
  CodlingMoth: {
    baseTemp: 50,
    maxTemp: 88,
    firstSpray: 250, // degree days
  },
  AppleScab: {
    baseTemp: 32,
    infectionPhase: 0, // 300 - 700 degree days
  },
};

// Look into if this is set up correctly
type StoredData = {
  [key: string]: {
    dayDegreeDay?: number;
    degreeDaysAccumulated?: number;
    dayLow?: number;
    dayHigh?: number;
    dayAverage?: number;
    timeOfLow?: string;
    timeOfHigh?: string;
    current?: number;
    totalRainfall?: number;
    dayRainfall?: number;
  };
  Metric: {
    [key: string]: number | string;
  };
};

let storedData: StoredData = {
  Metric: {
    dayDegreeDay: 0,
    degreeDaysAccumulated: 0,
    dayLow: 1000,
    dayHigh: -1000,
    dayAverage: 0,
    timeOfLow: "",
    timeOfHigh: "",
    current: 0,
    totalRainfall: 0,
    dayRainfall: 0,
  },
};

const asyncHandler = (fn: any) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err: any) => console.error("MongoDB connection error:", err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server running on Render port ${PORT}`);
});
app.post("/post", asyncHandler(getProcessedData));
app.get("/health", (req: any, res: any) => {
  res.status(200).send("OK");
});
// Error-handling middleware
app.use((err: any, req: any, res: any, next: any) => {
  console.error("Error occurred:", err.message);
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

async function fetchAndStoreData(
  specificDate: string,
  dayAfter: Date,
  species: string,
  reqData: string
) {
  // Construct the query to filter data based on specificDate
  const query = {
    device: 12,
    id: 222,
    time: {
      $gte: new Date(specificDate).toISOString(),
      $lt: new Date(dayAfter).toISOString(),
    },
  };

  // Specify the fields to return in the projection (rainfall, humidity, temperature)
  const projection = {
    total_rainfall: 1,
    humidity: 1,
    temperature: 1,
    _id: 0, // Exclude the _id field
  };

  // Fetch the data based on the query and projection
  const results = await soacModel.find(query, projection).exec();

  // If no results found, throw an error
  if (!results || results.length === 0) {
    throw new Error("No data found");
  }

  console.log("--------------------");
  console.log("Request Made");
  console.log("Date: " + JSON.stringify(specificDate));
  console.log("Species: " + JSON.stringify(species));
  console.log("reqData: " + JSON.stringify(reqData));
  console.log("--------------------");

  switch (species) {
    case "Rain":
      storeRain(results, reqData);
      break;
    case "Humidity":
      storeHumindiy(results);
      break;
    case "Temperature":

    case "WesternCherry":
    case "LeafRollers":
    case "CodlingMoth":
    case "AppleScab":
      storeTemperature(results);
      storeDegreeDay(species);
      break;
    default:
      console.log("Error");
  }
  // return results;
}

async function getProcessedData(req: any, res: any, next: any) {
  try {
    // Parse request body
    const specificDate = req.body.date;
    const dayAfter = new Date(specificDate);
    dayAfter.setDate(dayAfter.getDate() + 1);
    const species = req.body.species;
    const reqData = req.body.reqData;

    console.log("Received request data:", req.body);

    // Fetch and process data
    const processedData = await fetchAndStoreData(
      specificDate,
      dayAfter,
      species,
      reqData
    );

    res.json(storedData.Metric[reqData as string]); // Respond with processed data
  } catch (error) {
    console.error("Error occurred:", (error as Error).message);
    next(error); // Pass the error to error-handling middleware
  }
}

function storeRain(users: any, reqData: string) {
  // Determins and Converts total and daily rainfall to Millimeters to Inches
  if (reqData == "totalRainfall") {
    storedData.Metric.totalRainfall = millimeterToInchConversion(
      users[users.length - 1].total_rainfall
    );
  }
  if (reqData == "dayRainfall") {
    storedData.Metric.dayRainfall = millimeterToInchConversion(
      users[users.length - 1].total_rainfall - users[0].total_rainfall
    );
  }
}

function storeHumindiy(users: any) {
  // Determins average humidity for the day
  sortMetric(users, "humidity");
  // Sets Humidity in Percentage
  storedData.Humidity.dayAverage = Number(storedData.Humidity.dayAverage);
}

function storeTemperature(users: any) {
  // Determines high and low temp for day
  sortMetric(users, "temperature");
  // Sets and Converts Celcius to Fahrenheit
  storedData.Metric.dayLow = fahrenheitConversion(
    Number(storedData.Metric.dayLow ?? 0)
  );
  storedData.Metric.dayHigh = fahrenheitConversion(
    Number(storedData.Metric.dayHigh ?? 0)
  );
  storedData.Metric.dayAverage = fahrenheitConversion(
    Number(storedData.Metric.dayAverage ?? 0)
  );
  storedData.Metric.current = fahrenheitConversion(
    Number(storedData.Metric.current ?? 0)
  );
}

function storeDegreeDay(species: string) {
  storedData.Metric.dayDegreeDay =
    (Number(storedData.Metric.dayLow) + Number(storedData.Metric.dayHigh)) / 2 -
    Number(degreeDayType[species].baseTemp);
  if ((storedData.Metric.dayDegreeDay ?? 0) < 0) {
    storedData.Metric.dayDegreeDay = 0;
  }
}

function fahrenheitConversion(celciusTemp: number) {
  let fahrenheitTemp = celciusTemp * (9 / 5) + 32;
  return fahrenheitTemp;
}

function millimeterToInchConversion(millimeters: number) {
  let inches = millimeters / 25.4;
  return inches;
}

function sortMetric(results: any, metric: string) {
  // Should be making sure the data getting stored is a number
  // That way I dont need to convert it to a number in the store functions
  (storedData.Metric.dayLow = 1000),
    (storedData.Metric.dayHigh = -1000),
    (storedData.Metric.dayAverage = 0),
    (storedData.Metric.current = 0);
  let total = 0;
  for (let i = 0; i < results.length; i++) {
    if (results[i][metric] > (storedData.Metric.dayHigh ?? 0)) {
      storedData.Metric.dayHigh = results[i][metric];
      storedData.Metric.timeOfHigh = results[i].time;
    }
    if (results[i][metric] < (storedData.Metric.dayLow ?? 0)) {
      storedData.Metric.dayLow = results[i][metric];
      storedData.Metric.timeOfLow = results[i].time;
    }
    total += results[i][metric];
  }
  storedData.Metric.current = results[results.length - 1][metric];

  storedData.Metric.dayAverage = total / results.length;
}
