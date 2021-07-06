import { ApexChartSerie, NormalizedApexChartSerie } from 'shared/types'

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

export const normalizeSeriesDataMonths = (series: ApexChartSerie[]): NormalizedApexChartSerie[] =>
	// asynchron -> map
	series.map(serie => ({
		name: serie.name,
		data: serie.data.map(dataTuple => ({
			x: arrayInteratorMonths.indexOf(dataTuple.x) + 1,
			y: dataTuple.y,
		})),
	}))

export const renderSeriesDataMonths = (series: NormalizedApexChartSerie[]): ApexChartSerie[] =>
	// asynchron -> map
	series.map(serie => ({
		name: serie.name,
		data: serie.data.map(dataTuple => ({
			x: arrayInteratorMonths[dataTuple.x - 1],
			y: dataTuple.y,
		})),
	}))
