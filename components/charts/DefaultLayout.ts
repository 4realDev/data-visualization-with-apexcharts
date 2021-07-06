import { ApexOptions } from 'apexcharts'
import { COLORS } from 'shared/colors'

declare global {
	// eslint-disable-next-line no-unused-vars
	interface Window {
		Apex: ApexOptions
	}
}

export function initDefaultCharLayout() {
	window.Apex = {
		chart: {
			background: COLORS.chartLayoutBackground,
			foreColor: COLORS.chartLayoutForeground,
			toolbar: { show: false },
			zoom: { enabled: false },
		},
		xaxis: {
			tooltip: {
				enabled: false,
			},
		},
		tooltip: {
			intersect: false, // show tooltip only when user hovers exactly over datapoint -> must be false to enable shared: true
			shared: true,
			theme: 'dark', // light / dark
		},
		dataLabels: { enabled: false },
		grid: {
			borderColor: COLORS.chartLayoutGrid,
			xaxis: {
				lines: {
					show: true,
				},
			},
		},
		legend: {
			position: 'top',
			horizontalAlign: 'right',
			itemMargin: {
				vertical: 20,
			},
		},
		title: {
			align: 'left',
			offsetY: 20,
		},
		subtitle: {
			offsetY: 40,
		},
	} as ApexOptions
}
