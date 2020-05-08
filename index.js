#!/usr/bin/env node

const { getCode, getName } = require('country-list');
const axios = require('axios');

const arguments = process.argv.slice(2);
const country = arguments[0] || "Belgium";
const currentYear = arguments[1] || new Date().getFullYear();
const countryCode = getCode(country);

if (countryCode == undefined) {
  console.log("Sorry, this country doesn't exist");
} else {
  console.log("Here is the Holidates in " + country + " for the year " + currentYear + " :");
  getHolidays();
}

async function getHolidays() {
  try {
    const response = await axios.get(
      "https://date.nager.at/Api/v2/PublicHolidays/" + currentYear + "/" + countryCode
    );

    for (const item of response.data) {
      console.log(item.date + " : " + item.name);
    }
  } catch (error) {
    console.error(error);
  }
}
  