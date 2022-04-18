import { Collapse } from 'antd'
import {
	skillsetMobileSeries,
	skillsetWebSeries,
	skillsetDesignSeries,
	skillsetEmbeddedSeries,
	skillsetOverviewSeries,
	skillsetVRARGameSeries,
} from 'shared/skillsetData'
import RadarChart from './charts/RadarChart'
import { COLORS } from '../shared/colors'

const { Panel } = Collapse

const RadarChartSection = () => {
	const skillsetWebSeriesDescription = skillsetWebSeries[0].data.map(dataSet => dataSet.description)
	const skillsetMobileSeriesDescription = skillsetMobileSeries[0].data.map(dataSet => dataSet.description)
	const skillsetDesignSeriesDescription = skillsetDesignSeries[0].data.map(dataSet => dataSet.description)
	const skillsetEmbeddedSeriesDescription = skillsetEmbeddedSeries[0].data.map(dataSet => dataSet.description)
	const skillsetOverviewSeriesDescription = skillsetOverviewSeries[0].data.map(dataSet => dataSet.description)
	const skillsetVRARGameSeriesDescription = skillsetVRARGameSeries[0].data.map(dataSet => dataSet.description)

	return (
		<div className='col-span-6 row-span-1 mb-4'>
			<Collapse bordered={false} defaultActiveKey={['1']}>
				<Panel header='RadarChart with Random Data' key='1'>
					<div
						className='grid grid-cols-6'
						style={{
							backgroundColor: COLORS.chartLayoutBackground,
						}}
					>
						<div className='2xl:col-span-2 xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-6 col-span-6 row-span-1 justify-center items-center my-5'>
							<h3 className='text-white text-left text-sm font-bold text-center uppercase'>
								{skillsetMobileSeries[0].name}
							</h3>
							<RadarChart
								mySeries={skillsetMobileSeries}
								color={COLORS.chartDataBlue}
								tooltipDescription={skillsetMobileSeriesDescription}
							/>
						</div>
						<div className='2xl:col-span-2 xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-6 col-span-6 row-span-1 justify-center items-center my-5'>
							<h3 className='text-white text-sm font-bold text-center uppercase'>{skillsetWebSeries[0].name}</h3>
							<RadarChart
								mySeries={skillsetWebSeries}
								color={COLORS.chartDataBlue}
								tooltipDescription={skillsetWebSeriesDescription}
							/>
						</div>
						<div className='2xl:col-span-2 xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-6 col-span-6 row-span-1 justify-center items-center my-5'>
							<h3 className='text-white text-sm font-bold text-center uppercase'>{skillsetEmbeddedSeries[0].name}</h3>
							<RadarChart
								mySeries={skillsetEmbeddedSeries}
								color={COLORS.chartDataBlue}
								tooltipDescription={skillsetEmbeddedSeriesDescription}
							/>
						</div>
						<div className='2xl:col-span-2 xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-6 col-span-6 row-span-1 justify-center items-center my-5'>
							<h3 className='text-white text-sm font-bold text-center uppercase'>{skillsetDesignSeries[0].name}</h3>
							<RadarChart
								mySeries={skillsetDesignSeries}
								color={COLORS.chartDataBlue}
								tooltipDescription={skillsetDesignSeriesDescription}
							/>
						</div>
						<div className='2xl:col-span-2 xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-6 col-span-6 row-span-1 justify-center items-center my-5'>
							<h3 className='text-white text-sm font-bold text-center uppercase'>{skillsetVRARGameSeries[0].name}</h3>
							<RadarChart
								mySeries={skillsetVRARGameSeries}
								color={COLORS.chartDataBlue}
								tooltipDescription={skillsetVRARGameSeriesDescription}
							/>
						</div>
						<div className='2xl:col-span-2 xl:col-span-3 lg:col-span-3 md:col-span-6 sm:col-span-6 col-span-6 row-span-1 justify-center items-center my-5'>
							<h3 className='text-white text-sm font-bold text-center uppercase'>{skillsetOverviewSeries[0].name}</h3>
							<RadarChart
								mySeries={skillsetOverviewSeries}
								color={COLORS.chartDataBlue}
								tooltipDescription={skillsetOverviewSeriesDescription}
							/>
						</div>
					</div>
				</Panel>
			</Collapse>
		</div>
	)
}

export default RadarChartSection
