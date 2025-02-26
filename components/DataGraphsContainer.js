import React, { useEffect } from 'react';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';
import CircleChart from '../components/charts/CircleChart';
import LineAreaChart from '../components/charts/LineAreaChart';
import HeatMapChart from '../components/charts/HeatMapChart';

import { Collapse } from 'antd';
const { Panel } = Collapse;

import { useSelector } from 'react-redux';
import { renderSeriesDataMonths } from '../helper/normalizerMonths';
import { COLORS } from '../helper/colors';

const DataGraphsContainer = () => {
	const rangePickerSelection = useSelector((state) => state.rangePicker.selection);

	const filteredNormalizedSeriesData = useSelector(
		(state) => state.chartData.filteredNormalizedSeries
	);

	const filteredRenderedSeriesData = renderSeriesDataMonths(filteredNormalizedSeriesData);

	const userSeriesDataSum = filteredRenderedSeriesData.map((serie) => {
		let total = 0;
		serie.data.forEach((dataSet) => {
			total = total + dataSet.y;
		});
		return { name: serie.name, sum: total };
	});

	const getSeriesColor = (series) => {
		if (series === undefined) return;
		let seriesColorArray = [];
		series.forEach((serie) => {
			switch (serie.name) {
				case 'Music':
					seriesColorArray.push(COLORS.chartDataBlue);
					break;
				case 'Photos':
					seriesColorArray.push(COLORS.chartDataGreen);
					break;
				case 'Files':
					seriesColorArray.push(COLORS.chartDataOrange);
					break;
			}
		});
		return seriesColorArray;
	};

	const musicCircleChartData = userSeriesDataSum.find((serie) => serie.name === 'Music');
	const photosCircleChartData = userSeriesDataSum.find((serie) => serie.name === 'Photos');
	const filesCircleChartData = userSeriesDataSum.find((serie) => serie.name === 'Files');

	return (
		<div
			className='min-h-screen flex'
			style={{ backgroundColor: COLORS.mainLayoutBackground }}>
			<div className='flex-1 mx-auto text-gray-300'>
				<div className='grid grid-cols-6 gap-y-0 gap-x-4 grid-flow-row'>
					<div className='col-span-6 row-span-1 my-4'>
						<Collapse
							bordered={false}
							defaultActiveKey={['1']}>
							<Panel
								header='Data Overview'
								key='1'>
								<div
									className='grid grid-cols-3'
									style={{
										backgroundColor: COLORS.chartLayoutBackground,
									}}>
									<div className='col-span-1 row-span-1 justify-center items-center my-10'>
										<CircleChart
											label={musicCircleChartData ? musicCircleChartData.name : ''}
											serieValue={musicCircleChartData ? [musicCircleChartData.sum] : []}
											maxValue={200}
											color={COLORS.chartDataBlue}
										/>
									</div>
									<div className='col-span-1 row-span-1 justify-center items-center my-10'>
										<CircleChart
											label={photosCircleChartData ? photosCircleChartData.name : ''}
											serieValue={photosCircleChartData ? [photosCircleChartData.sum] : []}
											maxValue={200}
											color={COLORS.chartDataGreen}
										/>
									</div>
									<div className='col-span-1 row-span-1 justify-center items-center my-10'>
										<CircleChart
											label={filesCircleChartData ? filesCircleChartData.name : ''}
											serieValue={filesCircleChartData ? [filesCircleChartData.sum] : []}
											maxValue={200}
											color={COLORS.chartDataOrange}
										/>
									</div>
								</div>
							</Panel>
						</Collapse>
					</div>
					<div className='lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-6 row-span-1'>
						<LineChart
							title='LineChart from ApexCharts'
							subtitle='Statistics'
							//labels={lineChartDataLabels}
							series={filteredRenderedSeriesData}
							seriesColor={getSeriesColor(filteredRenderedSeriesData)}
							zoom={rangePickerSelection}
						/>
					</div>
					<div className='lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-6 row-span-1'>
						<BarChart
							title='BarChart from ApexCharts'
							subtitle='Statistics'
							series={filteredRenderedSeriesData}
							seriesColor={getSeriesColor(filteredRenderedSeriesData)}
							zoom={rangePickerSelection}
						/>
					</div>
					<div className='lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-6  row-span-1'>
						<LineAreaChart
							title='LineAreaChart from ApexCharts'
							subtitle='Statistics'
							series={filteredRenderedSeriesData}
							seriesColor={getSeriesColor(filteredRenderedSeriesData)}
							zoom={rangePickerSelection}
						/>
					</div>
					<div className='lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-6  row-span-1'>
						<HeatMapChart
							title='HeatMapChart from ApexCharts'
							subtitle='Statistics'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DataGraphsContainer;
