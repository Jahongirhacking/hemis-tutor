import { SearchParams } from '@/utils/config';
import { Tabs, TabsProps } from 'antd';
import { useSearchParams } from 'react-router-dom';

const CustomTabs = (props: TabsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Tabs
      onChange={key => {
        const params = new URLSearchParams(searchParams);
        params.set(SearchParams.ActiveTab, key);
        setSearchParams(params);
      }}
      activeKey={
        searchParams.get(SearchParams.ActiveTab) || props?.items?.[0]?.key
      }
      type="card"
      {...props}
    />
  );
};

export default CustomTabs;
