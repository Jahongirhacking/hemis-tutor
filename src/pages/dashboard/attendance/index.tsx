import { Flex, Typography } from 'antd';
import { ClipboardCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CustomTabs from '../components/CustomTabs';
import AttendanceBySubject from './tabs/AttendanceBySubject';
import AttendanceReport from './tabs/AttendanceReport';

const AttendancePage = () => {
  const { t } = useTranslation();

  return (
    <Flex vertical gap={24} className="dashboard__page attendance-page upper-element">
      <Flex align="center" gap={12}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(20, 184, 166, 0.2)',
          }}
        >
          <ClipboardCheck size={24} color="white" />
        </div>
        <Typography.Title level={2} style={{ margin: 0 }}>
          {t('const.attendance')}
        </Typography.Title>
      </Flex>
      <Flex className="main-container">
        <CustomTabs
          items={[
            {
              key: 'report',
              label: <span style={{ fontWeight: 500 }}>Davomat hisoboti</span>,
              children: <AttendanceReport />,
            },
            {
              key: 'subjects',
              label: <span style={{ fontWeight: 500 }}>Fanlar davomati</span>,
              children: <AttendanceBySubject />,
            },
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default AttendancePage;
