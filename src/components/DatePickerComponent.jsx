import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styled from "styled-components";

const StyledDatePicker = styled(DatePicker)`
  border-radius: 1rem;
  background-color: var(--brand-color);
  color: var(--background-color);
  padding: 1rem;
  border: none;
  font-size: 1.6rem;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:focus {
    outline: none;
  }
`;

const DatePickerComponent = ({ selectedDate, onChange }) => {
  const getNearest30Minutes = (date) => {
    const ms = 1000 * 60 * 30;
    return new Date(Math.round(date.getTime() / ms) * ms);
  };

  const [startDate, setStartDate] = useState(getNearest30Minutes(new Date()));

  useEffect(() => {
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  }, [selectedDate]);

  return (
    <StyledDatePicker
      selected={startDate}
      onChange={(date) => {
        setStartDate(date);
        onChange(date);
      }}
      locale="en"
      showTimeSelect
      timeFormat="p"
      timeIntervals={30}
      dateFormat="MM/dd/yyyy p"
    />
  );
};

export default DatePickerComponent;
