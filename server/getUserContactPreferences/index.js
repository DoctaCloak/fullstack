const axios = require('axios');

module.exports = function (context, req) {
  // TODO Instead log from a logger service of sort
  context.log('getSpeakers function processing request');

  let send = response(context);

  axios
    .get(
      `http://api.openweathermap.org/data/2.5/forecast?q=minneapolis,us&units=imperial&APPID=${process.env.WEATHER_SERVICE_API_TOKEN}`
    )
    .then(({ data }) => {
      const result = {};

      for (let item of data.list) {
        if (!item.dt_txt) {
          // dt_txt is necessary for making sense of per day data.
          continue;
        }

        const date = new Date(item.dt_txt);

        const isWeekendDay = checkIsWeekend(date);

        if (isWeekendDay) {
          continue;
        }

        const isDuringBusinessHours =
          date.getHours() >= 9 && date.getHours() <= 17;

        if (!isDuringBusinessHours) {
          /*
           * I personally think that we need not include the time if it is
           * outside of business hours.  In reality the user preferences would
           * be stored in our database.
           *
           * In this rare rare rare edge case though we will return nothing.  On the
           * front end, I am assuming that the user may have something on file which would
           * be retrieved by another service, which would default to email in our database.
           *
           * Email being something provided on signing up for whichever service they are using.
           */
          continue;
        }

        let preferredContactMethod;

        const { temp } = item.main;
        const weatherCondition = item.weather[0].id || 0;

        switch (true) {
          case temp > 75 && weatherCondition === 800:
            preferredContactMethod = 'text';
            break;
          case temp >= 55 && temp <= 75:
            preferredContactMethod = 'email';
            break;
          case temp < 55 ||
            (weatherCondition >= 500 && weatherCondition <= 599):
            preferredContactMethod = 'phone';
            break;
          default:
            preferredContactMethod = 'email';
            break;
        }

        const parsedWeatherData = {
          date: item.dt_txt,
          preferredContactMethod,
        };

        const dayEntryKey = convertDateToDayEntryKey(item.dt_txt);

        /* If day is already present then we want to
         * add the new parsedWeather as an item to
         * the array of dates.
         */
        if (result[dayEntryKey]) {
          result[dayEntryKey].push(parsedWeatherData);
        } else {
          result[dayEntryKey] = [parsedWeatherData];
        }
      }

      send(200, JSON.stringify(result));
    })
    .catch((err) => {
      context.log('Something went wrong: ', err);
      send(500, err.message);
    });
};

//Helper function to build the response
function response(context) {
  return function (status, body) {
    context.res = {
      status: status,
      body: body,
    };

    context.done();
  };
}

/* This is necessary to negate returning weekend data.
 * As this application would likely be an internal business tool,
 * I assuming that patients or clients would only book during business
 * hours.
 */
function checkIsWeekend(date) {
  return date.getDay() === 0 || date.getDay() === 6;
}

function convertDateToDayEntryKey(date) {
  const parsedDate = new Date(date);
  const monthIndex = parsedDate.getMonth();
  const day = parsedDate.getDate();
  const year = parsedDate.getFullYear();

  return `${year}/${monthIndex}/${day}`;
}
