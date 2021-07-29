export type ApexChartSerie = {
	name: string
	data: {
		x: string
		y: number
	}[]
}

export type ApexChartSerieWithDescription = {
	name: string
	data: {
		x: string
		y: number
		description: string
	}[]
}

export type NormalizedApexChartSerie = {
	name: string
	data: {
		x: number
		y: number
	}[]
}

export type FilterData = {
	rangeSelection: number[]
	seriesSelection: string[]
}
