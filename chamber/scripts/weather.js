// MY APIs
const WEATHER_API_KEY = "341a637f78061cefa1bf108f5ad65491";
const LEKKI_LAT = 6.43;
const LEKKI_LON = 3.48;
const UNITS = "metric"; // metric = °C

const CURRENT_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${LEKKI_LAT}&lon=${LEKKI_LON}&units=${UNITS}&appid=${WEATHER_API_KEY}`;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LEKKI_LAT}&lon=${LEKKI_LON}&units=${UNITS}&appid=${WEATHER_API_KEY}`;

const tempEl = document.getElementById("weather-temp");
const descEl = document.getElementById("weather-desc");
const iconEl = document.getElementById("weather-icon");
const forecastEl = document.getElementById("weather-forecast");
const currentBlock = document.getElementById("weather-current");

// current conditions
async function getCurrentWeather() {
    const response = await fetch(CURRENT_URL);
    if (!response.ok) {
        throw new Error(`Current weather request failed (status ${response.status})`);
    }
    const data = await response.json();

    tempEl.textContent = `${Math.round(data.main.temp)}\u00B0C`;
    descEl.textContent = data.weather[0].description;

    const iconCode = data.weather[0].icon;
    iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    iconEl.alt = data.weather[0].description;
    iconEl.hidden = false;
}

// 3-day forcast
function pickDailyReadings(list) {
    const byDate = {};

    list.forEach((entry) => {
        const date = entry.dt_txt.split(" ")[0];
        const hour = Number(entry.dt_txt.split(" ")[1].split(":")[0]);
        const distanceFromNoon = Math.abs(hour - 12);

        if (!byDate[date] || distanceFromNoon < byDate[date].distanceFromNoon) {
            byDate[date] = { entry, distanceFromNoon };
        }
    });

    return Object.values(byDate)
        .map((item) => item.entry)
        .slice(1, 4); // skip today, take the next 3 days
}

function buildForecastDay(entry) {
    const date = new Date(entry.dt_txt.replace(" ", "T"));
    const label = date.toLocaleDateString("en-US", { weekday: "short" });
    const temp = Math.round(entry.main.temp);
    const iconCode = entry.weather[0].icon;
    const desc = entry.weather[0].description;

    const dayEl = document.createElement("div");
    dayEl.className = "forecast-day";
    dayEl.innerHTML = `
    <span class="f-label">${label}</span>
    <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="${desc}" class="f-icon" width="40" height="40">
    <span class="f-temp">${temp}\u00B0C</span>
  `;
    return dayEl;
}

async function getForecast() {
    const response = await fetch(FORECAST_URL);
    if (!response.ok) {
        throw new Error(`Forecast request failed (status ${response.status})`);
    }
    const data = await response.json();
    const dailyReadings = pickDailyReadings(data.list);

    forecastEl.innerHTML = "";
    dailyReadings.forEach((entry) => {
        forecastEl.appendChild(buildForecastDay(entry));
    });
}

// load both, with a shared error state
async function loadWeather() {
    try {
        await Promise.all([getCurrentWeather(), getForecast()]);
    } catch (error) {
        console.error("Unable to load weather data:", error);
        if (currentBlock) {
            currentBlock.innerHTML = `<p class="weather-error">Weather data is temporarily unavailable. Please try again later.</p>`;
        }
        if (forecastEl) forecastEl.innerHTML = "";
    }
}

loadWeather();
