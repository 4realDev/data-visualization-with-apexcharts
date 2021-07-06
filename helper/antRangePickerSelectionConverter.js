import moment from "moment"

// convert moment object to 02
export const momentSelectionToMonthNumberSelection = (startSelection, endSelection) => {
    const monthNumberSelection = [parseInt(startSelection.format('M MM') + 1), parseInt(endSelection.format('M MM') + 1)]
    return monthNumberSelection
}

// convert "2021-02" to 02
export const YYYYMMSelectionToMonthNumberSelection = (startSelection, endSelection) => {
    const monthNumberSelection = [startSelection.split('-')[1], endSelection.split('-')[1]]
    return monthNumberSelection
}

// convert "2021-02" to moment object (needed for AntSelect)
export const YYYYMMSelectionToMomentSelection = (startSelection, endSelection) => {
    const momentSelection = [moment(startSelection, 'YYYY-MM'), moment(endSelection, 'YYYY-MM')]
    return momentSelection
}

// convert moment object (from AntSelect onChange) to "2021-02"
export const momentSelectionToYYYYMMSelection = (startSelection, endSelection) => {
    const YYYYMMSelection = [startSelection.format('YYYY-MM'), endSelection.format('YYYY-MM')]
    return YYYYMMSelection
}