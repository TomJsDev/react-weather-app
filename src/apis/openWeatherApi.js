export const loadWeatherData = async (latitude, longitude) =>
	Promise.all([
		loadCurrentWeatherData(latitude, longitude),
		loadForecastData(latitude, longitude)
	])
		.then(async response => {
			console.log('weatherData response:', response) // @D @R @CN

			const [currentWeather, forecast] = response

			return { currentWeather, forecast }
		})
		.catch(error => console.error('error:', error))

const loadForecastData = async (latitude, longitude) =>
	getForecastDataFromDb(latitude, longitude)
		.then(response => response.json())
		.then(response => {
			// console.log('forecastData response:', response) // @D @R @CN

			return response
		})
		.catch(error => console.error('error:', error))

const getForecastDataFromDb = async (latitude, longitude) => {
	const accessKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY
	const OPEN_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5'

	return fetch(
		`${OPEN_WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${accessKey}&units=metric`
	)
}

const loadCurrentWeatherData = async (latitude, longitude) =>
	getCurrentWeatherDataFromDb(latitude, longitude)
		.then(response => response.json())
		.then(response => {
			// console.log('currentWeatherData response:', response) // @D @R @CN

			return response
		})
		.catch(error => console.error('error:', error))

const getCurrentWeatherDataFromDb = async (latitude, longitude) => {
	const accessKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY
	const OPEN_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5'

	return fetch(
		`${OPEN_WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${accessKey}&units=metric`
	)
}
