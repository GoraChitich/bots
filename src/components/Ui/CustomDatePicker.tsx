import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
// Styles
import 'react-datepicker/dist/react-datepicker.css';
// Icons
import { ReactComponent as CalendarIcon } from 'assets/icons/calendar.svg';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const PickerWrapper = styled.div`
  width: 202px;
  display: flex;
  align-items: center;
  border: 1px solid #CED4DA;
  border-radius: 4px;
  background: #fff;
  padding: 0 10px;

  margin-right: 5px;

  .react-datepicker-popper {
    z-index: 99;
  }

  .react-datepicker-wrapper {
    height: 36px;
    display: flex;
    align-items: center;
    
    input {
      border: none;
      margin: 0;
      padding: 0 5px;
      font-size: 14px;
      line-height: 21px;
      color: rgba(0, 123, 255, 1);
      width: 100%;
      
      &:focus,
      &:hover {
        outline: none;
      }
    }
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker__day-name {
    color: rgba(0, 123, 255, 1);
    line-height: 24px;
    font-size: 14px;
  }

  .react-datepicker__current-month {
    font-size: 14px;
    line-height: 24px;
    color: rgba(51, 51, 51, 1);
    font-weight: 400;
  }

  .react-datepicker__navigation-icon::before, .react-datepicker__year-read-view--down-arrow, .react-datepicker__month-read-view--down-arrow, .react-datepicker__month-year-read-view--down-arrow {
    border-color: rgba(0, 123, 255, 1);
  }

  .react-datepicker__month-container {
    .react-datepicker__header {
      background: #fff;
      border: none;
    }
  }
`;

const Title = styled.span`
  font-size: 14px;
  line-height: 24px;
  color: rgba(108, 117, 125, 1);
  margin-right: 5px;
`;

const ClearDate = styled.button`
  outline: none;
  width: 80px;
  height: 36px;
  border: 1px solid rgba(33, 37, 41, 0.5);
  border-radius: 4px;
  cursor: pointer;

  font-size: 14px;
  line-height: 24px;
  color: ${({ color }) => (color)};
  transition: all 0.3s;

  background: ${({ bg }: { bg?: string}) => (bg)};

  margin-left: 10px;

  &:hover {
    opacity: 0.5;
  }
`;

const CustomDatePicker: React.FC<any> = ({
  clearHandler,
  dateRange,
  setDateRange,
  filter,
}) => {
  const [startDate, endDate] = dateRange;

  return (
    <Wrapper>
      <Title>
        Date from:
      </Title>
      <PickerWrapper>
        <CalendarIcon />
        <DatePicker
          // eslint-disable-next-line
          selectsRange={true}
          dateFormat="dd-MM-yy"
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            // @ts-ignore
            setDateRange(update);
          }}
        />
      </PickerWrapper>
      {/* <ClearDate bg="rgba(0,123,255,1)" color="#fff" onClick={filter}>
        Filter
      </ClearDate> */}
      <ClearDate onClick={clearHandler}>
        Clear date
      </ClearDate>
    </Wrapper>
  );
};

export default CustomDatePicker;
