import { COLORS } from '../../helper/colors';

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
			offsetY: -20,
		},
		title: {
			align: 'left',
			margin: 20,
			offsetX: 20,
		},
		subtitle: {
			offsetX: 20,
		},
	};
}
