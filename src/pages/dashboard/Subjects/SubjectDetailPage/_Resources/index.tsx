import { useColumnSearch } from '@/components/Form/useColumnSearch';
import NotFoundAnimation from '@/components/SpecialComponents/NotFoundAnimation';
import { IBaseName, IResource } from '@/services/dashboard/type';
import { useAppDispatch } from '@/store/hooks';
import { setDrawer } from '@/store/slices/drawerSlice';
import { DrawerChildTypes, SearchParams } from '@/utils/config';
import {
  Button,
  Flex,
  Segmented,
  Skeleton,
  Table,
  TableColumnsType,
  Tag,
} from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

interface ISegmentedOption {
  label: string;
  value: string;
}

const Resources = ({ resources }: { resources: IResource[] }) => {
  const [segmentedList, setList] = useState<ISegmentedOption[]>([]);
  const [currentSegmented, setCurrentSegmented] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const dispatch = useAppDispatch();
  const { getColumnSearchProps } = useColumnSearch();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = 8;

  const handleChangeSegmented = (value: string) => {
    setCurrentSegmented(value);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [currentSegmented]);

  const handleClickShowMoreBtn = (resource: IResource) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(SearchParams.Drawer, DrawerChildTypes.Resource);
    setSearchParams(newParams);
    dispatch(
      setDrawer({
        title: t('const.more_info'),
        props: {
          resource: resource?.subjectFileResourceItems?.reduce(
            (acc, curr) => [...acc, ...curr.files],
            []
          ),
        },
      })
    );
  };

  const columns: TableColumnsType<any> = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
      render: (_, record) => record?.index,
      sorter: (rec1, rec2) => rec1?.index - rec2?.index,
      showSorterTooltip: { title: t('components.sorting.ordinal_number') },
    },
    {
      title: t('const.title') as string,
      dataIndex: 'title',
      key: 'title',
      ...getColumnSearchProps('title'),
    },
    {
      title: t('const.number_of_files') as string,
      dataIndex: 'numOfFiles',
      key: 'numOfFiles',
      render: (_, { subjectFileResourceItems }: IResource) => (
        <Tag color="cyan">
          {subjectFileResourceItems?.reduce(
            (acc, curr) => acc + curr?.files?.length,
            0
          )}
        </Tag>
      ),
      className: 'subject-res_num_files-column',
    },
    {
      title: t('const.actions') as string,
      dataIndex: 'actions',
      key: 'actions',
      render: (_, resource: IResource) => (
        <Button type="link" onClick={() => handleClickShowMoreBtn(resource)}>
          {t('const.see')}
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const list = {};
    resources?.forEach(item =>
      !list?.[item.trainingType.code]
        ? (list[item.trainingType.code] = item.trainingType)
        : ''
    );
    setList([
      {
        label: t('const.all'),
        value: 'all',
      },
      ...Object.values(list).map((item: IBaseName) => ({
        label: item?.name,
        value: item?.code,
      })),
    ]);
  }, [resources]);

  const resourceData =
    currentSegmented == 'all'
      ? resources
      : resources?.filter(
          resource => resource?.trainingType?.code === currentSegmented
        );

  if (!resourceData) return <Skeleton active />;

  return (
    <Flex vertical gap={24}>
      <Segmented
        value={currentSegmented}
        options={segmentedList}
        onChange={handleChangeSegmented}
      />
      <Table
        columns={columns}
        dataSource={resourceData?.map((res, index) => ({
          ...res,
          index: index + 1,
        }))}
        locale={{
          emptyText: (
            <NotFoundAnimation.Dashboard
              description={`${t('const.resources')} ${t('const.not_found')}`}
            />
          ),
        }}
        pagination={{
          pageSize,
          onChange: page => setCurrentPage(page),
          current: currentPage,
        }}
        rowKey={'id'}
      />
    </Flex>
  );
};

export default Resources;
