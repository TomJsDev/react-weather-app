import React, { useState } from 'react'
import CurrentWeather from './components/CurrentWeather'
import Forecast from './components/Forecast'
import SearchField from './components/SearchField'
import { loadWeatherData } from './apis/openWeatherApi'
import { loadCityTime } from './apis/geoApi'
import './App.css'

export const App = () => {
	const [weatherData, setWeatherData] = useState(null)

	const handleClickOption = async optionData => {
		const id = optionData.id
		const city = optionData.label
		const [latitude, longitude] = optionData.value.split(' ')

		const [time, newWeatherData] = await Promise.all([
			loadCityTime(id),
			loadWeatherData(latitude, longitude)
		])

		setWeatherData({ city, time, ...newWeatherData })
	}

	return (
		<div className='container'>
			<SearchField onClickOption={handleClickOption} />
			{weatherData ? <CurrentWeather data={weatherData} /> : null}
			{weatherData ? <Forecast data={weatherData} /> : null}
		</div>
	)
}

export default App
