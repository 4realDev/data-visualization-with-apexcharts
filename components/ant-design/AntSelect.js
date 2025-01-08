import { Select } from 'antd';
const { Option } = Select;
import React from 'react';
import PropTypes from 'prop-types';

const AntSelect = ({ selectOptions, onChange }) => {
	return (
		<>
			<Select
				style={{ width: 266 + 'px' }}
				onChange={(value) => onChange(value)}
				mode='multiple'
				placeholder='Select Months'
				maxTagCount='responsive'
				defaultValue={selectOptions}
				//value={selectOptions}
				showArrow='true'
				allowClear='false'>
				{selectOptions.map((option, index) => (
					<Option
						key={index}
						value={option}>
						{option}
					</Option>
				))}
			</Select>
		</>
	);
};

AntSelect.propTypes = {
	selectOptions: PropTypes.any,
	onChange: PropTypes.any,
};

export default AntSelect;
