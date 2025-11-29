import { IDashboardStatisticsRes } from '@/services/profile/type';

const Dashboard = ({ data }: { data: IDashboardStatisticsRes }) => {
  console.log(data);
  return <div>Dashboard</div>;
};

export default Dashboard;
