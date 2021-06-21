const arrayInteratorMonths = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]

export const normalizeSeriesDataMonths = (series) => {
	// asynchron -> map
	return series.map((serie) => {
		return {
			name: serie.name,
			data: serie.data.map((dataTuple) => {
				return {
					x: parseInt(arrayInteratorMonths.indexOf(dataTuple.x) + 1),
					y: dataTuple.y,
				}
			}),
		}
	})
}

export const renderSeriesDataMonths = (series) => {
	// asynchron -> map
	return series.map((serie) => {
		return {
			name: serie.name,
			data: serie.data.map((dataTuple) => {
				return {
					x: arrayInteratorMonths[dataTuple.x - 1],
					y: dataTuple.y,
				}
			}),
		}
	})
}
