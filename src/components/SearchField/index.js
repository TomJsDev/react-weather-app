import React from 'react'
import { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { loadCityOptions } from '../../apis/geoApi'

const Search = ({ onClickOption }) => {
	const [optionData, setOptionData] = useState(null)

	const handleClickOption = optionData => {
		setOptionData(optionData)
		onClickOption(optionData)
	}

	return (
		<AsyncPaginate
			placeholder='Type city name'
			debounceTimeout={600}
			value={optionData} // see [#1]
			loadOptions={loadCityOptions} // triggered by rerender by alphanum key ("typing")
			onChange={handleClickOption} // triggered by click option
		/>
	)
}

export default Search
