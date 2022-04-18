/* eslint-disable prefer-template */
// https://ahmedfaaid.com/blog/importing-a-browser-only-package-into-nextjs
import dynamic from 'next/dynamic'
import { ApexChartSerieWithDescription } from 'shared/types'
import { ApexOptions } from 'apexcharts'
import { COLORS } from 'shared/colors'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false }) // latency

type RadarChartProps = {
	title?: string
	subtitle?: string
	mySeries: ApexChartSerieWithDescription[]
	color?: string | string[]
	tooltipDescription: string | string[]
}

/*
type ApexChartsMarkerData = {
	seriesIndex: number
	dataPointIndex: number
	w?: number
}
*/

// Limited to min.3 categories
// Not possible to style labels with padding and so on (<text> elements with x and y-coordinates)
const RadarChart = ({ title, subtitle, mySeries, color, tooltipDescription }: RadarChartProps) => {
	const convertNumberRatingIntoString = (rating: number) => {
		if (rating === 0) return ''
		if (rating === 3) {
			return 'Perfected'
		}
		if (rating === 2) {
			return 'Used'
		}
		if (rating === 1) {
			return 'Learned'
		}
		return ''
	}

	const options: ApexOptions = {
		chart: {
			id: 'RadarChart', // apexchart[id] -> apexchartsRadarChart
			type: 'radar',
			dropShadow: {
				enabled: true,
				top: 3,
				left: 2,
				blur: 4,
				opacity: 1,
			},
		},
		title: { text: title, align: 'center' },
		subtitle: { text: subtitle },
		plotOptions: {
			radar: {
				size: 120,
				polygons: {
					strokeColors: COLORS.chartLayoutGrid,
					connectorColors: COLORS.chartLayoutGrid,
				},
			},
		},
		stroke: {
			width: 2,
			colors: [color] as any,
		},
		fill: {
			opacity: 0.25,
			colors: [color],
		},
		markers: {
			size: 20,
			strokeColors: 'transparent',
			colors: ['transparent'],
			hover: {
				size: 20,
			},
		},
		/*
		tooltip: {
			shared: false,
			intersect: true,
			followCursor: true,
			// custom({ series, seriesIndex, dataPointIndex, w }) {
			// 	console.log(seriesIndex)
			// 	return `${'<div class="arrow_box">' + '<span>'}${dataPointIndex}</span>` + `</div>`
			// },

			// "as any" fix is needed, because ApexCharts fogot to add the marker prop in formatter
			y: {
				title: {
					formatter: (seriesName: string, marker: ApexChartsMarkerData) => {
						if (mySeries[0].data[marker.dataPointIndex].y === 0 || !mySeries[0].data[marker.dataPointIndex].description)
							return ''
						return tooltipDescription[marker.dataPointIndex] + '\n\n'
					},
				},
				formatter: (val: number) => {
					if (val === 0) return ''
					return 'Skill: ' + convertNumberRatingIntoString(val)
				},
			} as any,
		},
		*/

		xaxis: {
			min: 0,
			max: 3,
			labels: {
				show: true,
				trim: false,
				style: {
					colors: COLORS.chartLayoutForeground,
					fontSize: '16px',
					fontFamily: 'Arial',
				},
			},
		},

		yaxis: {
			labels: {
				offsetY: 30,
				style: {
					// fontSize: '0px',
					fontFamily: 'Arial, sans-serif',
					fontWeight: 400,
					colors: '#c9c9c950',
				},
				formatter: value => convertNumberRatingIntoString(value),
			},
		},
		responsive: [
			{
				breakpoint: 1900,
				options: {
					chart: {
						height: 328,
					},
					plotOptions: {
						radar: {
							size: 100,
						},
					},
					xaxis: {
						labels: {
							style: {
								fontSize: '12px',
							},
						},
					},
				},
			},
			{
				breakpoint: 1535,
				options: {
					chart: {
						height: 328,
					},
					plotOptions: {
						radar: {
							size: 120,
						},
					},
					xaxis: {
						labels: {
							style: {
								fontSize: '16px',
							},
						},
					},
				},
			},
			{
				breakpoint: 1200,
				options: {
					chart: {
						height: 328,
					},
					plotOptions: {
						radar: {
							size: 100,
						},
					},
					xaxis: {
						labels: {
							style: {
								fontSize: '12px',
							},
						},
					},
				},
			},
			{
				breakpoint: 1024,
				options: {
					chart: {
						height: 328,
					},
					plotOptions: {
						radar: {
							size: 140,
						},
					},
					xaxis: {
						labels: {
							style: {
								fontSize: '16px',
							},
						},
					},
				},
			},
			{
				breakpoint: 768,
				options: {
					chart: {
						height: 328,
					},
					plotOptions: {
						radar: {
							size: 120,
						},
					},
					xaxis: {
						labels: {
							style: {
								fontSize: '12px',
							},
						},
					},
				},
			},
			{
				breakpoint: 480,
				options: {
					chart: {
						height: 328,
					},
					plotOptions: {
						radar: {
							size: 100,
						},
					},
					xaxis: {
						labels: {
							style: {
								fontSize: '12px',
							},
						},
					},
				},
			},
			{
				breakpoint: 450,
				options: {
					chart: {
						height: 328,
					},
					plotOptions: {
						radar: {
							size: 80,
						},
					},
					xaxis: {
						labels: {
							style: {
								fontSize: '12px',
							},
						},
					},
				},
			},
		],
	}

	return (
		<div>
			<Chart id='apexcontainer' options={options} series={mySeries} type='radar' height='328' width='100%' />
		</div>
	)
}

RadarChart.defaultProps = {
	title: undefined,
	subtitle: undefined,
	color: COLORS.chartDataBlue,
}

export default RadarChart
