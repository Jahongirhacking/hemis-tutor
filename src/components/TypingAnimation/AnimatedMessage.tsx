import { ReactElement } from 'react';
import './style.scss';

const AnimatedMessage = ({ children }: { children: ReactElement }) => {
  return <div className="animated-text">{children}</div>;
};

export default AnimatedMessage;
