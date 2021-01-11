/* eslint-disable no-mixed-spaces-and-tabs */
const localStorageWeatherKey = 'weatherApi';
const main = document.querySelector('main');
let addBtn = document.querySelector('.newWeatherForecast');
let input = document.querySelector('.city');
const weather = {};
let forecasts = [];
addBtn.addEventListener('click', function(){
	getWeatherData();

});


function getWeatherData(){
	fetch('http://api.openweathermap.org/data/2.5/weather?q='+input.value+'&units=metric&appid=57cc083a05fa6a2008dc652336e25912')
		.then((response) => response.json())
		.then(data => {
			weather.city = data['name'];
			weather.desc = data['weather'][0]['description'];
			weather.temp = Math.round(data['main']['temp']);
			weather.image = data['weather'][0]['icon'];
			weather.wind = data['wind']['speed'];
			weather.pressure = data['main']['pressure'];		
			forecasts.push(weather);	
			localStorage.setItem(localStorageWeatherKey, JSON.stringify(forecasts));
		})
		.then(function(){
			createWeatherNote();
		});
}



function createWeatherNote() {
	const forecastsFromStorage = JSON.parse(localStorage.getItem(localStorageWeatherKey));
	forecasts = forecastsFromStorage.map(weather => {
		weather.createDate = new Date(weather.createDate);
		return weather;
	});

	main.innerHTML = '';

	for (const weather of forecasts){
		const htmlWeather = document.createElement('div');
		const htmlCity = document.createElement('h1');
		const htmlTemp = document.createElement('p');
		const htmlImg = document.createElement('div');
		const htmlDesc = document.createElement('p');		
 		const htmlWind = document.createElement('p');
 		const htmlPressure = document.createElement('p');

		htmlWeather.classList.add('weather-container');
		htmlCity.classList.add('city');
		htmlImg.classList.add('weather-img');
		htmlDesc.classList.add('desc');
		htmlTemp.classList.add('temp');
		htmlWind.classList.add('wind');
		htmlPressure.classList.add('pressure');

		htmlImg.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.image}@2x.png"/>`;
		htmlCity.innerHTML = weather.city;
		htmlDesc.innerHTML = weather.desc;
		htmlTemp.innerHTML = weather.temp + '°C';
		htmlWind.innerHTML = 'WIND <br><br>' + weather.wind + ' m/s';
		htmlPressure.innerHTML = 'PRESSURE <br><br>' + weather.pressure + ' hPa';
	
		main.appendChild(htmlWeather);
		htmlWeather.appendChild(htmlCity);
		htmlWeather.appendChild(htmlTemp);
		htmlWeather.appendChild(htmlImg);
		htmlWeather.appendChild(htmlDesc);
		htmlWeather.appendChild(htmlWind);
		htmlWeather.appendChild(htmlPressure);
	}

	input.value = '';
}

 
