import { FormInstance } from 'antd';
import React, { createContext, ReactElement, useState } from 'react';

interface IProps {
  setNextIndex: () => void;
  setPrevIndex: () => void;
  currentIndex: number;
  onSubmit: (data?: object) => void;
  form: FormInstance;
  data: object;
  pushData: (data: object) => void;
}

export const ControlledFlowContext = createContext<IProps>(null);

const ControlledFlow = ({
  children,
  indexState: [currentIndex, setCurrentIndex],
  onSubmit = () => {},
  form,
  data = {},
}: {
  children: ReactElement | ReactElement[];
  indexState: [number, React.Dispatch<React.SetStateAction<number>>];
  onSubmit?: (data?: object) => void;
  form?: FormInstance;
  data?: object;
}) => {
  const [allData, setData] = useState<object>(data);

  const pushData = (newData: object) => {
    setData(prevData => ({ ...prevData, ...newData }));
  };

  const setNextIndex = () => {
    setCurrentIndex(prev =>
      Math.min(prev + 1, React.Children.toArray(children).length - 1)
    );
  };

  const setPrevIndex = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };
  return (
    <ControlledFlowContext.Provider
      value={{
        setNextIndex,
        setPrevIndex,
        currentIndex,
        onSubmit,
        form,
        data: allData,
        pushData,
      }}
    >
      {React.Children.map(
        children,
        (Component: ReactElement, index: number) => {
          if (index === currentIndex) return React.cloneElement(Component);
        }
      )}
    </ControlledFlowContext.Provider>
  );
};

export default ControlledFlow;
