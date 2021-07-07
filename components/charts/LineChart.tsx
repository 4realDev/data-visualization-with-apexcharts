// https://ahmedfaaid.com/blog/importing-a-browser-only-package-into-nextjs
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { ApexChartSerie } from 'shared/types'
import { ApexOptions } from 'apexcharts'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

type LineChartProps = {
	title?: string
	subtitle?: string
	series: ApexChartSerie[]
	seriesColor?: string[]
	zoom?: any
}

const LineChart = ({ title, subtitle, series, seriesColor, zoom }: LineChartProps) => {
	const onZoomX = (start: any, end: any) => {
		if (window.Apex) {
			// eslint-disable-next-line no-undef
			ApexCharts.exec('lineChart', 'updateOptions', {
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
		chart: {
			id: 'lineChart',
			dropShadow: {
				enabled: true,
				top: 3,
				left: 2,
				blur: 4,
				opacity: 1,
			},
		},
		stroke: {
			show: true,
			width: 2,
			colors: seriesColor,
			curve: 'smooth', // smooth / straight / stepline
		},
		markers: {
			size: 6,
			strokeWidth: 0, // stroke around marker
			colors: seriesColor,
			hover: {
				size: 9,
			},
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
			tickPlacement: 'on',
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
				type='line' 
				height='328' 
				width='100%' 
			/>
		</>
	)
}

LineChart.defaultProps = {
	title: undefined,
	subtitle: undefined,
	seriesColor: undefined,
	zoom: undefined,
}

export default LineChart
