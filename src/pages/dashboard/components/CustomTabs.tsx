import { SearchParams } from '@/utils/config';
import { Tabs, TabsProps } from 'antd';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const CustomTabs = ({ field, ...props }: TabsProps & { field?: string }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeField = useMemo(() => field || SearchParams.ActiveTab, [field]);

  return (
    <Tabs
      onChange={key => {
        const params = new URLSearchParams(searchParams);
        params.set(activeField, key);
        setSearchParams(params);
      }}
      activeKey={searchParams.get(activeField) || props?.items?.[0]?.key}
      type="card"
      {...props}
    />
  );
};

export default CustomTabs;
