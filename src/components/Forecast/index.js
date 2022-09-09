import React from 'react'
import {
	Accordion,
	AccordionItem,
	AccordionItemButton,
	AccordionItemHeading,
	AccordionItemPanel
} from 'react-accessible-accordion'
import { getValuesFromWeatherData } from '../../tools/'
import './index.css'

export const Forecast = ({ data }) => {
	const { forecast } = data || {}

	return (
		<div className='forecast'>
			<label className='title'>Coming days</label>
			<div className='accordion'>
				<Accordion allowZeroExpanded>
					{forecast.list.slice(1, 39).map((dayForecast, i) => {
						const {
							airHumidity,
							airPressure,
							cloudiness,
							datetime,
							feelsLikeTemperature,
							iconSrc,
							minMaxTemperature,
							seaLevel,
							weatherDescription,
							windSpeed
						} = getValuesFromWeatherData(dayForecast)

						return (
							<AccordionItem key={i}>
								<AccordionItemHeading>
									<AccordionItemButton>
										<div className='day-forecast'>
											<img
												alt='weather-icon'
												className='weather-icon-forecast'
												src={iconSrc}
											/>
											<div className='datetime'>{datetime}</div>
											<span className='description'>{weatherDescription}</span>
											<span className='min-max-temperature'>{minMaxTemperature}</span>
										</div>
									</AccordionItemButton>
								</AccordionItemHeading>
								<AccordionItemPanel>
									<div className='details-forecast'>
										<div className='column'>
											<label className='detail-label'>Feels like</label>
											<span className='detail-value'>{feelsLikeTemperature}</span>
											<label className='detail-label'>Pressure</label>
											<span className='detail-value'>{airPressure}</span>
											<label className='detail-label'>Wind speed</label>
											<span className='detail-value'>{windSpeed}</span>
										</div>
										<div className='column'>
											<label className='detail-label'>Cloudiness</label>
											<span className='detail-value'>{cloudiness}</span>
											<label className='detail-label'>Humidity</label>
											<span className='detail-value'>{airHumidity}</span>
											<label className='detail-label'>Sea level</label>
											<span className='detail-value'>{seaLevel}</span>
										</div>
									</div>
								</AccordionItemPanel>
							</AccordionItem>
						)
					})}
				</Accordion>
			</div>
		</div>
	)
}

export default Forecast
