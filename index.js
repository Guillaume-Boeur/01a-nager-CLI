#!/usr/bin/env node

const { getCode, getName } = require('country-list');
const axios = require('axios');

const args = process.argv.slice(1);
const country = args[0];
const countryCode = getCode(country);

if (countryCode == undefined) {
  console.log("Sorry, this country doesn't exist");
} else {
  console.log("Here is the Holidates for " + country + " for the current year");
  getHolidays();
}

async function getHolidays() {
  try {
    const response = await axios.get(
      "https://date.nager.at/Api/v2/PublicHolidays/2020/"+
        countryCode
    );

    for (const item of response.data) {
      console.log(item.name);
    }
  } catch (error) {
    console.error(error);
  }
}
  