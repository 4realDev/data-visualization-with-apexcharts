// https://ahmedfaaid.com/blog/importing-a-browser-only-package-into-nextjs
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { ApexChartSerie } from 'shared/types'
import { ApexOptions } from 'apexcharts'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

type LineAreaChartProps = {
	title?: string
	subtitle?: string
	series: ApexChartSerie[]
	seriesColor?: string[]
	// workaroud: ApexCharts "updateOptions" somehow does not work with [number, number] data
	zoom?: any
}

const LineAreaChart = ({ title, subtitle, series, seriesColor, zoom }: LineAreaChartProps) => {
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
		stroke: {
			show: true,
			width: 2,
			colors: seriesColor,
			curve: 'straight', // smooth / straight / stepline
		},
		fill: {
			colors: seriesColor,
			opacity: 1,
			// type: 'gradient',
			// gradient: {
			// 	shade: 'dark',
			// 	type: 'vertical',
			// 	shadeIntensity: 0.5,
			// 	gradientToColors: undefined,
			// 	inverseColors: true,
			// 	opacityFrom: 1,
			// 	opacityTo: 0.5,
			// },
		},
		markers: {
			size: 0,
			strokeWidth: 0, // stroke around marker
			colors: seriesColor,
			hover: {
				size: 6,
			},
		},
		xaxis: {
			min: zoom ? zoom[0] : undefined,
			max: zoom ? zoom[1] : undefined,
		},
		tooltip: {
			marker: {
				show: true,
				fillColors: seriesColor,
			},
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
			<Chart
				options={options}
				series={series}
				type='area'
				height='328'
				width='100%' // will be defined through flex
			/>
		</>
	)
}

LineAreaChart.defaultProps = {
	title: undefined,
	subtitle: undefined,
	seriesColor: undefined,
	zoom: undefined,
}

export default LineAreaChart
