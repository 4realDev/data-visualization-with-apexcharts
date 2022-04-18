import { ApexChartSerie, NormalizedApexChartSerie } from 'shared/types'
import { useAppSelector } from 'redux/hooks'
import { Collapse } from 'antd'
import AntTable from './ant-design/AntTable'
import BarChart from './charts/BarChart'
import LineChart from './charts/LineChart'
import CircleChart from './charts/CircleChart'
import LineAreaChart from './charts/LineAreaChart'
import HeatMapChart from './charts/HeatMapChart'
import { renderSeriesDataMonths } from '../helper/normalizerMonths'
import { COLORS } from '../shared/colors'
import RadarChartSection from './RadarChartSection'

const { Panel } = Collapse

const DataGraphsContainer = () => {
	const rangePickerSelection: [string, string] = useAppSelector(state => state.rangePicker.selection)

	const filteredNormalizedSeriesData = useAppSelector(state => state.chartData.filteredNormalizedSeries)

	const filteredRenderedSeriesData = renderSeriesDataMonths(filteredNormalizedSeriesData)

	const userSeriesDataSum = filteredRenderedSeriesData.map(serie => {
		let total = 0
		serie.data.forEach(dataSet => {
			total += dataSet.y
		})
		return { name: serie.name, sum: total }
	})

	const getSeriesColor = (series: ApexChartSerie[] | NormalizedApexChartSerie[]): string[] | undefined => {
		if (series === undefined) return
		const seriesColorArray: string[] = []
		series.forEach(serie => {
			switch (serie.name) {
				case 'Music':
					seriesColorArray.push(COLORS.chartDataBlue)
					break
				case 'Photos':
					seriesColorArray.push(COLORS.chartDataGreen)
					break
				case 'Files':
					seriesColorArray.push(COLORS.chartDataOrange)
					break
				default:
					// eslint-disable-next-line no-console
					console.warn(`Serie name ${serie.name} is not available in data`)
			}
		})
		// eslint-disable-next-line consistent-return
		return seriesColorArray
	}

	const musicCircleChartData = userSeriesDataSum.find(serie => serie.name === 'Music')
	const photosCircleChartData = userSeriesDataSum.find(serie => serie.name === 'Photos')
	const filesCircleChartData = userSeriesDataSum.find(serie => serie.name === 'Files')

	return (
		<div className='min-h-screen flex' style={{ backgroundColor: COLORS.mainLayoutBackground }}>
			<div className='flex-1 mx-auto text-gray-300'>
				<div className='grid grid-cols-6 gap-y-0 gap-x-4 grid-flow-row'>
					<div className='col-span-6 row-span-1 mt-4'>
						<Collapse bordered={false} defaultActiveKey={['1']}>
							<Panel header='Data table' key='1'>
								<div className='lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-6  row-span-1 p-10'>
									<AntTable series={filteredRenderedSeriesData} />
								</div>
							</Panel>
						</Collapse>
					</div>

					<div className='col-span-6 row-span-1 my-4'>
						<Collapse bordered={false} defaultActiveKey={['1']}>
							<Panel header='Circle Chart with filterable Data over the Year' key='1'>
								<div
									className='grid grid-cols-3'
									style={{
										backgroundColor: COLORS.chartLayoutBackground,
									}}
								>
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
							title='Line Chart with filterable Data over the Year'
							subtitle='ApexCharts Line Chart'
							series={filteredRenderedSeriesData}
							seriesColor={getSeriesColor(filteredRenderedSeriesData)}
							zoom={rangePickerSelection}
						/>
					</div>

					<div className='lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-6 row-span-1'>
						<BarChart
							title='Bar Chart with filterable Data over the Year'
							subtitle='ApexCharts Bar Chart'
							series={filteredRenderedSeriesData}
							seriesColor={getSeriesColor(filteredRenderedSeriesData)}
							zoom={rangePickerSelection}
						/>
					</div>

					<div className='lg:col-span-6 md:col-span-6 sm:col-span-6 col-span-6  row-span-1'>
						<LineAreaChart
							title='Area Chart with filterable Data over the Year'
							subtitle='ApexCharts Area Chart'
							series={filteredRenderedSeriesData}
							seriesColor={getSeriesColor(filteredRenderedSeriesData)}
							zoom={rangePickerSelection}
						/>
					</div>

					<RadarChartSection />

					<div className='lg:col-span-3 md:col-span-3 sm:col-span-6 col-span-6  row-span-1'>
						<HeatMapChart title='HeatMapChart with Random Data Metrics' subtitle='ApexCharts HeatMap Chart' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default DataGraphsContainer
