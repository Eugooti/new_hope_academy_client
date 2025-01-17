import { DatePicker } from 'antd';
import moment from 'moment';
import {useState} from "react";
import {setSessionStorage} from "../../utils/LocalStorage/sessionStorage.jsx";

const { RangePicker } = DatePicker;

// eslint-disable-next-line react/prop-types
const DateRangePickerWrapper = ({ value, onChange, ...otherProps }) => {

    const handleChange = (dates, dateStrings) => {
        if (dates) {
            const startDate = dates[0];
            const endDate = dates[1];

            // Calculate the difference in days
            const differenceInDays = endDate.diff(startDate, 'days');
            setSessionStorage('examDays',differenceInDays)
            console.log('Number of days:', differenceInDays);

            // Call the onChange handler with the date strings
            onChange(dateStrings, differenceInDays);  // Pass the number of days as well
        } else {
            onChange([],0);
        }
    };
    const disabledDate = (current) => {
        // Disable dates before today
        return current && current < moment().endOf('day');
    };

    return (
        <RangePicker
            size='large'
            disabledDate={disabledDate}
            value={value ? [moment(value[0], 'YYYY/MM/DD'), moment(value[1], 'YYYY/MM/DD')] : []}
            onChange={handleChange}
            placeholder={['Start Date', 'End Date']}
            allowClear
            format="YYYY/MM/DD"  // Set the desired format
            {...otherProps}
        />
    );
};

export default DateRangePickerWrapper;
