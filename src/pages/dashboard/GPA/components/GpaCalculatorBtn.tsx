import { DrawerChildTypes, SearchParams } from '@/utils/config';
import { Button, ButtonProps } from 'antd';
import { Calculator } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const GpaCalculatorBtn = (props: ButtonProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClickGpaCalculator = () => {
    const params = new URLSearchParams(searchParams);
    params.set(SearchParams.Drawer, DrawerChildTypes.GpaCalculator);
    setSearchParams(params);
  };

  return (
    <Button
      icon={<Calculator size={20} />}
      title="GPA hisoblagich"
      aria-label="GPA hisoblagich"
      onClick={handleClickGpaCalculator}
      {...props}
    />
  );
};

export default GpaCalculatorBtn;
