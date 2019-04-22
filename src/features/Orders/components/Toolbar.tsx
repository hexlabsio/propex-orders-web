import { default as React } from 'react';
import './OperationBar.sass';
import { default as DatePicker } from 'react-datepicker';
import './Toolbar.sass';

export interface Props {
  startDate?: Date;
  endDate?: Date;
  startDateUpdated: (date: Date) => void;
  endDateUpdated: (date: Date) => void;
}

const toolbar = (props: Props) => {
  return (
    <div className="toolbar">
      <div className="tool-text">From</div>
      <DatePicker className="date-picker start-date" selected={props.startDate} onChange={props.startDateUpdated} dateFormat="dd/MM/yyyy"/>
      <div className="tool-text">Until</div>
      <DatePicker className="date-picker end-date" selected={props.endDate} onChange={props.endDateUpdated} dateFormat="dd/MM/yyyy"/>
    </div>
  );
};

export default toolbar;
