import * as fs from 'node:fs';

let DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
// 1 and 2 and 3
const getDayOfWeek = (dayNr) => DAYS[dayNr];

const holidaysByYear = function(eventsArr) {
  const numberOfHolidaysByYear = {};

  for (const event of eventsArr) {
    if (numberOfHolidaysByYear.hasOwnProperty(event.date.year)) {
      numberOfHolidaysByYear[event.date.year] += 1;
    } else {
      numberOfHolidaysByYear[event.date.year] = 1;
    }
  }
  return numberOfHolidaysByYear;
}

const dataRead = (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const regions = JSON.parse(data);

  for (const region in regions) {
    for (const event of regions[region].events) {
      const currentDate = new Date(event.date);
      event.date = {
        year: currentDate.getUTCFullYear(),
        month: currentDate.getUTCMonth(),
        day: currentDate.getUTCDate(),
        weekday: getDayOfWeek(currentDate.getDay())
      }
      console.log(event);
    }
      
  }

  for (const division in regions) {
    regions[division]['amount-by-year'] = holidaysByYear(regions[division].events);
  }

  console.log(regions);


}

fs.readFile('data.json', 'utf8', dataRead);

// DON'T MODIFY THE CODE BELOW THIS LINE

let toExport;

try {
  toExport = [
    { name: "holidaysByYear", content: holidaysByYear, type: "function" }
  ]

} catch (error) {
  toExport = { error: error.message }
}

export { toExport };