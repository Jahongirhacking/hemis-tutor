// import { getFileExtensionName } from '@/utils/fileFunc';
// import { converToFloatingFormat } from '@/utils/numberFunc';
// import {
//   Button,
//   Empty,
//   Flex,
//   Table,
//   TableColumnsType,
//   Tag,
//   Typography,
// } from 'antd';
// import moment from 'moment';

// const Contracts = ({ contracts }: { contracts: IContract[] }) => {
//   const columns: TableColumnsType<IContract> = [
//     {
//       title: 'O‘quv yili',
//       key: 'years',
//       dataIndex: 'years',
//     },
//     {
//       title: 'Shartnoma raqami',
//       key: 'id',
//       dataIndex: 'id',
//       render: (_, contract: IContract) => (
//         <Flex vertical>
//           <Typography.Text>
//             {contract.id} / {contract.date}
//           </Typography.Text>
//           <Typography.Text style={{ color: 'rgba(0,0,0, 0.45)' }}>
//             {converToFloatingFormat(contract.price.amount)}{' '}
//             {contract.price.currency.toUpperCase()}
//           </Typography.Text>
//         </Flex>
//       ),
//       sorter: (a: IContract, b: IContract) =>
//         moment(a.date, 'DD.MM.YYYY').toDate().getTime() -
//         moment(b.date, 'DD.MM.YYYY').toDate().getTime(),
//       showSorterTooltip: { title: 'Sana bo‘yicha saralash' },
//     },
//     {
//       title: 'Shartnoma turi',
//       key: 'contractDetails',
//       dataIndex: 'contractDetails',
//       render: (_, contract: IContract) => (
//         <Flex vertical>
//           <Typography.Text>{contract.contractDetails.type}</Typography.Text>
//           <Typography.Text style={{ color: 'rgba(0,0,0, 0.45)' }}>
//             {contract.contractDetails.sides} /{' '}
//             {contract.contractDetails.isStipend
//               ? 'Stipendiyali'
//               : 'Stipendiyasiz'}
//           </Typography.Text>
//         </Flex>
//       ),
//     },
//     {
//       title: 'To‘landi',
//       key: 'amountPaid',
//       dataIndex: 'amountPaid',
//       render: (_, record: IContract) => (
//         <Tag color="success" style={{ fontWeight: 600 }}>
//           {converToFloatingFormat(record.amountPaid.amount)}{' '}
//           {record.amountPaid.currency.toUpperCase()}
//         </Tag>
//       ),
//     },
//     {
//       title: 'Hujjat turi',
//       key: 'fileType',
//       dataIndex: 'fileType',
//       render: (_, record: IContract) => (
//         <Tag color="magenta">
//           {getFileExtensionName(record?.file?.name).toUpperCase()}
//         </Tag>
//       ),
//     },
//     {
//       title: 'Holati',
//       key: 'status',
//       dataIndex: 'status',
//     },
//     {
//       title: 'Amallar',
//       key: 'actions',
//       dataIndex: 'actions',
//       render: (_, contract: IContract) => (
//         <Button type="link" download={contract.contractDetails.type}>
//           Yuklab olish
//         </Button>
//       ),
//     },
//   ];
//   return (
//     <Table
//       className="contracts__table"
//       locale={{ emptyText: <Empty description="Shartnoma topilmadi" /> }}
//       columns={columns}
//       dataSource={contracts}
//       rowKey="id"
//       pagination={{ pageSize: 8 }}
//     />
//   );
// };

// export default Contracts;
