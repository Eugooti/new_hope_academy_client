import { DatePicker } from 'antd';
import moment from "moment";

// eslint-disable-next-line react/prop-types
const DatePickerWrapper = ({ value, onChange, ...otherProps }) => {
    const handleChange = (date, dateString) => {
        onChange(dateString);
    };

    return (
        <DatePicker
            value={value ? moment(value, 'YYYY/MM/DD') : null}
            onChange={handleChange}
            format="YYYY/MM/DD" // Set the desired format
            {...otherProps}
        />
    );
};

export default DatePickerWrapper;
