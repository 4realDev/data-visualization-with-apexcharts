import moment, { Moment } from 'moment'
import { EventValue } from 'rc-picker/lib/interface'

// convert moment object to 02 number
export const momentSelectionToMonthNumberSelection = (
	startSelection: EventValue<Moment>,
	endSelection: EventValue<Moment>,
): [number, number] => {
	const monthNumberSelection: [number, number] = [
		parseInt(startSelection!.format('M MM') + 1),
		parseInt(endSelection!.format('M MM') + 1),
	]
	return monthNumberSelection
}

// convert "2021-02" string to 02 number
export const YYYYMMSelectionToMonthNumberSelection = (
	startSelection: string,
	endSelection: string,
): [number, number] => {
	const monthNumberSelection: [number, number] = [
		parseInt(startSelection.split('-')[1]),
		parseInt(endSelection.split('-')[1]),
	]
	return monthNumberSelection
}

// convert "2021-02" string to moment object (needed for AntSelect)
// prettier-ignore
export const YYYYMMSelectionToMomentSelection = (
	startSelection: string, 
	endSelection: string
): [Moment, Moment] => {
	const momentSelection: [Moment, Moment] = [
		moment(startSelection, 'YYYY-MM'), 
		moment(endSelection, 'YYYY-MM')
	]
	return momentSelection
}

// convert moment object (from AntSelect onChange) to "2021-02" string
// prettier-ignore
export const momentSelectionToYYYYMMSelection = (
	startSelection: EventValue<Moment>,
	endSelection: EventValue<Moment>,
): [string, string] => {
	const YYYYMMSelection: [string, string] = [
        startSelection!.format('YYYY-MM'),
        endSelection!.format('YYYY-MM')
    ]
	return YYYYMMSelection
}
