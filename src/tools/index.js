export const getValuesFromWeatherData = data => {
	const { clouds, dt_txt, main, weather, wind } = data || {}
	const { feels_like, humidity, pressure, sea_level, temp, temp_max, temp_min } = main
	const { description, icon } = weather[0]

	const temperature = `${Math.round(temp).toString()}°C`
	const feelsLikeTemperature = `${feels_like.toPrecision(2).toString()}°C`
	const windSpeed = `${wind.speed.toPrecision(2).toString()} m/s`
	const airHumidity = `${humidity}%`
	const airPressure = `${pressure} hPa`

	const seaLevel = `${sea_level} m`
	const cloudiness = `${clouds.all}%`
	const iconSrc = `icons/${icon}.png`

	console.log('dt_txt:', dt_txt) // @D @R @CN

	const dtTxtArr = dt_txt ? dt_txt.split(' ') : ['', '']
	const [dateStr, timeStr] = dtTxtArr
	const [y, m, d] = dateStr.split('-')
	const [h, n] = timeStr.split(':')
	let dt = new Date(y, m - 1, d, h, n)

	const time = `${h}:${n}`
	const dayName = dt.toLocaleDateString('en-EN', { weekday: 'long' })

	const date = dt
		.toLocaleDateString('en-NL', {
			day: 'numeric',
			month: 'long'
		})
		.toLowerCase()

	const datetime = `${dayName} ${date} ${time}`

	// console.log('dt:', dt) // @D @R @CN
	// console.log('datetime:', datetime) // @D @R @CN

	const weatherDescription =
		description && description.substring(0, 1).toUpperCase() + description.substring(1)

	const minMaxTemperature = `${temp_min
		.toPrecision(2)
		.toString()} - ${temp_max.toPrecision(2).toString()}°C`

	return {
		airHumidity,
		airPressure,
		cloudiness,
		datetime,
		feelsLikeTemperature,
		iconSrc,
		minMaxTemperature,
		seaLevel,
		temperature,
		weatherDescription,
		windSpeed
	}
}
