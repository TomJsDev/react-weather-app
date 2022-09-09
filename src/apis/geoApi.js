const apiHost = 'wft-geo-db.p.rapidapi.com'
const GEO_DB_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo'

// LOAD FUNCTIONS

export const loadCityOptions = async v =>
	v
		? getCityOptionsFromDb(v)
				.then(response => response.json())
				.then(response => {
					console.log('cityOptions response:', response) // @D @R @CN

					return {
						// "options": array to fill dropdown list with.
						// [#1] array element ~= optionData (object)
						options: response.data.map(city => ({
							id: city.id,
							value: `${city.latitude} ${city.longitude}`,
							label: `${city.name} ${city.countryCode}`
						}))
					}
				})
				.catch(error => console.error('error:', error))
		: { options: [] }

export const loadCityTime = async v =>
	getCityTimeFromDb(v)
		.then(response => response.json())
		.then(response => {
			console.log('cityTime response:', response) // @D @R @CN

			let time = response.data ? response.data.match(/(?<=T)\d\d:\d\d/)[0] : ''
			if (time[0] === '0') time = time.substring(1)

			// console.log('time:', time) // @D @R @CN

			return time
		})
		.catch(error => console.error('error:', error))

// GET FROM DB FUNCTIONS

const getGeoApiDataFromDb = async url => {
	if (!url) return null

	const accessKey = process.env.REACT_APP_GEO_DB_API_KEY

	const fetchSettings = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': accessKey,
			'X-RapidAPI-Host': apiHost
		}
	}

	return fetch(url, fetchSettings)
}

const getCityOptionsFromDb = async v => {
	// v = 'ab' // @D @R

	const url = v !== '' && `${GEO_DB_API_URL}/cities?minPopulation=26000&namePrefix=${v}`

	return getGeoApiDataFromDb(url)
}

const getCityTimeFromDb = async v => {
	const url = v !== '' && `${GEO_DB_API_URL}/cities/${v}/dateTime`
	return getGeoApiDataFromDb(url)
}
