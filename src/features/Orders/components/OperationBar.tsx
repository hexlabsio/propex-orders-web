import { default as React } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { opButton as OpButton } from './OperationBar';
import './OperationBar.sass';

export interface Props {
  search?: SearchProps;
  operations: Operation[];
  operationClicked: (key: string) => void;
}

export interface Operation {
  key: string;
  label: string;
  displayed: boolean;
  enabled: boolean;
  loading: boolean;
  icon?: IconProp;
  link?: string;
}

export interface SearchProps {
  text: string;
  onChange: (updatedText: string) => void;
}

interface OpButtonProps {
  operation: Operation;
  onClick: (key: string) => void;
}
export const opButton = ({ operation, onClick }: OpButtonProps) => {
  if (operation.displayed) {
    const button = (
      <div
        onClick={operation.enabled ? () => onClick(operation.key) : () => {}}
        className={`operation operation-${operation.key}${!operation.enabled ? ' disabled' : ''}`}
      >
        {operation.loading ? <FontAwesomeIcon icon={faSpinner} spin={true}/> : (operation.icon ? <FontAwesomeIcon icon={operation.icon}/> : <></>)}
        {operation.label}
      </div>
    );
    return operation.link ? <Link to={operation.link}>{button}</Link> : button;
  }
  return <></>;
};

const operationBar = (props: Props) => {
  return (
    <div className="operation-bar">
      {props.search ? <input type="search" placeholder="Search..." value={props.search.text} onChange={e => props.search ? props.search.onChange(e.target.value) : {}} className="operation-search"/> : <></>}
      <div className="operations">
        {props.operations.map(operation => <OpButton key={operation.key} operation={operation} onClick={props.operationClicked}/>)}
      </div>
    </div>
  );
};

export default operationBar;
