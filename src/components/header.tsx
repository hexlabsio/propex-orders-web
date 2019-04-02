import { default as React } from 'react';
import { propexIcon as PropexIcon } from '../components/header';
import './header.sass';

interface Props {
  user: { name: string; access: string };
}

const propexHeader = (props: Props) => {
  return (
    <header className="header">
      <PropexIcon />
      <div className="header-text">PROPEX</div>
      <div className="header-content">
        <div className="user-info">
          <div className="user-name">{props.user.name}</div>
          <div className="user-access">{props.user.access}</div>
        </div>
      </div>
    </header>
  );
};

export const propexIcon = () => (
  <svg className="propex-icon" version="1.1" x="0px" y="0px" viewBox="0 0 16 16" >
    <path
      fill="currentColor"
      d="M7.96,13.02v-1.99h7.37c0.25-0.63,0.43-1.29,0.52-1.99H7.96V7.05h7.89c-0.09-0.69-0.26-1.36-0.51-1.99H7.96 V3.07h6.21c-1.46-1.82-3.7-2.98-6.21-2.98C3.56,0.08,0,3.65,0,8.04S3.56,16,7.96,16c2.51,0,4.75-1.17,6.2-2.98H7.96z"
    />
  </svg>
);

export default propexHeader;
