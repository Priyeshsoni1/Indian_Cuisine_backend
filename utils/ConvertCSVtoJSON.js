// backend/utils/convertCSVtoJSON.js
const fs = require("fs");
const csv = require("csvtojson");

csv()
  .fromFile("./data/indian_food.csv")
  .then((jsonObj) => {
    fs.writeFileSync(
      "./data/indian_food.json",
      JSON.stringify(jsonObj, null, 2)
    );
  });
