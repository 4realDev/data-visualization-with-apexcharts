// https://ahmedfaaid.com/blog/importing-a-browser-only-package-into-nextjs
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { ApexChartSerie } from 'shared/types'
import { ApexOptions } from 'apexcharts'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false }) // latency

type BarChartProps = {
	title?: string
	subtitle?: string
	series: ApexChartSerie[]
	seriesColor?: string[]
	zoom?: any
}

const BarChart = ({ title, subtitle, series, seriesColor, zoom }: BarChartProps) => {
	const onZoomX = (start: any, end: any) => {
		if (window.Apex) {
			// eslint-disable-next-line no-undef
			ApexCharts.exec('zoomChart', 'updateOptions', {
				xaxis: {
					min: start,
					max: end,
				},
			})
		}
	}

	useEffect(() => {
		if (zoom === undefined) return
		onZoomX(zoom[0], zoom[1])
	}, [zoom]) // empty dependencies array means "run this once on first mount"

	const options: ApexOptions = {
		title: { text: title },
		subtitle: { text: subtitle },
		// Necessary to stack multiple series of data on one category
		chart: {
			stacked: true,
		},
		plotOptions: {
			bar: {
				columnWidth: '30%',
				horizontal: false,
			},
		},
		fill: {
			// Array of color - possible to give every bar a specific color
			colors: seriesColor,
		},
		tooltip: {
			marker: {
				show: true,
				fillColors: seriesColor,
			},
		},
		xaxis: {
			min: zoom ? zoom[0] : undefined,
			max: zoom ? zoom[1] : undefined,
		},
		legend: {
			showForSingleSeries: true,
			markers: {
				fillColors: seriesColor,
			},
		},
	}

	return (
		// Fake-DOM Element - not rendered inside the DOM
		<>
			{/* prettier-ignore */}
			<Chart 
				options={options} 
				series={series} 
				type='bar' 
				height='328' 
				width='100%' 
			/>
		</>
	)
}

BarChart.defaultProps = {
	title: undefined,
	subtitle: undefined,
	seriesColor: undefined,
	zoom: undefined,
}

export default BarChart
