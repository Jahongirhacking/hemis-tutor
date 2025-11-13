import { RootState } from '@/store/store';
import { Collapse } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const CustomCollapse = ({ ...props }) => {
  const currentSemester = useSelector(
    (store: RootState) => store.authSlice?.currentSemester
  );
  const [activeKey, setActiveKey] = useState<string | string[]>([]);

  const handleCollapseChange = (key: string | string[]) => {
    setActiveKey(key);
  };

  useEffect(() => {
    if (currentSemester) {
      setActiveKey([currentSemester?.code]);
    }
  }, [currentSemester]);

  return (
    <Collapse
      activeKey={activeKey}
      onChange={handleCollapseChange}
      collapsible="header"
      expandIconPosition="end"
      {...props}
    />
  );
};

export default CustomCollapse;
