let cityName = document.querySelector('#city').value;
const apiKey = '57cc083a05fa6a2008dc652336e25912';
const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=Cracow&appid=${apiKey}`
const weather = fetch(openWeatherUrl).then((d) => d.json());
console.log(weather);

weather
    .then((respondObj)=>{console.log('First .then', respondObj); return respondObj.json()}
    .then(pogoda)=>{console.log('Second .then', pogoda)}
    .catch(e)=>{console.error('Catched exception: ', e)})

class Weather {
    constructor (city, content, temperature, pressure, humidity) {
        this.city = city;
        this.content = content;
        this.temperature = temperature;
        this.pressure = pressure;
        this.humidity = humidity;
    }
}

class WeatherForeCast {
    constructor (containerSelector) {
        this.weather = new Weather();
        this.forecasts = [];
        this.db = new Db();
        this.forecastUI = new ForecastUI(containerSelector);
    }

    addWeather(weather) {
        this.forecasts.push(weather);
        this.db.saveWeather(this.forecasts);
        this.forecastUI.addWeather(weather);
        this.forecastUI.clearCity(weather);
    }

    getWeather(id) {
        return this.forecasts.find(el => el.id === id);
    } 
    getForecasts() {
        return [...this.forecasts];
    }
}

class ForecastUI {
    constructor(containerSelector = 'main') {
        this.forecasts = new Weather();
        this.forecastContainer = document.querySelector(containerSelector);
    }

    addWeather(weather) {
        const htmlWeather = this.createWeather(weather);
        const container = this.getForecastContainer();
        container.appendChild(htmlWeather);
    }
    createWeather(weather) {
        const htmlWeather = document.createElement('section');
        const htmlCity = document.createElement('h3');
        const htmlTemperature = document.createElement('p');
        const htmlPressure = document.createElement('p');
        const htmlHumidity = document.createElement('p');

        htmlWeather.classList.add('weather');
        htmlCity.innerHTML = weather.city;
        htmlTemperature.innerHTML = weather.temperature;
        htmlPressure.innerHTML = 'Ciśnienie' + weather.pressure;
        htmlHumidity.innerHTML = 'Wilgotność' + weather.humidity;
        
        htmlWeather.appendChild(htmlCity);
        htmlWeather.appendChild(htmlTemperature);
        htmlWeather.appendChild(htmlPressure);
        htmlWeather.appendChild(htmlHumidity);
    }
    getWeather(id) {
        return document.querySelector('#' + id);
    }
    getForecastContainer() {
        return this.forecastContainer;
    }
    clearCity(){
        document.querySelector('#city').value = '';
    }
}

class Db {
    constructor() {
        this.lsForecastsKey = 'forecasts';
    }

    saveForecasts(forecasts) {
        localStorage.setItem(this.lsForecastsKey, JSON.stringify(forecasts));
    }
    getForecasts() {
        if (localStorage.getItem(this.lsForecastsKey) != null) {
            return JSON.parse(localStorage.getItem(this.lsForecastsKey));
        }

    }
}