import { createElement } from "../../functions/elements.js";

export default async function weather() {
  const url =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/jardines%20de%20chapalita?key=U97LZVM7N4BMT826LLZ6HCCB6&unitGroup=metric";

  const response = await fetch(url);
  const weatherData = await response.json();

  function checkConditions(condition) {
    if (condition == "Partially cloudy") {
      return "⛅";
    } else if (condition == "Clear") {
      return "☀️";
    }
  }

  function getDateDetails(dateString) {
    const date = new Date(dateString);

    const details = {
      year: date.getFullYear(),
      month: date.getMonth() + 1, // Months are 0-indexed (0 = January)
      day: date.getDate(),
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    return details;
  }

  const weather = createElement("div", {
    class: "weather",
    childElements: [
      createElement("div", {
        class: "todays-weather",
        childElements: [
          createElement("div", {
            class: "todays-weather-description",
            childElements: [
              createElement("h2", {
                class: "weather-location",
                text: weatherData.resolvedAddress,
              }),
              createElement("p", {
                class: "weather-description",
                text: weatherData.description,
              }),
            ],
          }),
          createElement("div", {
            class: "today-temp",
            childElements: [
              createElement("h3", {
                class: "todays-temperature",
                text: `${weatherData.currentConditions.temp} °C`,
              }),
              createElement("p", {
                class: "weather-conditions",
                text: `${weatherData.currentConditions.conditions}`,
              }),
            ],
          }),
        ],
      }),
      createElement("div", {
        class: "weather-forecast",
        childElements: weatherData.days.slice(0, 5).map((day) =>
          createElement("div", {
            class: "weather-forecast-day",
            childElements: [
              createElement("h3", {
                class: "forecast-day",
                text:
                  checkConditions(day.conditions) +
                  " " +
                  getDateDetails(day.datetime).weekday,
              }),
              createElement("p", {
                class: "day-temp",
                text: `${day.tempmin} C° - ${day.tempmax} C°`,
              }),
              createElement("p", {
                class: "day-temp",
                text: `🌫️${day.humidity} %`,
              }),
              createElement("p", {
                class: "day-temp",
                text: `☔${day.precipprob} %`,
              }),
            ],
          })
        ),
      }),
    ],
  });

  return weather;
}
