import { Table } from 'antd'
import { ApexChartSerie } from 'shared/types'

type AntTableProps = {
	series: ApexChartSerie[]
}

interface Row {
	name: string
	january: number
	february: number
	march: number
	april: number
	may: number
	june: number
	july: number
	august: number
	september: number
	october: number
	november: number
	december: number
}

const AntTable = ({ series }: AntTableProps) => {
	const columns = series.map((serie: ApexChartSerie) => {
		const result = [{ title: 'Name', dataIndex: 'name' }]
		serie.data.forEach(dataTuple => {
			const column = {
				title: dataTuple.x,
				dataIndex: dataTuple.x.toLowerCase(),
			}
			result.push(column)
		})
		return result
	})

	const data = series.map(serie => {
		const result: any = { dataIndex: serie.name.toLowerCase(), name: serie.name }
		serie.data.forEach(dataTuple => {
			const dataIndex = dataTuple.x.toLowerCase()
			result[dataIndex] = dataTuple.y // january: 21
		})
		return result
	})
	return (
		<>
			<Table<Row> columns={columns[0]} dataSource={data} bordered pagination={false} />
		</>
	)
}

export default AntTable
