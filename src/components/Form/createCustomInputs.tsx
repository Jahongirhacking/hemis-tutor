import React, { ReactElement, useEffect } from 'react';

interface FormattedInputProps {
  value?: string;
  onChange?: (value: string) => void;
  props?: object;
}

const createCustomInputs = ({
  name,
  children,
  formatFunc,
}: {
  name: string;
  children: ReactElement;
  formatFunc: (val: string) => string;
}) => {
  return ({ value = '', onChange, props }: FormattedInputProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formattedValue = formatFunc(e.target.value);
      if (onChange) {
        onChange(formattedValue);
      }
    };

    useEffect(() => {
      if (onChange) {
        onChange(formatFunc(value));
      }
    }, [value, onChange]);

    return React.cloneElement(children, {
      value: formatFunc(value),
      onChange: handleChange,
      className: name,
      ...props,
    });
  };
};

export default createCustomInputs;
