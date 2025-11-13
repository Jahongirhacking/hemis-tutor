import NotFoundAnimation from '@/components/SpecialComponents/NotFoundAnimation';
import { useGetExamsListQuery } from '@/services/exams';
import { IExam } from '@/services/exams/type';
import { RootState } from '@/store/store';
import { getExamMark } from '@/utils/markFunc';
import {
  Button,
  Card,
  Empty,
  Flex,
  Modal,
  Skeleton,
  Switch,
  Table,
  TableColumnsType,
  Tag,
  Typography,
} from 'antd';
import DOMPurify from 'dompurify';
import { SquareCheck, SquareX } from 'lucide-react';
import moment from 'moment';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './style.scss';

const ExamsPage = () => {
  const currentSemesterCode = useSelector(
    (store: RootState) => store?.authSlice?.currentSemester?.code
  );
  const { data: examsData, isFetching: isExamsFetching } = useGetExamsListQuery(
    { semester: currentSemesterCode },
    { skip: !currentSemesterCode }
  );
  const { t } = useTranslation();
  const themeColor = useSelector(
    (store: RootState) => store?.themeSlice?.color
  );
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(true);

  const handleSartTest = useCallback(
    (exam: IExam) => {
      Modal.confirm({
        cancelText: t('const.cancel'),
        okText: t('login.university_form.button_text'),
        closable: true,
        className: `${themeColor}-modal`,
        content: exam?.studentAttempt ? (
          <Flex vertical gap={12}>
            <Typography.Title level={4}>
              {t('exam.retry_title')}
            </Typography.Title>
            <span
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  t('exam.retry_message', {
                    percent: exam?.studentAttempt?.percent,
                  })
                ),
              }}
            />
          </Flex>
        ) : (
          <Flex vertical gap={12}>
            <Typography.Title level={4}>{t('exam.try_title')}</Typography.Title>
            <span
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  t('exam.try_message', {
                    questionCount: exam?.questionCount,
                    durationMinutes: exam?.durationMinutes,
                  })
                ),
              }}
            />
          </Flex>
        ),
        onOk: () => {
          navigate(`/exams/${exam?.id}`);
        },
      });
    },
    [themeColor]
  );

  const columns: TableColumnsType<any> = [
    {
      title: t('const.subjects'),
      key: 'subjectName',
      dataIndex: 'subjectName',
      render: (_, record: IExam) => (
        <Flex vertical>
          <Typography.Text>{record?.name}</Typography.Text>
          <Typography.Text className="secondary-text">
            {`${record?.subject?.name} / ${record?.examType?.name} / ${record?.employee?.name}`}
          </Typography.Text>
        </Flex>
      ),
    },
    {
      title: t('components.task.task_in_drawer.result_text'),
      key: 'result',
      dataIndex: 'result',
      render: (_, record: IExam) => (
        <Flex vertical align="flex-start" gap={4}>
          {record?.studentAttempt ? (
            <>
              <Flex gap={8} wrap align="center">
                {getExamMark(
                  {
                    grade: record?.studentAttempt?.mark,
                    max_ball: record?.studentAttempt?.maxBall,
                    percent: record?.studentAttempt?.percent,
                  },
                  record?.subject?.name,
                  true
                )}
                <Tag
                  color="success"
                  icon={
                    <SquareCheck
                      style={{ transform: 'translateY(3px)', marginRight: 4 }}
                      size={15}
                    />
                  }
                >
                  {record?.studentAttempt?.correct}
                </Tag>
                <Tag
                  color="error"
                  icon={
                    <SquareX
                      style={{ transform: 'translateY(3px)', marginRight: 4 }}
                      size={15}
                    />
                  }
                >
                  {record?.questionCount - record?.studentAttempt?.correct}
                </Tag>
              </Flex>
              <Typography.Text className="secondary-text">
                {`${moment.unix(record?.studentAttempt?.startedAt).format('DD.MM.YYYY HH:mm')} /
                  ${record?.studentAttempt?.attemptsUsed}-${t('const.attempt')}`}
              </Typography.Text>
            </>
          ) : (
            <Typography.Text>-</Typography.Text>
          )}
        </Flex>
      ),
      className: 'exams-result-column',
    },
    {
      title: t('components.task.task_in_drawer.max_score_text'),
      key: 'maxBall',
      dataIndex: 'maxBall',
      render: (_, record: IExam) => (
        <Flex vertical>
          <Typography.Text>
            {record?.maxBall} {t('const.score')}
          </Typography.Text>
          <Typography.Text className="secondary-text">
            {`${t('const.number_count', { number: record?.questionCount })} ${t('const.question')} / ${record?.durationMinutes} ${t('const.minute')} / ${t('const.number_count', { number: record?.attemptLimit })} ${t('const.attempt')}`}
          </Typography.Text>
        </Flex>
      ),
      className: 'exams-max_ball-column',
    },
    {
      title: t('const.exam_interval'),
      key: 'duration',
      dataIndex: 'duration',
      render: (_, record: IExam) => (
        <Flex vertical>
          <Typography.Text>
            {moment.unix(record?.startAt).format('DD.MM.YYYY HH:mm')}
          </Typography.Text>
          <Typography.Text className="secondary-text">
            {moment.unix(record?.finishAt).format('DD.MM.YYYY HH:mm')}
          </Typography.Text>
        </Flex>
      ),
      className: 'exams-duration-column',
    },
    {
      title: t('const.actions'),
      key: 'actions',
      dataIndex: 'actions',
      fixed: 'right',
      render: (_, record: IExam) => (
        <Flex gap={8} wrap>
          {record?.canJoin ? (
            <Button type="primary" onClick={() => handleSartTest(record)}>
              {t('const.start')}
            </Button>
          ) : (
            <Button>Tahlil</Button>
          )}
        </Flex>
      ),
      className: 'exams-actions-column',
    },
  ];

  return (
    <section className="section dashboard__outlet exams__outlet">
      <Flex gap={12} justify="space-between" align="center" wrap>
        <h2 className="section_title">{t('const.exams')}</h2>
        <Switch
          checkedChildren={t('const.active')}
          unCheckedChildren={t('const.inactive')}
          defaultChecked={true}
          onChange={value => setIsActive(value)}
        />
      </Flex>
      <div className="dashboard__outlet--content">
        {isExamsFetching ? (
          <Card>
            <Skeleton active />
          </Card>
        ) : examsData?.data?.length ? (
          <div className="exams-table">
            <Table
              columns={columns}
              dataSource={examsData?.data?.filter(d =>
                isActive ? d?.canJoin : !d?.canJoin
              )}
              rowKey={'id'}
              scroll={{ x: '950px' }}
              pagination={false}
              locale={{
                emptyText: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={`${t('const.exams')} ${t('const.not_found')}`}
                  />
                ),
              }}
            />
          </div>
        ) : (
          <NotFoundAnimation.Card
            description={`${t('const.exams')} ${t('const.not_found')}`}
          />
        )}
      </div>
    </section>
  );
};

export default ExamsPage;
