import React from 'react'
import { getValuesFromWeatherData } from '../../tools/'
import './index.css'

export const CurrentWeather = ({ data }) => {
	const { city, time, currentWeather } = data || {}
	const {
		airHumidity,
		airPressure,
		feelsLikeTemperature,
		iconSrc,
		temperature,
		weatherDescription,
		windSpeed
	} = getValuesFromWeatherData(currentWeather)

	return (
		<div className='weather'>
			<div className='cell-1'>
				<p className='city'>{city}</p>
				<p className='weather-description'>{weatherDescription}</p>
				<p className='time'>{time}</p>
			</div>
			<div className='cell-2'>
				<img alt='weather-icon' className='weather-icon' src={iconSrc} />
			</div>
			<div className='cell-3'>
				<span className='temperature'>{temperature}</span>
			</div>
			<div className='cell-4'>
				<div className='details'>
					<label className='parameter-label'>Feels like</label>
					<span className='parameter-value'>{feelsLikeTemperature}</span>
					<label className='parameter-label'>Wind speed</label>
					<span className='parameter-value'>{windSpeed}</span>
					<label className='parameter-label'>Humidity</label>
					<span className='parameter-value'>{airHumidity}</span>
					<label className='parameter-label'>Pressure</label>
					<span className='parameter-value'>{airPressure}</span>
				</div>
			</div>
		</div>
	)
}

export default CurrentWeather
